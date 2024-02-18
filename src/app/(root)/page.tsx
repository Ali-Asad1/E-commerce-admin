"use client";

import { useEffect } from "react";

import { useStoreModal } from "@/hooks/states/useStoreModal";

const RootPage = () => {
  const { onOpen } = useStoreModal();
  useEffect(() => {
    onOpen();
  }, []);
  return null;
};
export default RootPage;
