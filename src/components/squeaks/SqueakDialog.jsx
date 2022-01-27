import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import MyButton from '../../utils/MyButton';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import LikeButton from './likeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';
//MUI
import { withStyles } from '@mui/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import ChatIcon from '@mui/icons-material/Chat';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
//redux
import { connect } from 'react-redux';
import { getSqueak } from '../../redux/actions/dataActions';

const styles = (theme) => ({
  invisibleSeparator: {
    visibility: 'hidden',
    margin: 4,
  },
  form: {
    textAlign: 'center',
  },
  profileImg: {
    maxWidth: 300,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover',
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
  expandButton: {
    position: 'absolute',
    left: '90%',
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  likeCommentDiv: {
    marginLeft: '-8px',
  },
  visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    marginBottom: '20px',
  },
});

class SqueakDialog extends Component {
  state = {
    open: false,
    oldPath: '',
    newPath: '',
  };

  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }
  handleOpen = () => {
    let oldPath = window.location.pathname;
    const { userHandle, squeakId } = this.props;
    const newPath = `/users/${userHandle}/squeak/${squeakId}`;
    if (oldPath === newPath) oldPath = `/users/${userHandle}`;
    window.history.pushState(null, null, newPath);

    this.setState({ open: true, newPath, oldPath });
    this.props.getSqueak(this.props.squeakId);
  };
  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
  };
  render() {
    const {
      classes,
      squeak: {
        squeakId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImg,
        userHandle,
        comments,
      },
      UI: { loading },
    } = this.props;

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={16}>
        <Grid item sm={5}>
          <img src={userImg} alt="Profile" className={classes.profileImg} />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <Typography variant="body2" color="primary.dark">
            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body1" color="primary.dark">
            {body}
          </Typography>
          <div className={classes.likeCommentDiv}>
            <LikeButton squeakId={squeakId} />
            <span>{likeCount} Likes</span>
            <MyButton tip="comments">
              <ChatIcon color="primary" />
            </MyButton>
            <span>{commentCount} Comments</span>
          </div>
        </Grid>
        <hr className={classes.visibleSeparator} />
        <CommentForm squeakId={squeakId} />
        <Comments comments={comments} />
      </Grid>
    );
    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip="Expand"
          tipClassName={classes.expandButton}
        >
          <UnfoldMoreIcon color="primary" />
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
          <DialogContent className={classes.dialogConent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

SqueakDialog.propTypes = {
  getSqueak: PropTypes.func.isRequired,
  squeakId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  squeak: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  squeak: state.data.squeak,
  UI: state.UI,
});

const mapActionsToProps = {
  getSqueak,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(SqueakDialog));
