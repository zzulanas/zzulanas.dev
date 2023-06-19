import { Configuration, OpenAIApi } from "openai";
import { supabaseClient } from "./supabase-client";

async function generateEmbeddings() {
  const configuration = new Configuration({ apiKey: process.env.OPEN_AI_KEY! });
  const openAi = new OpenAIApi(configuration);

  const documents = [
    "I love long walks on the beach",
    "I love ice cream, especially vanilla ice cream",
    "In my free time I like to rock climb, the highest grade I can do is around a V5, I'm still learning!",
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
}
