import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import MyButton from '../../utils/MyButton';
//MUI
import { withStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
//redux
import { connect } from 'react-redux';
import { deleteSqueak } from '../../redux/actions/dataActions';

const styles = {
  deleteButton: {
    position: 'absolute',
    // float: 'right',
    left: '90%',
  },
};

class DeleteSqueak extends Component {
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  deleteSqueak = () => {
    this.props.deleteSqueak(this.props.squeakId);
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tip="Delete squeak"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutlineIcon color="secondary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.state.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Are you sure you want to delete this squeak?
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteSqueak} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}
DeleteSqueak.propTypes = {
  deleteSqueak: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  squeakId: PropTypes.string.isRequired,
};

export default connect(null, { deleteSqueak })(
  withStyles(styles)(DeleteSqueak)
);
