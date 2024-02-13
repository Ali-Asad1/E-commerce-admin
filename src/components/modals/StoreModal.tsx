"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";

import { useStoreModal } from "@/hooks/states/useStoreModal";
import { createStore } from "@/services/storeService";
import { setErrorsForInputs } from "@/utils/fromUtils";
import Modal from "@/components/ui/modal";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(1, "Name is required!"),
});

const StoreModal = () => {
  const { isOpen: storeModalIsOpen, onClose: storeModalOnClose } = useStoreModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit = async ({ name }: z.infer<typeof formSchema>) => {
    const storeResponse = await createStore(name);

    if (storeResponse instanceof AxiosError) {
      if (storeResponse.response?.status === 400) {
        setErrorsForInputs(form.setError, storeResponse.response.data);
      }
    }
  };

  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage products and categories"
      isOpen={storeModalIsOpen}
      onClose={storeModalOnClose}
    >
      <div className="space-y-4 py-2 pb-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Shop name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-6 space-x-2 flex items-center justify-end">
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  form.reset();
                  storeModalOnClose();
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
export default StoreModal;
