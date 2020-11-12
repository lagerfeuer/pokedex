import React, { useState, useEffect } from "react";
import axios from "axios";
import { PokemonURL } from "../../config";
import Spinner from "../Spinner";

function Pokemon({ id }) {
  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const _pokemon = await axios.get(PokemonURL + `/${id}`);
      setPokemon(_pokemon.data);
      setLoading(false);
    };
    fetch();
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <div className="container">
      <h1>{pokemon.name}</h1>
    </div>
  );
}

export default Pokemon;
