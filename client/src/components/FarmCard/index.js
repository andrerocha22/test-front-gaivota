import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import "./styles.css";
import { Link } from "react-router-dom";

export default function FarmCard() {
  const [hasData, setHasData] = useState(false);

  const selectedFarm = useSelector(state => state.data.selectedFarm);

  let total = 0;

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    if (selectedFarm !== null) {
      setHasData(true);
      total = selectedFarm.total_area * selectedFarm.yield_estimation;
    }
  }, [selectedFarm]);

  const cardFarmInfo = () => (
    <div className="card-body" disabled={hasData ? true : false}>
      <h2 className="card-title">{selectedFarm.name}</h2>
      <li className="item">Culture: {selectedFarm.culture}</li>
      <li className="item">Variety: {selectedFarm.variety}</li>
      <li className="item">Area: {selectedFarm.total_area}</li>
      <li className="item">
        Yield Estimation: {selectedFarm.yield_estimation}
      </li>
      <li className="item">Total: {total}</li>
      <li className="item">Price: {selectedFarm.price}</li>
      <div className="row justify-content-around container-bid-buy">
        <Link
          to={
            isAuthenticated ? `/app/checkout?farm=${selectedFarm.farm_id}` : ""
          }
          className="btn button-card"
        >
          Buy Now
        </Link>
        <Link
          to={
            isAuthenticated ? `/app/checkout?farm=${selectedFarm.farm_id}` : ""
          }
          className="btn button-card"
        >
          Bid
        </Link>
      </div>
    </div>
  );

  const createWarningCard = () => (
    <div className="card-body" disabled={hasData ? false : true}>
      <h1 className="card-title">Search a Farm to see more</h1>
    </div>
  );

  return (
    <div className="card container-card">
      {hasData ? cardFarmInfo() : createWarningCard()}
    </div>
  );
}
