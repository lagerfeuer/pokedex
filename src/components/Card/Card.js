import React from "react";
import { Card as BCard, Col } from "react-bootstrap";
import "./Card.scss";
import { formatName, gender } from "../../utils";

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
