import { useState } from "react";
import RecipeForm from "./components/RecipeForm";
import RecipeCard from "./components/RecipeCard";
import { generateRecipe } from "./api";

export default function App() {
  const [ingredients, setIngredients] = useState("");
  const [diet, setDiet] = useState("None");
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!ingredients.trim()) {
      setError("Enter at least one ingredient!");
      return;
    }

    setError("");
    setRecipe(null);
    setLoading(true);

    try {
      const data = await generateRecipe(ingredients, diet);
      setRecipe(data.recipe);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* ── Header ────────────────────────────── */}
      <header className="pt-10 pb-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          <span className="inline-block mr-2 animate-bounce">🍳</span>
          Smart
          <span className="text-orange-500">Chef</span> AI
        </h1>
        <p className="mt-2 text-gray-500 text-lg">
          Turn your ingredients into a delicious recipe — powered by AI
        </p>
      </header>

      {/* ── Main ──────────────────────────────── */}
      <main className="max-w-2xl mx-auto px-4 pb-20">
        <RecipeForm
          ingredients={ingredients}
          setIngredients={setIngredients}
          diet={diet}
          setDiet={setDiet}
          onGenerate={handleGenerate}
          loading={loading}
        />

        {/* Error */}
        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 text-sm flex items-start gap-2">
            <span className="text-lg leading-none">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Loading spinner */}
        {loading && (
          <div className="mt-12 flex flex-col items-center gap-3 text-orange-500">
            <svg
              className="w-10 h-10 animate-spin-slow"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            <p className="text-gray-500 font-medium">
              Chef AI is cooking up something great…
            </p>
          </div>
        )}

        {/* Recipe output */}
        {recipe && !loading && <RecipeCard recipe={recipe} />}
      </main>

      {/* ── Footer ────────────────────────────── */}
      <footer className="text-center py-6 text-gray-400 text-xs">
        Built with React, Tailwind & OpenRouter&nbsp;·&nbsp;SmartChef AI © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
