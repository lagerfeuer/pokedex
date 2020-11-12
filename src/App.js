import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import axios from "axios";
import { PokemonURL } from "./config";
import NavBar from "./components/NavBar";
import CardGrid from "./components/CardGrid";
import Pokemon from "./components/Pokemon";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetch = async () => {
      console.log(PokemonURL);
      const initial = await axios.get(PokemonURL); // first request contains count of all pokemon
      const _list = await axios.get(
        PokemonURL + `?limit=${initial.data.count}`
      );
      // const _list = await axios.get(PokemonURL + `?limit=40`);
      const _pokemon = await Promise.all(
        _list.data.results.map(async (pokemon) => {
          const result = await axios.get(pokemon.url);
          return result.data;
        })
      );
      setPokemon(_pokemon);
      setLoading(false);
    };
    fetch();
  }, []);

  function PokemonWrapper() {
    const { id } = useParams();
    return <Pokemon id={id} />;
  }

  return (
    <Router>
      <div className="App">
        <NavBar onQueryChange={setQuery} />
        <Switch>
          <Route exact path="/">
            <CardGrid isLoading={loading} items={pokemon} query={query} />
          </Route>
          <Route path="/:id">
            <PokemonWrapper/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
