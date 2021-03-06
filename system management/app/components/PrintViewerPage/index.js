/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/**
 *
 * ReportPage
 *
 */

import React, { Fragment, useRef, useEffect } from 'react';
import { Box, Button, Container, Paper, Grid } from '@material-ui/core';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getConfigPrint, convertToDateString } from '../../utils/common';
import {
  PRINT_CONFIG_PREFIX,
  APPROVAL_REQUEST_CONFIG_PREFIX,
  APPROVAL_REQUEST_TYPE,
  STATUS_CODE,
} from '../../utils/constants';
import { getCurrentUser } from '../../containers/AdminPage/actions';
import { makeSelectCurrentUser } from '../../containers/AdminPage/selectors';
import { DEFAULT_CONFIG } from './constants';

class ComponentToPrint extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      config: DEFAULT_CONFIG,
    };
  }

  componentDidMount() {
    const param = {
      parameters: [
        `${PRINT_CONFIG_PREFIX}.${APPROVAL_REQUEST_CONFIG_PREFIX}${
          APPROVAL_REQUEST_TYPE.REQUEST_APPROVAL_TYPE
        }`,
      ],
    };
    getConfigPrint(param).then(data => {
      if (data && data.status === STATUS_CODE.SUCCESS) {
        this.setState({
          // eslint-disable-next-line react/no-unused-state
          config: JSON.parse(data.parameters[0].value),
        });
      }
    });
  }

  render() {
    const {
      createdDate,
      sourceType,
      receivedDate,
      comment,
      requestType,
    } = this.props.data;
    const { config } = this.state;
    return (
      <Fragment>
        {config && (
          <Container>
            <Paper
              style={{
                width: '800px',
                height: '1050px',
                margin: 'auto',
                fontFamily: 'Time New Roman',
              }}
            >
              <Box padding={19}>
                <Grid
                  alignItems="center"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '12px',
                  }}
                >
                  <Grid item>
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-end"
                      height="100%"
                      align="center"
                      // pl={5}
                      alignItems="center"
                    >
                      {/* <Box fontWeight={500}>{config.managedOrg}</Box> */}
                      <Box style={{ textTransform: 'uppercase' }} fontSize={12}>
                        {config.managedOrg}
                      </Box>
                      <Box
                        fontWeight="fontWeightBold"
                        fontSize={12}
                        style={{ textTransform: 'uppercase', lineHeight: 1 }}
                      >
                        {config.upperLevelOrg}
                        <hr
                          style={{
                            height: '1px',
                            backgroundColor: 'black',
                            width: '45%',
                            padding: 0,
                            margin: 0,
                          }}
                        />
                      </Box>
                      {/* <Box style={{ backgroundColor: "black", height: "2px", width: "200px" }}>{config.managedOrg}</Box> */}
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box
                      display="flex"
                      flexDirection="column"
                      height="100%"
                      align="center"
                      alignItems="center"
                    >
                      <Box fontWeight="fontWeightBold" fontSize={12}>
                        C???NG H??A X?? H???I CH??? NGH??A VI???T NAM
                      </Box>
                      <Box
                        fontWeight="fontWeightBold"
                        fontSize={13}
                        style={{ lineHeight: 1 }}
                      >
                        ?????c l???p - T??? do - H???nh ph??c
                        <hr
                          style={{
                            // border: '1px solid',
                            height: '1px',
                            backgroundColor: 'black',
                            width: '100%',
                            padding: 0,
                            margin: 0,
                          }}
                        />
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
                {/*  */}
                <Grid
                  item
                  xs={12}
                  style={{ textAlign: 'right', marginTop: '10px' }}
                >
                  <Box fontStyle="italic" height={20} fontSize={13}>
                    {config.location}, ng??y ... th??ng ... n??m{' '}
                    {new Date().getFullYear()}
                  </Box>
                </Grid>
                {/*  */}
                <Grid item xs={12}>
                  <Box align="center" mt={15}>
                    <Box fontWeight="fontWeightBold" fontSize={14}>
                      PHI???U ????? XU???T PH?? DUY???T
                    </Box>
                    <Box fontWeight="fontWeightBold" fontSize={13} mt={1.5}>
                      V??? vi???c ph?? duy???t h??? s?? y??u c???u t??ch h???p d??? li???u
                    </Box>
                  </Box>
                  <Grid container style={{ fontSize: '13px' }}>
                    <Grid
                      item
                      xs={12}
                      style={{ textAlign: 'center', fontSize: '13px' }}
                    >
                      <Box fontSize={13} mt={1.5}>
                        <span>K??nh g???i:</span>{' '}
                        ............................................................................................................
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      {/* leftside of content */}
                      <Grid xs={6} item className="content-printpage__left">
                        <Grid>
                          <Box display="flex" flexDirection="row" mt={1.5}>
                            <Box fontSize={13}>C??n b??? y??u c???u : </Box>
                            <Box ml={1} fontSize={13}>
                              {/* {this.props.profile.assigneeDisplayName} */}
                              {this.props.currentUser.displayName}
                            </Box>
                          </Box>
                        </Grid>
                        <Grid>
                          <Box display="flex" flexDirection="row" mt={1.5}>
                            <Box>M?? y??u c???u :</Box>
                            <Box ml={1} fontSize={13}>
                              {this.props.profile.requestCodeInt}
                            </Box>
                          </Box>
                        </Grid>
                        <Grid>
                          <Box flexDirection="row" mt={1.5}>
                            <Box>????n v??? g???i y??u c???u : {sourceType}</Box>
                            {/* <Box ml={1} fontSize={13}>
                              
                            </Box> */}
                          </Box>
                        </Grid>
                      </Grid>
                      {/* rightside of content */}
                      <Grid item xs={6} className="content-printpage__right">
                        <Grid>
                          <Box display="flex" flexDirection="row" mt={1.5}>
                            <Box>Ng??y g???i phi???u: </Box>
                            <Box ml={1} fontSize={13}>
                              {convertToDateString(new Date() * 1)}
                            </Box>
                          </Box>
                        </Grid>
                        <Grid>
                          <Box display="flex" flexDirection="row" mt={1.5}>
                            <Box>Ng??y g???i y??u c???u : </Box>
                            <Box ml={1} fontSize={13}>
                              {createdDate && convertToDateString(createdDate)}
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item>
                          <Box flexDirection="row" mt={1.5}>
                            <Box>Nghi???p v??? t??ch h???p : {requestType}</Box>
                            {/* <Box ml={1} fontSize={13}>
                             
                            </Box> */}
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Box fontWeight="fontWeightBold" fontSize={13} mt={1.5}>
                        N???i dung g???i y??u c???u ph?? duy???t :
                      </Box>
                    </Grid>
                    <Grid item xs={12} style={{ textIndent: '37.8px' }}>
                      <Box fontSize={13} mt={1.5}>
                        {comment}
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box display="flex" flexDirection="column" mt={1.5}>
                        <Box fontSize={13} fontWeight="fontWeightBold">
                          ?? ki???n l??nh ?????o ph?? duy???t :
                        </Box>
                        <Box
                          display="flex"
                          flexDirection="row"
                          mt={1.5}
                          minHeight={100}
                          mb={1.5}
                        >
                          ...................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................
                        </Box>
                      </Box>
                    </Grid>
                    {config.upperLevelManagerSign.check === true ? (
                      <Grid
                        item
                        xs={12}
                        style={{
                          display: 'flex',
                          // alignItems: "center",
                          justifyContent: 'space-between',
                          width: '100%',
                          fontSize: '13px',
                        }}
                      >
                        <Grid item xs={6}>
                          <Box
                            textAlign="center"
                            mt={'41px'}
                          >
                            <Box
                              fontWeight="fontWeightBold"
                              fontSize={13}
                              style={{ textTransform: 'uppercase' }}
                            >
                              C??n b??? l???p phi???u
                            </Box>
                            <Box fontStyle="italic">(K??, ghi r?? h??? t??n)</Box>
                          </Box>
                          <Box mt={15}>
                            <Box
                              textAlign="center"
                              fontSize={13}
                              fontWeight="fontWeightBold"
                            >
                              {this.props.currentUser.displayName}
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={6} style={{ textAlign: 'center' }}>
                          {/* {config.upperLevelManagerSign.check && ( */}
                          <Box mt={
                            (config.upperLevelManagerSign.header && config.upperLevelManagerSign.title) ? '0px' 
                            : (config.upperLevelManagerSign.header||config.upperLevelManagerSign.title) ? '20px' : '0px'
                            }>
                            {/* ?????T TH???I GIAN L??N TR??N : TI??U ????? TRANG IN */}
                            <Box fontStyle="italic" height={20}>
                              {/* {config.location}, ng??y ... th??ng ... n??m{' '}
                              {new Date().getFullYear()} */}
                            </Box>
                            <Box fontWeight="fontWeightBold" fontSize={13}>
                              {config.upperLevelManagerSign.header ? (
                              <Box
                                fontWeight="fontWeightBold"
                                fontSize={13}
                                style={{ textTransform: 'uppercase' }}
                              >
                               {`KT. ${config.upperLevelManagerSign.header.toUpperCase()}`}
                              </Box>
                              ) : null }

                              {/* {config.upperLevelManagerSign.header
                                  ? `KT. ${config.upperLevelManagerSign.header.toUpperCase()}`
                                  : ''} */}

                              <Box
                                fontWeight="fontWeightBold"
                                fontSize={13}
                                style={{ textTransform: 'uppercase' }}
                              >
                                {config.upperLevelManagerSign.title}
                              </Box>
                              {config.upperLevelManagerSign.check === true ? (
                                <Box fontStyle="italic" fontWeight={300}>
                                  (K??, ghi r?? h??? t??n)
                                </Box>
                              ) : null}
                            </Box>
                            <Box mt={15}>
                              <Box
                                textAlign="center"
                                fontSize={13}
                                fontWeight="fontWeightBold"
                              >
                                {config.upperLevelManagerSign.name}
                              </Box>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    ) : (
                      <Grid
                        item
                        xs={12}
                        style={{
                          display: 'flex',
                          // alignItems: "center",
                          justifyContent: 'space-between',
                          width: '100%',
                          fontSize: '13px',
                        }}
                      >
                        <Grid item xs={6} />
                        <Grid item xs={6}>
                          <Box
                            textAlign="center"
                            mt={
                              config.upperLevelManagerSign.header
                                ? '41px'
                                : '20px'
                            }
                          >
                            <Box
                              fontWeight="fontWeightBold"
                              fontSize={13}
                              style={{ textTransform: 'uppercase' }}
                            >
                              C??n b??? l???p phi???u
                            </Box>
                            <Box fontStyle="italic">(K??, ghi r?? h??? t??n)</Box>
                          </Box>
                          <Box mt={15}>
                            <Box
                              textAlign="center"
                              fontSize={13}
                              fontWeight="fontWeightBold"
                            >
                              {this.props.currentUser.displayName}
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Container>
        )}
      </Fragment>
    );
  }
}
export function PrintRequest(props) {
  const componentRef = useRef();
  return (
    <>
      <ComponentToPrint
        currentUser={props.currentUser}
        onGetCurrentUser={props.onGetCurrentUser}
        data={props.data}
        profile={props.profile}
        ref={componentRef}
      />
      <ReactToPrint content={() => componentRef.current}>
        <PrintContextConsumer>
          {({ handlePrint }) => (
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" mt={-60}>
                <Box mr={4}>
                  <Button onClick={props.onClose} variant="outlined">
                    H???y
                  </Button>
                </Box>
                <Button
                  onClick={handlePrint}
                  variant="outlined"
                  style={{ backgroundColor: '#2196F3', color: '#ffffff' }}
                  color="primary"
                >
                  In
                </Button>
              </Box>
            </Grid>
          )}
        </PrintContextConsumer>
      </ReactToPrint>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});

// function mapDispatchToProps(dispatch) {
//   return { onGetCurrentUser: () => dispatch(getCurrentUser()) };
// }

const withConnect = connect(
  mapStateToProps,
  // mapDispatchToProps,
);

export default compose(withConnect)(PrintRequest);
// export default PrintRequest;
