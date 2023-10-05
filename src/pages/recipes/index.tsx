import { useEffect, useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";

import "./recipe.css";

interface Recipe {
  id: number;
  image: string;
  imageType: "jpg";
  title: string;
}

const User = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async () => {
    console.log("searching ....");

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
        apiKey: "a06780308db84b47aebc5e4d8cb9abd6",
        query: searchQuery,
      }),
      {
        method: "GET",
      }
    );
    const data = await result.json();
    console.log(data);
    setSearchResults(data.results);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const focusSearchInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    focusSearchInput();
  }, []);

  return (
    <>
      <h1>Find your Recipes</h1>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "80%" }}>
          <input
            onKeyPress={handleKeyPress}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search recipes"
            style={{ outline: "none" }}
            ref={inputRef}
          />
        </div>
      </div>

      {!searchQuery && searchResults.length < 1 && (
        <>
          <nav style={{ display: "flex", justifyContent: "center", columnGap: "2rem" }}>
            {[
              { to: "breakfast", label: "Breakfast" },
              { to: "salad", label: "Salads" },
              { to: "fruits", label: "Fruits" },
            ].map((item) => (
              <Link key={item.to} to={item.to}>
                <div>{item.label}</div>
              </Link>
            ))}
          </nav>
          <Outlet />

        </>
      )}

      {searchResults.length ? (
        <div className="recipes">
          {searchResults.map((item) => {
            return <SearchRecipeItem key={item.id} item={item} />;
          })}
        </div>
      ) : null}
    </>
  );
};
export default User;

const SearchRecipeItem = ({ item }: { item: Recipe }) => {
  return (
    <div className="recipe-card" style={{ marginTop: "2rem" }}>
      {/* image */}
      <div style={{ width: "100%", height: "40vh" }} className="recipe__img">
        <img src={item.image} style={{ width: "100%", height: "100%", objectPosition: "center" }} />
      </div>
      <p style={{ fontWeight: "bold" }}>{item.title}</p>
    </div>
  );
};
