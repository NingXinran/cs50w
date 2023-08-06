import React, { useState } from "react";
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Acknowledgements from "./Acknowledgements";

function Header() {
  const [showAck, setShowAck] = useState(false);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
        <Container>
          <Navbar.Brand>
            <img
              src="iced-coffee.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="iced-coffee-icon"
            />
            ilovetehping
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Map</Nav.Link>
              <Nav.Link href="/translator">Translator</Nav.Link>
              <Nav.Link onClick={() => setShowAck(!showAck)}>Acknowledgements</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Acknowledgements setShowAck={setShowAck} showAck={showAck}/>
    </>

  );
}

export default Header;