import {
  SET_SQUEAKS,
  LOADING_DATA,
  LIKE_SQUEAK,
  UNLIKE_SQUEAK,
  DELETE_SQUEAK,
  POST_SQUEAK,
  SET_SQUEAK,
  SUBMIT_COMMENT,
} from '../types';

const initailState = {
  squeaks: [],
  squeak: {},
  loading: false,
};

export default function dataReducerSqitch(state = initailState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };

    case SET_SQUEAKS:
      return {
        ...state,
        squeaks: action.payload,
        loading: false,
      };

    case LIKE_SQUEAK:
      let index = state.squeaks.findIndex(
        (squeak) => squeak.squeakId === action.payload.squeakId
      );
      state.squeaks[index] = action.payload;
      if (state.squeak.squeakId === action.payload.squeakId) {
        state.squeak = action.payload;
      }
      return {
        ...state,
      };

    case UNLIKE_SQUEAK:
      let unlikeIndex = state.squeaks.findIndex(
        (squeak) => squeak.squeakId === action.payload.squeakId
      );
      state.squeaks[unlikeIndex] = action.payload;
      if (state.squeak.squeakId === action.payload.squeakId) {
        state.squeak = action.payload;
      }
      return {
        ...state,
      };

    case DELETE_SQUEAK:
      const squeakIndex = state.squeaks.findIndex(
        (squeak) => squeak.squeakId === action.payload
      );
      const _squeaks = [...state.squeaks];
      _squeaks.splice(squeakIndex, 1);

      return {
        ...state,
        squeaks: _squeaks,
      };
    case POST_SQUEAK:
      return {
        ...state,
        squeaks: [action.payload, ...state.squeaks],
      };
    case SET_SQUEAK:
      return {
        ...state,
        squeak: action.payload,
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        squeak: {
          ...state.squeak,
          comments: [action.payload, ...state.squeak.comments],
        },
      };
    default:
      return state;
  }
}
