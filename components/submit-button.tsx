"use client";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import Image from "next/image";
import GoogleImage from "@/public/google.svg";
import GithubImage from "@/public/github.svg";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  authType?: "Google" | "Github";
  text?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  className?: string;
}

function SubmitButton({
  authType,
  variant = "default",
  text = "Sign in with",
  className,
}: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      className={cn("w-fit", className)}
      variant={pending ? "secondary" : variant}
      disabled={pending}
    >
      {pending ? (
        <div className="flex items-center gap-x-2">
          <Loader2 className=" size-4 mr-2 animate-spin" />
          Please wait
        </div>
      ) : (
        <>
          {authType && (
            <Image
              className="size-4 mr-2"
              alt={authType}
              src={authType === "Github" ? GithubImage : GoogleImage}
            />
          )}
          {text} {authType}
        </>
      )}
    </Button>
  );
}

export default SubmitButton;
