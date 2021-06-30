/* eslint-disable prefer-destructuring */
/**
 *
 * Header
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import cx from 'classnames';

// material-ui components
import {
  withStyles,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Hidden,
  Typography,
} from '@material-ui/core';

// material-ui icons
import { Menu, MoreVert, ViewList } from '@material-ui/icons';

// core components

import headerStyle from 'assets/jss/material-dashboard-pro-react/components/headerStyle';
import { compose } from 'redux';
import HeaderLinks from './HeaderLinks';
// TT ??? - MINH CUSTOM ???
import CustomFab from '../../CustomButtons/Fab';
// import { configTheme } from '../../../configureTheme';

function Header(props) {
  const makeBrand = () => {
    let name;
    props.routes.map(prop => {
      if (prop.collapse) {
        prop.views.map(view => {
          if (view.path === props.location.pathname) {
            view.fullName ? (name = view.fullName) : (name = view.name);
          }
          return null;
        });
      }
      if (prop.path === props.location.pathname) {
        prop.fullName ? (name = prop.fullName) : (name = prop.name);
      }
      return null;
    });
    return name;
  };

  const { classes, color, rtlActive, ...rest } = props;

  const appBarClasses = cx({
    [` ${classes[color]}`]: color,
  });
  const sidebarMinimize = `${classes.sidebarMinimize} ${cx({
    [classes.sidebarMinimizeRTL]: rtlActive,
  })}`;

  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        {/* TT - IS 741 */}
        <div style={{width:props.miniActive ? '75px' : '275px'}} className={classes.responsiveDisplayLeftHeader} ></div>
        <Hidden smDown>
          <div className={sidebarMinimize}>
            {props.miniActive ? (
              <CustomFab
                onClick={props.sidebarMinimize}
                size="small"
                tooltip="Thu gọn"
                color="secondary"
              >
                <ViewList
                  className={classes.sidebarMiniIcon}
                  size="small"
                  tooltip="Mở rộng"
                />
              </CustomFab>
            ) : (
              <CustomFab
                onClick={props.sidebarMinimize}
                size="small"
                color="secondary"
              >
                <MoreVert className={classes.sidebarMiniIcon} size="small" />
              </CustomFab>
            )}
          </div>
        </Hidden>
        <div>
          {/* Here we create navbar brand, based on route name */}
          <Button className={classes.title}>{makeBrand() || ''}</Button>
        </div>
        <Hidden smDown implementation="css" className={classes.flex}>
                                                                                        {/* TT - IS 741 */}
          <Typography variant="h6" align="center" className={classes.textCenterHeader + " " + classes.responsiveDisplayTitleHeader} style={{marginLeft: props.miniActive ? '-145px' : '-160px'}}> {/* style={{marginLeft: props.miniActive ? '75px' : '275px'}} */}
            Phần mềm tích hợp CSDLQG về dân cư với các CSDL chuyên ngành khác
          </Typography>
        </Hidden>
        <Hidden implementation="css" className={classes.bellIcon}>
          <HeaderLinks
            {...rest}
            // classes={classes}
            // TT - MAU : "THONG BAO SNACKBAR- PHÍA TRÊN BÊN PHẢI" : theo VARIENT :
            color={color}
            rtlActive={rtlActive}
          />
        </Hidden>
        <Hidden mdUp>
          <IconButton
            className={classes.appResponsive}
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object,
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
  rtlActive: PropTypes.bool,
  routes: PropTypes.array,
  miniActive: PropTypes.bool,
  sidebarMinimize: PropTypes.func,
  name: PropTypes.string,
  location: PropTypes.object,
  handleDrawerToggle: PropTypes.func,
};

export default compose(
  memo,
  withStyles(headerStyle),
)(Header);
