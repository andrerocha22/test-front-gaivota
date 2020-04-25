import {
  SET_NDVI_DATA,
  LOAD_NDVI_DATA_ERROR,
  NDVI_DATA_LOADING
} from "../actions/types";

const INITIAL_STATE = {
  ndviByMonth: [],
  selectedFarm: null,
  status: ""
};

export default function fetchNdvi(state = INITIAL_STATE, action) {
  switch (action.type) {
    case NDVI_DATA_LOADING:
      return { ...state, status: "waiting" };
    case SET_NDVI_DATA:
      return {
        ...state,
        ndviByMonth: action.payload,
        status: "received"
      };
    case LOAD_NDVI_DATA_ERROR:
      return { ...state, status: "error" };
    default:
      return state;
  }
}
