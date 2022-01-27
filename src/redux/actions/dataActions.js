import {
  SET_SQUEAKS,
  LOADING_DATA,
  LIKE_SQUEAK,
  UNLIKE_SQUEAK,
  DELETE_SQUEAK,
  LOADING_UI,
  SET_ERRORS,
  CLEAR_ERRORS,
  POST_SQUEAK,
  SET_SQUEAK,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
} from '../types';
import axios from 'axios';

export const getSqueaks = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/squeaks')
    .then((res) => {
      dispatch({ type: SET_SQUEAKS, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_SQUEAKS, payload: [] });
    });
};

export const postSqueak = (newSqueak) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/squeak', newSqueak)
    .then((res) => {
      dispatch({ type: POST_SQUEAK, payload: res.data });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const likeSqueak = (squeakId) => (dispatch) => {
  axios
    .get(`/squeak/${squeakId}/like`)
    .then((res) => {
      dispatch({ type: LIKE_SQUEAK, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const unlikeSqueak = (squeakId) => (dispatch) => {
  axios
    .get(`/squeak/${squeakId}/unlike`)
    .then((res) => {
      dispatch({ type: UNLIKE_SQUEAK, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const submitComment = (squeakId, commentData) => (dispatch) => {
  axios
    .post(`/squeak/${squeakId}/comment`, commentData)
    .then((res) => {
      dispatch({ type: SUBMIT_COMMENT, payload: res.data });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const deleteSqueak = (squeakId) => (dispatch) => {
  axios
    .delete(`squeak/${squeakId}`)
    .then(() => {
      dispatch({ type: DELETE_SQUEAK, payload: squeakId });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getSqueak = (squeakId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/squeak/${squeakId}`)
    .then((res) => {
      dispatch({
        type: SET_SQUEAK,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({ type: SET_SQUEAKS, payload: res.data.squeaks });
    })
    .catch(() => {
      dispatch({ type: SET_SQUEAKS, payload: null });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
