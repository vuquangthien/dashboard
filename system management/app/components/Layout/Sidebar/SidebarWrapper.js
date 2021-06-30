/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar';

let ps;

function SidebarWrapper(props) {
  const { className, user, headerLinks, links } = props;

  const sidebarWrapperRef = useRef(null);

  useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(sidebarWrapperRef.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return () => {
      ps.destroy();
    };
  }, []);

  return (
    <div className={className} ref={sidebarWrapperRef}>
      {user}
      {/* {headerLinks} */}
      {links}
    </div>
  );
}

SidebarWrapper.propTypes = {};

export default SidebarWrapper;
