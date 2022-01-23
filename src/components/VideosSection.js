import { Component } from "react"
import { Container, Row } from "react-bootstrap"
import VideoList from "./VideoList"
import videoData from "../resources/data"
import "./VideoSection.css"
import { connect } from "react-redux"

const mapStateToProps = (state) => ({
  ...state,
  value: state.reducers.riskPercentage,
})

class VideosSection extends Component {
  render() {
    console.log(this.props.value)
    return (
      <Container fluid="true" id="video-section">
        <Row>
          {this.props.value !== undefined && (
            <>
              <h4>Recommended</h4>
              <VideoList
                videoData={videoData.videos}
                videoType="recommended"
                riskPercentage={this.props.value}
              />
              <hr style={{margin:"50px 0 36px 0"}}/>
            </>
          )}
          <h4>Yoga</h4>
          <VideoList videoData={videoData.videos} videoType="yoga" />
          <hr style={{margin:"50px 0 36px 0"}}/>

          <h4>Cardio</h4>
          <VideoList videoData={videoData.videos} videoType="cardio" />
          <hr style={{margin:"50px 0 40px 0"}}/>

          <h4>Meditation</h4>
          <VideoList videoData={videoData.videos} videoType="meditation" />
        </Row>
      </Container>
    )
  }
}
export default connect(mapStateToProps)(VideosSection)
