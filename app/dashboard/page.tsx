import { notFound } from "next/navigation";

import prisma from "../lib/db";
import { requireUser } from "../lib/hooks";
import EmptyState from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ExternalLink,
  Link2,
  Pen,
  Settings,
  Trash,
  Users2,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      userName: true,
      eventType: {
        select: {
          id: true,
          active: true,
          title: true,
          url: true,
          duration: true,
        },
      },
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}
async function DashboardPage() {
  const session = await requireUser();
  const data = await getData(session?.user?.id as string);

  return (
    <>
      {data.eventType.length === 0 ? (
        <EmptyState
          title="You have no Events Types"
          description="You can create event Your first type by clicking the button below."
          buttonText="Add Event Type"
          href="/dashboard/new"
        />
      ) : (
        <>
          <div className="flex items-start justify-between px-2">
            <div className="hidden sm:grid gap-y-1 ">
              <h1 className="text-3xl  md:text-4xl font-semibold">
                Events Type
              </h1>
              <p className="text-muted-foreground">
                Create and manage your events types right here.
              </p>
            </div>
            <Button asChild>
              <Link href="/dashboard/new">Create new Event</Link>
            </Button>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.eventType.map((item) => (
              <div
                className=" overflow-hidden  shadow rouned-lg border relative"
                key={item.id}
              >
                <div className=" absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Settings className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Event</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                          <Link href={`/${data.userName}/${item.url}`}>
                            <ExternalLink className="mr-2 size-4" />
                            Preview
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link2 className="mr-2 size-4" />
                          Copy
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pen className="mr-2 size-4" />
                          Edit
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className=" bg-destructive text-white hover:!bg-destructive/80 hover:!text-white">
                        <Trash className="size-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Link href="/" className="flex  items-center p-5">
                  <div className="flex-shrink-0">
                    <Users2 className="size-5" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-muted-foreground">
                        {item.duration} Minutes Meeting
                      </dt>
                      <dd className="text-base font-medium">{item.title}</dd>
                    </dl>
                  </div>
                </Link>
                <div className="bg-muted px-5 py-2   flex  items-center justify-between">
                  <Switch />
                  <Button>Edit Event</Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default DashboardPage;
