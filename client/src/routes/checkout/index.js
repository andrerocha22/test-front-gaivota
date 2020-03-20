import React, { Component } from "react";
import Header from "../../components/Header";
import Payment from "../../components/Payment";
import Offer from "../../components/Offer";
import "../../styles/Checkout.css";
import PropTypes from "prop-types";

export default class index extends Component {
  static propTypes = {
    farm: PropTypes.any
  };

  state = { choosedCredit: false, farmChoosed: null };

  onChoosedPaymentMethod(method) {
    event.preventDefault();

    this.setState({ choosedCredit: method });
  }

  render() {
    return (
      <div style={{ height: "110vh" }}>
        <Header />
        <div className="checkout-body">
          <div className="container-fluid align-center">
            <div className="row row-checkout">
              <div className="col-md-6">
                <Offer changeMethod={this.onChoosedPaymentMethod.bind(this)} />
              </div>
              <div className="col-md-6">
                <Payment choosedCredit={this.state.choosedCredit} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
