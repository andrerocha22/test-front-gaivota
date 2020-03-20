import React, { Component } from "react";
import PropTypes from "prop-types";

import "../styles/InfoFarm.css";

export default class InfoFarm extends Component {
  static propTypes = {
    name: PropTypes.string,
    location: PropTypes.any
  };

  render() {
    return (
      <div className="container-fluid info-container">
        <div className="row align-items-center">
          <div className="col-6">
            <h1 className="text-info">{this.props.name}</h1>
          </div>
          <div className="col-6">
            <a href="/" className="search-button">
              SEARCH
            </a>
          </div>
        </div>
      </div>
    );
  }
}
