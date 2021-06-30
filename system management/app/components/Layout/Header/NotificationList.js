/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable prefer-destructuring */
/**
 *
 * Header
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';

// material-ui components
import {
  Typography,
  ClickAwayListener,
  Grow,
  Paper,
  MenuList,
  MenuItem,
  Grid,
  Avatar,
  makeStyles,
  Menu,
  IconButton,
} from '@material-ui/core';

// material-ui icons
import { AlarmOn, Title, MoreHorizOutlined } from '@material-ui/icons';

import { convertToDateString } from '../../../utils/common';
import CustomDialog from '../../Modal/CustomDialog';
import CustomLabel from '../../CustomLabel';

const useStyles = makeStyles(() => ({
  isRead: {
    padding: '0.5rem',
    height: 'auto',
    backgroundColor: '#fff',
    borderColor: '#dddfe2',
    margin: 0,
    whiteSpace: 'normal',
    borderBottom: '1px solid #dee2e6',
  },
  isNotRead: {
    padding: '0.5rem',
    height: 'auto',
    backgroundColor: '#edf2fa',
    borderColor: '#dddfe2',
    margin: 0,
    whiteSpace: 'normal',
    borderBottom: '1px solid #dee2e6',
  },
}));

const NotificationDialog = props => {
  const { notification, open, onClose } = props;
  // console.log(notification);

  return (
    <CustomDialog open={open} onClose={onClose}>
      <CustomLabel
        label="Nội dung"
        value={notification && notification.messageJson}
      />
      <CustomLabel
        label="Thời gian"
        value={notification && convertToDateString(notification.createdDate)}
      />
    </CustomDialog>
  );
};

function NotificationList(props) {
  const {
    open,
    onClose,
    classes,
    notifications,
    onReadNotification,
    onViewAllNotifications,
    query,
    onLoadMore,
  } = props;

  const styles = useStyles();

  const [openNotificationDialog, setOpenNotificationDialog] = useState(false);

  const [selectedNotifiy, setSelectedNotifiy] = useState(null);

  const [anchorEl, setAnchol] = useState(false);
  const handleClick = item => {
    // if (item.status === 0) {
    onReadNotification(item);
    // }
  };

  const handleClose = () => {
    setOpenNotificationDialog(false);
    setSelectedNotifiy(null);
  };

  const handleViewAllNotifications = () => {
    setAnchol(null);
    onViewAllNotifications();
  };
  return (
    open && (
      <>
        <ClickAwayListener onClickAway={onClose}>
          <div
            style={{
              position: 'absolute',
              zIndex: 2,
              right: '18px',
              top: '62px',
            }}
            className={classes.dropdown}
          >
            <Grow
              in={open}
              onClose={onClose}
              id="menu-list"
              className={classes.menuNotice}
              style={{
                position: 'fixed',
                top: '72px',
                right: '18px',
                border: '1px solid #d9d9d9',
                // transformOrigin: '0 0 0',                
                boxShadow: '0px 0px 2px 2px rgba(0, 0, 0, 0.18)', // boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0)',
                width: 316,
              }}
            >
              <Paper>
                <Grid container>
                  <Grid item xs={10}>
                    <Typography
                      component="p"
                      style={{
                        fontWeight: 'bold',
                        fontSize: '18px',
                        paddingLeft: '10px',
                        marginTop: '10px',
                      }}
                    >
                      Thông báo
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      // color="primary"
                      aria-label="more"
                      aria-haspopup="true"
                      onClick={e => {
                        setAnchol(e.target);
                      }}
                    >
                      <MoreHorizOutlined />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      onClose={() => setAnchol(null)}
                      open={Boolean(anchorEl)}
                    >
                      <MenuItem onClick={handleViewAllNotifications}>
                        Đánh dấu tất cả là đã đọc
                      </MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
                <hr style={{ marginTop: 5, marginBottom: 0 }} />
                <MenuList
                  role="menu"
                  style={{
                    maxHeight: 500,
                    margin: 0,
                    paddingTop: 0,
                    whiteSpace: 'normal',
                    overflowY: 'auto',
                  }}
                  className={classes.menuNotice}
                >
                  {/* {console.log(this.state.notifications)} */}
                  {notifications.data && notifications.data.length > 0 ? (
                    notifications.data.map((item, index) => (
                      <MenuItem
                        className={
                          item.status === 1 ? styles.isRead : styles.isNotRead
                        }
                        onClick={() => handleClick(item)}
                        key={`menu_${index}`}
                      >
                        <Grid container justify="center" alignItems="center">
                          <Grid item sm={2} style={{ width: 50 }}>
                            <Avatar alt="Remy Sharp" />
                          </Grid>
                          <Grid item sm={10} style={{ width: 250 }}>
                            <p
                              style={{
                                fontSize: 12,
                                width: 250,
                                wordBreak: 'break-word',
                                display: 'block !important',
                              }}
                              className="mb-0"
                            >
                              <Title style={{ fontSize: 14 }} color="primary" />{' '}
                              <b style={{ wordBreak: 'break-word' }}>
                                {item.messageJson.contentJson}
                              </b>
                            </p>
                            <p style={{ fontSize: 12 }} className="mb-0">
                              <AlarmOn
                                style={{ fontSize: 14 }}
                                color="primary"
                              />
                              {convertToDateString(item.createdDate)}
                            </p>
                          </Grid>
                        </Grid>
                      </MenuItem>
                    ))
                  ) : (
                    <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
                      Bạn không có thông báo nào!
                    </div>
                  )}
                  {notifications && notifications.totalCount > query.limit && (
                    <Typography
                      component="p"
                      className={classes.moreNotice}
                      style={{
                        textAlign: 'center',
                        color: '#0795db',
                        fontSize: '13px',
                        padding: '5px',
                        marginTop: '10px',
                      }}
                      onClick={onLoadMore}
                    >
                      Xem thêm
                    </Typography>
                  )}
                </MenuList>
              </Paper>
            </Grow>
          </div>
        </ClickAwayListener>
        <NotificationDialog
          open={openNotificationDialog}
          onClose={handleClose}
          notification={selectedNotifiy}
        />
      </>
    )
  );
}

NotificationList.propTypes = {
  classes: PropTypes.object,
  onLoadMore: PropTypes.func,
  notifications: PropTypes.object,
  onViewAllNotifications: PropTypes.func,
};

export default memo(NotificationList);
