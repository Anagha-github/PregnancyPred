import { Component } from "react"
import { Col, Container, Row } from "react-bootstrap"
import "./Programs.css"

class Programs extends Component {
  render() {
    return (
      <Container fluid="true" id="programs-section">
        <Row>
          <Col>
            <h1 id="programs-title">Programs</h1>
          </Col>
        </Row>
        <Row>
          <Col sm={{ span: 4 }}>
            <div id="yoga-card" className="programs-card">
              <div id="card-overlay">
                <h1>Yoga</h1>
              </div>
            </div>
          </Col>
          <Col sm={{ span: 4 }}>
            <div id="cardio-card" className="programs-card">
              <div id="card-overlay">
                <h1>Cardio</h1>
              </div>
            </div>
          </Col>
          <Col sm={{ span: 4 }}>
            <div id="meditate-card" className="programs-card">
              <div id="card-overlay">
                <h1>Meditations</h1>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}
export default Programs
