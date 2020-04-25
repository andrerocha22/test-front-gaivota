import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Routes from "./routes";

import "./global.css";

import farm1 from "./assets/farms1.json";
import farm2 from "./assets/farms2.json";
import farm3 from "./assets/farms3.json";
import farmApi from "./apis/farms";
import { loadFarmData } from "./actions/index";

export default function App() {
  const dispatch = useDispatch();

  const fillFarm1 = async () => {
    await farmApi
      .post("/farms/create", farm1, {
        headers: { "Content-Type": "application/json" }
      })
      .then(() => {
        dispatch(loadFarmData);
      });
  };

  const fillFarm2 = async () => {
    await farmApi
      .post("/farms/create", farm2, {
        headers: { "Content-Type": "application/json" }
      })
      .then(() => {
        dispatch(loadFarmData);
      });
  };

  const fillFarm3 = async () => {
    await farmApi
      .post("/farms/create", farm3, {
        headers: { "Content-Type": "application/json" }
      })
      .then(() => {
        dispatch(loadFarmData);
      });
  };

  useEffect(() => {
    fillFarm1();
    fillFarm2();
    fillFarm3();
  }, []);

  return (
    <div className="app">
      <Routes />
    </div>
  );
}
