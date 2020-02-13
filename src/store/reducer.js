// == Initial State
const initialState = {
  loginEmail: '',
  loginPassword: '',
  registerLastName: '',
  registerFirstName: '',
  registerUserName: '',
  registerEmail: '',
  registerPassword: '',
  email: '',
};

// == Types
export const ON_SUBMIT_LOGIN = 'ON_SUBMIT_LOGIN';
export const ON_SUBMIT_REGISTER = 'ON_SUBMIT_REGISTER';
export const GET_USER_INFO = 'GET_USER_INFO';
const ON_INPUT_CHANGE = 'ON_INPUT_CHANGE';
const SET_USER_INFO = 'SET_USER_INFO';
const SET_USERS_LOGIN = 'SET_USERS_LOGIN';
const CLEAN_REGISTER_FIELDS = ' CLEAN_REGISTER_FILEDS';
// == Reducer
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ON_INPUT_CHANGE:
      return {
        ...state,
        [action.name]: action.value,
      };
    case SET_USERS_LOGIN:
      return {
        ...state,
        token: action.token,
      };
    case CLEAN_REGISTER_FIELDS:
      return {
        ...state,
        registerLastName: '',
        registerFirstName: '',
        registerUserName: '',
        registerEmail: '',
        registerPassword: '',
      };
    case SET_USER_INFO:
      return {
        ...state,
        userInfo: {
          email: action.email,
          username: action.username,
          bio: action.bio,
        },
      };
    default:
      return state;
  }
};

// == Action Creators
export const onInputChange = (name, value) => ({
  type: ON_INPUT_CHANGE,
  name,
  value,
});
export const onsubmitLogin = () => ({
  type: ON_SUBMIT_LOGIN,
});
export const onsubmitRegister = () => ({
  type: ON_SUBMIT_REGISTER,
});
export const setUsersLogin = token => ({
  type: SET_USERS_LOGIN,
  token,
});
export const getUserInfo = () => ({
  type: GET_USER_INFO,
});
export const setUserInfo = (username, email, bio) => ({
  type: SET_USER_INFO,
  username,
  email,
  bio,
});
export const cleanRegisterFileds = () => ({
  type: CLEAN_REGISTER_FIELDS,
});
// == Export
export default reducer;
