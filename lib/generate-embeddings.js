const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({ apiKey: process.env.OPENAI_KEY });
const openAi = new OpenAIApi(configuration);

const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabaseClient = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
  },
});


const documents = [
  "zach has gotten AWS Solutions Architect Associate certified",
  "zach's a big fan of omakase and sushi",
  "zach likes a bunch of different types of music, if you have suggestions, he would love to hear!",
  "zach grew up in Colorado",
  "zach is a big fan of hiking, especially in Yosemite national park",
];

async function generateEmbeddings(documents) {
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
