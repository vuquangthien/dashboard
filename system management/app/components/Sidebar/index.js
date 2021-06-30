import React from 'react';
import Proptypes from 'prop-types';
import Hidden from '@material-ui/core/Hidden';
import Navigator from './Navigator';

function Sidebar(props) {
  return (
    <nav className={props.drawer}>
      {/* Màn hình điện thoại */}
      <Hidden smUp implementation="js">
        <Navigator
          PaperProps={{
            style: {
              width: props.drawerWidth,
            },
          }}
          variant="temporary"
          open={props.mobileOpen}
          onClose={props.handleDrawerToggle}
        />
      </Hidden>

      {/* Màn hình máy tính và tablet */}
      <Hidden xsDown implementation="css">
        <Navigator
          PaperProps={{
            style: {
              width: props.drawerWidth,
            },
          }}
        />
      </Hidden>
    </nav>
  );
}

Sidebar.propTypes = {
  drawer: Proptypes.string.isRequired,
  drawerWidth: Proptypes.number.isRequired,
  mobileOpen: Proptypes.bool.isRequired,
  handleDrawerToggle: Proptypes.func.isRequired,
};

export default Sidebar;
