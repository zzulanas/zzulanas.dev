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

  // Search query is passed in request payload
  const { query } = await req.json();

  // OpenAI recommends replacing newlines with spaces for best results
  const input = query.replace(/\n/g, " ");

  const configuration = new Configuration({ apiKey: process.env.OPEN_AI_KEY! });
  const openai = new OpenAIApi(configuration);

  // Generate a one-time embedding for the query itself
  const embeddingResponse = await openai.createEmbedding({
    model: "text-embedding-ada-002",
    input,
  });

  const [{ embedding }] = embeddingResponse.data.data;

  // In production we should handle possible errors
  const { data: documents } = await supabaseClient.rpc("match_documents", {
    query_embedding: embedding,
    match_threshold: 0.78, // Choose an appropriate threshold for your data
    match_count: 10, // Choose the number of matches
  });

  return new Response(JSON.stringify(documents), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
