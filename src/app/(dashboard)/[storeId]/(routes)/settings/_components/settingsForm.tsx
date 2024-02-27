"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Trash as TrashIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { editStore } from "@/services/storeService";

import { StoreType } from "@/types/Store.type";

import { setErrorsForInputs } from "@/utils/fromUtils";

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
  const params = useParams();
  const { push, refresh } = useRouter();

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

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Setting" description="test description" />
        <Button variant="destructive" size="icon">
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
