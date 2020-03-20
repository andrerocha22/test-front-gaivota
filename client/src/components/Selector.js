import React, { Component } from "react";
import $ from "jquery";

import chartSelector from "../config/chart_selector.json";

export default class Selector extends Component {
  componentDidMount() {
    var jsonData = JSON.stringify(chartSelector.options);
    $.each(JSON.parse(jsonData), function(idx, obj) {
      $("#ddl_location")
        .append('<option value="' + obj.id + '">' + obj.location + "</option>")
        .selectpicker("refresh");
    });
  }

  render() {
    return (
      <div>
        <form className="form-inline">
          <label className="my-1 mr-2">{chartSelector.label}</label>
          <select className="custom-select my-1 mr-sm-2" id={chartSelector.id}>
            <option selected>Choose...</option>
          </select>

          <button type="submit" className="btn btn-primary my-1">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

// export default function Selector() {
//   console.log(chartSelector.options);

//   const mapOptions = () => {
//     let option;
//     let opt = [];

//     for (let i = 0; i < chartSelector.options.length; i++) {
//       option = document.createElement("option");
//       option.text = chartSelector.options[i].name;
//       option.value = chartSelector.options[i].id;
//       opt.push(option);
//     }
//     return opt;
//   };
// }
