import React, { createContext, useContext, useReducer } from 'react';

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
      return { ...state, token: action.payload.token, user: action.payload.user };
    case 'CLEAR_AUTH': // Clear both token and user
      return { ...state, token: null, user: null };
    case 'ADD_APPLICATION': // Add new case for adding applications
      return { ...state, applications: [...state.applications, action.payload] }; // Append new application
    default:
      return state;
  }
};

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
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
