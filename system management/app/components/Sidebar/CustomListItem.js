import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CustomLink from './CustomLink';

function CustomListItem(props) {
  return (
    <CustomLink to={props.path} onClick={props.handleActive}>
      <ListItem
        button
        className={clsx(
          props.classes.item,
          props.active && props.classes.itemActiveItem,
        )}
      >
        <ListItemIcon className={props.classes.itemIcon}>
          {props.children}
        </ListItemIcon>
        <ListItemText
          classes={{
            primary: props.classes.itemPrimary,
          }}
        >
          {props.message}
        </ListItemText>
      </ListItem>
    </CustomLink>
  );
}

CustomListItem.propTypes = {
  message: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  handleActive: PropTypes.func,
  children: PropTypes.any,
};

export default CustomListItem;
