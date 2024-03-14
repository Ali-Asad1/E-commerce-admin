"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard } from "@prisma/client";
import { AxiosError } from "axios";
import { Trash as TrashIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createBillboard, deleteBillboard, editBillboard } from "@/services/billboardServices";

import AlertModal from "@/components/modals/alertModal";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import ImageUpload from "@/components/ui/imageUpload";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface BillboardsFormProps {
  initialData: Billboard | null;
}

const formSchema = z.object({
  label: z.string().min(3),
  imageUrl: z
    .string()
    .min(1)
    .regex(/^https:\/\/files\.edgestore\.dev\//),
});

const BillboardsForm: React.FC<BillboardsFormProps> = ({ initialData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const { push, refresh } = useRouter();

  const title = initialData ? "Edit billboard" : "Create billboard";
  const description = initialData ? "Edit a billboard" : "Add a new billboard";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    let response;
    if (initialData) {
      response = await editBillboard(params.storeId as string, params.billboardId as string, data.label, data.imageUrl);
    } else {
      response = await createBillboard(params.storeId as string, data.label, data.imageUrl);
    }
    if (!(response instanceof AxiosError)) {
      refresh();
      push(`/${params.storeId}/billboards`);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    const response = await deleteBillboard(params.storeId as string, params.billboardId as string);
    if (!(response instanceof AxiosError)) {
      refresh();
      push(`/${params.storeId}/billboards`);
    }
    setIsLoading(false);
    setIsOpen(false);
  };

  return (
    <>
      <AlertModal isOpen={isOpen} onClose={() => setIsOpen(false)} onConfirm={handleDelete} loading={isLoading} />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button onClick={() => setIsOpen(true)} variant="destructive" size="icon">
            <TrashIcon className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full space-y-8">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={(value) => {
                      field.onChange(value);
                    }}
                    onRemove={() => {
                      field.onChange("");
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="gap-8 md:grid md:grid-cols-3">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input placeholder="Billboard label" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="ml-auto" disabled={form.formState.isSubmitting}>
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
export default BillboardsForm;
