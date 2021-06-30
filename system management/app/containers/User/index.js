import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Box from '@material-ui/core/Box';
// import Table from 'components/Table';
import TabPanel from './TabPanel';
import styles from './styles';
import GridList from '../../components/GridList';

function User(props) {
  const { classes } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const a11yProps = index => ({
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  });

  return (
    <Box>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Tabs value={value} onChange={handleChange} textColor="inherit">
          <Tab textColor="inherit" label="Danh sách" {...a11yProps(0)} />
          <Tab textColor="inherit" label="Thêm mới" {...a11yProps(1)} />
          <Tab textColor="inherit" label="Cập nhật" {...a11yProps(2)} />
          <Tab textColor="inherit" label="Gán" {...a11yProps(3)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <GridList />
      </TabPanel>

      <TabPanel value={value} index={1} />

      <TabPanel value={value} index={2}>
        Item 3
      </TabPanel>

      <TabPanel value={value} index={3}>
        Item 4
      </TabPanel>
    </Box>
  );
}

User.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(User);
