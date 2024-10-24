import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// Define the initial state
const initialState = {
  token: null,
  user: null, // Include user state
  applications: [], // Add applications state
};

// Create a reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_AUTH': // Set both token and user
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };
    case 'CLEAR_AUTH': // Clear both token and user
      return { ...state, token: null, user: null };
    case 'ADD_APPLICATION': // Add new case for adding applications
      return {
        ...state,
        applications: [...state.applications, action.payload],
      }; // Append new application
    default:
      return state;
  }
};

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load token and user from localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    // If token and user exist in localStorage, set them in state
    if (token && user) {
      dispatch({
        type: 'SET_AUTH',
        payload: {
          token,
          user: JSON.parse(user),
        },
      });
    }
  }, []);

  // Function to get user details
  const getUserDetails = () => {
    return state.user;
  };

  // Function to log out the user
  const logout = () => {
    // Clear the token and user from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Clear the token and user from the context state
    dispatch({ type: 'CLEAR_AUTH' });
  };

  return (
    <AuthContext.Provider value={{ state, dispatch, getUserDetails, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
