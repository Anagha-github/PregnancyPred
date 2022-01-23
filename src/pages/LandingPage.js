import React, { Component } from "react"
import Header from "../components/Header"
import "./LandingPage.css"
import HomeSection from "../components/HomeSection"
import ProcessSection from "../components/ProcessSection"
import Programs from "../components/Programs"

class LandingPage extends Component {
  render() {
    return (
      <>
        <Header />
        <HomeSection/>
        <ProcessSection/>
        <Programs/>
      </>
    )
  }
}
export default LandingPage
