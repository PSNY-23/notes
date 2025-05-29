"use client";

import { Editor } from "@/components/editor";
import { Toolbar } from "@/components/toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useParams } from "next/navigation";

const DocumentIdPage = () => {
  const params = useParams();
  const { documentId } = params;
  const id = documentId as Id<"documents">;
  const document = useQuery(api.documents.getById, {
    documentId: id,
  });
  const update = useMutation(api.documents.update);

  const onChange = async (content: string) => {
    update({
      id: documentId as Id<"documents">,
      content,
    });
  };

  if (document === undefined) {
    return <div>Loading...</div>;
  }
  if (document === null) {
    return <div>Not found</div>;
  }
  return (
    <div className="pb-40">
      <div className="h-[35vh]" />
      <div className="mx-auto md:max-w-3xl lg:max-w-4xl">
        <Toolbar initialData={document} />
        <Editor onChange={onChange} initialContent={document.content} />
      </div>
    </div>
  );
};

export default DocumentIdPage;
