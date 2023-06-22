import { Configuration, OpenAIApi } from "openai";
import { supabaseClient } from "./supabase-client";

const configuration = new Configuration({ apiKey: process.env.OPENAI_KEY });
const openAi = new OpenAIApi(configuration);

const documents = [
  "zach is a software engineer",
  "zach works at NBCUniversal (aka NBCU) as a software engineer",
  "zach rock climbs in his free time",
  "zach lives in Brooklyn New York",
  "zach went to school at University of California, Santa Cruz and got his Bachelor's degree in Computer Science in 2021",
  "zach is afraid of heights",
  "zach's email is zzulanas@gmail.com",
  "zach is originally from Sacramento, California",
  "zach also enjoys doing photography, specifically film photos",
  "zach loves good coffee, if you have coffee recs he would love to hear them",
  "zach loves nature and hiking, now that he lives in NYC he doesn't do it as much, but he still loves it",
  "zach loves to travel, his favorite place he's been to is Norway",
  "zach once cut Steve Wozniak in line when he was 11",
  "zach was once a child model for the Old Navy website",
  "zach and his friends helped make the first hackathon for their high school",
  "zach was president of a consulting club in college",
  "zach was a wildlife docent in Point Reyes National Seashore",
  "zach is experienced in React, TypeScript, Node.js, Python, AWS, and more",
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
