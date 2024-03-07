"use client";

import { Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

import { useEdgeStore } from "@/lib/edgestore";

import { Button } from "./button";
import { Progress } from "./progress";

interface ImageUploadProps {
  onChange: (value: string) => void;
  onRemove: () => void;
  value: string[];
  disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, onRemove, value, disabled }) => {
  const [progress, setProgress] = useState(0);

  const { edgestore } = useEdgeStore();

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 5; //MB

    const file = event.target.files?.[0];
    if (file) {
      const fileSize = Math.floor(file?.size / 1024 ** 2); //Byte to MB

      if (!allowedTypes.includes(file.type)) {
        toast.error("Uploaded file is not an image type");
        return;
      }

      if (fileSize > maxSize) {
        toast.error("File size exceeds the limit of 10MB. Please select a smaller file");
        return;
      }
      const preview = URL.createObjectURL(file);
      onChange(preview);

      const loadingToastId = toast.loading("Loading...");

      try {
        const response = await edgestore.publicFiles.upload({
          file,
          options: {
            manualFileName: file.name,
          },
          onProgressChange: (progress) => {
            setProgress(progress);
          },
        });
        onChange(response.url);
        toast.success("Image successfully uploaded", {
          id: loadingToastId,
        });
      } catch (err) {
        console.log(err);
        toast.error("Failed to upload image. Please try again", {
          id: loadingToastId,
        });
      }
    }
  };

  return (
    <>
      <div className="mb-4 flex items-center gap-4">
        {value.map((imageUrl) => (
          <div key={imageUrl}>
            <div className="relative h-[200px] w-[200px] overflow-hidden rounded-md bg-slate-300">
              <div className="absolute right-2 top-2 z-10">
                <Button variant="destructive" size="sm" onClick={onRemove}>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              <Image src={imageUrl} fill alt="billboard image" className="object-cover" />
            </div>
            <Progress className="h-2 w-[200px] -translate-y-2 rounded-t-md" value={progress} />
          </div>
        ))}
      </div>
      <div className="">
        <label htmlFor="imageUpload" className="mb-4 block h-fit w-fit cursor-pointer">
          <Button variant="secondary" className="pointer-events-none">
            Upload
          </Button>
        </label>
        <input
          id="imageUpload"
          name="imageUpload"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleUpload}
        />
      </div>
    </>
  );
};
export default ImageUpload;
