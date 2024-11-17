"use client";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import Image from "next/image";
import GoogleImage from "@/public/google.svg";
import GithubImage from "@/public/github.svg";
import { Loader2 } from "lucide-react";

interface ButtonProps {
  authType: "Google" | "Github";
}
function SubmitButton({ authType }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" variant="outline" disabled={pending}>
      {pending ? (
        <Loader2 className=" size-4 mr-2 animate-spin" />
      ) : (
        <>
          <Image
            className="size-4 mr-2"
            alt={authType}
            src={authType === "Github" ? GithubImage : GoogleImage}
          />
          Sign in with {authType}
        </>
      )}
    </Button>
  );
}

export default SubmitButton;
