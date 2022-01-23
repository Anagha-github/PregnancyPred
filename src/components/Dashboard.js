import { useState } from "react"
import { Container, Row, Col, Button, Card, Modal, Form } from "react-bootstrap"
import Header from "./Header"
import "./Dashboard.css"
import "./style.css"
import { CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
const { Fragment } = require("react/cjs/react.production.min")

function Dashboard() {
  const [show, setShow] = useState(false)
  const [age, setAge] = useState(26)
  const [parity, setParity] = useState(0)
  const [height, setHeight] = useState(150)
  const [gestationalAge, setGestationalAge] = useState(35.0)
  const [weight, setWeight] = useState(60)
  const [bodyMassIndex, setBodyMassIndex] = useState(60)
  const [systolicBP, setSystolicBP] = useState(120.0)
  const [diastolicBP, setDiastolicBP] = useState(80.0)
  const [heartRate, setHeartRate] = useState(111.0)
  const [respiratoryRate, setRespiratoryRate] = useState(20.0)
  const [gestationalDiabetes, setGestationalDiabetes] = useState(75.0)
  const [setHealthCondition] = useState("none")
  const [riskPrediction, setRiskPrediction] = useState()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const calculateBMI = () => {
    const BMI = (weight * 100 * 100) / (height * height)
    setBodyMassIndex(BMI)
  }
  const handleOnDateOfBirth = (e) => {
    let userInput = e.target.value
    let birthDate = new Date(userInput)
    let difference = Date.now() - birthDate.getTime()
    let ageDate = new Date(difference)
    let calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970)
    setAge(calculatedAge)
  }

  const handleOnHeight = (e) => {
    calculateBMI()
    setHeight(parseFloat(e.target.value))
  }

  const handleOnGestationalAge = (e) => {
    alert(e.target.value)
    setGestationalAge(parseInt(e.target.value))
  }

  const handleOnWeight = (e) => {
    setWeight(parseFloat(e.target.value))
    calculateBMI()
  }

  const handleOnSystolicBP = (e) => {
    setSystolicBP(parseFloat(e.target.value))
  }

  const handleOnDiastolicBP = (e) => {
    setDiastolicBP(parseFloat(e.target.value))
  }

  const handleOnParity = (e) => {
    setParity(parseInt(e.target.value))
  }

  const handleOnHeartRate = (e) => {
    setHeartRate(parseFloat(e.target.value))
  }

  const handleOnRespiratoryRate = (e) => {
    setRespiratoryRate(parseFloat(e.target.value))
  }

  const handleOnGestationalDiabetes = (e) => {
    setGestationalDiabetes(parseFloat(e.target.value))
  }

  const handleOnHealthCondition = (e) => {
    setHealthCondition(e.target.value)
  }
  const data = {
    Age: age,
    Gage: gestationalAge,
    BMI: bodyMassIndex,
    SBP: systolicBP,
    DBP: diastolicBP,
    HR: heartRate,
    RR: respiratoryRate,
    Parity: parity,
    GDM: gestationalDiabetes,
  }
  const handleOnCalculateRisk = async () => {
    let result = await fetch("http://127.0.0.1:5000/result", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    let output = await result.json()
    output = output.result.slice(1, -1)
    setRiskPrediction(output)
  }
  return (
    <Fragment>
      <Header />
      <Container
        style={{
          height: "inherit",
          padding: "25px 40px",
          backgroundColor: "#ffffff",
          margin: "0px",
          minWidth: "1519px",
        }}
      >
        <Row>
          <Col>
            <Button className="primaryBtn" id="analysisBtn">
              Analysis
            </Button>
            <Button className="outlinedBtn" id="exercisesBtn">
              Exercises
            </Button>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Card style={{ padding: "10px" }}>
              <Row>
                <Col md={6} 
                      style={{
                        position: "relative",
                      }}>
                  The platform helps you to keep fit while monitoring important
                  vitals and providing a peace of mind that you are on the right
                  track.
                  <br />
                  The application will recommend the most suitable workout
                  routines based on the risk prediciton.
                  <br />
                  Steps to calculate risk prediction:
                  <br />
                  1. Measure your Vitals
                  <br />
                  2. Enter the vitals{" "}
                  <a href="#" className="linkBtn" onClick={handleShow}>
                    here
                  </a>
                  .
                  {/* <Button className="linkBtn" onClick={handleShow}>
                    here
                  </Button> */}
                  <br />
                  3. Use the button below to get the risk percentage.
                  <br />
                  {riskPrediction !== undefined && (
                    <Row>
                      <Col>
                        <div
                          style={{
                            height: "60px",
                            width: "60px",
                            float: "left",
                          }}
                        >
                          <CircularProgressbar
                            value={riskPrediction}
                            text={`${riskPrediction}%`}
                          />
                        </div>
                      </Col>
                    </Row>
                  )}
                  <br />
                  <Button
                    className="primaryBtn"
                    id="calculateRisk"
                    onClick={handleOnCalculateRisk}
                    style={{
                      position: "absolute",
                      left: "20px",
                      bottom: "0px",
                    }}
                  >
                    Calculate Risk
                  </Button>
                </Col>
                <Col md={{span:5}} style={{marginLeft:'90px'}} id="dashboardImg"></Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        centered
        scrollable
        keyboard
      >
        <Modal.Header closeButton>
          <Modal.Title>Vitals</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Provide the information regarding the health to provide the
          appropriate results
          <br /> <br />
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    onChange={handleOnDateOfBirth}
                    defaultValue={"1995-05-18"}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Height (in cm)</Form.Label>
                  <Form.Control
                    type="number"
                    step=".01"
                    defaultValue={height}
                    onChange={handleOnHeight}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Gestational Age</Form.Label>
                  <Form.Control
                    type="number"
                    defaultValue={gestationalAge}
                    onChange={handleOnGestationalAge}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Parity</Form.Label>
                  <Form.Control
                    type="number"
                    defaultValue={parity}
                    onChange={handleOnParity}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Weight (in kg)</Form.Label>
                  <Form.Control
                    type="number"
                    step=".01"
                    defaultValue={weight}
                    onChange={handleOnWeight}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Health conditions</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={handleOnHealthCondition}
                  >
                    <option>None</option>
                    <option value="Diabetic">Diabetic</option>
                    <option value="Blood pressure">Blood pressure</option>
                    <option value="Cancer">Cancer</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Systolic blood pressure</Form.Label>
                  <Form.Control
                    type="number"
                    step=".01"
                    defaultValue={systolicBP}
                    onChange={handleOnSystolicBP}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Diastolic blood pressure</Form.Label>
                  <Form.Control
                    type="number"
                    step=".01"
                    defaultValue={diastolicBP}
                    onChange={handleOnDiastolicBP}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Heart rate</Form.Label>
                  <Form.Control
                    type="number"
                    step=".01"
                    defaultValue={heartRate}
                    onChange={handleOnHeartRate}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Respiratory rate</Form.Label>
                  <Form.Control
                    type="number"
                    step=".01"
                    defaultValue={respiratoryRate}
                    onChange={handleOnRespiratoryRate}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Gestational Diabetes</Form.Label>
                  <Form.Control
                    type="number"
                    step=".01"
                    defaultValue={gestationalDiabetes}
                    onChange={handleOnGestationalDiabetes}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="outlinedBtn" onClick={handleClose}>
            Close
          </Button>
          <Button className="primaryBtn" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}
export default Dashboard
