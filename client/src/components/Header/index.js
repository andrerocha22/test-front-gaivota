import React from "react";
import "./styles.css";

import logo from "../../assets/logo192.png";

export default function Header() {
  return (
    <div className="container-fluid header">
      <div className="row align-items-center">
        <div className="col-4">
          <img src={logo} className="logo-header" />
        </div>
        <div className="col-4">
          <h1
            onClick={() => {
              window.location.href = "/";
            }}
            className="text-header"
          >
            FARM SYSTEM
          </h1>
        </div>
        <div className="col-4">
          <a href="login" className="login-button">
            LOGIN
          </a>
        </div>
      </div>
    </div>
  );
}
