import React, { Component } from "react";
import PropTypes from "prop-types";

import "./styles.css";

export default class FarmCard extends Component {
  static propTypes = {
    farm: PropTypes.any
  };

  render() {
    const {
      farm_id,
      name,
      culture,
      variety,
      total_area,
      yield_estimation,
      price
    } = this.props.farm;

    const total = total_area * yield_estimation;

    const logged = location.search.split("login=")[1];

    return (
      <div className="card container-card">
        <div className="card-body">
          <h1 className="card-title">{name}</h1>

          <li className="item">Culture: {culture}</li>
          <li className="item">Variety: {variety}</li>
          <li className="item">Area: {total_area}</li>
          <li className="item">Yield Estimation: {yield_estimation}</li>
          <li className="item">Total: {total}</li>
          <li className="item">Price: {price}</li>

          <div className="row justify-content-around container-bid-buy">
            <a
              href={logged ? `checkout?farm=${farm_id}` : ""}
              className="btn button-card"
            >
              Buy Now
            </a>
            <a
              href={logged ? `checkout?farm=${farm_id}` : ""}
              className="btn button-card"
            >
              Bid
            </a>
          </div>
        </div>
      </div>
    );
  }
}
