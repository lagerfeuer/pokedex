import React from "react";
import { Card as BCard, Col } from "react-bootstrap";
import "./Card.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVenus, faMars } from "@fortawesome/free-solid-svg-icons";

function formatName(name) {
  return name
    .replace(/^\w/, (letter) => letter.toUpperCase())
    .replace(/-[mf]$/, "");
}

function gender(name) {
  if (name.endsWith("-m")) return <FontAwesomeIcon icon={faMars} />;
  if (name.endsWith("-f")) return <FontAwesomeIcon icon={faVenus} />;
  return null;
}

function Card({ item }) {
  const name = formatName(item.name);
  return (
    <Col className="card-container">
      <div className="card-item">
        <BCard>
          <BCard.Img
            variant="top"
            src={item.sprites.other["official-artwork"].front_default}
          />
          <BCard.Body>
            <BCard.Title>
              {name} {gender(item.name)}
            </BCard.Title>
            <BCard.Subtitle>#{item.id}</BCard.Subtitle>
          </BCard.Body>
        </BCard>
      </div>
    </Col>
  );
}

export default Card;
