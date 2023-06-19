import supabaseClient from "./supabase-client.ts";

async function callEdgeFunction() {
  const { data, error } = await supabase.functions.invoke("create-embeddings", {
    body: { name: "Functions" },
  });

  if (error) {
    console.error(error);
  } else {
    console.log(data);
  }
}

callEdgeFunction();
