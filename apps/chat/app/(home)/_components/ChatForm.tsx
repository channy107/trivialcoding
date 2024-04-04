"use client";

import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowUp } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@repo/ui/components/ui/form";
import { formSchema } from "@/schemas";
import { Button } from "@repo/ui/components/ui/button";
import AutoResizingTextarea from "@/components/AutoReSizingTextArea";

const ChatInput = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {};

  return (
    <div className="flex items-center justify-center h-[10%]">
      <Form {...form}>
        <form
          className="flex flex-row items-center gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AutoResizingTextarea
                    disabled={isLoading}
                    placeholder="Message ChatGPT..."
                    className="w-[300px] md:w-[450px] lg:w-[680px]"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} size="icon">
            <ArrowUp />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChatInput;
