
'use client'
import { Spinner } from "@/components/Spinner";
import dynamic from "next/dynamic";

// Since client components get prerenderd on server as well hence importing
// the excalidraw stuff dynamically with ssr false

const ExcalidrawWrapper = dynamic(
   async() => (await import("./_components/excalidraw-wrapper")),
  {
    loading: () => (
      <div className="h-full w-full">
        <Spinner />
      </div>
    ),
    ssr: false,
  },
);

export default function Page() {
  
  return <ExcalidrawWrapper />;
}
