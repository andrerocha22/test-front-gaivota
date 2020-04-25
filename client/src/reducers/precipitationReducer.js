import {
  SET_PRECIPITATION_DATA,
  LOAD_PRECIPITATION_DATA_ERROR,
  PRECIPITATION_DATA_LOADING
} from "../actions/types";

const INITIAL_STATE = {
  precipitationByMonth: [],
  selectedFarm: null,
  status: ""
};

export default function fetchPrecipitation(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PRECIPITATION_DATA_LOADING:
      return { ...state, status: "waiting" };
    case SET_PRECIPITATION_DATA:
      return {
        ...state,
        precipitationByMonth: action.payload,
        status: "received"
      };
    case LOAD_PRECIPITATION_DATA_ERROR:
      return { ...state, status: "error" };
    default:
      return state;
  }
}
