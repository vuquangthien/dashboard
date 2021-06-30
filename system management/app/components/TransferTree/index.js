import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { Grid, Button } from '@material-ui/core';

import { ArrowBack, ArrowForward } from '@material-ui/icons';
import CustomList from './CustomList';
import { buildTreeFromTemplate, buildTreeList } from '../../utils/common';
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
  defaultPaper: {
    padding: `${theme.spacing(4)}px ${theme.spacing(4)}px`,
    height: `calc(100vh - 200px)`,
    paddingBottom: '0',
  },
  boderGridCustomList: {
    border: '1px solid rgba(0, 0, 0, 0.12)',
    borderRadius: '4px',
    '&:hover': {
      border: '1px solid rgba(0, 0, 0, 0.87)',
    },
  },
}));

export function TransferTree(props) {
  const { right, setRight, leftLabel, rightLabel, height, defaultTree } = props;

  const classes = useStyles();
  const [leftList, setLeftList] = useState([]);
  const [rightList, setRightList] = useState([]);
  const [leftTree, setLeftTree] = useState([]);
  const [rightTree, setRightTree] = useState([]);
  const [selectedLeftList, setSelectedLeftList] = useState([]);
  const [selectedRightList, setSelectedRightList] = useState([]);
  const [leftTextSearch, setLeftTextSearch] = useState('');
  const [rightTextSearch, setRightTextSearch] = useState('');
  useEffect(() => {
    const filterLeft = props.left.filter(
      item => right.find(r => r.code === item.code) == null,
    );
    setLeftList(filterLeft);
    setRightList(props.right);
    setLeftTree(buildTreeFromTemplate(filterLeft, defaultTree));
    setRightTree(buildTreeFromTemplate(props.right, defaultTree));
  }, [props.left, props.right]);

  const onLeftListChange = selected => {
    setSelectedLeftList(selected);
  };

  const onRightListChange = selected => {
    setSelectedRightList(selected);
  };

  const handleMoveSelectedToRight = () => {
    // debugger;
    const newLeftList = leftList.filter(
      item => !selectedLeftList.find(s => s.code === item.code),
    );
    const newRightList = rightList.concat(
      selectedLeftList.filter(item => !(item.children && item.children.length)),
    );
    setLeftList(newLeftList);
    setRightList(newRightList);
    setSelectedLeftList([]);
    setSelectedRightList([]);
    setLeftTree(buildTreeFromTemplate(newLeftList, defaultTree));
    setRightTree(buildTreeFromTemplate(newRightList, defaultTree));
    setRight(newRightList);
    setLeftTextSearch('');
    setRightTextSearch('');
  };

  const handleMoveSelectedToLeft = () => {
    // debugger;
    const newRightList = rightList.filter(
      item => !selectedRightList.find(s => s.code === item.code),
    );
    const newLeftList = leftList.concat(
      selectedRightList.filter(
        item => !(item.children && item.children.length),
      ),
    );
    setLeftList(newLeftList);
    setRightList(newRightList);
    setSelectedLeftList([]);
    setSelectedRightList([]);
    setLeftTree(buildTreeFromTemplate(newLeftList, defaultTree));
    setRightTree(buildTreeFromTemplate(newRightList, defaultTree));
    setRight(newRightList);
    setLeftTextSearch('');
    setRightTextSearch('');
  };

  const filterText = (list, searchText) => {
    if (list && list.length) {
      return list.filter(
        item =>
          item.displayName
            .toLowerCase()
            .trim()
            .indexOf(searchText.toLowerCase().trim()) > -1,
      );
    }
    return [];
  };

  const onLeftTextSearch = searchText => {
    setLeftTextSearch(searchText);
    const filterLeftList = filterText(leftList, searchText);
    setSelectedRightList([]);
    setLeftTree(buildTreeFromTemplate(filterLeftList, defaultTree));
  };

  const onRightTextSearch = searchText => {
    setRightTextSearch(searchText);
    const filterRightList = filterText(rightList, searchText);
    setSelectedRightList([]);
    setRightTree(buildTreeFromTemplate(filterRightList, defaultTree));
  };
  return (
    <Grid
      container
      // spacing={2}
      justify="center"
      alignItems="center"
      className={classes.root}
      // style={{ height: 'calc(100vh - 300px)' }}
      // style={{ height: 'calc(100vh - 220px)' }}
      style={{
        height: 'calc(100vh - 225px)',
        position: 'relative',
        top: '-15px ',
      }}
    >
      {/* TT - RES TRANSFER TREE */}
      <Grid item xs={12} lg className={classes.boderGridCustomList}>
        <CustomList
          classes={classes}
          title={leftLabel}
          height={height}
          selectedList={selectedLeftList}
          treeData={leftTree}
          onChange={onLeftListChange}
          onTextSearch={onLeftTextSearch}
          textSearch={leftTextSearch}
        />
      </Grid>
      {/* TT - RES TRANSFER TREE */}
      <Grid item xs={12} lg={1}>
        <Grid container direction="column" alignItems="center">
          {
            <Button
              variant="contained"
              size="small"
              className={classes.button}
              onClick={handleMoveSelectedToRight}
              disabled={selectedLeftList.length === 0}
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
              onClick={handleMoveSelectedToLeft}
              disabled={selectedRightList.length === 0}
              aria-label="move selected left"
            >
              <ArrowBack />
            </Button>
          }
        </Grid>
      </Grid>
      {/* TT - RES TRANSFER TREE */}
      <Grid item xs={12} lg className={classes.boderGridCustomList}>
        <CustomList
          classes={classes}
          title={rightLabel}
          height={height}
          treeData={rightTree}
          selectedList={selectedRightList}
          onChange={onRightListChange}
          onTextSearch={onRightTextSearch}
          textSearch={rightTextSearch}
        />
      </Grid>
    </Grid>
  );
}
TransferTree.defaultProps = {
  left: [],
  leftLabel: 'Danh sách dữ liệu',
  right: [],
  rightLabel: 'Danh sách dữ liệu được chọn',
  // height: 'calc(100vh - 220px)',
};

TransferTree.propTypes = {
  right: PropTypes.array,
  left: PropTypes.array,
  leftLabel: PropTypes.string,
  rightLabel: PropTypes.string,
  setRight: PropTypes.func,
  height: PropTypes.any,
  defaultTree: PropTypes.object,
};

export default TransferTree;
