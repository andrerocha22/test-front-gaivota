import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import PropTypes from "prop-types";

import geojson from "../assets/farms_geo.json";

export default class Maps extends Component {
  static propTypes = {
    farm: PropTypes.any,
    farm_id: PropTypes.number
  };

  constructor() {
    super();
    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 15
    };
  }

  setPosition(latitude, longitude) {
    if (latitude && longitude) {
      return [latitude, longitude];
    } else {
      return [this.state.lat, this.state.lng];
    }
  }

  handleClick = () => {
    window.location.href = `farms?farm=${this.props.farm.farm_id}`;
  };

  render() {
    const { latitude, longitude } = this.props.farm;

    const position = this.setPosition(latitude, longitude);

    return (
      <Map center={position} zoom={this.state.zoom} onClick={this.handleClick}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>{this.props.farm.name}</Popup>
        </Marker>
        <GeoJSON
          data={geojson}
          style={this.geoJSONStyle}
          onEachFeature={this.onEachFeature}
        />
      </Map>
    );
  }
}
