import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation/navbar";
import Homepage from "./pages/Homepage/homepage";
import BMI from "./pages/Bmi/bmi";
import Calories from "./pages/Calories/calories";
import Task from "./pages/Task/task";
import Recipes from "./pages/recipes";
import Recipe from "./pages/recipes/recipe";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/BMI" element={<BMI />} />
        <Route path="/about" element={<Calories />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/task" element={<Task />} />
        <Route path="/" element={<Homepage />} />
        <Route path="recipes" element={<Recipes />}>
          <Route path=":mealTime" element={<Recipe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
