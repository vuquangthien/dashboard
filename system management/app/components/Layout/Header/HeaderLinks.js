/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Hidden, IconButton, withStyles } from '@material-ui/core';
import { Notifications } from '@material-ui/icons';
import headerLinksStyle from 'assets/jss/material-dashboard-pro-react/components/headerLinksStyle';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import {
  getNotifications,
  showSnackbar,
  sendNotification,
  updateNotification,
  viewAllNotifications,
  getProfileByWorkflowId,
  getMinistries,
  getBizServices,
  getFieldNames,
  getRequestHistories,
  updateRequestStatus,
  clearNewNotify,
  getApprovalRequest,
  getReceiveRequest,
  getRequest,
  getResultRequests,
} from '../../../containers/AdminPage/actions';
// import { getResultRequests } from '../../../containers/RequestListPage/actions';
import {
  makeSelectNewNotify,
  makeSelectNotifications,
  makeSelectCurrentUser,
  makeSelectProfileNotify,
  makeSelectMinistries,
  makeSelectBizServices,
  makeSelectFieldNames,
  makeSelectHistories,
  makeSelectApprovalRequest,
  makeSelectReceiveRequest,
  makeSelectSearchRequest,
  makeSelectUpdateRequestStatus,
  makeSelectRequestResult,
} from '../../../containers/AdminPage/selectors';
// import { makeSelectRequestResult } from '../../../containers/RequestListPage/selectors';
import NotificationList from './NotificationList';
import { RESPONSE_CODE, WF_STATUS_CODE, ROLES } from '../../../utils/constants';
import { receiveStatus } from '../../../utils/workFlow';
// import  ReceiveRequestDetailDialog  from '../../Modal/ReceiveRequestDetailDialog';
import CustomDialog from '../../Modal/CustomDialog';
import { convertToDateString } from '../../../utils/common';
import CustomLabel from '../../CustomLabel';
import ApprovalRequestDetailDialog from '../../Modal/ApprovalRequestDetailDialog';
import ReceiveRequestDetailDialog from '../../Modal/ReceiveRequestDetailDialog';
import RequestDetailDialog from '../../Modal/RequestDetailDialog';

const NotificationDialog = props => {
  const { notification, open, onClose } = props;
  let messageJson;
  // console.log(messageJson);
  if (notification) {
    // eslint-disable-next-line prefer-destructuring
    messageJson = notification.messageJson;
  }
  return (
    <CustomDialog open={open} onClose={onClose} maxWidth="sm">
      <CustomLabel
        label="Thời gian"
        value={notification && convertToDateString(notification.createdDate)}
      />
      <CustomLabel
        label="Nội dung"
        value={notification && messageJson.contentJson}
      />
    </CustomDialog>
  );
};
function HeaderLinks(props) {
  const {
    classes,
    rtlActive,
    // history,
    notify,
    notifications,
    onGetNotificaitons,
    // onSendNotificaiton,
    onUpdateNotificaiton,
    onViewAllNotifications,
    currentUser,
    onGetProfileNotify,
    profileNotify,
    ministries,
    bizServices,
    fieldNames,
    histories,
    onUpdateReceiveRequest,
    onGetRequestHistories,
    onClearNewNotify,
    approvalRequest,
    onGetApprovalRequest,
    receiveRequest,
    onGetReceiveRequest,
    onGetFieldNames,
    onGetBizServices,
    onGetMinistries,
    onGetRequest,
    searchRequest,
    onShowSnackbar,
    updateRequestStatusSuccess,
    color,
    requestResult,
    onGetRequestResult,
  } = props;

  const wrapper = classNames({
    [classes.wrapperRTL]: rtlActive,
  });

  const [open, setOpen] = useState(false);

  const [counter, setCounter] = useState(0);

  const [query, setQuery] = useState({
    username: null,
    limit: 10,
    skip: 0,
  });

  const [returnResultQuery, setReturnResultQuery] = useState({
    paging: {
      limit: 25,
      skip: 0,
      page: 1,
    },
  });
  
  const [receiveRequestDetail, setReceiveRequestDetail] = useState(null);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedNotifiy, setSelectedNotifiy] = useState(null);
  const [openNotificationDialog, setOpenNotificationDialog] = useState(false);
  const [openApprovalDetailDialog, setOpenApprovalDetailDialog] = useState(
    false,
  );
  const [approvalRequestDetail, setApprovalRequestDetail] = useState(null);

  const [openRequestDetailDialog, setOpenRequestDetailDialog] = useState(false);
  const [requestDetail, setRequestDetail] = useState(null);

  useEffect(() => {
    onGetFieldNames();
    onGetBizServices();
    onGetMinistries();
  }, []);

  useEffect(() => {
    if (currentUser) {
      setQuery({ ...query, username: currentUser.userName });
    }
  }, [currentUser]);

  useEffect(() => {
    if (notify && query.username) {
      // console.log('notify', notify);
      setCounter(counter + 1);
      // onShowSnackbar({ content: notify.content, variant: 'info' });
      try {
        const notifyContent = JSON.parse(notify.content);
        if (notifyContent && notifyContent.contentJson) {
          props.enqueueSnackbar(notifyContent.contentJson, {
            persist: false,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
            },
            // variant: 'info', // ['primary', 'info', 'success', 'warning', 'danger']
            // TT - MAU : "THONG BAO SNACKBAR- PHÍA TRÊN BÊN PHẢI"
            variant: color,
          });
        }
      } catch (error) {
        console.log('error', error);
      }
      if (open) {
        onGetNotificaitons(query);
      }
    }
  }, [notify, query.username]);
  // }, [notify, query.username, color]);

  useEffect(() => {
    if (notifications) {
      setCounter(parseInt(notifications.unreadCount, 10) || 0);
    }
  }, [notifications]);

  useEffect(() => {
    handleCloseDialog();
    handleCloseApprovalDialog();
    handleCloseDetailModal();
  }, [updateRequestStatusSuccess]);

  useEffect(() => {
    // console.log('profileNotify', profileNotify);
    // if (profileNotify)
    if (
      profileNotify &&
      profileNotify.notifyItem &&
      profileNotify.profile &&
      Object.keys(profileNotify.profile).length
    ) {
      try {
        let c = true;
        const { notifyItem, profile } = profileNotify;
        const { messageJson } = notifyItem;
        const { responseName } = messageJson;
        // console.log('responseName', responseName, 'profile', profile);
        // debugger
        if (responseName === RESPONSE_CODE.SEND_REQUEST) {
          if (
            notifyItem.messageJson.roleName === ROLES.APPROVER &&
            profile &&
            profile.status === WF_STATUS_CODE.WAITING_APPROVE_REQUEST
          ) {
            c = false;
            onGetRequestHistories(profile);
            onGetApprovalRequest(profile);
          }
        }
        if (responseName === RESPONSE_CODE.DENIE_REQUEST) {
          if (
            notifyItem.messageJson.roleName === ROLES.RECEIVER &&
            profile &&
            receiveStatus.find(status => status.code === profile.status)
          ) {
            c = false;
            onGetRequestHistories(profile);
            const getReceiveRequestQuery = {
              taskId: profile.receiveTaskId,
              sourceType: profile.sourceType,
              requestCodeInt: profile.requestCodeInt,
              sourceTypeDisplayName: profile.sourceTypeDisplayName,
              requestTypeDisplayName: profile.requestTypeDisplayName,
            };
            onGetReceiveRequest(getReceiveRequestQuery);
          }
        }
        if (c) {
          onGetRequestHistories(profile);
          // const getRequestQuery = {
          //   sourceTypeDisplayName: profile.sourceTypeDisplayName,
          //   requestTypeDisplayName: profile.requestTypeDisplayName,
          // };
          onGetRequest(profile);
        }
      } catch (error) {
        console.log('error', error);
      }
    }
  }, [profileNotify]);

  useEffect(() => {
    if (approvalRequest) {
      handleClose();
      setApprovalRequestDetail(approvalRequest);
      setOpenApprovalDetailDialog(true);
      onClearNewNotify();
    }
  }, [approvalRequest]);

  useEffect(() => {
    if (receiveRequest) {
      handleClose();
      setReceiveRequestDetail(receiveRequest);
      setOpenDetailDialog(true);
      onClearNewNotify();
    }
  }, [receiveRequest]);

  useEffect(() => {
    if (searchRequest) {
      setRequestDetail(searchRequest);
      const newQuery = {
        requestId: searchRequest.requestId,
        paging: {
          limit: 25,
          skip: 0,
          page: 1,
        },
      };
      console.log('newQuery', newQuery);
      setReturnResultQuery(newQuery);
      setOpenRequestDetailDialog(true);
      onClearNewNotify();
      onGetRequestResult(newQuery);
    }
  }, [searchRequest]);

  const handleClick = () => {
    if (!open) {
      onGetNotificaitons(query);
    }
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseNotiDialog = useCallback(() => {
    setOpenNotificationDialog(false);
  }, []);

  const handleLoadMore = () => {
    const newQuery = {
      ...query,
      limit: query.limit + 5,
    };
    onGetNotificaitons(newQuery);
    setQuery(newQuery);
  };
  const handleLoadDataNotify = useCallback(
      (limit = 25, skip = 0, page = 1) => {
        const newQuery = {
          ...returnResultQuery,
          paging: {
            skip,
            limit,
            page,
          },
        };
        onGetRequestResult(newQuery);
      },
      [returnResultQuery],
    );

  const handleReadNotification = item => {
    if (item && item.status === 0) {
      const data = {
        id: item.id,
        status: 1,
      };
      onUpdateNotificaiton(data);
    }
    if (item && item.messageJson && item.messageJson.workflowId) {
      const getProfileData = {
        notifyItem: item,
        query: {
          filter: {
            requestId: [item.messageJson.workflowId],
          },
          paging: {
            limit: 1,
            skip: 0,
          },
        },
      };
      onGetProfileNotify(getProfileData);
    }
  };
  const handleViewAllNotifications = () => {
    onViewAllNotifications();
  };

  const handleCloseDialog = useCallback(() => {
    handleClose();
    setOpenDetailDialog(false);
  }, []);

  const handleCloseApprovalDialog = useCallback(() => {
    handleClose();
    setOpenApprovalDetailDialog(false);
  }, []);

  const handleCloseDetailModal = useCallback(() => {
    handleClose();
    setOpenRequestDetailDialog(false);
  }, []);
  return (
    <div>
      <div>
        {receiveRequestDetail && (
          <ReceiveRequestDetailDialog
            request={receiveRequestDetail}
            histories={histories.histories}
            ministries={ministries}
            bizServices={bizServices}
            fieldNames={fieldNames}
            onClose={handleCloseDialog}
            open={openDetailDialog}
            onUpdateRequest={onUpdateReceiveRequest}
            currentUser={props.currentUser}
            onShowSnackbar={onShowSnackbar}
          />
        )}
        {approvalRequestDetail && (
          <ApprovalRequestDetailDialog
            request={approvalRequestDetail}
            histories={histories.histories}
            ministries={ministries}
            bizServices={bizServices}
            fieldNames={fieldNames}
            onClose={handleCloseApprovalDialog}
            open={openApprovalDetailDialog}
            onUpdateRequest={onUpdateReceiveRequest}
            currentUser={props.currentUser}
            onShowSnackbar={onShowSnackbar}
          />
        )}
        {requestDetail && (
          <RequestDetailDialog
            onClose={handleCloseDetailModal}
            histories={histories}
            bizServices={bizServices}
            ministries={ministries}
            fieldNames={fieldNames}
            request={requestDetail}
            requestResult={requestResult}
            open={openRequestDetailDialog}
            currentUser={props.currentUser}
            onShowSnackbar={onShowSnackbar}
            onLoadData={handleLoadDataNotify}
            tableHeight={500}
          />
        )}
      </div>
      <div className={wrapper}>
        <div style={{ position: 'absolute', right: '15px', top: '5px' }}>
          <IconButton
            color="secondary"
            aria-label="Notifications"
            aria-owns={open ? 'menu-list' : null}
            aria-haspopup="true"
            onClick={handleClick}
            className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
            classes={{
              label: rtlActive && classes.labelRTL,
            }}
          >
            <Notifications className={classes.links} />
            {Number(counter) > 0 && (
              <span className={classes.notifications}>{counter}</span>
            )}
            <Hidden mdUp>
              <p className={classes.linkText} />
            </Hidden>
          </IconButton>
          <NotificationList
            classes={classes}
            open={open}
            onClose={handleClose}
            onLoadMore={handleLoadMore}
            onReadNotification={handleReadNotification}
            onViewAllNotifications={handleViewAllNotifications}
            query={query}
            notifications={notifications}
          />
        </div>
        <NotificationDialog
          open={openNotificationDialog}
          onClose={handleCloseNotiDialog}
          notification={selectedNotifiy && selectedNotifiy}
        />
      </div>
    </div>
  );
}

HeaderLinks.propTypes = {
  classes: PropTypes.object,
  rtlActive: PropTypes.bool,
  // history: PropTypes.object,
  notify: PropTypes.object,
  notifications: PropTypes.object,
  onGetNotificaitons: PropTypes.func,
  onUpdateNotificaiton: PropTypes.func,
  enqueueSnackbar: PropTypes.func,
  currentUser: PropTypes.object,
  onViewAllNotifications: PropTypes.func,
  ministries: PropTypes.array,
  bizServices: PropTypes.array,
  fieldNames: PropTypes.array,
  histories: PropTypes.array,
  onGetRequestHistories: PropTypes.func,
  onClearNewNotify: PropTypes.func,
  requestResult: PropTypes.array,
  onGetRequestResult: PropTypes.func,

  // TT
  color: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  notify: makeSelectNewNotify(),
  notifications: makeSelectNotifications(),
  currentUser: makeSelectCurrentUser(),
  profileNotify: makeSelectProfileNotify(),
  ministries: makeSelectMinistries(),
  bizServices: makeSelectBizServices(),
  fieldNames: makeSelectFieldNames(),
  histories: makeSelectHistories(),
  approvalRequest: makeSelectApprovalRequest(),
  receiveRequest: makeSelectReceiveRequest(),
  searchRequest: makeSelectSearchRequest(),
  updateRequestStatusSuccess: makeSelectUpdateRequestStatus(),
  requestResult: makeSelectRequestResult(),
});

function mapDispatchToProps(dispatch) {
  return {
    onGetNotificaitons: query => {
      dispatch(getNotifications(query));
    },
    onUpdateNotificaiton: data => {
      dispatch(updateNotification(data));
    },
    onSendNotificaiton: data => {
      dispatch(sendNotification(data));
    },
    onShowSnackbar: data => dispatch(showSnackbar(data)),
    onViewAllNotifications: () => dispatch(viewAllNotifications()),
    onGetProfileNotify: data => dispatch(getProfileByWorkflowId(data)),
    onGetMinistries: () => dispatch(getMinistries()),
    onGetBizServices: () => dispatch(getBizServices()),
    onGetFieldNames: () => dispatch(getFieldNames()),
    onGetRequestHistories: data => dispatch(getRequestHistories(data)),
    onUpdateReceiveRequest: data => dispatch(updateRequestStatus(data)),
    onClearNewNotify: () => dispatch(clearNewNotify()),
    onGetApprovalRequest: data => dispatch(getApprovalRequest(data)),
    onGetReceiveRequest: data => dispatch(getReceiveRequest(data)),
    onGetRequest: data => dispatch(getRequest(data)),
    onGetRequestResult: data => dispatch(getResultRequests(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withSnackbar,
  withStyles(headerLinksStyle),
)(HeaderLinks);
