import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { category, count = 5 } = await req.json();

    const categories = category ? [category] : ["books", "news", "articles", "journals", "stories", "celebrities"];

    const allArticles: any[] = [];

    for (const cat of categories) {
      const prompt = getPromptForCategory(cat, count);

      const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: "You are a content generator for a premium reading platform. Generate realistic, high-quality article metadata. Return ONLY valid JSON array, no markdown." },
            { role: "user", content: prompt },
          ],
          tools: [{
            type: "function",
            function: {
              name: "store_articles",
              description: "Store generated articles",
              parameters: {
                type: "object",
                properties: {
                  articles: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        title: { type: "string" },
                        author: { type: "string" },
                        excerpt: { type: "string", description: "2-3 sentence compelling excerpt" },
                        content: { type: "string", description: "Full article content, 3-5 paragraphs" },
                        read_time: { type: "string", description: "e.g. '8 min'" },
                        is_featured: { type: "boolean" },
                      },
                      required: ["title", "author", "excerpt", "content", "read_time", "is_featured"],
                      additionalProperties: false,
                    },
                  },
                },
                required: ["articles"],
                additionalProperties: false,
              },
            },
          }],
          tool_choice: { type: "function", function: { name: "store_articles" } },
        }),
      });

      if (!aiResponse.ok) {
        const errorText = await aiResponse.text();
        console.error(`AI error for ${cat}:`, aiResponse.status, errorText);
        if (aiResponse.status === 429) {
          return new Response(JSON.stringify({ error: "Rate limited, please try again later." }), {
            status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        if (aiResponse.status === 402) {
          return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits." }), {
            status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        continue;
      }

      const aiData = await aiResponse.json();
      const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
      if (!toolCall) {
        console.error(`No tool call for ${cat}`);
        continue;
      }

      const parsed = JSON.parse(toolCall.function.arguments);
      const articles = parsed.articles || [];

      const rows = articles.map((a: any) => ({
        title: a.title,
        author: a.author,
        excerpt: a.excerpt,
        content: a.content,
        category: cat,
        source: "ai",
        read_time: a.read_time,
        is_featured: a.is_featured || false,
        is_published: true,
      }));

      if (rows.length > 0) {
        const { error } = await supabase.from("articles").insert(rows);
        if (error) {
          console.error(`Insert error for ${cat}:`, error);
        } else {
          allArticles.push(...rows);
        }
      }
    }

    return new Response(
      JSON.stringify({ success: true, count: allArticles.length, articles: allArticles }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("generate-content error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function getPromptForCategory(category: string, count: number): string {
  const prompts: Record<string, string> = {
    books: `Generate ${count} realistic book summaries/reviews for a premium literary platform. Include diverse genres: literary fiction, historical fiction, contemporary romance, thriller, memoir. Use real-sounding author names from diverse backgrounds. Make 1 featured.`,
    news: `Generate ${count} realistic current-affairs news articles for March 2026. Cover: entertainment industry, technology, culture, global events. Use journalist-style names. Make 1 featured. Articles should feel timely and relevant.`,
    articles: `Generate ${count} in-depth analytical articles on topics like: psychology of relationships, modern culture, digital age living, wellness, philosophy. Use academic/journalist author names. Make 1 featured.`,
    journals: `Generate ${count} academic journal article summaries. Topics: social psychology, cultural studies, human behavior research, relationship science. Use "Dr." or "Prof." prefixed author names. Make 1 featured.`,
    stories: `Generate ${count} original short story previews. Include diverse settings: Venice, Tokyo, New York, rural France, Mumbai. Rich literary prose. Diverse author names. Make 1 featured.`,
    celebrities: `Generate ${count} celebrity biography excerpts about fictional but realistic actors/actresses. Include career highlights, personal journeys, behind-the-scenes stories. Use entertainment journalist names. Make 1 featured.`,
  };
  return prompts[category] || `Generate ${count} articles for the "${category}" category. Make 1 featured.`;
}
