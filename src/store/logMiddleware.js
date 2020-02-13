import axios from 'axios';
import { 
  ON_SUBMIT_LOGIN,
  setUsersLogin,
  ON_SUBMIT_REGISTER,
  GET_USER_INFO,
  cleanRegisterFileds,
  setUserInfo,
} from 'src/store/reducer';

const logMiddleware = store => next => (action) => {
  next(action);

  switch (action.type) {
    case ON_SUBMIT_LOGIN:
      axios.post('http://localhost:3000/api/users/login', {
        email: store.getState().loginEmail,
        password: store.getState().loginPassword,
      })
        .then((response) => {
          store.dispatch(setUsersLogin(response.data.token));
          sessionStorage.setItem('token', JSON.stringify(store.getState().token));
          window.location.href = '/user';
        })
        .catch((error) => {
          console.error(error.message, 'Username or Password does not exists');
          console.error(error.response);
        });
      break;
    case ON_SUBMIT_REGISTER:
      axios.post('http://localhost:3000/api/users/register', {
        username: store.getState().registerUserName,
        email: store.getState().registerEmail,
        password: store.getState().registerPassword,
      })
        .then((response) => {
          store.dispatch(cleanRegisterFileds());
          window.location.href = '/login';
        })
        .catch((error) => {
          console.error(error.message);
          console.error(error.response);
        });
      break;
    case GET_USER_INFO:
      axios.get('http://localhost:3000/api/users/me', {
        headers: {
          Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`,
        },
      })
        .then((response) => {
          store.dispatch(setUserInfo(
            response.data.username,
            response.data.firstname,
            response.data.lastname,
            response.data.mail,
            response.data.Role.name,
            response.data.avatar,
          ));
        })
        // en cas d'echec : catch
        .catch((error) => {
          console.error(error.message);
          console.error(error.response);
        });
      break;
    default:
      next(action);
  }
};

export default logMiddleware;
