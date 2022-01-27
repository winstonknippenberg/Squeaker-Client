import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../../utils/MyButton';
import DeleteSqueak from './DeleteSqueak';
import SqueakDialog from './SqueakDialog';
//mui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { withStyles } from '@mui/styles';
import ChatIcon from '@mui/icons-material/Chat';
import LikeButton from './likeButton';
//redux
import { connect } from 'react-redux';

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
  },
};

class Squeak extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      squeak: {
        body,
        createdAt,
        userImg,
        userHandle,
        squeakId,
        likeCount,
        commentCount,
      },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteSqueak squeakId={squeakId} />
      ) : null;
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImg}
          title="Profile image"
          className={classes.image}
        />
        <CardContent className={classes.details}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          <LikeButton squeakId={squeakId} />
          <span>{likeCount} Likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} Comments</span>
          <SqueakDialog
            squeakId={squeakId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
        </CardContent>
      </Card>
    );
  }
}
Squeak.propTypes = {
  user: PropTypes.object.isRequired,
  squeak: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Squeak));
