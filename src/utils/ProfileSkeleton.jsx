import React from 'react';
import noImg from '../images/noImg.png';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { withStyles } from '@mui/styles';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  paper: {
    padding: 20,
    height: 400,
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center',
    verticalAlign: 'middle',
  },

  imgWrapper: {
    textAlign: 'center',
    position: 'relative',
  },
  profileImage: {
    width: 200,
    height: 200,
    objectFit: 'cover',
    maxWidth: '100%',
    borderRadius: '50%',
  },
  halfLine: {
    position: 'relative',
    left: '23%',
    height: 15,
    width: '50%',
    backgroundColor: 'rgba(0,0,0,0.20)',
    marginBottom: 10,
    marginTop: 20,
  },
  fullLine: {
    position: 'relative',
    left: '15%',
    height: 15,
    width: '70%',
    backgroundColor: 'rgba(0,0,0,0.20)',
    marginBottom: 10,
    marginTop: 20,
  },
  handle: {
    width: 60,
    height: 20,
    backgroundColor: theme.palette.primary.main,
    opacity: 0.5,
    margin: '0 auto 7px auto',
  },
});

const ProfileSkeleton = (props) => {
  const { classes } = props;

  return (
    <Card className={classes.paper}>
      <div className={classes.imgWrapper}>
        <img src={noImg} alt="profile" className={classes.profileImage} />
      </div>
      <CardContent className={classes.cardContent}>
        <div className={classes.handle} />
        <div className={classes.date} />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.halfLine} />
      </CardContent>
    </Card>
  );
};

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileSkeleton);
