import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from "react-redux";
import RoutesLayout from "./routes";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import configureStore from "./store";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Provider store={configureStore()}>
    <RoutesLayout />
  </Provider>,
  document.getElementById('root')
);
reportWebVitals();
