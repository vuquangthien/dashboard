import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { CardHeader, Card, Checkbox, Divider } from '@material-ui/core';

import CustomTextField from '../CustomTextField';
import * as Validators from '../../utils/validation';
import { RecursiveTreeView } from '../RecursiveTreeView';

const CustomList = ({
  classes,
  title,
  list,
  treeData,
  onChange,
  selectedList,
  onTextSearch,
  textSearch,
  height,
}) => {
  const [checkAll, setCheckAll] = useState(false);

  const searchTextRules = {
    isRequired: false,
    maxLength: 200,
  };

  useEffect(() => {
    if (!treeData || !treeData.length) {
      setCheckAll(false);
    }
  }, [treeData]);
  const handleChange = e => {
    const { value } = e.target;
    // value = (value || '').trimStart();
    if (!Validators.validateTextField(value, searchTextRules)) return;
    onTextSearch(value);
  };

  const handleToggleAll = () => () => {
    setCheckAll(!checkAll);
  };

  // const numberOfChecked = data => intersection(checked, data).length;
  return (
    <Card style={{ border: '1px solid rgba(0,0,0,0.25)' }}>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll()}
            checked={checkAll}
            // indeterminate={
            //   numberOfChecked(filterItems) !== filterItems.length &&
            //   numberOfChecked(filterItems) !== 0
            // }
            disabled={treeData.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        }
        action={
          <CustomTextField
            label="Tìm kiếm"
            value={textSearch}
            onChange={handleChange}
            fullWidth
            error={!Validators.validateTextField(textSearch, searchTextRules)}
            style={{ marginTop: 10, marginRight: 5, width: 200 }}
          />
        }
        title={title}
      />
      <Divider />
      <div style={{ height, overflowY: 'auto' }}>
        { treeData.length ?
          <RecursiveTreeView
          data={treeData}
          onChange={onChange}
          checkAll={checkAll}
          selectedList={selectedList}
          /> : null
        }
      </div>
    </Card>
  );
};

CustomList.defaultProps = {
  height: 'calc(100vh - 275px)',
};

CustomList.propTypes = {
  classes: PropTypes.object,
  treeData: PropTypes.object,
  title: PropTypes.string,
  height: PropTypes.string,
  list: PropTypes.array,
  onChange: PropTypes.func,
  selectedList: PropTypes.array,
};

export default CustomList;
