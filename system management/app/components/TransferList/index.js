import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { Grid, Button } from '@material-ui/core';

import { ArrowBack, ArrowForward } from '@material-ui/icons';
import CustomList from './CustomList';
const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto',
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
    height: 'calc(100vh - 250px)',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
  boderGridCustomList: {
    border: '1px solid rgba(0, 0, 0, 0.12)',
    borderRadius: '4px',
    '&:hover': {
      border: '1px solid rgba(0, 0, 0, 0.87)',
    },
  },
}));

function not(a, b) {
  return a.filter(value => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter(value => b.indexOf(value) !== -1);
}

export function TransferList(props) {
  const { right, setRight, leftLabel, rightLabel, height, defaultTree } = props;
  const classes = useStyles();
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([]);
  useEffect(() => {
    setLeft(
      props.left.filter(item => right.find(r => r.code === item.code) == null),
    );
  }, [props.left, props.right]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  return (
    <Grid
      container
      // spacing={2}
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item xs className={classes.boderGridCustomList}>
        <CustomList
          list={left}
          checked={checked}
          setChecked={setChecked}
          classes={classes}
          title={leftLabel}
          height={height}
          defaultTree={defaultTree}
        />
      </Grid>

      <Grid item xs={12} lg={1}>
        <Grid
          container
          direction="column"
          alignItems="center"
          style={{ height: '72px' }}
        >
          {
            <Button
              variant="contained"
              size="small"
              className={classes.button}
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              <ArrowForward />
            </Button>
          }
          {
            <Button
              variant="contained"
              size="small"
              className={classes.button}
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              <ArrowBack />
            </Button>
          }
        </Grid>
      </Grid>

      <Grid item xs className={classes.boderGridCustomList}>
        <CustomList
          list={right}
          checked={checked}
          setChecked={setChecked}
          classes={classes}
          setList={setRight}
          showApproval={props.showApproval}
          title={rightLabel}
          height={height}
          defaultTree={defaultTree}
        />
      </Grid>
    </Grid>
  );
}
TransferList.defaultProps = {
  left: [],
  leftLabel: 'Danh sách dữ liệu',
  right: [],
  rightLabel: 'Danh sách dữ liệu được chọn',
};

TransferList.propTypes = {
  right: PropTypes.array,
  left: PropTypes.array,
  leftLabel: PropTypes.string,
  rightLabel: PropTypes.string,
  showApproval: PropTypes.bool,
  setRight: PropTypes.func,
  height: PropTypes.any,
};

export default TransferList;
