import { Ban, PlusCircle } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface IEmptyState {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

function EmptyState({ title, description, buttonText, href }: IEmptyState) {
  return (
    <div
      className="flex flex-col flex-1  h-full items-center justify-center rounded-md border border-dashed
     text-center p-8  animate-in fade-in-50 "
    >
      <div className="flex items-center justify-center size-20 rounded-full bg-primary/10">
        <Ban className="size-10 text-primary " />
      </div>
      <h2 className=" mt-6 text-xl font-semibold">{title} </h2>
      <p className="my-4 text-sm text-muted-foreground max-w-xs mx-auto">
        {description}
      </p>
      <Button asChild>
        <Link href={href}>
          <PlusCircle className="mr-2 size-4" />
          {buttonText}
        </Link>
      </Button>
    </div>
  );
}

export default EmptyState;
