import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Squeak from '../components/squeaks/Squeak';
import StaticProfile from '../components/profile/StaticProfile';
import SqueakSkeleton from '../utils/SqueakSkeleton';
import ProfileSkeleton from '../utils/ProfileSkeleton';
//MUI
import Grid from '@mui/material/Grid';
//redux
import { getUserData } from '../redux/actions/dataActions';
import { connect } from 'react-redux';

class User extends Component {
  state = {
    profile: null,
    squeakIdParam: null,
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const squeakId = this.props.match.params.squeakId;
    if (squeakId) this.setState({ squeakIdParam: squeakId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const { squeaks, loading } = this.props.data;
    const { squeakIdParam } = this.state;
    const squeaksMarkup = loading ? (
      <SqueakSkeleton />
    ) : squeaks === null ? (
      <p>No squeaks for this user</p>
    ) : !squeakIdParam ? (
      squeaks.map((squeak) => <Squeak key={squeak.squeakId} squeak={squeak} />)
    ) : (
      squeaks.map((squeak) => {
        if (squeak.squeakId !== squeakIdParam)
          return <Squeak key={squeak.squeakId} squeak={squeak} />;
        else return <Squeak key={squeak.squeakId} squeak={squeak} openDialog />;
      })
    );
    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {squeaksMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

User.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  data: state.data,
});
export default connect(mapStateToProps, { getUserData })(User);
