import axios from "axios";

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
import { BASE_URL } from "../Constants/BASE_URL";

// User login action
export const UserLoginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQ });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${BASE_URL}/api/users/login`,
      { email, password },
      config
    );

    dispatch({ type: USER_LOGIN_REQ_SUCCESS, payload: data });
    
    localStorage.setItem("token", data.token); 
    localStorage.setItem("userInfo", JSON.stringify(data)); 
  } catch (error) {
    dispatch({
      type: USER_LOGIN_REQ_FAIL,
      payload: error.response?.data?.message || "Login failed",
    });
  }
};


// User logout action
export const UserLogoutAction = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  document.location.href = "/login";
};

// Register action
export const UserRegisterAction = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQ });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${BASE_URL}/api/users`,
      { name, email, password },
      config
    );

    dispatch({ type: USER_REGISTER_REQ_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_REQ_FAIL,
      payload: error.response?.data?.message || "Registration failed",
    });
  }
};

// Fetch all users action (for admin)
export const UserListAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQ });
    
    // Get user info (which contains the token) from the state
    const {
      userLoginReducer: { userInfo },
    } = getState();

    // If no token, throw an error
    if (!userInfo || !userInfo.token) {
      throw new Error("No token found, admin might not be logged in.");
    }

    // Config with Authorization header containing the Bearer token
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Make the API call to fetch users
    const { data } = await axios.get(`http://localhost:3000/api/users`, config);

    // Dispatch success action if users are fetched successfully
    dispatch({ type: USER_LIST_REQ_SUCCESS, payload: data });
  } catch (error) {
    // Log and dispatch failure action with appropriate error message
    console.error("Error fetching users:", error.response?.data);
    dispatch({
      type: USER_LIST_REQ_FAIL,
      payload: error.response?.data?.message || "Failed to fetch users",
    });
  }
};

// Update user action (for admin)
export const UserUpdateAction = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQ });
    
    const {
      userLoginReducer: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`${BASE_URL}/api/users/${user._id}`, user, config);

    dispatch({ type: USER_UPDATE_REQ_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_REQ_FAIL,
      payload: error.response?.data?.message || "Failed to update user",
    });
  }
};

// Delete user action (for admin)
export const UserDeleteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_REQ });

    const {
      userLoginReducer: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`${BASE_URL}/api/users/${id}`, config);

    dispatch({ type: USER_DELETE_REQ_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: USER_DELETE_REQ_FAIL,
      payload: error.response?.data?.message || "Failed to delete user",
    });
  }
};

