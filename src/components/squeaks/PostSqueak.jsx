import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import MyButton from '../../utils/MyButton';
//MUI
import { withStyles } from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';
import { DialogContent, TextField } from '@mui/material';
//redux
import { connect } from 'react-redux';
import { postSqueak } from '../../redux/actions/dataActions';

const styles = (theme) => ({
  form: {
    textAlign: 'center',
  },
  image: {
    maxWidth: 120,
  },
  textField: {
    margin: '20x auto 20px auto',
  },
  button: {
    float: 'right',
  },
  progressSpinner: {
    position: 'absolute',
  },
  submitButton: {
    position: 'relative',
    marginTop: '10px',
  },
  closeButton: {
    position: 'absolute',
    left: '91%',
    top: '6%',
  },
  title: {
    marginBottom: '10px',
  },
  content: {
    marginTop: '10px',
  },
});

class PostSqueak extends Component {
  state = {
    open: false,
    body: '',
    errors: {},
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false, body: '', errors: {} });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.postSqueak({ body: this.state.body });
    this.handleClose();
  };
  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;
    return (
      <Fragment>
        <MyButton tip="Squeak!" onClick={this.handleOpen}>
          <AddIcon color="primary.contrastText" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle className={classes.title}>Squeak your mind!</DialogTitle>
          <DialogContent className={classes.content}>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                multiline
                rows="3"
                placeholder="squeak squeak"
                errors={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textFeild}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}
PostSqueak.propTypes = {
  postSqueak: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { postSqueak })(
  withStyles(styles)(PostSqueak)
);
