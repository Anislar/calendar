/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";

import prisma from "@/app/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarX2, Clock, VideoIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import RenderCalendar from "@/app/components/booking-form/render-calendar";

async function getData(eventUrl: string, userName: string) {
  const data = await prisma.eventType.findFirst({
    where: {
      url: eventUrl,
      User: {
        userName: userName,
      },
      active: true,
    },
    select: {
      id: true,
      description: true,
      title: true,
      duration: true,
      videoCallSoftware: true,
      User: {
        select: {
          image: true,
          name: true,
          availability: {
            select: {
              day: true,
              isActive: true,
            },
            orderBy: {
              day: "asc",
            },
          },
        },
      },
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}
export default async function BookingFormRoute({
  params,
}: {
  params: { userName: string; eventUrl: string };
}) {
  const data = await getData(params.eventUrl, params.userName);
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card className="max-w-[1000px] w-full mx-auto">
        <CardContent className="p-5 gap-4 md:grid md:grid-cols-[1fr,auto,1fr,auto,1fr]">
          {/* Booking form */}
          <div className="">
            <img
              src={data.User?.image as string}
              alt="User Image"
              className="size-10 rounded-full"
            />
            <p className="text-sm font-medium text-muted-foreground mt-1">
              {data.User?.name}
            </p>
            <h1 className="text-xl font-semibold mt-2">{data.title}</h1>
            <p className=" text-sm font-medium text-muted-foreground">
              {data.description}
            </p>
            <div className=" mt-4 flex flex-col gap-y-3">
              <p className=" flex items-center">
                <CalendarX2 className="size-4 mr-2 text-primary" />
                <span className="text-sm font-medium  text-muted-foreground">
                  12.sep
                </span>
              </p>
              <p className=" flex items-center">
                <Clock className="size-4 mr-2 text-primary" />
                <span className="text-sm font-medium  text-muted-foreground">
                  {data.duration} Minutes
                </span>
              </p>
              <p className=" flex items-center">
                <VideoIcon className="size-4 mr-2 text-primary" />
                <span className="text-sm font-medium  text-muted-foreground">
                  {data.videoCallSoftware}
                </span>
              </p>
            </div>
          </div>
          <Separator orientation="vertical" className="h-full w-[1px]" />
          <RenderCalendar availibility={data.User?.availability} />
        </CardContent>
      </Card>
    </div>
  );
}
