import React, { Component } from "react";
import _ from "lodash";
import Header from "../../components/Header";
import Maps from "../../components/Maps";
import FarmCard from "../../components/FarmCard";
import InfoFarm from "../../components/InfoFarm";
import Selector from "../../components/Selector";
import farmApi from "../../apis/farms";
import "./styles.css";

import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

export default class Home extends Component {
  state = {
    farm: "",
    dataPrec: null,
    dataNdvi: null,
    dataToUsePrec: null,
    dataToUseNdvi: null,
    mergedData: null,
    dataToUse: null,
    precVisible: false,
    ndviVisible: false
  };

  async componentDidMount() {
    const term = location.search.split("farm=")[1];
    // console.log(term);
    const response = await farmApi.get(`/farms/${term}`);
    const responsePrec = await farmApi.get("/farms_precipitation");
    const responseNdvi = await farmApi.get("/farms_ndvi");

    this.setState({
      farm: response.data,
      dataPrec: responsePrec.data,
      dataToUse: responsePrec.data,
      dataNdvi: responseNdvi.data
    });

    this.setState({
      dataToUsePrec: this.parseJsonPrec(`item.precipitation_${term}`),
      dataToUseNdvi: this.parseJsonNdvi(`item.ndvi_${term}`)
    });

    let result = {};

    result = _.merge(this.state.dataToUsePrec, this.state.dataToUseNdvi);

    this.setState({
      dataToUsePrec: this.parseJsonPrec(`item.precipitation_${term}`),
      mergedData: result
    });
  }

  sumTotal(total, num) {
    return total + num;
  }

  parseJsonNdvi(choosedFarm) {
    let data_months = [];
    let precipitation_month_aux = [];
    let precipitation_month = [];
    let array_date_total = [];

    let func = choosedFarm;

    if (this.state.dataNdvi === null) return;

    this.state.dataNdvi.filter(item => {
      let yyyymm = item.date.slice(0, 7);
      if (!data_months.includes(yyyymm)) {
        data_months.push(yyyymm);
      }
    });

    data_months.forEach(element => {
      this.state.dataNdvi.filter(item => {
        let re = new RegExp(element.toString());

        if (re.test(item.date)) {
          let value = eval(func);
          precipitation_month_aux.push(Number(value, 10));
        }
      });

      let sum = precipitation_month_aux.reduce(this.sumTotal);

      precipitation_month.push(sum.toFixed(2));
      precipitation_month_aux = [];
    });

    array_date_total = precipitation_month.map((value, index) => ({
      NDVI: value,
      date: data_months[index]
    }));

    return array_date_total;
  }

  parseJsonPrec(choosedFarm) {
    let data_months = [];
    let precipitation_month_aux = [];
    let precipitation_month = [];
    let array_date_total = [];

    let func = choosedFarm;

    if (this.state.dataPrec === null) return;

    this.state.dataPrec.filter(item => {
      let yyyymm = item.date.slice(0, 7);
      if (!data_months.includes(yyyymm)) {
        data_months.push(yyyymm);
      }
    });

    data_months.forEach(element => {
      this.state.dataPrec.filter(item => {
        let re = new RegExp(element.toString());

        if (re.test(item.date)) {
          let value = eval(func);
          precipitation_month_aux.push(Number(value, 10));
        }
      });

      let sum = precipitation_month_aux.reduce(this.sumTotal);

      precipitation_month.push(sum);
      precipitation_month_aux = [];
    });

    array_date_total = precipitation_month.map((value, index) => ({
      Precipitation: value,
      date: data_months[index]
    }));

    return array_date_total;
  }

  //Conditions to show the chart (just one, together)
  showChartDataPrec = () => {
    if (this.state.precVisible && !this.state.ndviVisible) {
      this.setState({
        precVisible: false,
        dataToUse: []
      });
    } else if (!this.state.precVisible && !this.state.ndviVisible) {
      this.setState({
        precVisible: true,
        dataToUse: this.state.dataToUsePrec
      });
    } else if (!this.state.precVisible && this.state.ndviVisible) {
      this.setState({
        precVisible: true,
        dataToUse: this.state.mergedData
      });
    } else if (this.state.precVisible && this.state.ndviVisible) {
      this.setState({
        precVisible: false,
        dataToUse: this.state.dataToUseNdvi
      });
    }
  };

  //Conditions to show the chart (just one, together)
  showChartDataNdvi = () => {
    if (this.state.ndviVisible && !this.state.precVisible) {
      this.setState({
        ndviVisible: false,
        dataToUse: []
      });
    } else if (!this.state.ndviVisible && !this.state.precVisible) {
      this.setState({
        ndviVisible: true,
        dataToUse: this.state.dataToUseNdvi
      });
    } else if (!this.state.ndviVisible && this.state.precVisible) {
      this.setState({
        ndviVisible: true,
        dataToUse: this.state.mergedData
      });
    } else if (this.state.ndviVisible && this.state.precVisible) {
      this.setState({
        ndviVisible: false,
        dataToUse: this.state.dataToUsePrec
      });
    }
  };

  handleChartToShow(type) {
    switch (type) {
      case "Precipitation":
        this.showChartDataPrec();
        break;
      case "Ndvi":
        this.showChartDataNdvi();
        break;

      default:
        break;
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="farm-body">
          <InfoFarm name={this.state.farm.name} />

          <div className="container-fluid align-feature">
            <div className="row">
              <div className="col-md-5 container-chart">
                <Maps farm={this.state.farm} />
              </div>
              <div className="col-md-6 offset-md-1">
                <div className="row justify-content-start">
                  <Selector callback={this.handleChartToShow.bind(this)} />
                </div>

                <div className="row justify-content-center">
                  <ComposedChart
                    width={550}
                    height={320}
                    data={this.state.dataToUse}
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
                  <FarmCard farm={this.state.farm} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
