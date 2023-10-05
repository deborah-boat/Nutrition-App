import { useMemo } from "react";
import Meal from "./Meal";
import type { IMeal } from "./Meal";

export interface INutrients {
  calories: number;
  carbohydrates: number;
  fat: number;
  protein: number;
}

export interface IMealData {
  meals: IMeal[];
  nutrients: INutrients;
}

interface MealListProps {
  mealData: IMealData;
}

export default function MealList({ mealData }: MealListProps) {
  const nutrients = mealData.nutrients;

  // optimizing re-renders while mapping over an array to render a list of elements
  const renderedMeals = useMemo(() => {
    console.log("Mapping list..."); // This will only log when data changes
    return mealData.meals.map((item) => <Meal key={item.id} meal={item} />);
  }, [mealData.meals]);

  return (
    <main>
      <section className="nutrients">
        <h1>Macros</h1>
        <ul>
          <li>Calories: {nutrients.calories.toFixed(0)}</li>
          <li>Carbohydrates: {nutrients.carbohydrates.toFixed(0)}</li>
          <li>Fat: {nutrients.fat.toFixed(0)}</li>
          <li>Protein: {nutrients.protein.toFixed(0)}</li>
        </ul>
      </section>

      <section className="meals">{renderedMeals}</section>
    </main>
  );
}
