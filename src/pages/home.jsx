import React, { Component } from 'react';
import Squeak from '../components/squeaks/Squeak';
import Profile from '../components/profile/Profile';
import PropTypes from 'prop-types';
import SqueakSkeleton from '../utils/SqueakSkeleton';
//mui
import Grid from '@mui/material/Grid';
//redux
import { getSqueaks } from '../redux/actions/dataActions';
import { connect } from 'react-redux';

class home extends Component {
  componentDidMount() {
    this.props.getSqueaks();
  }
  render() {
    const { squeaks, loading } = this.props.data;
    let recentSqueaksMarkup = !loading ? (
      squeaks.map((squeak) => <Squeak key={squeak.squeakId} squeak={squeak} />)
    ) : (
      <SqueakSkeleton />
    );

    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {recentSqueaksMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}
home.propTypes = {
  getSqueaks: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getSqueaks })(home);
