import React from "react";
import { Container, Row } from "react-bootstrap";
import Card from "../Card";

function CardGrid({ items }) {
  return (
    <Container className="card-grid">
      <Row>
        {items.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </Row>
    </Container>
  );
}

export default CardGrid;
