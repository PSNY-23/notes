"use client";

import { useCoverImage } from "@/hooks/use-cover-image";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { SingleImageDropzoneUsage } from "@/components/single-image-dropzone";

export const CoverImageModal = () => {
  const coverImage = useCoverImage();
  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>
        <div>TODO: upload iamge</div>
        <div>
          <SingleImageDropzoneUsage />
        </div>
      </DialogContent>
    </Dialog>
  );
};
