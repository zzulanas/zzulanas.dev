import { Configuration, OpenAIApi } from "openai";
import { supabaseClient } from "./supabase-client";

const configuration = new Configuration({ apiKey: process.env.OPENAI_KEY });
const openAi = new OpenAIApi(configuration);

const documents = [
  "zach is a software engineer",
  "zach works at NBCUniversal",
  "zach rock climbs in his free time",
  "zach lives in Brooklyn New York",
  "zach went to school at University of Santa Cruz California",
  "zach is afraid of heights",
];

async function generateEmbeddings(documents: string[]) {
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

generateEmbeddings(documents);
