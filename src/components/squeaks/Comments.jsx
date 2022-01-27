import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const styles = (theme) => ({
  invisibleSeparator: {
    visibility: 'hidden',
    margin: 4,
  },
  commentImg: {
    maxWidth: '100%',
    height: 100,
    borderRadius: '50%',
    objectFit: 'cover',
  },
  commentData: {
    marginLeft: '20px',
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
  title: {
    marginBottom: '10px',
  },
  content: {
    marginTop: '10px',
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

class Comments extends Component {
  render() {
    const { comments, classes } = this.props;

    return (
      <Grid container>
        {comments.map((comment, index) => {
          const { body, createdAt, userImg, userHandle } = comment;
          return (
            <Fragment key={createdAt}>
              <Grid container>
                <Grid item sm={2}></Grid>
                <Grid item sm={2}>
                  <img
                    src={userImg}
                    alt="comment"
                    className={classes.commentImg}
                  />
                </Grid>
                <Grid item sm={7}>
                  <div className={classes.commentData}>
                    <Typography
                      variant="h5"
                      component={Link}
                      to={`/users/${userHandle}`}
                      color="primary"
                    >
                      {userHandle}
                    </Typography>
                    <Typography variant="body2">
                      {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body1">{body}</Typography>
                  </div>
                </Grid>
              </Grid>
              {index !== comments.length - 1 && (
                <hr className={classes.visibleSeparator} />
              )}
            </Fragment>
          );
        })}
      </Grid>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default withStyles(styles)(Comments);
