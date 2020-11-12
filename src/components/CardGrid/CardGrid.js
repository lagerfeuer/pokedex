import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import Card from "../Card";
import Spinner from "../Spinner";

function CardGrid({ isLoading, items, query }) {
  return isLoading ? (
    <Spinner />
  ) : (
    <Container className="card-grid">
      <Row>
        {items
          .filter((item) => item.name.startsWith(query))
          .map((item) => (
            <Link to={`/${item.id}`}>
              <Card key={item.id} item={item} style={{ cursor: "pointer" }} />
            </Link>
          ))}
      </Row>
    </Container>
  );
}

export default CardGrid;
