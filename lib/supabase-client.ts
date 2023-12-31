const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
export const supabaseClient = createClient(supabaseUrl!, supabaseKey!, {
  auth: {
    persistSession: false,
  },
});
