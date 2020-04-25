import React from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import PropTypes from "prop-types";

import "./styles.css";

let SearchForm = props => {
  const { handleSubmit } = props;
  return (
    <div className="searchForm-container">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-3">
            <label className="label-select" htmlFor="inputState">
              Farm ID
            </label>
            <Field
              id="inputState"
              className="form-control"
              name="farm_id"
              component="input"
              type="number"
              placeholder="250"
            />
          </div>
          <div className="col-9">
            <label className="label-select" htmlFor="inputState">
              Name
            </label>
            <Field
              id="inputState"
              className="form-control"
              name="name"
              component="input"
              placeholder="Farm X"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <label className="label-select" htmlFor="inputState">
              Latitude
            </label>
            <Field
              id="inputState"
              className="form-control"
              name="latitude"
              component="input"
              type="number"
              placeholder="25.2543"
            />
          </div>
          <div className="col-6">
            <label className="label-select" htmlFor="inputState">
              Longitude
            </label>
            <Field
              id="inputState"
              className="form-control"
              name="longitude"
              component="input"
              type="number"
              placeholder="15.2543"
            />
          </div>
        </div>

        <div>
          <label className="label-select" htmlFor="inputState">
            Culture
          </label>
          <Field
            id="inputState"
            className="form-control"
            name="culture"
            component="input"
            placeholder="Beans"
          />
        </div>

        <div className="row">
          <div className="col-6">
            <label className="label-select" htmlFor="inputState">
              Variety
            </label>
            <Field
              id="inputState"
              className="form-control"
              name="variety"
              component="input"
              placeholder="XXX1"
            />
          </div>
          <div className="col-6">
            <label className="label-select" htmlFor="inputState">
              Total Area (Yield)
            </label>
            <Field
              id="inputState"
              className="form-control"
              name="total_area"
              component="input"
              type="number"
              placeholder="1000"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <label className="label-select" htmlFor="inputState">
              Yield Estimation
            </label>
            <Field
              id="inputState"
              className="form-control"
              name="yield_estimation"
              component="input"
              type="number"
              placeholder="50"
            />
          </div>
          <div className="col-6">
            <label className="label-select" htmlFor="inputState">
              Price ($)
            </label>
            <Field
              id="inputState"
              className="form-control"
              name="price"
              component="input"
              type="number"
              placeholder="50"
            />
          </div>
        </div>

        <button type="submit" className="button-create">
          Create
        </button>
      </form>
    </div>
  );
};

SearchForm = reduxForm({
  form: "search"
})(SearchForm);

const selector = formValueSelector("search");

SearchForm = connect(state => {
  const farm_id = selector(state, "farm_id");
  const name = selector(state, "name");
  const latitude = selector(state, "latitude");
  const longitude = selector(state, "longitude");
  const culture = selector(state, "culture");
  const variety = selector(state, "variety");
  const total_area = selector(state, "total_area");
  const yield_estimation = selector(state, "yield_estimation");
  const price = selector(state, "price");

  return {
    farm_id,
    name,
    latitude,
    longitude,
    culture,
    variety,
    total_area,
    yield_estimation,
    price
  };
})(SearchForm);

SearchForm.propTypes = {
  handleSubmit: PropTypes.func
};

export default SearchForm;
