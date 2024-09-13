"use client";
import * as z from "zod";
import axios from "axios";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/heading";
import { formSchema } from "./constants";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { useState } from "react";

import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";

const ConversationPage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionMessageParam = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];

      // Send request to the API with the updated messages
      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });

      // Ensure that response.data is an object with `role` and `content`
      const assistantMessage: ChatCompletionMessageParam = {
        role: "assistant",
        content: response.data,
      };

      // Update messages state with both user and assistant messages
      setMessages((current) => [...current, userMessage, assistantMessage]);

      form.reset(); // Reset the form after submission
    } catch (error: any) {
      // Handle the error (e.g., show a notification or modal)
      console.error(error);
    } finally {
      router.refresh(); // Refresh the page
    }
  };

  return (
    <>
      <div>
        <Heading title="Conversation" description="Our most advanced conversation model." icon={MessageSquare} iconColor="text-violet-500" bgColor="bg-violet-500/10" />
      </div>
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="
              rounded-lg
              border
              w-full
              p-4
              px-3
              md:px-6
              focus-within:shadow-sm
              grid
              grid-cols-12
              gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none
                        focus-visible:ring-0
                        focus-visible:ring-transparent"
                        placeholder="Type your prompt here..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div
              className="p-8 rounded-lg w-full flex items-center
            justify-center bg-muted"
            >
              <Loader />
            </div>
          )}

          {messages.length === 0 && !isLoading && (
            <div className="p-2 rounded bg-gray-100">
              <Empty label="Start a conversation by typing a prompt in the input field above" />
            </div>
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message, index) => {
              // Determine the content type
              let contentToRender;
              if (typeof message.content === "string") {
                contentToRender = message.content;
              } else if (Array.isArray(message.content)) {
                contentToRender = message.content
                  .map((part) => {
                    if (typeof part === "string") {
                      return part;
                    } else if ("text" in part) {
                      return part.text;
                    }
                    return ""; // Default to an empty string if no valid content
                  })
                  .join(""); // Join array parts into a single string for rendering
              } else {
                contentToRender = ""; // Default to empty string for unexpected cases
              }

              return (
                <div key={index} className={`p-2 rounded flex items-center gap-2 ${message.role === "user" ? "bg-blue-100" : "bg-green-100"}`}>
                  {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                  <p>{contentToRender}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ConversationPage;
