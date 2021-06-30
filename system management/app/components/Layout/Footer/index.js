/* eslint-disable react/no-danger */
/**
 *
 * Footer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { createStructuredSelector } from 'reselect';
// material-ui components
import { withStyles, Box } from '@material-ui/core';
import footerStyle from 'assets/jss/material-dashboard-pro-react/components/footerStyle';
import { compose } from 'redux';
import { connect } from 'react-redux';
// import { cleanup } from '../../../containers/AdminPage/actions';
// import makeSelectpageConfigPage from '../../../containers/pageConfigPage/selectors';
import { makeSelectPageConfig } from '../../../containers/AdminPage/selectors';
import { getPageConfig } from '../../../containers/AdminPage/actions';
import { PAGE_CONFIG } from '../../../utils/commonConfig';
import {
  FRONT_END_FOOTER_MODE,
  FOOTER_MODE,
  FRONT_END_FOOTER_STR,
} from '../../../utils/constants';
function Footer(props) {
  const {
    classes,
    fluid,
    white,
    // onCleanup,
    pageConfig,
  } = props;
  // let { companyWebsite } = props;
  // if (companyWebsite) {
  //   if (companyWebsite.indexOf('www.') === -1) {
  //     companyWebsite = `www.${companyWebsite}`;
  //   }
  //   if (companyWebsite.indexOf('http://') === -1) {
  //     companyWebsite = `http://${companyWebsite}`;
  //   }
  // }
  // React.useEffect(() => {
  //   onGetPageConfig({
  //     parameters: [PAGE_CONFIG.FOOTER.param],
  //     key: PAGE_CONFIG.FOOTER.key,
  //   });
  // }, []);
  const container = cx({
    [classes.container]: !fluid,
    [classes.containerFluid]: fluid,
    [classes.whiteColor]: white,
  });
  // const anchor =
  //   classes.a +
  //   cx({
  //     [` ${classes.whiteColor}`]: white,
  //   });
  // const block = cx({
  //   [classes.block]: true,
  //   [classes.whiteColor]: white,
  // });
  // console.log(props.pageConfig);
  // console.log(pageConfig[PAGE_CONFIG.FOOTER.key]);
  // const createHtml = () => ({
  //   // eslint-disable-next-line react/prop-types
  //   __html:
  //     FOOTER_MODE === FRONT_END_FOOTER_MODE
  //       ? FRONT_END_FOOTER_STR
  //       : pageConfig &&
  //         pageConfig[PAGE_CONFIG.FOOTER.key] &&
  //         pageConfig[PAGE_CONFIG.FOOTER.key].value,
  // });
  return (
    <footer className={classes.footer}>
      {/* <div className={container} > */}
        <div className={classes.left}>
        {/* <div className={classes.left} dangerouslySetInnerHTML={createHtml()}> */}
          <Box display="flex" mt={2} pt={2}>
            <Box fontWeight="fontWeightBold" mr={1} className={classes.responsiveDisplayLeftFooter}>
              CỤC CẢNH SÁT QUẢN LÝ HÀNH CHÍNH VỀ TRẬT TỰ XÃ HỘI, BỘ CÔNG AN
            </Box>
            <Box className={classes.responsiveDisplayRightFooter}>-</Box>
            <Box ml={1} className={classes.responsiveDisplayRightFooter}>
              Địa chỉ: 47 Phạm Văn Đồng, Cầu Giấy, Hà Nội - SĐT: 069.234.2593
            </Box>
          </Box>
        </div>
      {/* </div> */}
    </footer>
  );
}
const mapStateToProps = createStructuredSelector({
  pageConfig: makeSelectPageConfig(),
});

function mapDispatchToProps(dispatch) {
  return {
    onGetPageConfig: query => dispatch(getPageConfig(query)),
    // onCleanup: data => dispatch(cleanup(data)),
  };
}
Footer.propTypes = {
  classes: PropTypes.object,
  fluid: PropTypes.bool,
  white: PropTypes.bool,
  pageConfig: PropTypes.object,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

// const withStyles = withStyles(footerStyle)(Footer);

export default compose(
  withConnect,
  withStyles(footerStyle),
)(Footer);

// export default withStyles(footerStyle)(Footer);
