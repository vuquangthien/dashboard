import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import TimerIcon from '@material-ui/icons/Timer';
import SettingsIcon from '@material-ui/icons/Settings';
import AppsIcon from '@material-ui/icons/Apps';
import ExtensionIcon from '@material-ui/icons/Extension';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import CustomListItem from './CustomListItem';
import Path from '../../router';
import styles from './styles';

function Navigator(props) {
  const { classes, ...other } = props;
  const [userActived, setUserActived] = React.useState(true);
  const [departmentActived, setDepartmentActived] = React.useState(false);
  const [appActived, setAppActived] = React.useState(false);
  const [extensionActived, setExtensionActived] = React.useState(false);
  const [chartActived, setChartActived] = React.useState(false);
  const [analysisActived, setAnalysisActived] = React.useState(false);
  const [performanceActived, setPerformanceActived] = React.useState(false);

  const resetActive = () => {
    setUserActived(false);
    setDepartmentActived(false);
    setAppActived(false);
    setExtensionActived(false);
    setChartActived(false);
    setAnalysisActived(false);
    setPerformanceActived(false);
  };

  const handleActiveUser = () => {
    resetActive();
    other.onClose();
    setUserActived(true);
  };

  const handleActiveDepartment = () => {
    resetActive();
    other.onClose();
    setDepartmentActived(true);
  };

  const handleActiveApp = () => {
    resetActive();
    other.onClose();
    setAppActived(true);
  };

  const handleActiveExtension = () => {
    resetActive();
    other.onClose();
    setExtensionActived(true);
  };

  const handleActiveChart = () => {
    resetActive();
    other.onClose();
    setChartActived(true);
  };

  const handleActiveAnalysis = () => {
    resetActive();
    other.onClose();
    setAnalysisActived(true);
  };

  const handleActivePerformance = () => {
    resetActive();
    other.onClose();
    setPerformanceActived(true);
  };

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        {/* Trang chủ */}
        <ListItem className={clsx(classes.item, classes.itemCategory)}>
          <ListItemIcon className={classes.itemIcon}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.itemPrimary,
            }}
          >
            Tổng quan dự án
          </ListItemText>
        </ListItem>

        <ListItem className={classes.categoryHeader}>
          <ListItemText
            classes={{
              primary: classes.categoryHeaderPrimary,
            }}
          >
            Danh mục
          </ListItemText>
        </ListItem>

        <CustomListItem
          message="Người dùng"
          classes={classes}
          path={Path.USER}
          active={userActived}
          handleActive={handleActiveUser}
        >
          <PeopleIcon />
        </CustomListItem>

        <CustomListItem
          message="Phòng ban"
          classes={classes}
          path={Path.DEPARTMENT}
          active={departmentActived}
          handleActive={handleActiveDepartment}
        >
          <DnsRoundedIcon />
        </CustomListItem>

        <CustomListItem
          message="Ứng dụng"
          classes={classes}
          path={Path.APP}
          active={appActived}
          handleActive={handleActiveApp}
        >
          <AppsIcon />
        </CustomListItem>

        <CustomListItem
          message="Tiện ích"
          classes={classes}
          path={Path.EXTENSION}
          active={extensionActived}
          handleActive={handleActiveExtension}
        >
          <ExtensionIcon />
        </CustomListItem>

        <CustomListItem
          message="Biểu đồ"
          classes={classes}
          path={Path.CHART}
          active={chartActived}
          handleActive={handleActiveChart}
        >
          <ShowChartIcon />
        </CustomListItem>

        <Divider className={classes.divider} />

        <ListItem className={classes.categoryHeader}>
          <ListItemText
            classes={{
              primary: classes.categoryHeaderPrimary,
            }}
          >
            Nâng cao
          </ListItemText>
        </ListItem>

        <CustomListItem
          message="Phân tích"
          classes={classes}
          path={Path.ANALYSIS}
          active={analysisActived}
          handleActive={handleActiveAnalysis}
        >
          <SettingsIcon />
        </CustomListItem>

        <CustomListItem
          message="Hiệu suất"
          classes={classes}
          path={Path.PERFORMANCE}
          active={performanceActived}
          handleActive={handleActivePerformance}
        >
          <TimerIcon />
        </CustomListItem>

        <Divider className={classes.divider} />
      </List>
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.any,
};

export default withStyles(styles)(Navigator);
