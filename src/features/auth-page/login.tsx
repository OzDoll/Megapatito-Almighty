"use client";
import { AI_NAME } from "@/features/theme/theme-config";
import { signIn } from "next-auth/react";
import { FC } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface LoginProps {
  isDevMode: boolean;
}

export const LogIn: FC<LoginProps> = (props) => {
  return (
    // Wrap the Card component in a flex container that centers its children
    <div className="flex justify-center items-center min-h-screen"> {/* This container will center the Card component */}
      <Card className="flex gap-2 flex-col min-w-[300px] items-center">
        <CardHeader className="gap-2 w-full text-center">
          <CardTitle className="text-2xl flex gap-2 justify-center items-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src={"ai-icon.png"} />
            </Avatar>
            <span className="text-primary">{AI_NAME}</span>
          </CardTitle>
          <CardDescription className="w-full text-center">
            Login in with your Microsoft Account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 place-items-center">
        <Button onClick={() => signIn("github", { callbackUrl: "https://megapatitoari-webapp-pvwo3gvszv7fc.azurewebsites.net/api/auth/callback/github" })}>GitHub</Button>
          <Button onClick={() => signIn("azure-ad")}>Microsoft Employee</Button>
          {props.isDevMode ? (
            <Button onClick={() => signIn("localdev")}>
              Basic Auth (DEV ONLY)
            </Button>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
};
