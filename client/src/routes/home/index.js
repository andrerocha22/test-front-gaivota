import React, { Component } from "react";
import Header from "../../components/Header";
import Maps from "../../components/Maps";
import FarmCard from "../../components/FarmCard";
import SearchBar from "../../components/SearchBar";

//API
import farmApi from "../../apis/farms";

//Styles
import "../../styles/Home.css";

// import { logout } from "../../auth";

export default class Home extends Component {
  state = { farm: "" };

  async componentDidMount() {
    const response = await farmApi.get("/farms");
    this.setState({
      farm: response.data[0]
    });
  }

  onTermSubmit = async term => {
    const response = await farmApi.get(`/farms/${term}`);

    if (response.data !== null) {
      this.setState({
        farm: response.data
      });
    }
  };

  render() {
    return (
      <div style={{ height: "110vh" }}>
        <Header />
        <div className="home-body">
          <div className="container-fluid align-feature">
            <div className="row">
              <div className="col-md-5">
                <Maps farm={this.state.farm} />
              </div>
              <div className="col-md-6 offset-md-1">
                <SearchBar onFormSubmit={this.onTermSubmit} />
                <FarmCard farm={this.state.farm} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
