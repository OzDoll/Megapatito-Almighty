"use server"; // Directive indicating that this code should be executed on the server side.
import "server-only"; // Importing a module that ensures the code is server-only.

import { OpenAIInstance } from "@/features/common/services/openai"; // Importing the OpenAIInstance from the specified path.
import { FindExtensionByID } from "@/features/extensions-page/extension-services/extension-service"; // Importing the FindExtensionByID function.
import { RunnableToolFunction } from "openai/lib/RunnableFunction"; // Importing the RunnableToolFunction type.
import { ChatCompletionStreamingRunner } from "openai/resources/beta/chat/completions"; // Importing the ChatCompletionStreamingRunner type.
import { ChatCompletionMessageParam } from "openai/resources/chat/completions"; // Importing the ChatCompletionMessageParam type.
import { ChatThreadModel } from "../models"; // Importing the ChatThreadModel type.

export const ChatApiExtensions = async (props: {
  chatThread: ChatThreadModel; // The chat thread model containing the conversation context.
  userMessage: string; // The message sent by the user.
  history: ChatCompletionMessageParam[]; // The history of chat messages.
  extensions: RunnableToolFunction<any>[]; // Array of runnable tool functions.
  signal: AbortSignal; // Signal to abort the request if needed.
}): Promise<ChatCompletionStreamingRunner> => {
  const { userMessage, history, signal, chatThread, extensions } = props; // Destructuring the props object.

  const openAI = OpenAIInstance(); // Creating an instance of OpenAI.
  const systemMessage = await extensionsSystemMessage(chatThread); // Generating the system message based on the chat thread.

  return openAI.beta.chat.completions.runTools(
    {
      model: "", // Model to be used for the chat completion.
      temperature: 0.0001, // Temperature setting for the model (controls randomness).
      top_p: 0.5, // Top-p setting for nucleus sampling.
      max_tokens: 4096, // Maximum number of tokens in the response.
      stream: true, // Enable streaming of the response.
      messages: [
        {
          role: "system",
          content: chatThread.personaMessage + "\n" + systemMessage, // Combining persona message and system message.
        },
        ...history, // Including the history of chat messages.
        {
          role: "user",
          content: userMessage, // Adding the user's message.
        },
      ],
      tools: extensions, // Including the runnable tool functions.
    },
    { signal: signal } // Passing the abort signal.
  );
};

const extensionsSystemMessage = async (chatThread: ChatThreadModel) => {
  let message = ""; // Initializing the message string.

  for (const e of chatThread.extension) { // Iterating over each extension in the chat thread.
    const extension = await FindExtensionByID(e); // Finding the extension by its ID.
    if (extension.status === "OK") { // Checking if the extension status is OK.
      message += ` ${extension.response.executionSteps} \n`; // Appending the execution steps to the message.
    }
  }

  return message; // Returning the constructed system message.
};
