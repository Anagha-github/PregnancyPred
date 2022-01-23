import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import "./style.css";
const { Component } = require("react/cjs/react.production.min");

class LandingPage extends Component {
  render() {
    return (
      <Container
        style={{
          height: "inherit",
          padding: "25px 40px",
        }}
      >
        <Row>
          <Col style={{textAlign:'center'}}>
            <h1
              style={{
                color: "#020826",
                fontStyle: "bold",
                fontSize: "36px",
                fontFamily:"Dancing_Script",
                marginLeft:"20px",
                fontWeight:"bold",
                letterSpacing:'3px'
              }}
            >
              mama's &nbsp;fitness
            </h1>
          </Col>
        </Row>
        <br />
        <br />
        <Row>
          <Col md={5} id="landingImg" />
          <Col
            md={{ span: 6, offset: 1 }}
            style={{
              fontSize: "24px",
              textAlign: "justify",
              color: "#020826",
              fontWeight: "500",
            }}
          >
            <br />
            Being pregnant and keeping active is difficult. We strive to make this easier on the mother and encourage her throughout the journey.
            <br />
            <br />
            The platform helps you to keep fit while monitoring important vitals and providing a peace of mind that you are on the right track.
            <br />
            <br />
            So go ahead, explore the features and be a member for this family!!
            <br />
            <br />
            <Row>
              <Col style={{textAlign:'center'}}>
                  <Link to="/dashboard">
                <Button  className="primaryBtn" id="exploreBtn">Explore</Button>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default LandingPage;
