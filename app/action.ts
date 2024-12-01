"use server";
import { parseWithZod } from "@conform-to/zod";
import prisma from "./lib/db";
import { requireUser } from "./lib/hooks";
import { onBoardingSchemaValidation } from "./lib/zod-schemas";
import { redirect } from "next/navigation";

export async function onBoardingAction(prevState: unknown, formData: FormData) {
  const submission = await parseWithZod(formData, {
    schema: onBoardingSchemaValidation({
      async isUserNameUnique() {
        const existingUserName = await prisma.user.findUnique({
          where: {
            userName: formData.get("userName") as string,
          },
        });
        return !existingUserName;
      },
    }),
    async: true,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const session = await requireUser();

  await prisma.user.update({
    where: {
      id: session?.user?.id,
    },
    data: {
      userName: submission.value.userName,
      name: submission.value.fullName,
    },
  });
  return redirect("/dashboard");
}
