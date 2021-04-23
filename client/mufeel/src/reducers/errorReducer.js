import { authConstant } from "../actions/types";

const initialState = {};
// eslint-disable-next-line
export default function (state = initialState, action) {
  switch (action.type) {
    case authConstant.SET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
