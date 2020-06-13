import createDataContext from './CreateDataContext';
import trackerApi from '../api/tracker';
import { AsyncStorage } from 'react-native';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'signin':
            return { token: action.payload, errorMessage: '' };
        case 'clear_error_message':
            return { ...state, errorMessage: '' };
        case 'signout':
            return { token: null, errorMessage: '' };
        default:
            return state;
    }
};

// Attempts to automatically sign in user on app startup
const tryLocalSignin = dispatch => async() => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        dispatch({ type: 'signin', payload: token });
        navigate('TrackList');
    } else {
        navigate('loginFlow');
    }
};

// Clears errors when switching between Signup and Signin
const clearErrorMessage = (dispatch) => () => {
    dispatch({ type: 'clear_error_message' });
};

// make api request to signup with email and password
const signup = (dispatch) => async ({ email, password }) => {
    try {
        // Sign in and store token in state
        const response = await trackerApi.post('/signup', { email, password });
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'signin', payload: response.data.token });

        // Navigate to main flow 
        navigate('TrackList');

    } catch (err) {
        // Sign up fails, give an error message
        console.log(err.message);
        dispatch({ type: 'add_error', payload: 'Something went wrong with sign up' });
    }
};

// make api request to signin with email and password
const signin = (dispatch) => async ({ email, password }) => {
    try {
        const response = await trackerApi.post('/signin', { email, password });
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'signin', payload: response.data.token });

        navigate('TrackList');

    } catch (err) {
        dispatch({ type: 'add_error', payload: 'Something went wrong with sign in' });
    }
};

const signout = (dispatch) => async () => {
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'signout' });
    navigate('loginFlow');
};

export const { Provider, Context } = createDataContext(
    authReducer, // Reducer Name
    { signup, signin, signout, clearErrorMessage, tryLocalSignin, signout }, // Callback functions
    { token: null, errorMessage: '' } // Original state
);