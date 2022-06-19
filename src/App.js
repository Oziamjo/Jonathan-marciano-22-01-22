import React, { useState, createContext } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Homepage from "./components/Homepage/Homepage";
import Favorites from "./components/Favorites/Favorites";

export const ThemeContext = createContext();

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleMode }}>
      <Router>
        <div className={isDarkMode ? "darkApp" : "app"}>
          <Nav />
          <Switch>
            <Route
              exact
              path="/jonathan-marciano-21-03-22"
              component={() => {
                return <Homepage />;
              }}
            />
            <Route
              exact
              path="/favorites/"
              component={() => {
                return <Favorites />;
              }}
            />
            <Redirect to="/jonathan-marciano-21-03-22" />
          </Switch>
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;
