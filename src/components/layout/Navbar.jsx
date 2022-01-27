import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import MyButton from '../../utils/MyButton';
import PostSqueak from '../squeaks/PostSqueak';
import Notifications from './Notifications';
//mui
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import Typography from '@mui/material/Typography';
//redux
import { connect } from 'react-redux';

class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <AppBar>
        <Toolbar className="nav-container">
          {authenticated ? (
            <Fragment>
              <PostSqueak />
              <Link to="/">
                <MyButton tip="Home">
                  <HomeIcon color="primary.contrastText" />
                </MyButton>
              </Link>
              <Notifications />
            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit" component={Link} to="/login">
                <Typography variant="body2">Login</Typography>
              </Button>
              <Button color="inherit" component={Link} to="/">
                <Typography variant="body2">Home</Typography>
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                <Typography variant="body2">Signup</Typography>
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});
export default connect(mapStateToProps)(Navbar);
