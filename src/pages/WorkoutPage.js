import React, { Component } from "react"
import { Container, Row, Col } from "react-bootstrap"
import Header from "../components/Header"
import VideosSection from "../components/VideosSection"
import Vitals from "../components/Vitals"
import "./WorkoutPage.css"
import RiskPercentageBar from "../components/RiskPercentageBar"
import WarningIcon from "../assets/images/Error.png"

class WorkoutPage extends Component {
  constructor() {
    super()
    this.state = {
      riskPercentage: null,
      riskColor: "rgba(57, 194, 237, 1)",
      pressureRisk: null,
      diabetesRisk: null,
    }
  }
  setRiskPercentage = (riskPercentage) => {
    this.setState({ riskPercentage: riskPercentage })
    if (riskPercentage < 35)
      this.setState({ riskColor: "rgba(43, 216, 81, 1)" })
    else if (riskPercentage > 75)
      this.setState({ riskColor: "rgba(228, 36, 36, 1)" })
  }
  setPressureRisk = (pressureRisk) => {
    this.setState({ pressureRisk: pressureRisk })
  }
  setDiabetesRisk = (diabetesRisk) => {
    this.setState({ diabetesRisk: diabetesRisk })
  }
  render() {
    return (
      <>
        <Header />
        <Container fluid="true" id="workout-section">
          <Row style={{ height: "60px" }}>
            <>
              <Col sm={{ span: 8 }}>
                <h5>Workout Programs</h5>
                <h6>
                  This is a great start to being fit and enjoying your pregnancy. The workouts are customised keeping in mind your health and your little one's.
                </h6>
              </Col>
              <Col
                sm={{ span: 3 }}
                style={{ display: "flex", marginTop: "18px" }}
              >
                {this.state.pressureRisk != null &&
                  this.state.pressureRisk === 1 && (
                    <>
                      <img src={WarningIcon} alt="" id="warning-icon" />
                      <small style={{ marginTop: "4px" }}>Hypertension Probability</small>
                    </>
                  )}
                {this.state.diabetesRisk != null &&
                  this.state.diabetesRisk === 1 && (
                    <>
                      <img src={WarningIcon} alt="" id="warning-icon" />
                      <small style={{ marginTop: "4px" }}>Diabetes Probability</small>
                    </>
                  )}
                {this.state.diabetesRisk != null &&
                  this.state.diabetesRisk >= 100 && (
                    <>
                      <img src={WarningIcon} alt="" id="warning-icon" />
                      <small style={{ marginTop: "4px" }}>Diabetes detected</small>
                    </>
                  )}
              </Col>
              {this.state.riskPercentage != null && (
                <RiskPercentageBar
                  riskPercentageValue={this.state.riskPercentage}
                  riskColor={this.state.riskColor}
                />
              )}
            </>
          </Row>
          <br/>
          <hr />
          <Row>
            <Col sm={{ span: 8 }}>
              <VideosSection />
            </Col>
            <Col sm={{ span: 4 }}>
              <Vitals
                riskPercentage={this.setRiskPercentage}
                pressureRisk={this.setPressureRisk}
                diabetesRisk={this.setDiabetesRisk}
              />
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}
export default WorkoutPage
