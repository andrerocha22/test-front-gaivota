import {
  SET_FARM_DATA,
  LOAD_FARM_DATA_ERROR,
  FARM_DATA_LOADING,
  SET_SELECTED_FARM_DATA
} from "../actions/types";

const INITIAL_STATE = {
  farms: [],
  selectedFarm: null,
  status: ""
};

export default function fetchStates(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FARM_DATA_LOADING:
      return { ...state, status: "waiting" };
    case SET_FARM_DATA:
      return {
        ...state,
        farms: action.payload,
        status: "received"
      };
    case SET_SELECTED_FARM_DATA:
      return {
        ...state,
        selectedFarm: action.payload,
        status: "selected farm"
      };
    case LOAD_FARM_DATA_ERROR:
      return { ...state, status: "error" };
    default:
      return state;
  }
}
