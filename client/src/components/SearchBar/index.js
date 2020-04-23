import React from "react";
import PropTypes from "prop-types";

import "./styles.css";

class SearchBar extends React.Component {
  state = { term: "" };

  static propTypes = {
    onFormSubmit: PropTypes.any
  };

  onFormSubmit = event => {
    event.preventDefault();

    this.props.onFormSubmit(this.state.term);
  };

  render() {
    return (
      <form
        onSubmit={this.onFormSubmit.bind(this)}
        style={{ paddingBottom: "50px", paddingTop: "10px" }}
      >
        <div className="form-group">
          <label className="label-search-bar">Search a Farm by ID:</label>
          <input
            type="number"
            className="form-control form-search-bar"
            id="searchInput"
            onChange={e => this.setState({ term: e.target.value })}
            required
          />
          <div className="invalid-feedback">Please enter a valid farm id.</div>
          <small id="help" className="form-text text-muted">
            Type a id to search.
          </small>
        </div>
        <button type="submit" className="btn button-search-bar">
          Search
        </button>
      </form>
    );
  }
}

export default SearchBar;
