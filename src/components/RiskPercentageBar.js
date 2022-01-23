import { Component } from "react"
import "./RiskPercentageBar.css"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { Col } from "react-bootstrap"

class RiskPercentageBar extends Component {
  render() {
    return (
      <>
        {/* <Col sm={{ span: 2, offset: 1}}>
          {this.props.riskPercentageValue < 35 ? (
            <h6 id="riskPercentageText">You are at a good start!</h6>
          ) : this.props.riskPercentageValue > 35 && this.props.riskPercentageValue <= 75 ? (
            <h6 id="riskPercentageText">A workout break is good.</h6>
          ) : (
            <h6 id="riskPercentageText">A workout break is good.</h6>
          )}
        </Col> */}
        <Col sm={{ span: 1 }} style={{textAlign:'-webkit-center'}}>
          <div id="progress-circle">
            <CircularProgressbar
              value={this.props.riskPercentageValue}
              text={`${this.props.riskPercentageValue}%`}
              styles={buildStyles({
                textColor: this.props.riskColor,
                pathColor: this.props.riskColor,
              })}
            />
          </div>
          
          {this.props.riskPercentageValue < 35 ? (
              <h6 id="riskPercentageText">Good start</h6>
            ) : this.props.riskPercentageValue > 35 &&
              this.props.riskPercentageValue <= 75 ? (
              <h6 id="riskPercentageText">Relax and rest</h6>
            ) : (
              <h6 id="riskPercentageText">Doctor consultation</h6>
            )}
        </Col>
      </>
    )
  }
}
export default RiskPercentageBar
