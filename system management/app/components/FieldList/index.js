import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Card,
  List,
  ListItem,
  ListItemText,
  Typography,
  makeStyles,
} from '@material-ui/core';
const useStyles = makeStyles(() => ({
  root: {
    height: '41vh',
    overflowY: 'auto',
  },
}));
function FieldList(props) {
  const { leftList, rightList, leftTitle, rightTitle, classes } = props;

  const defaultClasses = useStyles();

  const customList = (list, label) => (
    <>
      <Typography style={{ fontSize: '0.875 rem', fontWeight: 'Bold' }}>
        {label}
      </Typography>
      <Card
        variant="outlined"
        // style={{ height: 'calc(100% - 30px)' }}
        style={{ height: 'calc(100% - 33px)' }}
      >
        <Grid style={{ height: '100% ' }} classes={classes || defaultClasses}>
          <List style={{ height: '100% ' }} dense component="div" role="list">
            {list &&
              list.map((item, i) => {
                const labelId = `transfer-list-all-item-${item.code}-label`;
                return (
                  <ListItem key={item.id} role="listitem" button>
                    <ListItemText
                      id={labelId}
                      primary={`${i + 1}. ${item.displayName}`}
                    />
                  </ListItem>
                );
              })}
            <ListItem />
          </List>
        </Grid>
      </Card>
    </>
  );
  return (
    <Grid
      container
      spacing={2}
      justify="center"
      alignItems="center"
      style={{ height: '100%' }}
    >
      {leftList && leftTitle && (
        <Grid item xs>
          {customList(leftList, leftTitle)}
        </Grid>
      )}
      {rightList && rightTitle && (
        <Grid item xs style={{ height: '100%' }}>
          {customList(rightList, rightTitle)}
        </Grid>
      )}
    </Grid>
  );
}

FieldList.propTypes = {
  leftList: PropTypes.array,
  rightList: PropTypes.array,
  leftTitle: PropTypes.string,
  rightTitle: PropTypes.string,
  classes: PropTypes.object,
};

export default memo(FieldList);
