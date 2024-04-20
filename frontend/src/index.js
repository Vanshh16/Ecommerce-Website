import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.js";
import {store} from "./store/store.js";
import {positions, Provider as AlertProvider, transitions} from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const root = createRoot(document.getElementById("root"));

const options = {
  timeout : 5000,
  position : positions.BOTTOM_CENTER,
  transition : transitions.SCALE

};

root.render(
  <Provider store={store}>
  <AlertProvider template={AlertTemplate} {...options} >
  <App />
  </AlertProvider>
    
  </Provider>
);
