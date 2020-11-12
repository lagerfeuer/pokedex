import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./components/NavBar";
import CardGrid from "./components/CardGrid";
import Spinner from "./components/Spinner";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

const URL = "https://pokeapi.co/api/v2/pokemon";

function App() {
  const [pokemon, setPokemon] = useState([]);
  // TODO: Berries: const [berries, setBerries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const initial = await axios.get(URL); // first request contains count of all pokemon
      // const _list = await axios.get(URL + `?limit=${initial.data.count}`);
      const _list = await axios.get(URL + `?limit=40`);
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

  return (
    <div className="App">
      <NavBar />
      {loading ? <Spinner /> : <CardGrid items={pokemon} />}
    </div>
  );
}

export default App;
