import axios from "axios";
import {
  GET_CURRENT_PROFILE,
  CLEAR_ERRORS,
  GET_ERRORS,
  LOADING,
  GET_PROFILE,
  LOADINGFALSE,
  GET_PROFILES,
  CLEAR_CURRENT_USER
} from "./types";

export const getProfile = () => async dispatch => {
  try {
    dispatch(setProfileLoading());
    const res = await axios.get(
      "http://localhost:5000/routes/api/profiles/current"
    );

    dispatch({
      type: GET_CURRENT_PROFILE,
      payload: res.data
    });

    dispatch({ type: CLEAR_ERRORS });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
    dispatch({ type: LOADINGFALSE });
  }
};

export const createProfile = (profileData, history) => async dispatch => {
  try {
    const res = await axios.post(
      "http://localhost:5000/routes/api/profile",
      profileData
    );

    console.log(res);

    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const getProfiles = () => async dispatch => {
  try {
    dispatch(setProfileLoading());
    const res = await axios.get("http://localhost:5000/routes/api/profiles");
    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });

    dispatch({ type: CLEAR_ERRORS });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
    dispatch({ type: LOADINGFALSE });
  }
};

//GET PROFILE BY USERNAME
export const getProfilebyUsername = username => async dispatch => {
  try {
    dispatch(setProfileLoading());
    const res = await axios.get(
      `http://localhost:5000/routes/api/profiles/username/${username}`
    );

    dispatch({
      type: GET_CURRENT_PROFILE,
      payload: res.data
    });

    dispatch({ type: CLEAR_ERRORS });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
    dispatch({ type: LOADINGFALSE });
  }
};
//Profile loading
export const setProfileLoading = () => {
  return {
    type: LOADING
  };
};

//DELETE PROFILE AND USER
export const deleteProfileandUser = () => async dispatch => {
  try {
    if (window.confirm("Are you sure? This can not be undone")) {
      const res = await axios.delete(
        "http://localhost:5000/routes/api/profile"
      );

      dispatch({
        type: CLEAR_CURRENT_USER,
        payload: {}
      });
    }
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

//ADD ANIMANGA
export const addAnimanga = animangaData => async dispatch => {
  try {
    const res = await axios.post(
      "http://localhost:5000/routes/api/profile/animanga",
      animangaData
    );

    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};

//ADD ANIMANGA
export const removeAnimanga = id => async dispatch => {
  try {
    const res = await axios.delete(
      `http://localhost:5000/routes/api/profile/animanga/${id}`
    );

    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};

//ADD ANIMANGA
export const editAnimanga = (animangaData, id) => async dispatch => {
  try {
    const res = await axios.put(
      `http://localhost:5000/routes/api/profile/animanga/${id}`,
      animangaData
    );

    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};
