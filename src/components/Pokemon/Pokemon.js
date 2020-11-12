import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Image,
  ProgressBar,
  Table,
} from "react-bootstrap";
import { PokemonURL } from "../../config";
import Spinner from "../Spinner";
import { formatName, gender } from "../../utils";

// TODO: send requests for stats and abilities, responses include the real display name
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
    <Container>
      <h1>
        {formatName(pokemon.name)} {gender(pokemon.name)}
      </h1>
      <div className="details">
        <Row>
          <Col>
            <Image
              src={pokemon.sprites.other["official-artwork"].front_default}
              thumbnail
            />
          </Col>
          <Col>
            <div className="stats">
              <Table hover>
                <thead>
                  <tr>
                    <th>Stat</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {pokemon.stats.map((stat) => {
                    return (
                      <tr>
                        <td>{stat.stat.name}</td>
                        <td>{stat.base_stat}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </Col>
          <Col>
            <Table hover>
              <thead>
                <tr>
                  <th>Ability</th>
                </tr>
              </thead>
              <tbody>
                {pokemon.abilities.map((a) => {
                  return (
                    <tr>
                      <td>{a.ability.name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default Pokemon;
