import React, { Component } from "react"
import { Card, Col } from "react-bootstrap"
import ReactPlayer from "react-player"
import VideoModal from "./VideoModal"
import "./VideoSection.css"
import "./VideosSection"

class VideoList extends Component {
  constructor(props) {
    super()
    this.state = {
      modalIsVisible: false,
      selectedVideo: null,
    }
  }
  handleOnClickVideo = (video) => {
    console.log("HELLO",(video[0]))
    this.setState({ modalIsVisible: true, selectedVideo: video[0] })
  }
  handleOnHide = () => {
    this.setState({ modalIsVisible: false })
  }
  render() {
    return (
      <>
        <VideoModal
          isVisible={this.state.modalIsVisible}
          video={this.state.selectedVideo}
          onHide={this.handleOnHide}
        />
        {this.props.videoData.map((videos, index) => {
          return this.props.riskPercentage < 35 && videos.category === "low" ? (
            <Col sm={{ span: 4 }} key={index}>
              <Card id="video-card">
                <ReactPlayer
                  key={index}
                  url={videos.url}
                  width="inherit"
                  height="136px"
                  pip={true}
                  config={{
                    youtube: { playerVars: { origin: "http://localhost:3000",enablejsapi:1 } },
                  }}
                />
                <Card.Body>
                  <Card.Title onClick={this.handleOnClickVideo.bind(this,[videos])}>
                    {videos.title}
                  </Card.Title>
                  <Card.Text
                    className="video-decription"
                    title={videos.description}
                  >
                    {videos.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ) : this.props.riskPercentage >= 35 &&
            this.props.riskPercentage <= 65 &&
            videos.category === "medium" ? (
            <Col sm={{ span: 4 }} key={index}>
              <Card id="video-card">
                <ReactPlayer
                  key={index}
                  url={videos.url}
                  width="inherit"
                  height="136px"
                  pip={true}
                  config={{
                    youtube: { playerVars: { origin: "http://localhost:3000",enablejsapi:1 } },
                  }}
                />
                <Card.Body>
                  <Card.Title onClick={this.handleOnClickVideo.bind(this,[videos])}>
                    {videos.title}
                  </Card.Title>
                  <Card.Text
                    className="video-decription"
                    title={videos.description}
                  >
                    {videos.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ) : this.props.riskPercentage > 65 && videos.category === "high" ? (
            <Col sm={{ span: 4 }} key={index}>
              <Card id="video-card">
                <ReactPlayer
                  key={index}
                  url={videos.url}
                  width="inherit"
                  height="136px"
                  pip={true}
                  config={{
                    youtube: { playerVars: { origin: "http://localhost:3000",enablejsapi:1 } },
                  }}
                />
                <Card.Body>
                  <Card.Title onClick={this.handleOnClickVideo.bind(this,[videos])}>
                    {videos.title}
                  </Card.Title>
                  <Card.Text
                    className="video-decription"
                    title={videos.description}
                  >
                    {videos.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ) : videos.type === this.props.videoType ? (
            <Col sm={{ span: 4 }} key={index}>
              <Card id="video-card">
                <ReactPlayer
                  key={index}
                  url={videos.url}
                  width="inherit"
                  height="136px"
                  pip={true}
                  config={{
                    youtube: { playerVars: { origin: "http://localhost:3000",enablejsapi:1 } },
                  }}
                />
                <Card.Body>
                  <Card.Title onClick={this.handleOnClickVideo.bind(this,[videos])}>
                    {videos.title}
                  </Card.Title>
                  <Card.Text
                    className="video-decription"
                    title={videos.description}
                  >
                    {videos.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ) : null
        })}
      </>
    )
  }
}
export default VideoList
