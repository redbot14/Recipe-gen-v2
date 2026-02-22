export default function RecipeCard({ recipe }) {
  const { title, cookingTime, servings, ingredients, instructions, tips } =
    recipe;

  return (
    <div className="mt-8 animate-fade-up bg-white rounded-2xl shadow-lg shadow-orange-100/60 border border-orange-100 overflow-hidden">
      {/* Header band */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-5">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="mt-1 flex flex-wrap gap-4 text-orange-100 text-sm">
          {cookingTime && (
            <span className="flex items-center gap-1">
              ⏱️ {cookingTime}
            </span>
          )}
          {servings && (
            <span className="flex items-center gap-1">
              🍽️ {servings}
            </span>
          )}
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-6">
        {/* Ingredients */}
        <section>
          <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span>📝</span> Ingredients
          </h3>
          <ul className="grid sm:grid-cols-2 gap-2">
            {ingredients?.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-gray-700 text-sm"
              >
                <span className="mt-1 h-2 w-2 rounded-full bg-orange-400 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Divider */}
        <hr className="border-gray-100" />

        {/* Instructions */}
        <section>
          <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span>👨‍🍳</span> Instructions
          </h3>
          <ol className="space-y-3">
            {instructions?.map((step, i) => (
              <li key={i} className="flex gap-3 text-gray-700 text-sm">
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-orange-100 text-orange-600 text-xs font-bold shrink-0">
                  {i + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Tips */}
        {tips && (
          <>
            <hr className="border-gray-100" />
            <section className="bg-amber-50 rounded-xl px-5 py-4 text-sm text-amber-800 flex gap-2">
              <span className="text-lg leading-none">💡</span>
              <span>
                <strong>Chef&apos;s Tip:</strong> {tips}
              </span>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
