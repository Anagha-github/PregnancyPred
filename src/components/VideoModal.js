import React, { Component } from "react"
import { Modal, Button, Row, Col } from "react-bootstrap"
import ReactPlayer from "react-player"
import StopWatch from "./StopWatch"
import "./VideoModal.css"

class VideoModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startTimer: false,
      pauseTimer: false,
      resumeTimer: false,
    }
  }
  handleOnVideoStart = () => {
    this.setState({ startTimer: true })
  }
  handleOnVideoPaused = () => {
    this.setState({ startTimer: false })
  }
  handleOnVideoPlay = () => {
    this.setState({ startTimer: true })
  }
  render() {
    return (
      <Modal
        show={this.props.isVisible}
        onHide={this.props.onHide}
        backdrop="static"
        keyboard={false}
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {this.props.video !== null ? this.props.video.title : null}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactPlayer
            url={this.props.video !== null ? this.props.video.url : null}
            height="400px"
            width="initial"
            pip={true}
            volume={1}
            controls={true}
            muted={true}
            onStart={this.handleOnVideoStart}
            onPause={this.handleOnVideoPaused}
            onPlay={this.handleOnVideoPlay}
            config={{
              youtube: { playerVars: { origin: "http://localhost:3000",enablejsapi:1 } },
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Row>
            <Col xs={10}>
              <StopWatch
                startTimer={this.state.startTimer}
                pauseTimer={this.state.pauseTimer}
              />
            </Col>
            <Col xs={2}>
              <Button id="finish-btn" onClick={this.props.onHide}>
                Finish
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    )
  }
}
export default VideoModal
