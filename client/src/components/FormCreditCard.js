import React from "react";
import master from "../assets/Master-Card-icon.png";
import visa from "../assets/Visa-icon.png";

export default function FormCreditCard() {
  return (
    <div>
      <form>
        <div className="form-row">
          <div className="form-group col-md">
            <label>Credit Card Number</label>
            <input type="email" className="form-control" id="inputEmail4" />
            <img src={master} alt="master" style={{ width: "40px" }} />
            <img
              src={visa}
              alt="visa"
              style={{ width: "40px", marginLeft: "5px" }}
            />
          </div>
          <div className="form-group col-md-3">
            <label>Month</label>
            <select id="inputState" className="form-control">
              <option defaultValue>Choose...</option>
              <option>Jan</option>
              <option>Feb</option>
              <option>Mar</option>
              <option>Apr</option>
              <option>May</option>
              <option>June</option>
              <option>July</option>
              <option>Aug</option>
              <option>Sep</option>
              <option>Oct</option>
              <option>Nov</option>
              <option>Dec</option>
            </select>
          </div>
          <div className="form-group col-md-3">
            <label>Year</label>
            <select id="inputState" className="form-control">
              <option defaultValue>Choose...</option>
              <option>2020</option>
              <option>2021</option>
              <option>2022</option>
              <option>2023</option>
              <option>2024</option>
              <option>2025</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label>Billing Address</label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
          />
        </div>
        <div className="form-row">
          <div className="form-group col-md-10">
            <label>Name</label>
            <input type="text" className="form-control" id="inputCity" />
          </div>
          <div className="form-group col-md-2">
            <label>CVV</label>
            <input type="text" className="form-control" id="inputCity" />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: "150px", fontWeight: "500", letterSpacing: "1px" }}
          onClick={() => {
            alert("Payment Confirmed!");
          }}
        >
          Pay
        </button>
      </form>
    </div>
  );
}
