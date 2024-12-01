"use client";
import { useState } from "react";
import { useFormState } from "react-dom";
import { X } from "lucide-react";
import { parseWithZod } from "@conform-to/zod";
import { toast } from "sonner";

import SubmitButton from "@/components/submit-button";
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
import { SettingsActions } from "../action";
import { useForm } from "@conform-to/react";
import { settingsSchema } from "../lib/zod-schemas";
import { Button } from "@/components/ui/button";
import { UploadDropzone } from "../lib/upload-thing";

interface ISettingsProps {
  fullName: string;
  email: string;
  profileImage: string;
}
function SettingsForm({ fullName, email, profileImage }: ISettingsProps) {
  const [data, action] = useFormState(SettingsActions, undefined);
  const [currentProfileImage, setCurrentProfileImage] = useState(profileImage);
  const [form, fields] = useForm({
    lastResult: data,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: settingsSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  const handleDeleteImage = () => {
    setCurrentProfileImage("");
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage Your account settings!</CardDescription>
      </CardHeader>
      <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
        <CardContent className=" grid  gap-y-4">
          <div className="grid gap-y-2">
            <Label htmlFor={fields.fullName.name}>Full Name</Label>
            <Input
              defaultValue={fullName}
              key={fields.fullName.key}
              placeholder="Anis Larguet"
              name={fields.fullName.name}
            />
            {fields.fullName.errors && (
              <ul className="list-disc">
                {fields.fullName.errors.map((e) => (
                  <li key={e}>
                    <p className=" text-destructive text-sm">{e}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="grid gap-y-2">
            <Label>Email</Label>
            <Input disabled defaultValue={email} />
          </div>
          <div className="grid gap-y-5">
            <Label htmlFor="image">Profile Image</Label>
            <input
              type="hidden"
              name={fields.profileImage.name}
              key={fields.profileImage.key}
              value={currentProfileImage}
            />
            {currentProfileImage ? (
              <div className="flex items-center gap-2">
                <img
                  src={currentProfileImage}
                  alt="Profile Image"
                  className="size-28 rounded-lg"
                />
                <Button
                  onClick={handleDeleteImage}
                  variant="destructive"
                  type="button"
                >
                  <X className="size-4 " />
                  Delete Image
                </Button>
              </div>
            ) : (
              <UploadDropzone
                onClientUploadComplete={(res) => {
                  setCurrentProfileImage(res[0].url);
                  toast.success(
                    "Profile image has been uploaded successfully!"
                  );
                }}
                onUploadError={(err) => {
                  toast.success(err.message);
                }}
                endpoint="imageUploader"
              />
            )}
            {fields.profileImage.errors && (
              <ul className="list-disc">
                {fields.profileImage.errors.map((e) => (
                  <li key={e}>
                    <p className=" text-destructive text-sm">{e}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Save changes" />
        </CardFooter>
      </form>
    </Card>
  );
}

export default SettingsForm;
