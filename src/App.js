import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/home.jsx';
import Login from './pages/login.jsx';
import Signup from './pages/signup.jsx';
import User from './pages/user.jsx';
import Navbar from './components/layout/Navbar';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';
import { Provider } from 'react-redux';
import store from './redux/store';
import AuthRoute from './utils/authRoute';
import jwtDecode from 'jwt-decode';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
import axios from 'axios';

axios.defaults.baseURL =
  'https://europe-central2-squeaker-app.cloudfunctions.net/api';

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('FBIdToken');
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    // eslint-disable-next-line no-unused-vars
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

const theme = createTheme({
  palette: {
    primary: {
      light: '#00897b',
      main: '#4ebaaa',
      dark: '#005b4f',
      contrastText: '#e0e0e0',
    },
    secondary: {
      light: '#80cbc4',
      main: '#b2fef7',
      dark: '#4f9a94',
      contrastText: '#424242',
    },
  },
});

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <div className="App">
            <Router>
              <Navbar />
              <div className="container">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <AuthRoute exact path="/login" component={Login} />
                  <AuthRoute exact path="/signup" component={Signup} />
                  <Route exact path="/users/:handle" component={User} />
                  <Route
                    exact
                    path="/users/:handle/squeak/:squeakId"
                    component={User}
                  />
                </Switch>
              </div>
            </Router>
          </div>
        </Provider>
      </ThemeProvider>
    );
  }
}

export default App;
