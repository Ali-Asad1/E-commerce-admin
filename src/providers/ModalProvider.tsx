"use client";

import dynamic from "next/dynamic";

const StoreModal = dynamic(() => import("@/components/modals/StoreModal"), { ssr: false });

const ModalProvider = () => {
  return (
    <>
      <StoreModal />
    </>
  );
};

export default ModalProvider;
