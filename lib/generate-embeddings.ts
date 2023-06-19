import { Configuration, OpenAIApi } from "openai";
import { supabaseClient } from "./supabase-client";

const configuration = new Configuration({ apiKey: process.env.OPENAI_KEY });
const openAi = new OpenAIApi(configuration);

const documents = [
  "Zach loves long walks on the beach",
  "Zach loves ice cream, especially vanilla ice cream",
  "In Zach's free time he likes to rock climb, the highest grade he can do is around a V5, he's still learning!",
];

// Assuming each document is a string
for (const document of documents) {
  // OpenAI recommends replacing newlines with spaces for best results
  const input = document.replace(/\n/g, " ");

  const embeddingResponse = await openAi.createEmbedding({
    model: "text-embedding-ada-002",
    input,
  });

  const [{ embedding }] = embeddingResponse.data.data;

  // In production we should handle possible errors
  await supabaseClient.from("documents").insert({
    content: document,
    embedding,
  });
}

