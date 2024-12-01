import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import VideoGif from "@/public/work-is-almost-over-happy.gif";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CalendarCheck2 } from "lucide-react";

export default function OnBoardingRouteTwo() {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>You are almost done!</CardTitle>
          <CardDescription>
            Now we have to connect your calendar with your account.
          </CardDescription>
          <Image
            src={VideoGif}
            alt="almorst finish gif"
            className="w-full rounded-lg"
          />
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href="/">
              <CalendarCheck2 className="size-4 mr-2" />
              Connect Calendar to Your Account
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
