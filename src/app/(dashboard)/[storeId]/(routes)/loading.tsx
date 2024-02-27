"use client";

import Loader from "@/components/ui/Loader";

export default function Loading() {
  return (
    <div className="flex h-[calc(100vh-121px)] w-full items-center justify-center">
      <Loader />
    </div>
  );
}
