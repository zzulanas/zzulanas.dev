import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qitbrnotaffludvzviqv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneHZobmN2eXBlcW93eW9oaHlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODcxODI4NTIsImV4cCI6MjAwMjc1ODg1Mn0.xfcqWlFMDzxLV4NOG_78biWB22PlOTgefbs_SVxZoRo";
export const supabaseClient = createClient(supabaseUrl, supabaseKey!);
console.log("created");
