import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

import prisma from "@/app/lib/db";
import { requireUser } from "@/app/lib/hooks";
import { nylas, nylasConfig } from "@/app/lib/nylas";
export async function GET(req: NextRequest) {
  const session = await requireUser();
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  if (!code) {
    return Response.json("Missing code parameter", { status: 400 });
  }
  try {
    const response = await nylas.auth.exchangeCodeForToken({
      clientId: nylasConfig.clientId,
      clientSecret: nylasConfig.apiKey,
      redirectUri: nylasConfig.redirectUri,
      code,
    });
    const { grantId, email } = response;
    await prisma.user.update({
      where: { id: session?.user?.id },
      data: {
        grantId,
        grantEmail: email,
      },
    });
  } catch (error: Error | unknown) {
    console.log("error oauth nylas", error);
    return Response.json("Somthing wen wrong!", { status: 500 });
  }
  redirect("/dashboard");
}
