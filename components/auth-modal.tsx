import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { signIn } from "@/app/lib/auth";
import SubmitButton from "./submit-button";
function AuthModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Try for free</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[360px]">
        <DialogHeader>
          <Logo />
        </DialogHeader>
        <div className="flex flex-col mt-5 gap-3">
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
            className="w-full"
          >
            <SubmitButton
              className="w-full"
              variant="outline"
              authType="Google"
              text="Sign in with"
            />
          </form>
          <form
            action={async () => {
              "use server";
              await signIn("github");
            }}
            className="w-full"
          >
            <SubmitButton
              className="w-full"
              variant="outline"
              authType="Github"
              text="Sign in with"
            />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AuthModal;
