import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';

import {
  ListItemSecondaryAction,
  CardHeader,
  Card,
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

import CustomTextField from '../CustomTextField';
import * as Validators from '../../utils/validation';
import { RecursiveTreeView } from '../RecursiveTreeView';
import { buildTreeList } from '../../utils/common';
function not(a, b) {
  return a.filter(value => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter(value => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

const CustomList = ({
  classes,
  title,
  list,
  showApproval,
  checked,
  setChecked,
  setList,
  height,
  defaultTree,
}) => {
  const [searchText, setSearchText] = useState('');
  const [filterItems, setFilterItems] = useState([]);
  const searchTextRules = {
    isRequired: false,
    maxLength: 200,
  };
  useEffect(() => {
    if (searchText !== '') {
      setFilterItems(
        list.filter(
          i =>
            i.displayName.toLowerCase().indexOf(searchText.toLowerCase()) >= 0,
        ),
      );
    } else {
      setFilterItems(list);
    }
  }, [list]);

  const handleChange = e => {
    const { value } = e.target;
    // value = (value || '').trimStart();
    setSearchText(value);
    if (!Validators.validateTextField(value, searchTextRules)) return;
    const data = list.filter(
      i => i.displayName.toLowerCase().indexOf(value.toLowerCase()) >= 0,
    );
    // setFilterItems(data);
    setFilterItems(data);
  };

  const handleToggleAll = () => () => {
    if (numberOfChecked(filterItems) === filterItems.length) {
      setChecked(not(checked, filterItems));
    } else {
      setChecked(union(checked, filterItems));
    }
  };

  const numberOfChecked = data => intersection(checked, data).length;

  const handleCheckApproval = value => {
    const currentIndex = list.indexOf(value);
    if (currentIndex >= 0) {
      const item = list[currentIndex];
      item.checked = !item.checked;

      setList([...list]);
    }
  };

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll()}
            checked={
              numberOfChecked(filterItems) === filterItems.length &&
              filterItems.length !== 0
            }
            indeterminate={
              numberOfChecked(filterItems) !== filterItems.length &&
              numberOfChecked(filterItems) !== 0
            }
            disabled={filterItems.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        }
        action={
          <CustomTextField
            label="Tìm kiếm"
            value={searchText}
            onChange={handleChange}
            fullWidth
            error={!Validators.validateTextField(searchText, searchTextRules)}
            style={{ marginTop: 10, marginRight: 5, width: 200 }}
          />
        }
        title={title}
      />
      <Divider />
      {/* <div style={{ height: '550px', overflowY: 'auto' }}>
        <RecursiveTreeView data={defaultTree} />
      </div> */}
      <List
        className={classes.list}
        style={{ height }}
        dense
        component="div"
        role="list"
      >
        {filterItems.map(item => {
          const labelId = `transfer-list-all-item-${item.code}-label`;

          return (
            <ListItem
              key={item.id}
              role="listitem"
              button
              onClick={handleToggle(item)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(item) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>

              <ListItemText id={labelId} primary={`${item.displayName}`} />
              {showApproval && (
                <ListItemSecondaryAction style={{ marginLeft: 10 }}>
                  <Checkbox
                    checked={item.checked || false}
                    onClick={() => handleCheckApproval(item)}
                  />
                  Tự động
                </ListItemSecondaryAction>
              )}
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );
};

CustomList.propTypes = {
  classes: PropTypes.object,
  list: PropTypes.array,
  height: PropTypes.any,
  setList: PropTypes.func,
  showApproval: PropTypes.bool,
  title: PropTypes.string,
  checked: PropTypes.array,
  setChecked: PropTypes.func,
};

export default CustomList;
