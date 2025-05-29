"use client";

import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

const DocumentPage = () => {
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = async () => {
    const promise = create({ title: "Untitled" });
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create new Note"
    })
  }
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <Image
        src="/empty.png"
        alt="Empty"
        width={300}
        height={300}
        className="dark:hidden"
      />
      <Image
        src="/empty-dark.png"
        alt="Empty"
        width={300}
        height={300}
        className="hidden dark:block"
      />
      <h2 className="text-lg font-medium">

        Welcome to {user?.firstName}&apos;s Jotion
      </h2>
      <Button onClick={onCreate}>
        Create Note
        <PlusCircle className="h-4 w-4 mr-2"/>
      </Button>
    </div>
  );
};

export default DocumentPage;
