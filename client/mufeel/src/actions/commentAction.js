import axios from "axios";
import { commentConstant } from "./types";
import { setErrors, clearErrors } from "./errorAction";

export const createComment = (id, commentData, history) => (dispatch) => {
  dispatch(toggleCommentLoading());
  axios
    .post(`/api/comments/create/${id}`, commentData)
    .then((res) => {
      dispatch({
        type: commentConstant.CREATE_COMMENT,
        payload: res.data,
      });
      dispatch(toggleCommentLoading());
      history.push("/blog/post");
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data));
      dispatch(toggleCommentLoading());
    });
};

export const getComments = (id) => (dispatch) => {
  dispatch(toggleCommentsLoading());
  axios
    .get(`/api/comments/${id}`)
    .then((res) => {
      dispatch({
        type: commentConstant.GET_COMMENTS,
        payload: res.data,
      });
      dispatch(clearErrors());
      dispatch(toggleCommentsLoading());
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data));
      dispatch(toggleCommentsLoading());
    });
};

export const updateComment = (postId, id, commentData) => (dispatch) => {
  dispatch(toggleCommentLoading());
  axios
    .put(`/api/comments/${postId}/${id}`, commentData)
    .then((res) => {
      dispatch({
        type: commentConstant.UPDATE_COMMENT,
        payload: res.data,
      });
      dispatch(toggleCommentLoading());
      history.push(`/blog/post/comment/${res.data._id}`);
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data));
      dispatch(toggleCommentLoading());
    });
};

export const deleteComment = (postId, id, history) => (dispatch) => {
  dispatch(toggleCommentLoading());
  axios
    .delete(`/api/comments/delete/${postId}/${id}`)
    .then((res) => {
      dispatch({
        type: commentConstant.DELETE_COMMENT,
        payload: id,
      });
      dispatch(toggleCommentLoading());
      history.push("/blog/post");
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data));
      dispatch(toggleCommentLoading());
    });
};

export const toggleCommentLoading = () => {
  return {
    type: commentConstant.TOGGLE_COMMENT_LOADING,
  };
};

export const toggleCommentsLoading = () => {
  return {
    type: commentConstant.TOGGLE_COMMENTS_LOADING,
  };
};

export const resetComment = () => {
  return {
    type: commentConstant.RESET_COMMENT,
  };
};
