import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import CardGrid from "./components/CardGrid";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/">
            <CardGrid />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
