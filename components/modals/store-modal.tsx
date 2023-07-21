"use client";
import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

import { useStoreModal } from "@/hooks/use-store-modal";
import Modal from "../ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(1),
});

const StoreModal = () => {
  const { isOpen, onClose } = useStoreModal();
  const [isLoading, setIsLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // ✅ This will be type-safe and validated.
    try {
      setIsLoading(true);
      const response = await axios.post("/api/stores", values);

      // usi this methid to be sure that before you will be redirected the store already will be created, this is refreshing all page
      window.location.assign(`/${response.data.id}`)

    } catch (e) {
      toast.error("Something went wrong");
      console.log(e, "err in form submit store");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage products and categories"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Store Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex justify-end items-center w-full">
                <Button
                  disabled={isLoading}
                  variant="destructive"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button disabled={isLoading} type="submit">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default StoreModal;
