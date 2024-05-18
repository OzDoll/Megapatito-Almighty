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
    // This container will center the Card component both horizontally and vertically
    <div className="flex justify-center items-center min-h-screen w-full"> {/* Ensure full width */}
      {/* Ensure the Card component itself is a flex container with centered items */}
      <Card className="flex flex-col items-center gap-2 min-w-[300px] w-full max-w-md mx-auto"> {/* Set max width and auto margins */}
        <CardHeader className="gap-2 w-full text-center">
          <CardTitle className="text-2xl flex gap-2 justify-center items-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src={"ai-icon.png"} alt="AI Logo" />
            </Avatar>
            <span className="text-primary">{AI_NAME}</span>
          </CardTitle>
          <CardDescription className="w-full text-center">
            Login in with your Microsoft Account
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4 w-full"> {/* Use flex column layout with centered items */}
          <Button className="w-full" onClick={() => signIn("github")}>GitHub</Button>
          <Button className="w-full" onClick={() => signIn("azure-ad")}>Azure</Button>
          {props.isDevMode && (
            <Button className="w-full" onClick={() => signIn("localdev")}>
              Basic Auth (DEV ONLY)
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
