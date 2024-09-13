"use client";
import * as z from "zod";
import axios from "axios";
import { Code } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import ReactMarkdown from "react-markdown";

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

const CodePage = () => {
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
      const response = await axios.post("/api/code", {
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
        <Heading title="Code Generation" description="Generate code using descriptive text." icon={Code} iconColor="text-green-500" bgColor="bg-green-500/10" />
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
                        placeholder="Simple toogle button using react hooks."
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
              <Empty label="Get help for your coding tasks, start with a descriptive prompt above!" />
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
                <div key={index} className={`p-2 rounded flex items-center gap-2 ${message.role === "user" ? "bg-blue-100" : "bg-gray-100"}`}>
                  {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                  <ReactMarkdown
                    components={{
                      pre: ({ node, ...props }) => (
                        <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                          <pre {...props} />
                        </div>
                      ),
                      code: ({ node, ...props }) => <code className="bg-black/10 rounded-lg p-1" {...props} />,
                    }}
                    className="text-sm overflow-hidden leading-7"
                  >
                    {contentToRender || ""}
                  </ReactMarkdown>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default CodePage;
