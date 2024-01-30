"use client";

import { useStoreModal } from "@/hooks/states/useStoreModal";
import Modal from "@/components/ui/modal";

const StoreModal = () => {
  const { isOpen, onClose } = useStoreModal();

  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage products and categories"
      isOpen={isOpen}
      onClose={onClose}
    >
      {/* //Todo Add store form for this section */}
    </Modal>
  );
};
export default StoreModal;
