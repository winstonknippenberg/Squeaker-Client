import React, { Component } from 'react';
import PropTypes from 'prop-types';
import hamster from '../images/hamster.ico';
import { Link } from 'react-router-dom';
//MUI
import { withStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
//redux
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

const styles = {
  form: {
    textAlign: 'center',
  },
  image: {
    maxWidth: 120,
  },
  textField: {
    margin: '10px auto 10px auto',
  },
  pageTitle: {
    margin: '10px auto 10px auto',
  },
  button: {
    marginTop: 20,
    marginBottom: 10,
    position: 'relative',
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
  },
  progress: {
    position: 'absolute',
  },
};

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      handle: '',
      loading: false,
      errors: {},
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const NewUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle,
    };
    this.props.signupUser(NewUserData, this.props.history);
  };
  handleChange = (event) => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;

    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={hamster} alt="hamster" className={classes.image} />
          <Typography variant="h2" className={classes.pageTitle}>
            Signup
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              variant="outlined"
              helperText={errors.email}
              error={errors.email ? true : false}
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              variant="outlined"
              helperText={errors.password}
              error={errors.password ? true : false}
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm password"
              variant="outlined"
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              className={classes.textField}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="handle"
              name="handle"
              type="text"
              label="Handle"
              variant="outlined"
              helperText={errors.handle}
              error={errors.handle ? true : false}
              className={classes.textField}
              value={this.state.handle}
              onChange={this.handleChange}
              fullWidth
            />
            {errors.general && (
              <Typography variant="body1" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Signup
              {loading && (
                <CircularProgress size="30" className={classes.progress} />
              )}
            </Button>
          </form>
          <Typography variant="caption">
            Already have an account? Login <Link to="/login">here</Link>
          </Typography>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

const mapActionsToProps = {
  signupUser,
};

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Signup));
