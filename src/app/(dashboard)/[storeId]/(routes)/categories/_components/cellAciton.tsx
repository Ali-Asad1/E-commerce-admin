"use client";

import { AxiosError } from "axios";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import * as React from "react";
import toast from "react-hot-toast";

import { deleteCategory } from "@/services/categoryServices";

import AlertModal from "@/components/modals/alertModal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CategoryColumn } from "./columns";

const CellAction = ({ data }: { data: CategoryColumn }) => {
  const [isClient, setIsClient] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const params = useParams();
  const { push, refresh } = useRouter();

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("ID Copied to clipboard");
  };

  const handleDelete = async () => {
    setIsLoading(true);
    const response = await deleteCategory(params.storeId as string, data.id);
    console.log(response);
    if (!(response instanceof AxiosError)) {
      refresh();
    }
    setIsLoading(false);
    setIsOpen(false);
  };

  return (
    <>
      <AlertModal isOpen={isOpen} loading={isLoading} onClose={() => setIsOpen(false)} onConfirm={handleDelete} />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost" className="s h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => handleCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4" />
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => push(`/${params.storeId}/categories/${data.id}`)}>
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsOpen(true)} className="text-destructive">
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
export default CellAction;
