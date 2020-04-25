import React from "react";
import { useSelector } from "react-redux";

import "./styles.css";
import { Link } from "react-router-dom";

export default function InfoFarm() {
  const selectedFarm = useSelector(state => state.data.selectedFarm);

  return (
    <div className="container-fluid info-container">
      <div className="row align-items-center row-info">
        <div className="col-6">
          <h1 className="text">{selectedFarm ? selectedFarm.name : "Farm"}</h1>
        </div>
        <div className="col-6">
          <Link to={"/app/home"} className="btn search-button">
            SEARCH
          </Link>
        </div>
      </div>
    </div>
  );
}
