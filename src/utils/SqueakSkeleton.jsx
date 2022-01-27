import React, { Fragment } from 'react';
import noImg from '../images/noImg.png';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { withStyles } from '@mui/styles';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  card: {
    display: 'flex',
    marginBottom: 20,
  },
  cover: {
    minWidth: 200,
    objectFit: 'cover',
  },
  cardContent: {
    width: '100%',
    flexDirection: 'column',
    padding: 25,
  },
  handle: {
    width: 60,
    height: 18,
    backgroundColor: theme.palette.primary.main,
    opacity: 0.5,
    marginBottom: 7,
  },
  date: {
    height: 14,
    width: 100,
    backgroundColor: 'rgba(0,0,0,0.30)',
    marginBottom: 10,
  },
  fullLine: {
    height: 15,
    width: '90%',
    backgroundColor: 'rgba(0,0,0,0.20)',
    marginBottom: 10,
  },
  halfLine: {
    height: 15,
    width: '50%',
    backgroundColor: 'rgba(0,0,0,0.20)',
    marginBottom: 10,
  },
});

const SqueakSkeleton = (props) => {
  const { classes } = props;
  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <CardMedia className={classes.cover} image={noImg} />
      <CardContent className={classes.cardContent}>
        <div className={classes.handle} />
        <div className={classes.date} />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.halfLine} />
      </CardContent>
    </Card>
  ));
  return <Fragment>{content}</Fragment>;
};

SqueakSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SqueakSkeleton);
