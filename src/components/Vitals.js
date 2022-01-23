import { Component } from "react"
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap"
import { connect } from "react-redux"
import { setRiskPercentage, setPressureRisk,setDiabetesRisk } from "../action/index"
import "./Vitals.css"
const mapStateToProps = (state) => ({
  ...state,
  value: state.reducers.value,
})

const mapDispatchToProps = (dispatch) => ({
  setRiskPercentage: (value) => dispatch(setRiskPercentage(value)),
  setPressureRisk: (value) => dispatch(setPressureRisk(value)),
})
class Vitals extends Component {
  constructor() {
    super()
    this.state = {
      dateOfBirth: null,
      age: null,
      gestationalAge: null,
      height: null,
      weight: null,
      bmi: null,
      systolicBP: null,
      diastolicBP: null,
      heartRate: null,
      respiratoryRate: null,
      parity: null,
      gestationalDiabetes: null,
      healthConditon: "none",
      validateData: null,
    }
  }
  handleOnDateOfBirth = (e) => {
    let userInput = e.target.value
    let birthDate = new Date(userInput)
    let difference = Date.now() - birthDate.getTime()
    let ageDate = new Date(difference)
    let calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970)
    this.setState({ age: calculatedAge })
  }
  handleOnGestationalAge = (e) => {
    this.setState({ gestationalAge: parseInt(e.target.value) })
  }
  handleOnHeight = (e) => {
    let heightValue = this.state.height
    if (e) heightValue = e.target.value
    this.setState({ height: heightValue })
    this.calculateBMI()
  }
  handleOnWeight = (e) => {
    let weightValue = this.state.weight
    if (e) weightValue = e.target.value
    this.setState({ weight: weightValue })
    this.calculateBMI()
  }
  calculateBMI = () => {
    const BMI =
      (this.state.weight * 100 * 100) / (this.state.height * this.state.height)
    this.setState({ bmi: BMI })
  }
  handleOnSystolicBP = (e) => {
    this.setState({ systolicBP: parseFloat(e.target.value) })
    this.predictPressureRisk()
  }
  handleOnDiastolicBP = (e) => {
    this.setState({ diastolicBP: parseFloat(e.target.value) })
    this.predictPressureRisk()
  }
  handleOnHeartRate = (e) => {
    this.setState({ heartRate: parseFloat(e.target.value) })
  }
  handleOnRespiratoryRate = (e) => {
    this.setState({ respiratoryRate: parseFloat(e.target.value) })
  }
  handleOnParity = (e) => {
    this.setState({ parity: parseInt(e.target.value) })
  }
  handleOnGestationalDiabetes = (e) => {
    this.setState({ gestationalDiabetes: parseFloat(e.target.value) })
    this.handleOnDiabetesRisk()
  }
  handleOnDiabetesRisk = () => {
    let diabetesData = {
      Age: this.state.age,
      Gage: this.state.gestationalAge,
      BMI: this.state.bmi,
      Parity: this.state.parity,
      GDMV: this.state.gestationalDiabetes,
    }
    let dataValidated = this.dataValidation(diabetesData)
    if (dataValidated) this.getDiabetesRisk(diabetesData)
  }
  getDiabetesRisk = async (diabetesData) => {
    let result = await fetch("http://127.0.0.1:5000/getDiabetesRisk", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(diabetesData),
    })
    let output = await result.json()
    output = output.diabetes
    this.props.diabetesRisk(output)
    this.props.setDiabetesRisk(output)
  }
  handleOnHealthCondition = (e) => {
    this.setState({ healthConditon: e.target.value })
  }
  dataValidation = (data) => {
    let validationData = []
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "BMI" && value === null) {
        validationData.push(key)
      } else if (key === "BMI") {
        if (this.state.height === 0 || this.state.height === null) {
          validationData.push("height")
        }
        if (this.state.weight === 0 || this.state.weight === null) {
          validationData.push("weight")
        }
      }
    })
    this.setState({ validateData: validationData })
    if (validationData.length > 0) return false
    return true
  }
  handleOnCalculateRisk = () => {
    let riskData = {
      Age: this.state.age,
      Gage: this.state.gestationalAge,
      BMI: this.state.bmi,
      SBP: this.state.systolicBP,
      DBP: this.state.diastolicBP,
      HR: this.state.heartRate,
      RR: this.state.respiratoryRate,
      Parity: this.state.parity,
      GDM: this.state.gestationalDiabetes,
    }
    let dataValidated = this.dataValidation(riskData)
    if (dataValidated) this.getRiskPercentage(riskData)
  }
  getRiskPercentage = async (riskData) => {
    let result = await fetch("http://127.0.0.1:5000/getPrediction", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(riskData),
    })
    let output = await result.json()
    output = output.result
    this.props.riskPercentage(output)
    this.props.setRiskPercentage(output)
  }
  predictPressureRisk = () => {
    let pressureRiskData = {
      AGE: this.state.age,
      PARITY: this.state.parity,
      Gage: this.state.gestationalAge,
      BMI: this.state.bmi,
      SBP: this.state.systolicBP,
      DBP: this.state.diastolicBP,
    }
    let dataValidated = this.dataValidation(pressureRiskData)
    if (dataValidated) this.getPressureRisk(pressureRiskData)
  }
  getPressureRisk = async (pressureRiskData) => {
    let result = await fetch("http://127.0.0.1:5000/getPressureRisk", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pressureRiskData),
    })
    let output = await result.json()
    output = output.pressure
    this.props.pressureRisk(output)
    this.props.setPressureRisk(output)
  }
  render() {
    return (
      <Container fluid="true" id="vitals-section">
        <Card id="vitals-card">
          <Card.Body>
            <Card.Text>
              Your vitals will help us to formulate a custom workout program
              that best suits your health.
            </Card.Text>
            <Form
              style={{
                overflowX: "hidden",
                overflowY: "scroll",
                height: "336px",
                border: "1px solid rgba(0,0,0,0.2",
                padding: "10px 10px",
              }}
            >
              <Row>
                <Col sm={{ span: 6 }}>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Date of birth"
                    className="mb-3"
                  >
                    <Form.Control
                      type="date"
                      placeholder="mm/dd/yyyy"
                      onChange={this.handleOnDateOfBirth}
                    />
                    {this.state.validateData != null ? (
                      this.state.validateData.includes("Age") ||
                      this.state.validateData.includes("AGE") ? (
                        <small className="requiredInput">
                          Please enter a valid data
                        </small>
                      ) : null
                    ) : null}
                  </FloatingLabel>
                </Col>
                <Col sm={{ span: 6 }}>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Gestational Age"
                    className="mb-3"
                  >
                    <Form.Control
                      type="number"
                      step="1"
                      placeholder="Enter number"
                      onChange={this.handleOnGestationalAge}
                    />
                    {this.state.validateData != null ? (
                      this.state.validateData.includes("Gage") ? (
                        <small className="requiredInput">
                          Please enter a valid data
                        </small>
                      ) : null
                    ) : null}
                  </FloatingLabel>
                </Col>
                <Col md={6}>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Height (in cm)"
                    className="mb-3"
                  >
                    <Form.Control
                      type="number"
                      step="0.1"
                      placeholder="Enter height in cm"
                      onChange={this.handleOnHeight}
                    />
                    {this.state.validateData != null ? (
                      this.state.validateData.includes("height") ? (
                        <small className="requiredInput">
                          Please enter a valid data
                        </small>
                      ) : null
                    ) : null}
                  </FloatingLabel>
                </Col>
                <Col md={6}>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Weight (in kg)"
                    className="mb-3"
                  >
                    <Form.Control
                      type="number"
                      step="0.1"
                      placeholder="Weight (in kg)"
                      onChange={this.handleOnWeight}
                    />
                    {this.state.validateData != null ? (
                      this.state.validateData.includes("weight") ? (
                        <small className="requiredInput">
                          Please enter a valid data
                        </small>
                      ) : null
                    ) : null}
                  </FloatingLabel>
                </Col>
                <Col md={6}>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Parity"
                    className="mb-3"
                  >
                    <Form.Control
                      type="number"
                      step="1"
                      placeholder="Parity"
                      onChange={this.handleOnParity}
                    />
                    {this.state.validateData != null ? (
                      this.state.validateData.includes("Parity") ? (
                        <small className="requiredInput">
                          Please enter a valid data
                        </small>
                      ) : null
                    ) : null}
                  </FloatingLabel>
                </Col>
                <Col md={6}>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Body temperature"
                    className="mb-3"
                  >
                    <Form.Control
                      type="number"
                      step="0.1"
                      placeholder="Body temperature"
                    />
                  </FloatingLabel>
                </Col>
                <Col md={6}>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Systolic BP"
                    className="mb-3"
                  >
                    <Form.Control
                      type="number"
                      step="0.1"
                      placeholder="Systolic BP"
                      onChange={this.handleOnSystolicBP}
                    />
                    {this.state.validateData != null ? (
                      this.state.validateData.includes("SBP") ? (
                        <small className="requiredInput">
                          Please enter a valid data
                        </small>
                      ) : null
                    ) : null}
                  </FloatingLabel>
                </Col>
                <Col md={6}>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Diastolic BP"
                    className="mb-3"
                  >
                    <Form.Control
                      type="number"
                      step="0.1"
                      placeholder="Diastolic BP"
                      onChange={this.handleOnDiastolicBP}
                    />
                    {this.state.validateData != null ? (
                      this.state.validateData.includes("DBP") ? (
                        <small className="requiredInput">
                          Please enter a valid data
                        </small>
                      ) : null
                    ) : null}
                  </FloatingLabel>
                </Col>
                <Col md={6}>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Heart rate"
                    className="mb-3"
                  >
                    <Form.Control
                      type="number"
                      step="0.1"
                      placeholder="Heart rate"
                      onChange={this.handleOnHeartRate}
                    />
                    {this.state.validateData != null ? (
                      this.state.validateData.includes("HR") ? (
                        <small className="requiredInput">
                          Please enter a valid data
                        </small>
                      ) : null
                    ) : null}
                  </FloatingLabel>
                </Col>
                <Col md={6}>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Respiratory rate"
                    className="mb-3"
                  >
                    <Form.Control
                      type="number"
                      step="0.1"
                      placeholder="Respiratory rate"
                      onChange={this.handleOnRespiratoryRate}
                    />
                    {this.state.validateData != null ? (
                      this.state.validateData.includes("RR") ? (
                        <small className="requiredInput">
                          Please enter a valid data
                        </small>
                      ) : null
                    ) : null}
                  </FloatingLabel>
                </Col>
                <Col md={6}>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Gestational Diabetes"
                    className="mb-3"
                  >
                    <Form.Control
                      type="number"
                      step="0.1"
                      placeholder="Gestational Diabetes"
                      onChange={this.handleOnGestationalDiabetes}
                    />
                    {this.state.validateData != null ? (
                      this.state.validateData.includes("GDM") ? (
                        <small className="requiredInput">
                          Please enter a valid data
                        </small>
                      ) : null
                    ) : null}
                  </FloatingLabel>
                </Col>

                <Col md={6}>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Health conditions"
                    className="mb-3"
                  >
                    <Form.Select aria-label="Health conditions">
                      <option>None</option>
                      <option value="Diabetic">Diabetic</option>
                      <option value="Blood pressure">Blood pressure</option>
                      <option value="Cancer">Cancer</option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>
              </Row>
            </Form>
            <Row>
              <Col>
                <Button
                  id="calculate-risk-btn"
                  onClick={this.handleOnCalculateRisk}
                >
                  Get Custom Workout
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Vitals)
