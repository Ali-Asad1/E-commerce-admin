"use client";

import Loader from "@/components/ui/Loader";

export default function Loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Loader />
    </div>
  );
}
