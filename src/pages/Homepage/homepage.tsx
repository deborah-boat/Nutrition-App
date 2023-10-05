import { Link } from "react-router-dom";
import "./homepage.css";

function Homepage() {
  return (
    <section>
      <div className="container__image">
        <img src="../image/img.png" alt="img" className="bg-image"></img>
        <div className="labor"></div>
        <div className="container__information">
          <h1>AJs Nutrition</h1>
          <p>You are what you eat</p>
                    <Link to="/Task">
          <button>Nutritional Tasks</button>
                    </Link>
        </div>
      </div>
    </section>
  );
}

export default Homepage;
