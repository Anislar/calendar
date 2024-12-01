import { conformZodMessage } from "@conform-to/zod";
import { z } from "zod";

export const onBoardingSchema = z.object({
  fullName: z.string().min(3).max(150),
  userName: z
    .string()
    .min(3)
    .max(150)
    .regex(/^[a-zA-Z0-9-_]+$/, {
      message:
        "User name can only contain letters, numbers dashes and underscores",
    }),
});

export function onBoardingSchemaValidation(options?: {
  isUserNameUnique: () => Promise<boolean>;
}) {
  return z.object({
    userName: z
      .string()
      .min(3)
      .max(150)
      .regex(/^[a-zA-Z0-9-_]+$/, {
        message:
          "User name can only contain letters, numbers dashes and underscores",
      })
      .pipe(
        z.string().superRefine((_, ctx) => {
          if (typeof options?.isUserNameUnique !== "function") {
            ctx.addIssue({
              code: "custom",
              message: conformZodMessage.VALIDATION_UNDEFINED,
              fatal: true,
            });
            return;
          }
          return options?.isUserNameUnique().then((isUnique) => {
            if (!isUnique) {
              ctx.addIssue({
                code: "custom",
                message: "Username is already taken",
                fatal: true,
              });
              return false;
            }
          });
        })
      ),
    fullName: z.string().min(3).max(150),
  });
}