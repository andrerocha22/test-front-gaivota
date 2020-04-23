import React, { Component } from "react";
import "../styles/Offer.css";
import PropTypes from "prop-types";

import farmApi from "../apis/farms";

export default class Offer extends Component {
  static propTypes = {
    changeMethod: PropTypes.any
  };

  state = {
    total: 0,
    price: 0,
    yield: 0,
    farm_name: "",
    farm_price: 0,
    farm_yield: 0
  };

  async componentDidMount() {
    const farm = location.search.split("farm=")[1];

    const response = await farmApi.get(`/farms/${farm}`);
    if (response.data !== null) {
      this.setState({
        farm_name: response.data.name,
        farm_price: response.data.price,
        farm_yield: response.data.yield_estimation
      });
    }
  }

  changeMethod(changed) {
    event.preventDefault();

    this.props.changeMethod(changed);
  }

  onFormSubmit = event => {
    event.preventDefault();
    if (this.state.farm_name !== "") {
      if (this.state.price !== 0 && this.state.yield !== 0) {
        this.setState({
          total: this.state.price * this.state.yield,
          price: 0,
          yield: 0
        });
      } else if (this.state.price !== 0) {
        this.setState({
          total: this.state.price * this.state.farm_yield,
          price: 0,
          yield: 0
        });
      } else if (this.state.yield !== 0) {
        this.setState({
          total: this.state.farm_price * this.state.yield,
          price: 0,
          yield: 0
        });
      }
    }
  };

  render() {
    return (
      <div className="card container-offer">
        <form onSubmit={this.onFormSubmit.bind(this)}>
          <div className="card-body">
            <div className="row justify-content-center row-margin">
              <h3 className="text">Offer Bid for: {this.state.farm_name}</h3>
            </div>

            <div className="row justify-content-center row-margin">
              <h5 className="text">Price</h5>
              <input
                className="form-control input"
                type="number"
                defaultValue="0"
                value={this.state.price}
                onChange={e => this.setState({ price: e.target.value })}
              />
              <h5 className="metric">$/sac</h5>
            </div>

            <div className="row justify-content-center row-margin">
              <h5 className="text">Yield</h5>
              <input
                className="form-control input"
                type="number"
                defaultValue="0"
                value={this.state.yield}
                onChange={e => this.setState({ yield: e.target.value })}
              />
              <h5 className="metric">sac</h5>
            </div>

            <div className="row justify-content-end row-margin">
              <button type="submit" className="btn btn-info">
                Create bid
              </button>
            </div>

            <div className="d-flex flex-column justify-content-center box">
              <div className="p-2 bd-highlight">
                <h3 className="total">Total: $ {this.state.total}</h3>
              </div>
              <div className="p-2 bd-highlight">
                <button
                  className="btn btn-primary button-offer"
                  onClick={() => {
                    this.changeMethod(false);
                  }}
                >
                  PayPal
                </button>
                <button
                  className="btn btn-primary button-offer"
                  onClick={() => {
                    this.changeMethod(true);
                  }}
                >
                  Credit Card
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
