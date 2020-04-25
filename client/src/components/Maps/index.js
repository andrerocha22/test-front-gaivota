import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Map, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import { useHistory } from "react-router-dom";

import geojson from "../../assets/farms_geo.json";

export default function Maps() {
  const [position, setPosition] = useState({
    lat: 51.505,
    lng: -0.09
  });
  const history = useHistory();
  const [zoom] = useState(15);
  const [name, setName] = useState("");

  const selectedFarm = useSelector(state => state.data.selectedFarm);

  useEffect(() => {
    if (selectedFarm !== null) {
      const { latitude, longitude } = selectedFarm;

      setPosition({
        lat: latitude ? latitude : 51.505,
        lng: longitude ? longitude : -0.09
      });
      setName(selectedFarm.name);
    }
  }, [selectedFarm]);

  const handleClick = () => {
    history.push("/app/farm");
  };

  return (
    <Map center={position} zoom={zoom} onClick={handleClick}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>{name}</Popup>
      </Marker>
      <GeoJSON
        data={geojson}
        style={() => ({
          color: "#0000a0",
          weight: 0.5,
          fillColor: "#2d91fc",
          fillOpacity: 0.7
        })}
      />
    </Map>
  );
}
