import { combineReducers } from "redux";
import dataReducer from "./dataReducer";
import precipitationReducer from "./precipitationReducer";
import ndviReducer from "./ndviReducer";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  form: formReducer,
  data: dataReducer,
  precipitation: precipitationReducer,
  ndvi: ndviReducer
});
