import { authConstant } from "./types";

export const setErrors = (error) => {
  return {
    type: authConstant.SET_ERRORS,
    payload: error,
  };
};

export const clearErrors = () => {
  return {
    type: authConstant.SET_ERRORS,
    payload: {},
  };
};
