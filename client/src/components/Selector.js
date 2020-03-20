/* eslint-disable */

import React, { Component } from "react";
import $ from "jquery";

import chartSelector from "../config/chart_selector.json";

export default class Selector extends Component {
  state = { name: null };

  componentDidMount() {
    let dropdown = $("#farm-info-dropdown");

    dropdown.empty();

    dropdown.append('<option selected="true" disabled>Choose a data</option>');
    dropdown.prop("selectedIndex", 0);

    var data = chartSelector.options;

    $.each(data, function(key, entry) {
      dropdown.append(
        $("<option></option>")
          .attr("value", entry.id)
          .text(entry.name)
      );
    });
  }

  handleChange = e => {
    var str = e.target.options[e.target.selectedIndex].text;
    this.props.callback(str);
  };

  render() {
    return (
      <div>
        <form className="form-inline">
          <label
            className="my-1 mr-2"
            style={{ color: "#FFF", fontWeight: "bold" }}
          >
            {chartSelector.label}
          </label>
          <select
            id="farm-info-dropdown"
            name="farm-info"
            onChange={this.handleChange}
          ></select>
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
