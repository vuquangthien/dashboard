import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { SwipeableDrawer, Divider, Box } from '@material-ui/core';
import ListItemGrid from './ListItemGrid';
import useStyles from '../../utils/styles';

function ChangeTheme(props) {
  const { open, onClose, onClick } = props;
  const classes = useStyles();

  return (
    <>
    {/* CYDB - SWIPE ABLE DRAWER : sử dụng ONCLOSE - chung với LIST ITEM GRID */}
      <SwipeableDrawer anchor="right" open={open} onClose={onClose}>
        <Box padding={2}>
          <Box
            className={classes.panelChangeThemeHeaderStyle}
            style={{
              textAlign: 'center',
              color: 'black',
              padding: '4px',
            }}
          >
            Tùy chọn màu sắc
          </Box>
          <Divider />
          {/* TT - GIAO DIỆN - CÁC NÚT CHỌN */}
          <ListItemGrid onClose={onClose} onClick={onClick} />
        </Box>
      </SwipeableDrawer>
    </>
  );
}

ChangeTheme.propTypes = {
  open: PropTypes.func,
  onClose: PropTypes.func,
  onClick: PropTypes.func,
};

export default memo(ChangeTheme);
