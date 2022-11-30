import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import './App.css';

import Layout from "./pages/Layout";
import Home from "./pages/Home";

const App = () => {
  let routes = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> }
      ],
    },
  ]);

  return routes;
};

const AppWrapper = () => {
  return (
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  );
};

const element = document.getElementById("root");
const root = ReactDOM.createRoot(element);
root.render(<AppWrapper />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();