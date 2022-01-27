import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_SQUEAK,
  UNLIKE_SQUEAK,
  MARK_NOTIFICATIONS_READ,
} from '../types';

const initialState = {
  authenticated: false,
  loading: false, // Loading at reducer level
  credentials: {},
  likes: [],
  notifications: [],
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case LIKE_SQUEAK:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            squeakId: action.payload.squeakId,
          },
        ],
      };

    case UNLIKE_SQUEAK:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.squeakId !== action.payload.squeakId
        ),
      };

    case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach((notification) => {
        notification.read = true;
      });
      return { ...state };
    default:
      return state;
  }
}
