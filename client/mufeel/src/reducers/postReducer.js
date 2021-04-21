import { postConstant } from "../actions/types";

const initialState = {
  post: {},
  posts: [],
  postLoading: false,
  postsLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case postConstant.CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case postConstant.GET_POSTS:
      return {
        ...state,
        post: {},
        posts: [...action.payload],
      };
    case postConstant.GET_POST:
      return {
        ...state,
        post: { ...action.payload[0] },
      };
    case postConstant.UPDATE_POST:
      // Here we are leaving the post which we want to update
      const posts = state.posts.filter(
        (post) => post._id !== action.payload._id
      );
      return {
        ...state,
        post: {},
        posts: [...posts, action.payload], //here we are adding the updated post
      };
    case postConstant.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload), //if delete is not working try actionn.payload._id
      };
    case postConstant.TOGGLE_POST_LOADING:
      return {
        ...state,
        postLoading: !state.postLoading,
      };
    case postConstant.TOGGLE_POSTS_LOADING:
      return {
        ...state,
        postsLoading: !state.postsLoading,
      };
    case postConstant.RESET_POST:
      return initialState;
    default:
      return state;
  }
}
