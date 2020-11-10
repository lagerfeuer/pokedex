import React from "react";
import { Navbar, Nav, Form, FormControl } from "react-bootstrap";
import logo from "../../img/logo.svg";
// import Button from "react-bootstrap/Button";

import "./NavBar.scss";

function NavBar() {
  return (
    <Navbar expand="lg">
      <Navbar.Brand href="/">
        <img
          alt=""
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{" "}
        Pokédex
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/berries">Berries</Nav.Link>
          <Nav.Link href="/types">Types</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          {/* <Button variant="outline-success">Search</Button> */}
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
