import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row } from "react-bootstrap";
import Card from "../Card";
import Spinner from "../Spinner";
import { PokemonURL } from "../../config";

function CardGrid() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      console.log(PokemonURL);
      const initial = await axios.get(PokemonURL); // first request contains count of all pokemon
      const _list = await axios.get(PokemonURL + `?limit=${initial.data.count}`);
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

  return loading ? (
    <Spinner />
  ) : (
    <Container className="card-grid">
      <Row>
        {pokemon.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </Row>
    </Container>
  );
}

export default CardGrid;
