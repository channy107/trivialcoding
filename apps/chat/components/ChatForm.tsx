"use client";

import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowUp } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@repo/ui/components/ui/form";
import { formSchema } from "@/schemas";
import { Button } from "@repo/ui/components/ui/button";
import AutoResizingTextarea from "@/components/AutoReSizingTextArea";
import {
  ChatCompletionRequestMessage,
  ChatCompletionResponseMessage,
} from "openai";
import { sendMessage } from "@/actions/openAi";
import { addMessage } from "@/actions/message";
import { createConversation } from "@/actions/conversation";

const ChatInput = () => {
  const params = useParams<{ conversationId: string }>();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const { reset } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const messages: ChatCompletionRequestMessage[] = [
      {
        role: "user",
        content: values.prompt,
      },
    ];

    const response = (await sendMessage(
      messages
    )) as ChatCompletionResponseMessage;

    if (params.conversationId) {
      await addMessage(params.conversationId, "user", values.prompt);
      await addMessage(
        params.conversationId,
        "assistant",
        response.content || ""
      );
      reset();
    } else {
      const conversation = await createConversation(values.prompt);
      await addMessage(conversation.id, "user", values.prompt);
      await addMessage(conversation.id, "assistant", response.content || "");

      router.replace(`/conversations/${conversation.id}`);
      reset();
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="fixed bottom-0 z-10 bg-white p-4">
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
    </div>
  );
};

export default ChatInput;
