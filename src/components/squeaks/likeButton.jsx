import React, { Component } from 'react';
import MyButton from '../../utils/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
//MUI
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
//redux
import { connect } from 'react-redux';
import { likeSqueak, unlikeSqueak } from '../../redux/actions/dataActions';

class LikeButton extends Component {
  likedSqueak = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.squeakId === this.props.squeakId
      )
    ) {
      return true;
    } else {
      return false;
    }
  };

  likeSqueak = () => {
    this.props.likeSqueak(this.props.squeakId);
  };
  unlikeSqueak = () => {
    this.props.unlikeSqueak(this.props.squeakId);
  };
  render() {
    const { authenticated } = this.props.user;
    const LikeButton = !authenticated ? (
      <MyButton tip="Like">
        <Link to="/login">
          <FavoriteBorderIcon color="primary" />
        </Link>
      </MyButton>
    ) : this.likedSqueak() ? (
      <MyButton tip="unlike" onClick={this.unlikeSqueak}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeSqueak}>
        <FavoriteBorderIcon color="primary" />
      </MyButton>
    );
    return LikeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  squeakId: PropTypes.string.isRequired,
  likeSqueak: PropTypes.func.isRequired,
  unlikeSqueak: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likeSqueak,
  unlikeSqueak,
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
