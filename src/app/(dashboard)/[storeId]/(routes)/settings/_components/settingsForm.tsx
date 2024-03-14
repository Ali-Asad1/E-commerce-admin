"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Trash as TrashIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { deleteStore, editStore } from "@/services/storeService";

import { StoreType } from "@/types/Store.type";

import { setErrorsForInputs } from "@/utils/formUtils";

import AlertModal from "@/components/modals/alertModal";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface SettingsFormProps {
  initialData: Omit<StoreType, "createdAt" | "updatedAt" | "userId">;
}

const formSchema = z.object({
  name: z.string().min(3),
});

const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const { refresh } = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const editStoreResponse = await editStore(params.storeId as string, data.name);

    if (editStoreResponse instanceof AxiosError) {
      if (editStoreResponse.response?.status === 400) {
        setErrorsForInputs(form.setError, editStoreResponse.response.data);
      }
    } else {
      refresh();
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    const deleteResponse = await deleteStore(params.storeId as string);
    if (!(deleteResponse instanceof AxiosError)) {
      window.location.assign("/");
    }
    setIsLoading(false);
    setIsOpen(false);
  };

  return (
    <>
      <AlertModal isOpen={isOpen} onClose={() => setIsOpen(false)} onConfirm={handleDelete} loading={isLoading} />
      <div className="flex items-center justify-between">
        <Heading title="Setting" description="test description" />
        <Button onClick={() => setIsOpen(true)} variant="destructive" size="icon">
          <TrashIcon className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex w-full flex-col space-y-8">
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Store name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="ml-auto" disabled={form.formState.isSubmitting}>
            Save changes
          </Button>
        </form>
      </Form>
    </>
  );
};
export default SettingsForm;
