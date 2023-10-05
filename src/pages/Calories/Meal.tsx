import { useState, useEffect } from "react";

export interface IMeal {
  id: number;
  title: string;
  imageType: "jpg" | "png" | string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
}

interface MealProps {
  meal: IMeal;
}

export default function Meal({ meal }: MealProps) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=a06780308db84b47aebc5e4d8cb9abd6&includeNutrition=false`
    )
      .then((response) => response.json())
      .then((data) => {
        setImageUrl(data.image);
      })
      .catch(() => {
        console.log("error");
      });
  }, [meal.id]);

  return (
    <article>
      <h1>{meal.title}</h1>
      <img src={imageUrl} alt="recipe" />
      <ul className="instructions">
        <li>Preparation time: {meal.readyInMinutes} minutes</li>
        <li>Number of servings: {meal.servings}</li>
      </ul>
      <a href={meal.sourceUrl}>Go to Recipe</a>
    </article>
  );
}
