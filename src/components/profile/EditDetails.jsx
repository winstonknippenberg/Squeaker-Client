import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import MyButton from '../../utils/MyButton';
//redux
import { editUserDetails } from '../../redux/actions/userActions';

const styles = (theme) => ({
  form: {
    textAlign: 'center',
  },
  image: {
    maxWidth: 120,
  },
  textField: {
    margin: '10px auto 10px auto',
  },
  button: {
    float: 'right',
  },
  progress: {
    position: 'absolute',
  },
});

class EditDetails extends Component {
  state = {
    bio: '',
    website: '',
    location: '',
    open: false,
  };
  mapUserDetailsToState = (credentials) => {
    this.setState({
      bio: credentials.bio ? credentials.bio : '',
      website: credentials.website ? credentials.website : '',
      location: credentials.location ? credentials.location : '',
    });
  };
  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserDetailsToState(this.props.credentials);
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  componentDidMount() {
    const { credentials } = this.props;
    this.mapUserDetailsToState(credentials);
  }
  handleChange = (event) => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location,
    };
    this.props.editUserDetails(userDetails);
    this.handleClose();
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip="Edit details"
          btnClassName={classes.button}
        >
          <EditIcon color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogContent>
            <DialogTitle>Edit your details</DialogTitle>
            <form>
              <TextField
                name="bio"
                type="text"
                label="Bio"
                multiline
                rows="3"
                fullWidth
                placeholder="A short bio about yourself"
                className={classes.textField}
                value={this.state.bio}
                onChange={this.handleChange}
              />
              <TextField
                name="website"
                type="text"
                label="Website"
                placeholder="Your website"
                fullWidth
                className={classes.textField}
                value={this.state.website}
                onChange={this.handleChange}
              />
              <TextField
                name="location"
                type="text"
                label="Location"
                fullWidth
                placeholder="Where do you live?"
                className={classes.textField}
                value={this.state.location}
                onChange={this.handleChange}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

export default connect(mapStateToProps, { editUserDetails })(
  withStyles(styles)(EditDetails)
);
