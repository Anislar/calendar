"use client";
import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { onBoardingAction } from "../action";
import { onBoardingSchema } from "../lib/zod-schemas";
import SubmitButton from "@/components/submit-button";
import { cn } from "@/lib/utils";

function OnBoardingRoute() {
  const [data, action] = useFormState(onBoardingAction, undefined);

  const [form, fields] = useForm({
    lastResult: data,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: onBoardingSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  return (
    <div className="flex items-center justify-center w-screen min-h-screen">
      <Card>
        <CardHeader>
          <CardTitle>
            Welcome to Larguet
            <span className=" bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">
              Calendar
            </span>
          </CardTitle>
          <CardDescription>
            We need the following information to set up your profile!
          </CardDescription>
        </CardHeader>
        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
          <CardContent className="grid gap-y-5">
            <div className=" grid gap-y-2">
              <Label htmlFor={fields.fullName.name}>Full Name</Label>
              <Input
                className={
                  fields.fullName.errors && "border-destructive border-2"
                }
                name={fields.fullName.name}
                defaultValue={fields.fullName.initialValue}
                key={fields.fullName.key}
                placeholder="Anis Larguet"
              />

              {fields.fullName.errors && (
                <ul>
                  {fields.fullName.errors.map((e) => (
                    <li key={e}>
                      <p className=" text-destructive text-sm">{e}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className=" grid gap-y-2">
              <Label htmlFor={fields.userName.name}>User Name</Label>
              <div
                className={cn(
                  fields.userName.errors && "border-destructive border-2",
                  "flex rounded-md"
                )}
              >
                <span className=" inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground">
                  LarguetCalendar.com/
                </span>
                <Input
                  className="rounded-l-none"
                  defaultValue={fields.userName.initialValue}
                  key={fields.userName.key}
                  name={fields.userName.name}
                  placeholder="exp: user_1"
                />
              </div>

              {fields.userName.errors && (
                <ul>
                  {fields.userName.errors.map((e) => (
                    <li key={e}>
                      <p className=" text-destructive text-sm">{e}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton text="Submit" className="w-full" />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default OnBoardingRoute;
