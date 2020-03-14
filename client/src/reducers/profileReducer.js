import {
  GET_CURRENT_PROFILE,
  CLEAR_PROFILE,
  LOADING,
  LOADINGFALSE,
  GET_PROFILES
} from "../actions/types";

const initialState = {
  profile: {},
  profiles: {},
  name: "",
  hobbies: [],
  animanga: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_PROFILE:
      return {
        ...state,
        profile: action.payload,
        name: action.payload.user.name,
        hobbies: action.payload.hobbies,
        animanga: action.payload.animanga,
        loading: false
      };

    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };

    case CLEAR_PROFILE:
      return {
        ...state,
        profile: {},
        loading: false
      };

    case LOADING:
      return {
        ...state,
        loading: true
      };

    case LOADINGFALSE:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
};
