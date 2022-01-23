import React, { Component } from "react"
import { Container, Row, Col, Nav } from "react-bootstrap"
import "./Header.css"

class Header extends Component {
  render() {
    return (
      <Container fluid="true" id="header-container">
        <Row>
          <Col sm="8">
            <h1 id="header-title">Mama's Fitness</h1>
          </Col>
          <Col sm="4">
            <Nav
              id="header-nav"
              activeKey="/home"
              className="justify-content-end"
            >
              <Nav.Item>
                <Nav.Link>Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-1">Programs</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-2">About</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
      </Container>
    )
  }
}
export default Header
