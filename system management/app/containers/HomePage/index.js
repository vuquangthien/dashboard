import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Sidebar from 'components/Sidebar';
import Header from 'components/Header';
import User from 'containers/User/Loadable';
import theme from './theme';
import styles, { drawerWidth } from './styles';

import Path from '../../router';

function HomePage(props) {
  const { classes } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        {/* Thanh sidebar */}
        <Sidebar
          drawer={classes.drawer}
          mobileOpen={mobileOpen}
          drawerWidth={drawerWidth}
          handleDrawerToggle={handleDrawerToggle}
        />

        {/* Phần nội dung */}
        <div className={classes.app}>
          {/* Phần header */}
          <Header onDrawerToggle={handleDrawerToggle} />

          {/* Phần chính */}
          <main className={classes.main}>
            <Switch>
              <Route exact path={Path.USER} component={User} />
            </Switch>
          </main>

          {/* Phần footer */}
          <footer className={classes.footer} />
        </div>
      </div>
    </ThemeProvider>
  );
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);
