import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { remove } from "../../redux/favoritesSlice";
import { setCity } from "../../redux/citySlice";
import Fade from "react-reveal/Fade";
import { ThemeContext } from "../../App";

function Favorites() {
  const { isDarkMode } = useContext(ThemeContext);

  const favoriteCities = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const favoriteClicked = (e) => {
    dispatch(
      setCity({
        cityName: e.cityName,
        country: e.country,
        id: e.id,
      })
    );
  };

  return (
    <Fade top cascade>
      <div>
        <h1 className={isDarkMode ? "darkTitle" : "lightTitle"}>
          Favorite cities
        </h1>
        {favoriteCities.length > 0 ? (
          favoriteCities.map((e, i) => {
            return (
              <div className="favorite-container" key={i}>
                <button
                  className="removeBtn"
                  onClick={() => dispatch(remove(e))}
                >
                  Remove
                </button>
                <Link
                  to="/"
                  className="favorite-div"
                  onClick={() => favoriteClicked(e)}
                >
                  <div>
                    {e.cityName}, {e.country}
                  </div>
                  <div style={{ color: "white" }}>
                    {e.celsius} °C | {e.fahrenheit} °F
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <>
            <p style={{ color: isDarkMode ? "white" : "black" }}>
              <span style={{ fontWeight: "bold" }}>No favorites yet.</span>
              <br />
              Keep track of the cities you're interested in by clicking 'Add to
              favorites'
            </p>
          </>
        )}
      </div>
    </Fade>
  );
}

export default Favorites;
