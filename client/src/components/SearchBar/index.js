import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectFarmData } from "../../actions/index";
import PropTypes from "prop-types";
import "./styles.css";
import { Link } from "react-router-dom";

export default function SearchBar() {
  const [term, setTerm] = useState(0);

  const dispatch = useDispatch();

  const farms = useSelector(state => state.data.farms);

  const onFormSubmit = event => {
    event.preventDefault();
    farms.forEach(farm => {
      if (farm.farm_id === Number(term)) {
        dispatch(setSelectFarmData(farm));
      }
    });
  };

  const logged = location.search.split("login=")[1];

  return (
    <form
      onSubmit={onFormSubmit.bind(this)}
      style={{ paddingBottom: "50px", paddingTop: "10px" }}
    >
      <div className="form-group">
        <label className="label-search-bar">Search a Farm by ID:</label>
        <input
          type="number"
          className="form-control form-search-bar"
          id="searchInput"
          onChange={e => setTerm(e.target.value)}
          required
        />
        <div className="invalid-feedback">Please enter a valid farm id.</div>
        <small id="help" className="form-text text-muted">
          Type a id to search
        </small>
      </div>
      <button type="submit" className="btn button-search-bar">
        Search
      </button>

      <Link
        to={logged ? "/app/register" : "/app/register"}
        className="btn button-search-bar"
      >
        Add Farm
      </Link>
    </form>
  );
}

SearchBar.propTypes = {
  onFormSubmit: PropTypes.func
};
