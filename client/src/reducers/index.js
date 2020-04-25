import { combineReducers } from "redux";
import dataReducer from "./dataReducer";
import precipitationReducer from "./precipitationReducer";
import ndviReducer from "./ndviReducer";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";

export default combineReducers({
  form: formReducer,
  data: dataReducer,
  auth: authReducer,
  precipitation: precipitationReducer,
  ndvi: ndviReducer
});
