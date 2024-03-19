"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard, Category } from "@prisma/client";
import { AxiosError } from "axios";
import { Trash as TrashIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createCategory, deleteCategory, editCategory } from "@/services/categoryServices";

import AlertModal from "@/components/modals/alertModal";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface CategoryFormProps {
  initialData: Category | null;
  billboards: Billboard[] | null;
}

const formSchema = z.object({
  name: z.string().min(3),
  billboardId: z.string().min(1),
});

const CategoryForm: React.FC<CategoryFormProps> = ({ initialData, billboards }) => {
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
      name: "",
      billboardId: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    let response;
    if (initialData) {
      response = await editCategory(params.storeId as string, params.categoryId as string, data.name, data.billboardId);
    } else {
      response = await createCategory(params.storeId as string, data.name, data.billboardId);
    }
    if (!(response instanceof AxiosError)) {
      push(`/${params.storeId}/categories`);
      refresh();
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    const response = await deleteCategory(params.storeId as string, params.categoryId as string);

    if (!(response instanceof AxiosError)) {
      push(`/${params.storeId}/categories`);
      refresh();
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
          <div className="gap-8 md:grid md:grid-cols-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} placeholder="Select a billboard" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {billboards?.map((billboard) => (
                        <SelectItem key={billboard.id} value={billboard.id}>
                          {billboard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
export default CategoryForm;
