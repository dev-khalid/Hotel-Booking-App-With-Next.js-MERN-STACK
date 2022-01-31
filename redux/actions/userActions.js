import axios from 'axios';
import {
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  CLEAR_ERRORS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL, 
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
} from '../constants/userConstants';

//register user
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/auth/register', userData, config);

    dispatch({
      type: REGISTER_USER_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    const { data } = await axios.get('/api/me');
    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};


//update profile 
export const updateProfile = (userData) => async(dispatch) => { 
  try {
    dispatch({
      type: UPDATE_PROFILE_REQUEST
    }); 
    const config = {
      headers: { 
        'Content-Type': 'application/json'
      }
    }
    const {data} = await axios.put('/api/me/update',userData,config); 
    dispatch({
      type: UPDATE_PROFILE_SUCCESS, 
      payload: data.success
    })
  } catch (error) {
     dispatch({
       type: UPDATE_PROFILE_FAIL,
       payload: error.response.data.message,
     });
  }
}