const DIETS = ["None", "Vegetarian", "Vegan", "Keto", "Gluten-Free"];

export default function RecipeForm({
  ingredients,
  setIngredients,
  diet,
  setDiet,
  onGenerate,
  loading,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) onGenerate();
  };

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-lg shadow-orange-100/60 border border-orange-100 p-6 md:p-8">
      {/* Ingredients */}
      <label className="block mb-2 text-sm font-semibold text-gray-700">
        🥕 Your Ingredients
      </label>
      <textarea
        rows={3}
        placeholder="e.g. chicken, garlic, rice, soy sauce, broccoli"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800
                   placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300
                   focus:border-orange-300 transition resize-none"
      />

      {/* Diet selector */}
      <label className="block mt-5 mb-2 text-sm font-semibold text-gray-700">
        🥗 Dietary Preference <span className="text-gray-400 font-normal">(optional)</span>
      </label>
      <select
        value={diet}
        onChange={(e) => setDiet(e.target.value)}
        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800
                   focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300
                   transition appearance-none cursor-pointer"
      >
        {DIETS.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      {/* Generate button */}
      <button
        onClick={onGenerate}
        disabled={loading}
        className="mt-6 w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600
                   active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-white
                   font-bold py-3.5 rounded-xl shadow-md shadow-orange-200 transition-all duration-150"
      >
        {loading ? (
          <>Generating…</>
        ) : (
          <>
            <span className="text-xl leading-none">✨</span>
            Generate Recipe
          </>
        )}
      </button>
    </div>
  );
}
