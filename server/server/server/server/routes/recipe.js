import { Router } from "express";

const router = Router();

router.post("/recipe", async (req, res) => {
  try {
    const { ingredients, diet } = req.body;

    // ── Validation ──────────────────────────────
    if (!ingredients || ingredients.trim() === "") {
      return res.status(400).json({ error: "Please provide at least one ingredient." });
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({ error: "Server missing API key." });
    }

    // ── Build prompt ────────────────────────────
    const dietLine =
      diet && diet !== "None"
        ? `The recipe MUST be ${diet}-friendly.`
        : "";

    const prompt = `You are a professional chef. Create ONE recipe using these ingredients: ${ingredients.trim()}.
${dietLine}

Reply with ONLY valid JSON — no markdown, no code fences, no explanation.
Use this exact shape:
{
  "title": "Recipe Name",
  "cookingTime": "X minutes",
  "servings": "X servings",
  "ingredients": ["qty ingredient", "qty ingredient"],
  "instructions": ["Step 1 text", "Step 2 text"],
  "tips": "One optional chef tip"
}`;

    // ── Call OpenRouter ─────────────────────────
    const aiResponse = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "SmartChef AI",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3.1-8b-instruct:free",
          messages: [
            {
              role: "system",
              content:
                "You are a world-class chef. Always respond with valid JSON only. Never wrap JSON in markdown code fences.",
            },
            { role: "user", content: prompt },
          ],
          temperature: 0.7,
          max_tokens: 1024,
        }),
      }
    );

    if (!aiResponse.ok) {
      const errBody = await aiResponse.text();
      console.error("OpenRouter HTTP error:", aiResponse.status, errBody);
      return res.status(502).json({ error: "AI service returned an error." });
    }

    const data = await aiResponse.json();

    if (data.error) {
      console.error("OpenRouter API error:", data.error);
      return res
        .status(502)
        .json({ error: data.error.message || "AI API error." });
    }

    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return res.status(502).json({ error: "AI returned an empty response." });
    }

    // ── Parse JSON from response ────────────────
    const jsonMatch = content.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      console.error("Could not find JSON in AI response:", content);
      return res.status(502).json({ error: "Could not parse recipe from AI." });
    }

    const recipe = JSON.parse(jsonMatch[0]);
    return res.json({ recipe });
  } catch (err) {
    console.error("Server error:", err);

    if (err instanceof SyntaxError) {
      return res.status(502).json({ error: "AI returned malformed data. Try again." });
    }

    return res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
