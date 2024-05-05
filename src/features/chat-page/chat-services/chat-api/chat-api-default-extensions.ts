"use server";
import "server-only";

import { ServerActionResponse } from "@/features/common/server-action-response";
import { OpenAIDALLEInstance } from "@/features/common/services/openai";
import { uniqueId } from "@/features/common/util";
import { GetImageUrl, UploadImageToStore } from "../chat-image-service";
import { ChatThreadModel } from "../models";

export const GetDefaultExtensions = async (props: {
  chatThread: ChatThreadModel;
  userMessage: string;
  signal: AbortSignal;
}): Promise<ServerActionResponse<Array<any>>> => {
  const defaultExtensions: Array<any> = [];

  // Add image creation Extension
  defaultExtensions.push({
    type: "function",
    function: {
      function: async (args: any) =>
        await executeCreateImage(
          args,
          props.chatThread.id,
          props.userMessage,
          props.signal
        ),
      parse: (input: string) => JSON.parse(input),
      parameters: {
        type: "object",
        properties: {
          prompt: { type: "string" },
        },
      },
      description:
        "You must only use this tool if the user asks you to create an image. You must only use this tool once per message.",
      name: "create_img",
    },
  });

   // Add Bing Search Extension
   defaultExtensions.push({
    type: "function",
    function: {
      function: async (args: any) =>
        await executeBingSearch(
          args,
          props.signal
        ),
      parse: (input: string) => JSON.parse(input),
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "object",
            properties: {
              BING_SEARCH_QUERY: { type: "string" },
            },
            required: ["BING_SEARCH_QUERY"],
          },
        },
      },
      description:
        "Retrieve up to date Azure documentation with AI search.",
      name: "BingSearch",
    },
  });

  // Add any other default Extension here

  return {
    status: "OK",
    response: defaultExtensions,
  };
};

// Extension for image creation using DALL-E
async function executeCreateImage(
  args: { prompt: string },
  threadId: string,
  userMessage: string,
  signal: AbortSignal
) {
  console.log("createImage called with prompt:", args.prompt);

  if (!args.prompt) {
    return "No prompt provided";
  }

  // Check the prompt is < 4000 characters (DALL-E 3)
  if (args.prompt.length >= 4000) {
    return "Prompt is too long, it must be less than 4000 characters";
  }

  const openAI = OpenAIDALLEInstance();

  let response;

  try {
    response = await openAI.images.generate(
      {
        model: "dall-e-3",
        prompt: userMessage,
        response_format: "b64_json",
      },
      {
        signal,
      }
    );
  } catch (error) {
    console.error("🔴 error:\n", error);
    return {
      error:
        "There was an error creating the image: " +
        error +
        "Return this message to the user and halt execution.",
    };
  }

  // Check the response is valid
  if (response.data[0].b64_json === undefined) {
    return {
      error:
        "There was an error creating the image: Invalid API response received. Return this message to the user and halt execution.",
    };
  }

  // upload image to blob storage
  const imageName = `${uniqueId()}.png`;

  try {
    await UploadImageToStore(
      threadId,
      imageName,
      Buffer.from(response.data[0].b64_json, "base64")
    );

    const updated_response = {
      revised_prompt: response.data[0].revised_prompt,
      url: GetImageUrl(threadId, imageName),
    };

    return updated_response;
  } catch (error) {
    console.error("🔴 error:\n", error);
    return {
      error:
        "There was an error storing the image: " +
        error +
        "Return this message to the user and halt execution.",
    };
  }
}

// Function to execute Bing Search
async function executeBingSearch(
  args: { query: { BING_SEARCH_QUERY: string } },
  signal: AbortSignal
) {
  console.log("BingSearch called with query:", args.query.BING_SEARCH_QUERY);

  if (!args.query.BING_SEARCH_QUERY) {
    return "No search query provided";
  }

  const subscriptionKey = "6df67fda77624697a83b932cd80323bd";
  const endpoint = "https://api.bing.microsoft.com/v7.0/custom/search";
  const customConfigId = "79ad8e2e-9988-474c-9e69-9466703a3773";
  const market = "en-US";
  const searchQuery = args.query.BING_SEARCH_QUERY;

  const url = `${endpoint}?q=${encodeURIComponent(
    searchQuery
  )}&customconfig=${customConfigId}&mkt=${market}`;

  try {
    const searchResponse = await fetch(url, {
      headers: {
        "Ocp-Apim-Subscription-Key": subscriptionKey,
      },
      signal,
    });

    if (!searchResponse.ok) {
      throw new Error(`HTTP error! status: ${searchResponse.status}`);
    }

    const searchData = await searchResponse.json();
    return searchData;
  } catch (error) {
    // Type assertion for the error object
    const errorMessage = (error as Error).message || "An unknown error occurred";
    console.error("🔴 Bing Search error:\n", errorMessage);
    return {
      error:
        "There was an error performing the search: " +
        errorMessage +
        ". Return this message to the user and halt execution.",
    };
  }
}
