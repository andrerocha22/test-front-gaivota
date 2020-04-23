import React, { Component } from "react";
import "./styles.css";

import paypalLogo from "../../assets/paypal-icon.png";
import FormCreditCard from "../FormCreditCard";
import FormPaypal from "../FormPaypal";
import PropTypes from "prop-types";

export default class Payment extends Component {
  static propTypes = {
    choosedCredit: PropTypes.bool
  };

  renderPayment(choosedCredit) {
    if (choosedCredit) {
      return (
        <div className="card">
          <div className="card-body">
            <FormCreditCard />
          </div>
        </div>
      );
    } else {
      return (
        <div className="card">
          <img src={paypalLogo} alt="paypal" className="paypal-logo" />

          <div className="card-body">
            <FormPaypal />
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="container-payment">
        {this.renderPayment(this.props.choosedCredit)}
      </div>
    );
  }
}
