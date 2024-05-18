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
    <Card className="flex gap-2 flex-col min-w-[300px] items-center"> {/* Added items-center to center align items on the cross-axis */}
      <CardHeader className="gap-2 w-full text-center"> {/* Added w-full and text-center to make the header full width and center the text */}
        <CardTitle className="text-2xl flex gap-2 justify-center items-center"> {/* Added justify-center to center the items on the main-axis */}
          <Avatar className="h-8 w-8">
            <AvatarImage src={"ai-icon.png"} />
          </Avatar>
          <span className="text-primary">{AI_NAME}</span>
        </CardTitle>
        <CardDescription className="w-full text-center"> {/* Added w-full and text-center to make the description full width and center the text */}
          Login in with your Microsoft Account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 place-items-center"> {/* Added place-items-center to center the items both horizontally and vertically */}
        <Button onClick={() => signIn("github")}>GitHub</Button>
        <Button onClick={() => signIn("azure-ad")}>Microsoft Employee</Button>
        {props.isDevMode ? (
          <Button onClick={() => signIn("localdev")}>
            Basic Auth (DEV ONLY)
          </Button>
        ) : null}
      </CardContent>
    </Card>
  );
};

