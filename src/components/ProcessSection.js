import { Component } from "react"
import { Container, Row, Col } from "react-bootstrap"
import MeasureVitals from "../assets/images/measure-vitals.png"
import CalculateRisk from "../assets/images/calculate-risk.png"
import ChooseWorkout from "../assets/images/choose-workout.png"
import "./ProcessSection.css"

class ProcessSection extends Component {
  render() {
    return (
      <Container fluid="true" id="process-section">
        <Row>
          <Col>
            <h1 id="process-title">How It Works?</h1>
          </Col>
        </Row>
        <Row>
          <Col sm={{ span: 4 }}>
            <img alt="" src={MeasureVitals} id="process-section-img" />
          </Col>
          <Col sm={{ span: 4 }}>
            <img alt="" src={CalculateRisk} id="process-section-img" />
          </Col>
          <Col sm={{ span: 4 }}>
            <img alt="" src={ChooseWorkout} id="process-section-img" />
          </Col>
        </Row>
      </Container>
    )
  }
}
export default ProcessSection
