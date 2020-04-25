import React, { useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import "./styles.css";

export default function Offer(props) {
  const [priceByYield, setPriceByYield] = useState("");
  const [farmYield, setFarmYield] = useState("");
  const [total, setTotal] = useState(0);

  const selectedFarm = useSelector(state => state.data.selectedFarm);

  const changeMethod = changed => {
    event.preventDefault();

    props.changeMethod(changed);
  };

  const onFormSubmit = event => {
    console.log(selectedFarm);
    event.preventDefault();
    if (selectedFarm !== null) {
      if (priceByYield !== 0 && farmYield !== 0) {
        setTotal(priceByYield * farmYield);
      } else if (this.state.price !== 0) {
        setTotal(priceByYield * selectedFarm.yield);
      } else if (this.state.yield !== 0) {
        setTotal(selectedFarm.price * farmYield);
      }
      setPriceByYield(0);
      setFarmYield(0);
    }
  };

  return (
    <div className="card container-offer">
      <form onSubmit={onFormSubmit}>
        <div className="card-body">
          <div className="row justify-content-center row-margin">
            <h3 className="text">
              Offer Bid for: {selectedFarm ? selectedFarm.farm_name : ""}
            </h3>
          </div>

          <div className="row justify-content-center row-margin">
            <h5 className="text">Price</h5>
            <input
              className="form-control input"
              type="number"
              placeholder="0"
              value={priceByYield}
              onChange={e => setPriceByYield(e.target.value)}
            />
            <h5 className="metric">$/sac</h5>
          </div>

          <div className="row justify-content-center row-margin">
            <h5 className="text">Yield</h5>
            <input
              className="form-control input"
              type="number"
              placeholder="0"
              value={farmYield}
              onChange={e => setFarmYield(e.target.value)}
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
              <h3 className="total">Total: $ {total}</h3>
            </div>
            <div className="p-2 bd-highlight">
              <button
                className="btn btn-primary button-offer"
                onClick={() => {
                  changeMethod(false);
                }}
              >
                PayPal
              </button>
              <button
                className="btn btn-primary button-offer"
                onClick={() => {
                  changeMethod(true);
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

Offer.propTypes = {
  changeMethod: PropTypes.func
};
