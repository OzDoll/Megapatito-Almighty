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
    <div className="flex justify-center items-center min-h-screen w-full">
      <Card className="flex flex-col items-center gap-2 min-w-[300px] w-full max-w-md mx-auto">
        <CardHeader className="gap-2 w-full text-center">
          <CardTitle className="text-2xl flex flex-col items-center gap-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={"ai-icon.png"} alt="AI Logo" />
            </Avatar>
            <span className="text-primary">{AI_NAME}</span>
          </CardTitle>
          <CardDescription className="w-full text-center">
            Login in with your Microsoft Account
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4 w-full">
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
