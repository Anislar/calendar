"use client";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "@/components/submit-button";

import { cn } from "@/lib/utils";
import { createEventTypeAction } from "@/app/action";
import { eventsTypeSchema } from "@/app/lib/zod-schemas";
type videoCallSoftware = "Google Meet" | "Zoom Meeting" | "Microsoft Teams";
function NewEventRoute() {
  const [activePlateform, setActivePlateform] =
    useState<videoCallSoftware>("Google Meet");

  const [lastResult, action] = useFormState(createEventTypeAction, undefined);
  const { pending } = useFormStatus();
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: eventsTypeSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  return (
    <div className="w-full h-full flex flex-1 items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Add a new appointment type</CardTitle>
          <CardDescription>
            Create a new appointement type that allow people to book you!
          </CardDescription>
        </CardHeader>
        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
          <CardContent className="grid gap-y-5">
            <div className="flex flex-col gap-y-2">
              <Label htmlFor={fields.title.name}>Title</Label>
              <Input
                defaultValue={fields.title.initialValue}
                key={fields.title.key}
                name={fields.title.name}
                placeholder="30 min meeting"
              />
              {fields.title.errors && (
                <ul>
                  {fields.title.errors.map((e) => (
                    <li key={e}>
                      <p className=" text-destructive text-sm">{e}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <Label htmlFor={fields.url.name}>Url Slug</Label>
              <div
                className={cn(
                  fields.url.errors && "border-destructive border-2",
                  "flex rounded-md"
                )}
              >
                <span className=" inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground">
                  LarguetCalendar.com/
                </span>
                <Input
                  className="rounded-l-none"
                  defaultValue={fields.url.initialValue}
                  key={fields.url.key}
                  name={fields.url.name}
                  placeholder="example-url-1"
                />
              </div>
              {fields.url.errors && (
                <ul>
                  {fields.url.errors.map((e) => (
                    <li key={e}>
                      <p className=" text-destructive text-sm">{e}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <Label htmlFor={fields.description.name}>Description</Label>
              <Textarea
                defaultValue={fields.description.initialValue}
                key={fields.description.key}
                name={fields.description.name}
                placeholder="Meet me in this meeting to meet me!"
              />
              {fields.description.errors && (
                <ul>
                  {fields.description.errors.map((e) => (
                    <li key={e}>
                      <p className=" text-destructive text-sm">{e}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <Label htmlFor={fields.duration.name}>Duration</Label>
              <Select
                defaultValue={fields.duration.initialValue}
                key={fields.duration.key}
                name={fields.duration.name}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Duration</SelectLabel>
                    <SelectItem value="15">15 Min</SelectItem>
                    <SelectItem value="30">30 Min</SelectItem>
                    <SelectItem value="45">45 Min</SelectItem>
                    <SelectItem value="60">1 Hour</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {fields.duration.errors && (
                <ul>
                  {fields.duration.errors.map((e) => (
                    <li key={e}>
                      <p className=" text-destructive text-sm">{e}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="grid gap-y-2">
              <Label htmlFor={fields.videoCallSoftware.name}>
                Video Call provider
              </Label>
              <input
                type="hidden"
                name={fields.videoCallSoftware.name}
                value={activePlateform}
                key={fields.videoCallSoftware.key}
              />
              <ButtonGroup>
                <Button
                  type="button"
                  variant={
                    activePlateform === "Zoom Meeting" ? "secondary" : "outline"
                  }
                  onClick={() => setActivePlateform("Zoom Meeting")}
                  className="w-full"
                >
                  Zoom
                </Button>
                <Button
                  type="button"
                  variant={
                    activePlateform === "Google Meet" ? "secondary" : "outline"
                  }
                  onClick={() => setActivePlateform("Google Meet")}
                  className="w-full"
                >
                  Google Meet
                </Button>
                <Button
                  type="button"
                  variant={
                    activePlateform === "Microsoft Teams"
                      ? "secondary"
                      : "outline"
                  }
                  onClick={() => setActivePlateform("Microsoft Teams")}
                  className="w-full"
                >
                  Microsoft Teams
                </Button>
              </ButtonGroup>
              {fields.videoCallSoftware.errors && (
                <ul>
                  {fields.videoCallSoftware.errors.map((e) => (
                    <li key={e}>
                      <p className=" text-destructive text-sm">{e}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </CardContent>
          <CardFooter className="w-full flex justify-between items-center">
            <Button
              disabled={pending}
              type="button"
              variant="secondary"
              asChild
            >
              <Link href="/dashboard"> Cancel</Link>
            </Button>
            <SubmitButton text="Create Event Type" />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default NewEventRoute;
