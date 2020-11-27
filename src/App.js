import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import CardGrid from "./components/CardGrid";
import Pokemon from "./components/Pokemon";
import { fetchAllPokemon } from "./utils/fetch";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(
    (query) => {
      let unmounted = false;

      const _fetch = async (query) => {
        const _pokemon = await fetchAllPokemon(query);
        setPokemon(_pokemon.filter((e) => e !== null));
        setLoading(false);
      };

      if (!unmounted) _fetch();

      return () => {
        unmounted = true;
      };
    },
    [query]
  );

  function PokemonWrapper() {
    const { id } = useParams();
    return <Pokemon id={id} />;
  }

  return (
    <Router basename='pokedex'>
      <div className="App">
        <NavBar onQueryChange={setQuery} />
        <Switch>
          <Route exact path="/">
            <CardGrid isLoading={loading} items={pokemon} query={query} />
          </Route>
          <Route path="/:id">
            <PokemonWrapper />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
