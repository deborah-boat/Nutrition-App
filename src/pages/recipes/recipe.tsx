import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./recipe.css";
import Loading from "../../components/Loading/loading";

interface Recipe {
  id: number;
  image: string;
  imageType: "jpg";
  title: string;
  sourceUrl: string;

}

const Recipe = () => {
  const { mealTime } = useParams();

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async (): Promise<void> => {
    setLoading(true);

    try {
      const buildResourceURL = (params: object): string => {
        const baseUrl = `https://api.spoonacular.com/recipes/complexSearch`;
        const queryParamStrings = Object.entries(params).map(
          ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        );
        const queryString = queryParamStrings.join("&");
        return `${baseUrl}?${queryString}`;
      };

      const result = await fetch(
        buildResourceURL({
          apiKey: "af2f555e879e4ed782b1541d93662b5b",
          type: mealTime,
        }),
        {
          method: "GET",
        }
      );
      const data = await result.json();
      console.log(data);

      setTimeout(() => {
        setRecipes(data.results);
        setLoading(false);
      }, 50);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRecipes();

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mealTime]);

  console.log(recipes);

  return (
    <div>
      <h1 id="recipes"></h1>
      <div></div>
      {loading && <Loading />}

      <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
        {loading && <h4>Fetching {mealTime} recipes here</h4>}
      </div>
      <div className="recipes">
        {recipes.map((item) => {
          return <RecipeItem key={item.id} item={item} />;
        })}
      </div>

    </div>
  );
};

export default Recipe;

const RecipeItem = ({ item }: { item: Recipe }) => {
  return (
    <div className="recipe-card" style={{ marginTop: "2rem" }}>
      {/* image */}
      <div style={{ width: "100%", height: "40vh" }} className="recipe__img">
       <img src={item.image} style={{ width: "100%", height: "100%", objectPosition: "center",cursor:"pointer" }}  />
      </div>
      <p style={{ fontWeight: "bold" }}>{item.title}</p>
    </div>
  );
};
