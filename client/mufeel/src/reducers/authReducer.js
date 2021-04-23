import { authConstant } from "../actions/types";
var isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  userLoading: false,
};
// eslint-disable-next-line
export default function (state = initialState, action) {
  switch (action.type) {
    case authConstant.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case authConstant.TOGGLE_USER_LOADING:
      return {
        ...state,
        userLoading: !state.userLoading,
      };
    default:
      return state;
  }
}
