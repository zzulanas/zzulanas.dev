import { Configuration, OpenAIApi } from "openai";
import { supabaseClient } from "./supabase-client";

const configuration = new Configuration({ apiKey: process.env.OPENAI_KEY });
const openAi = new OpenAIApi(configuration);

const documents = [
  // "zach is a software engineer",
  // "zach works at NBCUniversal (aka NBCU) as a software engineer",
  // "zach rock climbs in his free time",
  // "zach lives in Brooklyn New York",
  // "zach went to school at University of California, Santa Cruz and got his Bachelor's degree in Computer Science in 2021",
  // "zach is afraid of heights",
  // "zach's email is zzulanas@gmail.com",
  // "zach is originally from Sacramento, California",
  // "zach also enjoys doing photography, specifically film photos",
  // "zach loves good coffee, if you have coffee recs he would love to hear them",
  // "zach loves nature and hiking, now that he lives in NYC he doesn't do it as much, but he still loves it",
  // "zach loves to travel, his favorite place he's been to is Norway",
  // "zach once cut Steve Wozniak in line when he was 11",
  // "zach was once a child model for the Old Navy website",
  // "zach and his friends helped make the first hackathon for their high school",
  // "zach was president of a consulting club in college",
  // "zach was a wildlife docent in Point Reyes National Seashore",
  // "zach is experienced in React, TypeScript, Node.js, Python, AWS, and more",
  // "zach's favorite color is a nice blue green tealish color",
  // "zach's favorite food is Japanese Curry",
  // "zach's top music artist is probably Steve Lacy",
  // "zach's favorite movie is Spiderman Across the Spiderverse",
  // "zach's favorite TV show is Avatar the Last Airbender",
  // "zach built this website using Next.js and Tailwind CSS",
  // "zach used Supabase and Vector Embeddings with OpenAI to build this website",
  // "zach's favorite video game bounces between Civ 6 and Rocket League",
  // "zach is a big fan of the NBA, his favorite team is the Sacramento Kings",
  // "zach's favorite animal is the capybara",
  // "at NBCUniversal Zach works on a team that is building a digital rights distribution platform",
  "the website is built using Next.js and Tailwind CSS",
  "you are built using vector embeddings and the OpenAI API",
  "zach's projects can be found at `zzulanas.dev/projects`",
  "zach's blog can be found at `zzulanas.dev/blog`",
  "zach's about section can be found at `zzulanas.dev/about`",
  "zach's linkedin is `linkedin.com/in/zzulanas`",
  "zach's github is `github.com/zzulanas`",
  "zach's twitter is `twitter.com/zzulanas`",
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
