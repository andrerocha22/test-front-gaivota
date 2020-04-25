import React, { useState } from "react";
import Header from "../../components/Header";
import Payment from "../../components/Payment";
import Offer from "../../components/Offer";
import "./styles.css";

export default function Checkout() {
  const [choosedCredit, setChoosedCredit] = useState(false);
  // const [farmChoosed, setFarmChoosed] = useState(null);

  const onChoosedPaymentMethod = method => {
    event.preventDefault();

    setChoosedCredit(method);
  };

  return (
    <div style={{ height: "110vh" }}>
      <Header />
      <div className="checkout-body">
        <div className="container-fluid align-center">
          <div className="row row-checkout">
            <div className="col-md-6 col-offer">
              <Offer changeMethod={onChoosedPaymentMethod.bind(this)} />
            </div>
            <div className="col-md-5 offset-md-1 col-payment">
              <Payment choosedCredit={choosedCredit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
