import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import _ from "lodash";
import Header from "../../components/Header";
import Maps from "../../components/Maps";
import FarmCard from "../../components/FarmCard";
import InfoFarm from "../../components/InfoFarm";
import Selector from "../../components/Selector";
import "./styles.css";
import { loadNdviData, loadPreciptationData } from "../../actions/index";

import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

export default function FarmMoreInfo() {
  const dispatch = useDispatch();

  // const [dataNdviPrecipitation, setDataNdviPrecipitation] = useState(null);
  // const [dataPrecipitation, setDataPrecipitation] = useState(null);

  const [dataChoosedToShow, setDataChoosedToShow] = useState(null);
  const [precVisible, setPrecipitationVisible] = useState(false);
  const [ndviVisible, setNdviVisible] = useState(false);

  const selectedFarm = useSelector(state => state.data.selectedFarm);

  const precipitationByMonth = useSelector(
    state => state.precipitation.precipitationByMonth
  );

  const ndviByMonth = useSelector(state => state.ndvi.ndviByMonth);

  useEffect(() => {
    if (selectedFarm) {
      dispatch(loadPreciptationData(selectedFarm.farm_id));
      dispatch(loadNdviData(selectedFarm.farm_id));
    }
  }, [selectedFarm]);

  //Conditions to show the chart (just one, together)
  const showChartDataPrec = () => {
    if (precVisible && !ndviVisible) {
      setDataChoosedToShow([]);
      setPrecipitationVisible(false);
    } else if (!precVisible && !ndviVisible) {
      setDataChoosedToShow(precipitationByMonth);
      setPrecipitationVisible(true);
    } else if (!precVisible && ndviVisible) {
      setDataChoosedToShow(precipitationByMonth);
      setPrecipitationVisible(true);
      setNdviVisible(false);
    }
  };

  //Conditions to show the chart (just one, together)
  const showChartDataNdvi = () => {
    if (ndviVisible && !precVisible) {
      setDataChoosedToShow([]);
      setNdviVisible(false);
    } else if (!ndviVisible && !precVisible) {
      setDataChoosedToShow(ndviByMonth);
      setNdviVisible(true);
    } else if (!ndviVisible && precVisible) {
      setDataChoosedToShow(ndviByMonth);
      setNdviVisible(true);
      setPrecipitationVisible(false);
    }
  };

  const handleChartToShow = type => {
    switch (type) {
      case "Precipitation":
        showChartDataPrec();
        break;
      case "Ndvi":
        showChartDataNdvi();
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <Header />
      <div className="farm-body">
        <InfoFarm />
        <div className="container-fluid align-feature">
          <div className="row">
            <div className="col-md-5 col-maps">
              <Maps />
            </div>
            <div className="col-md-6 offset-md-1 col-selector">
              <div className="row justify-content-start">
                <Selector callback={handleChartToShow.bind(this)} />
              </div>

              <div className="row justify-content-center row-chart">
                <ComposedChart
                  width={550}
                  height={320}
                  data={dataChoosedToShow}
                >
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar
                    yAxisId="left"
                    dataKey="Precipitation"
                    barSize={20}
                    fill="#313ea0"
                    active="false"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="NDVI"
                    stroke="#ff6300"
                  />
                </ComposedChart>
              </div>
              <div className="container">
                <FarmCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
