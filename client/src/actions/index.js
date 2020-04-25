import farmApi from "../apis/farms";
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
  SET_NDVI_DATA
} from "../actions/types";

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
      .get("/farms_precipitation")
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
      .get("/farms_ndvi")
      .then(response => {
        const parsedJson = parseJson(response.data, farmID, true);
        dispatch(setNdviData(parsedJson));
      })
      .catch(error => {
        dispatch(loadNdviDataError(error));
      });
  };
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
