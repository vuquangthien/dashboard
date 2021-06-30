import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box } from '@material-ui/core';
import * as am4core from '@amcharts/amcharts4/core';

import defaultBackgroundIcon from '../../assets/img/backgroundIcon/defaultBackgroundIcon.png';
import redBackgroundIcon from '../../assets/img/backgroundIcon/redBackgroundIcon.png';
import grayBackgroundIcon from '../../assets/img/backgroundIcon/grayBackgroundIcon.png';
import greenBackgroundIcon from '../../assets/img/backgroundIcon/greenBackgroundIcon.png';
import yellowBackgroundIcon from '../../assets/img/backgroundIcon/yellowBackgroundIcon.png';
import blueBackgroundIcon from '../../assets/img/backgroundIcon/blueBackgroundIcon.png';
// TT
import {
  saveThemeToLocalStorage,
  getKeyColorThemeFromLocalStorage,
} from '../../utils/common';
import useStyles from '../../utils/styles';

const themes = [
  {
    src: defaultBackgroundIcon,
    text: 'Mặc định',
    key: 'default',
  },
  {
    src: greenBackgroundIcon,
    text: 'Lục',
    key: 'green',
  },
  {
    src: blueBackgroundIcon,
    text: 'Lam',
    key: 'blue',
  },
  {
    src: redBackgroundIcon,
    text: 'Đỏ-Trắng',
    key: 'red',
  },
  {
    src: yellowBackgroundIcon,
    text: 'Lục-Trắng',
    key: 'yellow',
  },
  {
    src: grayBackgroundIcon,
    text: 'Lam-Trắng',
    key: 'white',
  },
];

const useStyleListItem = makeStyles(() => (
  {
    list: {
      width: 260,
    },
    fullList: {
      width: 'auto',
    },
    item: {
      '&': {
        textAlign: 'center',
        border: '1px solid white',
        textAlign: 'center',
        height: '68px',
        margin: '6px 0px 0px!important',
        padding: '6px 16px!important',
      },
      '&:hover': {
        border: '1px solid #c1c1c1',
      },
    },
  }
));

function ListItemGrid(props) {

  const classesItem = useStyleListItem();
  const classes = useStyles();

  return (
    <div role="presentation">
      <Grid xs={12} container style={{ width: '16vw' }}>
        {themes.map((item, index) => (
          <Grid
            key={index}
            item
            xs={4}
            className={item.key === getKeyColorThemeFromLocalStorage('@theme') ? (classesItem.item + " " + classes.panelChangeThemeItemActiveStyle) : (classesItem.item)}
            style={{ padding: '1rem' }}
            // TT - CHANGE COLOR - THEME - GIAO DIEN BEN PHAI :
            onClick={() => {
              props.onClose();                           // ĐÓNG KHUNG ĐỔI THEME
              if (item.key !== getKeyColorThemeFromLocalStorage('@theme')) {
                saveThemeToLocalStorage('@theme', item.key);  // lưu xuống local                
                props.onClick(item.key);                // "SET STATE : CHANGE - CURRENT THEME = ONCLICK"
              }
            }}
          >
            <Box>
              <img src={item.src} style={{ width: '100%' }} />
            </Box>
            <Box>{item.text}</Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

ListItemGrid.propTypes = {
  onClose: PropTypes.func,
  onClick: PropTypes.func,
};

export default memo(ListItemGrid);
