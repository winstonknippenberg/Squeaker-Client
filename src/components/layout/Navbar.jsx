import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import MyButton from '../../utils/MyButton';
import PostSqueak from '../squeaks/PostSqueak';
import Notifications from './Notifications';
import Logo from '../../images/hamsterLogo.png';
//mui
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
//redux
import { connect } from 'react-redux';

class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <AppBar>
        <Grid container className="navGrid">
          <Grid item sm className="navLogo">
            <div>
              <img src={Logo} alt="Logo" className="logo" />
            </div>
          </Grid>
          <Grid item sm className="navGridItem">
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
          </Grid>
          <Grid item sm />
        </Grid>

        <div className="routes"></div>
        <div className="blankNavItem"></div>
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
