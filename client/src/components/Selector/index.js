/*eslint-disable*/
import React, { Component } from "react";
import $ from "jquery";
import chartSelector from "../../config/chart_selector.json";

import "./styles.css";

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

  handleChange = (e) => {
    var str = e.target.options[e.target.selectedIndex].text;
    this.props.callback(str);
  };

  render() {
    return (
      <div>
        <form className="form-inline">
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
