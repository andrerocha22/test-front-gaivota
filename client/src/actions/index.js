import farmApi from "../apis/farms";
import jwt_decode from "jwt-decode";
import setAuthToken from "../setAuthToken";

import {
  SET_FARM_DATA,
  LOAD_FARM_DATA_ERROR,
  FARM_DATA_LOADING,
  SET_SELECTED_FARM_DATA,
  PRECIPITATION_DATA_LOADING,
  LOAD_PRECIPITATION_DATA_ERROR,
  SET_PRECIPITATION_DATA,
  NDVI_DATA_LOADING,
  LOAD_NDVI_DATA_ERROR,
  SET_NDVI_DATA,
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "../actions/types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  farmApi
    .post("/users/register", userData)
    .then(() => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Login - get user token
export const loginUser = userData => dispatch => {
  farmApi.post("/users/login", userData).then(res => {
    const { token } = res.data;
    localStorage.setItem("jwtToken", token);

    setAuthToken(token);

    const decoded = jwt_decode(token);

    dispatch(setCurrentUser(decoded));
  });
  // .catch(err =>
  //   dispatch({
  //     type: GET_ERRORS,
  //     payload: err.response.data
  //   })
  // );
};

export const loadFarmData = () => {
  return dispatch => {
    dispatch(loadingFarmData());

    farmApi
      .get("/farms")
      .then(response => {
        dispatch(setFarmData(response.data));
      })
      .catch(error => {
        dispatch(loadFarmDataError(error));
      });
  };
};

export const loadPreciptationData = farmID => {
  return dispatch => {
    dispatch(loadingPrecipitationData());

    farmApi
      .get("/farms/precipitation")
      .then(response => {
        const parsedJson = parseJson(response.data, farmID, false);
        dispatch(setPrecipitationData(parsedJson));
      })
      .catch(error => {
        dispatch(loadPrecipitationDataError(error));
      });
  };
};

export const loadNdviData = farmID => {
  return dispatch => {
    dispatch(loadingNdviData());

    farmApi
      .get("/farms/ndvi")
      .then(response => {
        const parsedJson = parseJson(response.data, farmID, true);
        dispatch(setNdviData(parsedJson));
      })
      .catch(error => {
        dispatch(loadNdviDataError(error));
      });
  };
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};
// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

export const loadingFarmData = () => {
  return {
    type: FARM_DATA_LOADING
  };
};

export const loadFarmDataError = error => {
  return {
    type: LOAD_FARM_DATA_ERROR,
    payload: error
  };
};

export const setFarmData = data => {
  return {
    type: SET_FARM_DATA,
    payload: data
  };
};

export const setSelectFarmData = data => {
  return {
    type: SET_SELECTED_FARM_DATA,
    payload: data
  };
};

export const loadingPrecipitationData = () => {
  return {
    type: PRECIPITATION_DATA_LOADING
  };
};

export const loadPrecipitationDataError = error => {
  return {
    type: LOAD_PRECIPITATION_DATA_ERROR,
    payload: error
  };
};

export const setPrecipitationData = data => {
  return {
    type: SET_PRECIPITATION_DATA,
    payload: data
  };
};

export const loadingNdviData = () => {
  return {
    type: NDVI_DATA_LOADING
  };
};

export const loadNdviDataError = error => {
  return {
    type: LOAD_NDVI_DATA_ERROR,
    payload: error
  };
};

export const setNdviData = data => {
  return {
    type: SET_NDVI_DATA,
    payload: data
  };
};

const sumTotal = (total, num) => {
  return total + num;
};

const parseJson = (result, farmID, isNdvi) => {
  if (result === null) return;

  let data_months = [];
  let precipitation_month_aux = [];
  let precipitation_month = [];
  let array_date_total = [];

  let func = isNdvi ? `item.ndvi_${farmID}` : `item.precipitation_${farmID}`;

  result.filter(item => {
    let yyyymm = item.date.slice(0, 7);
    if (!data_months.includes(yyyymm)) {
      data_months.push(yyyymm);
    }
  });

  data_months.forEach(month => {
    result.filter(item => {
      let re = new RegExp(month.toString());

      if (re.test(item.date)) {
        let value = eval(func);
        precipitation_month_aux.push(Number(value, 10));
      }
    });

    let sum = precipitation_month_aux.reduce(sumTotal);

    precipitation_month.push(sum.toFixed(2));
    precipitation_month_aux = [];
  });

  if (isNdvi) {
    array_date_total = precipitation_month.map((value, index) => ({
      NDVI: value,
      date: data_months[index]
    }));
  } else {
    array_date_total = precipitation_month.map((value, index) => ({
      Precipitation: value,
      date: data_months[index]
    }));
  }

  return array_date_total;
};
