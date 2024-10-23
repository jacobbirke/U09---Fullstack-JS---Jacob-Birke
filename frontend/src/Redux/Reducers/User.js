import {
  USER_LOGIN_REQ,
  USER_LOGIN_REQ_SUCCESS,
  USER_LOGIN_REQ_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQ,
  USER_REGISTER_REQ_SUCCESS,
  USER_REGISTER_REQ_FAIL,
  USER_LIST_REQ,
  USER_LIST_REQ_SUCCESS,
  USER_LIST_REQ_FAIL,
  USER_UPDATE_REQ,
  USER_UPDATE_REQ_SUCCESS,
  USER_UPDATE_REQ_FAIL,
  USER_DELETE_REQ,
  USER_DELETE_REQ_SUCCESS,
  USER_DELETE_REQ_FAIL,
} from "../Constants/User";

// User login reducer
export const UserLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQ:
      return { loading: true };
    case USER_LOGIN_REQ_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_REQ_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

// User register reducer
export const UserRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQ:
      return { loading: true };
    case USER_REGISTER_REQ_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_REQ_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

// Define the initial state
const initialState = {
  loading: false,
  users: [], // users should be an empty array initially
  error: null,
};

// User List Reducer
export const UserListReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LIST_REQ:
      return { ...state, loading: true, users: [] }; // Reset users to an empty array when loading starts

    case USER_LIST_REQ_SUCCESS:
      return { ...state, loading: false, users: action.payload }; // Populate users from the action payload

    case USER_LIST_REQ_FAIL:
      return { ...state, loading: false, error: action.payload, users: [] }; // Set error and reset users to empty array

    case USER_DELETE_REQ_SUCCESS:
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.payload), // Remove deleted user from state
      };

    default:
      return state;
  }
};


// User update reducer (for admin)
export const UserUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQ:
      return { loading: true };
    case USER_UPDATE_REQ_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_REQ_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

// User delete reducer (for admin)
export const UserDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQ:
      return { loading: true };
    case USER_DELETE_REQ_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE_REQ_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
