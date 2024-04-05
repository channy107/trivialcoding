"use server";
import { NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const sendMessage = async (messages: ChatCompletionRequestMessage[]) => {
  if (!configuration.apiKey) {
    return new NextResponse("OpenAI API Key not configured.", { status: 500 });
  }

  if (!messages) {
    return new NextResponse("Messages are required", { status: 400 });
  }

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages,
  });

  return response.data.choices[0].message;
};
