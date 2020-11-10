import React from "react";
import { Card as BCard, Col } from "react-bootstrap";
import "./Card.scss";

function Card({ item }) {
  return (
    <Col>
    <BCard className="card-item">
      <BCard.Img variant="top" src={item.sprites.other["official-artwork"].front_default} />
      <BCard.Body>
        <BCard.Title>{item.name}</BCard.Title>
      </BCard.Body>
    </BCard>
</Col>
  );
}

export default Card;
