import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Container, Row, Col, Button } from "react-bootstrap"
import HomeImage from "../assets/images/HomeImage.png"
import "./HomeSection.css"

class HomeSection extends Component {
  render() {
    return (
      <Container fluid="true" id="home-section">
        <Row>
          <Col sm="5">
            <h1 id="home-title">
              Enjoy your pregnancy being fit with your baby.
            </h1>
            <p id="home-content">
              Being pregnant and keeping fit is difficult. We strive to make
              this easier for the mother and encourage her throughout the
              journey.
            </p>
            <p id="home-content">
              Start today and enjoy this journey of fitness with your baby.
            </p>
            <Link to="/workouts">
              <Button id="home-get-started-btn">Get Started</Button>
            </Link>
          </Col>
          <Col sm="6">
            <img alt="Pregnant_woman" src={HomeImage} id="home-img" />
          </Col>
        </Row>
      </Container>
    )
  }
}
export default HomeSection
