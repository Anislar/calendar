"use server";
import { parseWithZod } from "@conform-to/zod";
import prisma from "./lib/db";
import { requireUser } from "./lib/hooks";
import { onBoardingSchemaValidation, settingsSchema } from "./lib/zod-schemas";
import { redirect } from "next/navigation";
import { Day } from "@prisma/client";
import { revalidatePath } from "next/cache";

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
      availability: {
        createMany: {
          data: Array.from({ length: 7 }, (_, i) => ({
            day: Object.values(Day)[i],
            fromTime: "08:00",
            tillTime: "18:00",
          })),
        },
      },
    },
  });
  return redirect("/onboarding/grant-id");
}

export async function SettingsActions(prevState: unknown, formData: FormData) {
  const session = await requireUser();
  const submission = parseWithZod(formData, {
    schema: settingsSchema,
  });
  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.user.update({
    where: {
      id: session?.user?.id,
    },
    data: {
      image: submission.value.profileImage,
      name: submission.value.fullName,
    },
  });
  return redirect("/dashboard");
}

export async function updateAvailabilityAction(
  formData: FormData
): Promise<void> {
  await requireUser();

  const rawData = Object.fromEntries(formData.entries());

  const availabilityData = Object.keys(rawData)
    .filter((key) => key.startsWith("id-"))
    .map((key) => {
      const id = key.replace("id-", "");
      return {
        id,
        isActive: rawData[`isActive-${id}`] === "on", // on: 1 , undefined: 0
        fromTime: rawData[`fromTime-${id}`],
        tillTime: rawData[`tillTime-${id}`],
      };
    });
  try {
    await prisma.$transaction(
      availabilityData.map((item) =>
        prisma.availability.update({
          where: { id: item.id },
          data: {
            isActive: item.isActive,
            fromTime: item.fromTime as string,
            tillTime: item.tillTime as string,
          },
        })
      )
    );
    revalidatePath("/dashboard/availability");
  } catch (error) {
    console.log("[ERROR_UPDATE_AVAILABILITY]", error);
    throw new Response("Something went wrong!", { status: 500 });
  }
}
