"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";

interface AlertModalProps {
  isOpen: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({ isOpen, loading, onClose, onConfirm }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Are you sure?" description="This action cannot be undone.">
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <Button onClick={onClose} variant="outline" disabled={loading}>
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="destructive" disabled={loading}>
          Continue
        </Button>
      </div>
    </Modal>
  );
};
export default AlertModal;
