import { combineReducers } from 'redux';
import { allRoomsReducer, roomDetailsReducer } from './roomReducers';
import {
  authReducer,
  forgotPasswordReducer,
  loadUserReducer,
  userReducer,
} from './userReducers';
const reducer = combineReducers({
  allRooms: allRoomsReducer,
  roomDetails: roomDetailsReducer,
  auth: authReducer,
  loadedUser: loadUserReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
});

export default reducer;
