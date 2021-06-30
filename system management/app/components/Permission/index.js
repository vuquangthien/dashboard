import React, { memo, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { makeSelectCurrentUser } from '../../containers/AdminPage/selectors';
import { checkHasPermission } from '../../utils/common';
export function Permission(props) {
  const { currentUser, permission, children } = props;
  const [hasPermission, setHasPermission] = useState(false);
  useEffect(() => {
    if (currentUser && permission && currentUser.actions) {
      // const check = currentUser.actions.find(e => `${e}` === `${permission}`);
      const check = checkHasPermission(currentUser, permission);
      if (check) {
        setHasPermission(true);
      }
    }
  }, [currentUser, permission, hasPermission]);
  return <>{hasPermission && children}</>;
}

Permission.propTypes = {
  currentUser: PropTypes.object,
  permission: PropTypes.string,
  children: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  memo,
  withConnect,
)(Permission);
