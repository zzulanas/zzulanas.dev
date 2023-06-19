import { serve } from "https://deno.land/std@0.170.0/http/server.ts";
import "https://deno.land/x/xhr@0.2.1/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.5.0";
import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.1.0";
import { supabaseClient } from "https://esm.sh/@supabase/supabase-js@2";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const configuration = new Configuration({ apiKey: process.env.OPEN_AI_KEY! });
  const openAi = new OpenAIApi(configuration);

  const documents = [
    "I love long walks on the beach",
    "I love ice cream, especially vanilla ice cream",
    "In my free time I like to rock climb, the highest grade I can do is around a V5, I'm still learning!",
    "I'm currently lost in the Arctic Circle, send help!",
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
});
