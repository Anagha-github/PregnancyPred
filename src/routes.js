import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import WorkoutPage from "./pages/WorkoutPage";

class RoutesLayout extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact component={LandingPage}/>
          <Route path='/workouts'  component={WorkoutPage} {...this.props}/>
        </Switch>
      </Router>
    );
  }
}
export default RoutesLayout;