const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function generateRecipe(ingredients, diet) {
  const res = await fetch(`${BASE}/api/recipe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients, diet }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Something went wrong");
  }

  return data; // { recipe: { title, cookingTime, ... } }
}
