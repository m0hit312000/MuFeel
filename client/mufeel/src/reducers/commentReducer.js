import { commentConstant } from "../actions/types";

const initialState = {
  comments: [],
  commentLoading: false,
  commentsLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case commentConstant.CREATE_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    case commentConstant.GET_COMMENTS:
      return {
        ...state,
        comments: [...action.payload],
      };
    case commentConstant.UPDATE_POST:
      // Here we are leaving the post which we want to update
      const comments = state.comments.filter(
        (comment) => comment._id !== action.payload._id
      );
      return {
        ...state,
        comments: [...comments, action.payload], //here we are adding the updated post
      };
    case commentConstant.DELETE_POST:
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment._id !== action.payload
        ), //if delete is not working try actionn.payload._id
      };
    case commentConstant.TOGGLE_COMMENT_LOADING:
      return {
        ...state,
        commentLoading: !state.commentLoading,
      };
    case commentConstant.TOGGLE_COMMENTS_LOADING:
      return {
        ...state,
        commentsLoading: !state.commentsLoading,
      };
    case commentConstant.RESET_COMMENT:
      return initialState;
    default:
      return state;
  }
}
