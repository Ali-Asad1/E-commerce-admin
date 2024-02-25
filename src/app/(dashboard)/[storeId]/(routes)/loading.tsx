"use client";

import Loader from "@/components/ui/Loader";

export default function Loading() {
  return (
    <div className="w-full h-[calc(100vh-121px)] flex items-center justify-center">
      <Loader />
    </div>
  );
}
