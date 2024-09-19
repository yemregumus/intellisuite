import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai"; // Updated import for the new OpenAI client
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const instrucionMessage: ChatCompletionMessageParam = {
  role: "system",
  content: "You are a code generator. You must answer only in markdown code snippets. Explain your code underneath the snippet.",
};

export async function POST(req: Request) {
  try {
    console.log(process.env.OPENAI_API_KEY);
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!messages) {
      return new NextResponse("Bad request", { status: 400 });
    }

    if (!openai.apiKey) {
      return new NextResponse("OpenAI API key not found", { status: 500 });
    }

    // Create a chat completion using the new method
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [instrucionMessage, ...messages],
    });

    // Return the response content using the new response structure
    return NextResponse.json(chatCompletion.choices[0].message.content);
  } catch (error) {
    console.error("[CONVERSATION_ERROR]", error);

    // Updated error handling with the new OpenAI library
    if (error instanceof OpenAI.APIError) {
      console.error(error.status); // e.g., 401
      console.error(error.message); // e.g., The authentication token you passed was invalid...
      console.error(error.code); // e.g., 'invalid_api_key'
      console.error(error.type); // e.g., 'invalid_request_error'
    } else {
      // Non-API error
      console.error(error);
    }

    return new NextResponse("Internal error", { status: 500 });
  }
}
