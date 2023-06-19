import "xhr";
import { serve } from "std/http/server.ts";
import { createClient } from "@supabase/supabase-js";
import { codeBlock, oneLine } from "commmon-tags";
import GPT3Tokenizer from "gpt3-tokenizer";
import { Configuration, CreateCompletionRequest, OpenAIApi } from "openai";
import { ensureGetEnv } from "../_utils/env.ts";
import { ApplicationError, UserError } from "../_utils/errors.ts";

const OPENAI_KEY = ensureGetEnv("OPENAI_KEY");
const SUPABASE_URL = ensureGetEnv("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = ensureGetEnv("SUPABASE_SERVICE_ROLE_KEY");

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
const openAiConfiguration = new Configuration({ apiKey: OPENAI_KEY });
const openai = new OpenAIApi(openAiConfiguration);

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  try {
    // Handle CORS
    if (req.method === "OPTIONS") {
      return new Response("ok", { headers: corsHeaders });
    }

    const query = new URL(req.url).searchParams.get("query");

    if (!query) {
      throw new UserError("Missing query in request data");
    }

    const sanitizedQuery = query.trim();

    const embeddingResponse = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: sanitizedQuery.replaceAll("\n", " "),
    });

    if (embeddingResponse.status !== 200) {
      throw new ApplicationError(
        "Failed to create embedding for question",
        embeddingResponse
      );
    }

    // Moderate the content to comply with OpenAI T&C
    const moderationResponse = await openai.createModeration({
      input: sanitizedQuery,
    });

    const [results] = moderationResponse.data.results;

    if (results.flagged) {
      throw new UserError("Flagged content", {
        flagged: true,
        categories: results.categories,
      });
    }

    const [{ embedding }] = embeddingResponse.data.data;

    const { error: matchError, data: documents } = await supabaseClient.rpc(
      "match_documents",
      {
        query_embedding: embedding,
        match_threshold: 0.7,
        match_count: 5,
      }
    );

    if (matchError) {
      throw new ApplicationError("Failed to match documents", matchError);
    }

    const tokenizer = new GPT3Tokenizer({ type: "gpt3" });
    let tokenCount = 0;
    let contextText = "";
    console.log(documents);

    for (const document of documents) {
      const content = document.content;
      const encoded = tokenizer.encode(content);
      tokenCount += encoded.text.length;

      if (tokenCount >= 1500) {
        break;
      }

      contextText += `${content.trim()}\n---\n`;
    }

    const prompt = codeBlock`
      ${oneLine`
        You are a super cool and funny assistant to a developer named Zach Zulanas. You're embedded into his website and the user has just seen the following welcome message:
        "Hi! My name is Chatty, I'm here to help you with any questions you have about Zach and his website. What would you like to know?"

        Given the context below and the question that the user asks, generate a friendly and funny response for Chatty to say back to the user.
      `}

      Context sections:
      ${contextText}

      Question: """
      ${sanitizedQuery}
      """

      Answer as markdown (including related code snippets if available):
    `;

    const completionOptions: CreateCompletionRequest = {
      model: "text-davinci-003",
      prompt,
      max_tokens: 512,
      temperature: 0,
      stream: true,
    };

    // The Fetch API allows for easier response streaming over the OpenAI client.
    const response = await fetch("https://api.openai.com/v1/completions", {
      headers: {
        Authorization: `Bearer ${OPENAI_KEY}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(completionOptions),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new ApplicationError("Failed to generate completion", error);
    }

    // Proxy the streamed SSE response from OpenAI
    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
      },
    });
  } catch (err: unknown) {
    if (err instanceof UserError) {
      return Response.json(
        {
          error: err.message,
          data: err.data,
        },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    } else if (err instanceof ApplicationError) {
      // Print out application errors with their additional data
      console.error(`${err.message}: ${JSON.stringify(err.data)}`);
    } else {
      // Print out unexpected errors as is to help with debugging
      console.error(err);
    }

    // TODO: include more response info in debug environments
    return Response.json(
      {
        error: "There was an error processing your request",
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
});
