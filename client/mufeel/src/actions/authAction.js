import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { authConstant } from "./types";
import { resetPost } from "./postAction";
import { setErrors } from "./errorAction";

export const registerUser = (userData, history) => (dispatch) => {
  dispatch(toggleUserLoading());
  axios
    .post("/api/users/signup", userData)
    .then((res) => {
      dispatch(toggleUserLoading());
      localStorage.setItem(
        "loginMessage",
        "Successfully registered. Login to continue"
      );
      history.push("/login");
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data));
    });
};

export const loginUser = (userData) => (dispatch) => {
  dispatch(toggleUserLoading());
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      dispatch(resetPost());
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      dispatch(toggleUserLoading());
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data));
      dispatch(toggleUserLoading());
    });
};

export const setCurrentUser = (userData) => {
  return {
    type: authConstant.SET_CURRENT_USER,
    payload: userData,
  };
};

export const toggleUserLoading = () => {
  return {
    type: authConstant.TOGGLE_USER_LOADING,
  };
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
