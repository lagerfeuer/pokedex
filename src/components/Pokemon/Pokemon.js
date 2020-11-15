import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Image,
  ProgressBar,
  Table,
  OverlayTrigger,
  Tooltip,
  Badge,
} from "react-bootstrap";
import Spinner from "../Spinner";
import { formatName, gender, findLanguage } from "../../utils";
import { fetchPokemon } from "../../utils/fetch";

import "./Pokemon.scss";

// TODO: send requests for stats and abilities, responses include the real display name
function Pokemon({ id }) {
  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unmounted = false;

    const _fetch = async () => {
      const _pokemon = await fetchPokemon(id);
      setPokemon(_pokemon);
      setLoading(false);
    };

    if (!unmounted) _fetch();

    return () => {
      unmounted = true;
    };
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <Container>
      <h1>
        {formatName(pokemon.name)} {gender(pokemon.name)}{" "}
        {pokemon.types.map((t) => {
          return (
            <Badge
              variant="primary"
              style={{ "margin-right": "10px" }}
              className={t.name}
            >
              {findLanguage(t.names).name}
            </Badge>
          );
        })}
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
              <Table hover bordered>
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
                        <td>{findLanguage(stat.names).name}</td>
                        <td>{stat.base_stat}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </Col>
          <Col>
            <Table hover bordered>
              <thead>
                <tr>
                  <th>Ability</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {pokemon.abilities.map((a) => {
                  return (
                    <tr>
                      <td>{findLanguage(a.names).name}</td>
                      <td>{findLanguage(a.effect_entries).short_effect}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Moves</h2>
            {pokemon.moves.map((m) => {
              return (
                <OverlayTrigger
                  key={`move-${m.id}`}
                  placement="top"
                  overlay={
                    <Tooltip id={m.id}>
                      {findLanguage(m.flavor_text_entries).flavor_text}
                    </Tooltip>
                  }
                >
                  <Badge
                    variant="dark"
                    style={{ width: "10%", margin: "0 5px" }}
                  >
                    {findLanguage(m.names).name}
                  </Badge>
                </OverlayTrigger>
              );
            })}
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default Pokemon;
