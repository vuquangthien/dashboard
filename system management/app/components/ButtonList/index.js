import React, { useState, useCallback, memo } from 'react';
import { MenuItem, Menu, Button, Tooltip } from '@material-ui/core';
import PropTypes from 'prop-types';
import CustomFab from '../CustomButtons/Fab';
const ButtonList = props => {
  const {
    items,
    icon,
    variant,
    style,
    color,
    tooltip,
    customChildren,
    setCloseAfterClick,
  } = props;
  const [anchorEl, setAnchol] = useState(null);
  const handleOpen = useCallback(e => {
    setAnchol(e.currentTarget);
  }, []);
  return (
    <>
      <Tooltip title={tooltip}>
        <Button
          // title={tooltip}
          variant={variant}
          onClick={e => handleOpen(e)}
          style={style}
          color={color}
        >
          {icon}
        </Button>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        onClose={() => setAnchol(null)}
        open={Boolean(anchorEl)}
      >
        {customChildren ? (
          <>{customChildren}</>
        ) : (
          items &&
          items.map(item => (
            <MenuItem
              alignItems="center"
              value={item.value}
              key={item.value}
              onClick={() => {
                // eslint-disable-next-line no-unused-expressions
                if (item.cb && typeof item.cb === 'function')
                  item.cb(item.param ? item.param : item);
                if (setCloseAfterClick) {
                  setAnchol(null);
                }
              }}
            >
              {item.label}
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  );
};
ButtonList.propTypes = {
  //   children: PropTypes.object,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any,
      cb: PropTypes.func,
    }),
  ),
  variant: PropTypes.oneOf(['text', 'contained', 'outlined']),
  color: PropTypes.oneOf(['primary', 'inherit', 'secondary', 'default']),
  style: PropTypes.object,
  icon: PropTypes.element,
  tooltip: PropTypes.string,
  setCloseAfterClick: PropTypes.bool,
};
ButtonList.defaultProps = {
  //   children: PropTypes.object,
  variant: 'contained',
  color: 'primary',
  setCloseAfterClick: true,
};

export default memo(ButtonList);
