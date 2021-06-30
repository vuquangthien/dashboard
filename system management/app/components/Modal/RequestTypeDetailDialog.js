import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Paper, Grid, Tab, Tabs, Checkbox, Box } from '@material-ui/core';
import { Save, Check } from '@material-ui/icons';
import connect from 'react-redux/lib/connect/connect';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import FullscreenDialog from './FullscreenDialog';
import CustomTextField from '../CustomTextField';
import { useInput } from '../../utils/useInput';
import useStyles from '../../utils/styles';
import TransferTree from '../TransferTree';
import CustomFab from '../CustomButtons/Fab';
import {
  validateTextFieldReturnError,
  validateTextFieldAndCheckInListValueReturnError,
} from '../../utils/validation';
import { getAllCategories } from '../../containers/RequestTypePage/actions';
import { makeSelectAllCategoriesInRequestTypePage } from '../../containers/RequestTypePage/selectors';
import { LIST_ITEM_TYPE, FUNCTION_PERMISSIONS_MAPPING } from '../../utils/constants';
import { Permission } from '../Permission';

export function RequestTypeDetailDialog(props) {
  const classes = useStyles();

  const {
    titleAddOrEditDetailDialog,
    onClose,
    open,
    onSave,
    requestType,
    inputFields,
    filterFields,
    filterOutputFields,
    outputFields,
    // eslint-disable-next-line react/prop-types
    defaultTree,
    onGetAllCategories,
    allCategories,
    location,
  } = props;

  const [tabIndex, setIndex] = useState(0);
  const [filterResult, setFilterResult] = useState([]);
  const [outputResult, setOutputResult] = useState([]);
  const [serviceChecked, setServiceChecked] = useState(false);
  // TT
  const [queryNoPaging, setQueryNoPaging] = useState({
    itemType: LIST_ITEM_TYPE.BIS_SERVICE,
    textFilter: {
      searchFields: [
        'displayName',
        'code',
        'extraDataJson',
        'itemType',
        'createdUserName',
      ],
      searchText: '',
    },
    sort: {
      sortColumn: 'lastModifiedDate',
      sortOrder: 'desc',
    },
  });
  // TT
  const codeRules = {
    isRequired: true,
    minLength: 5,
    maxLength: 100,
    listValue: allCategories,
    isToUpperCase: true,
  };
  const {
    value: code,
    setValue: setCode,
    bind: bindCode,
    valid: validCode,
  } = useInput(
    '',
    null,
    requestType && requestType.displayName
      ? validateTextFieldReturnError
      : validateTextFieldAndCheckInListValueReturnError,
    codeRules,
  );
  const displayNameRules = {
    isRequired: true,
    minLength: 5,
    maxLength: 200,
  };
  const {
    value: displayName,
    setValue: setDisplayName,
    bind: bindDisplayName,
    valid: validDisplayName,
  } = useInput('', null, validateTextFieldReturnError, displayNameRules);
  const descriptionRules = {
    isRequired: false,
    minLength: 0,
    maxLength: 500,
  };
  const {
    value: description,
    setValue: setDescription,
    bind: bindDescription,
    valid: validDescriptioin,
  } = useInput('', null, validateTextFieldReturnError, descriptionRules);

  const handleCheck = () => {
    const checkVerify = JSON.parse(requestType && requestType.extraDataJson);
    const checkVerifyService = checkVerify && checkVerify.verifyService;
    setServiceChecked(checkVerifyService);
  };
  // TT
  useEffect(() => {
    onGetAllCategories(queryNoPaging);
  }, []);
  //
  useEffect(() => {
    if (!open) {
      setIndex(0);
    }
  }, [open]);

  useEffect(() => {
    if (requestType) {
      const {
        code: newCode,
        displayName: name,
        description: desc,
      } = requestType;
      setCode(newCode);
      setDisplayName(name);
      setDescription(desc);
      handleCheck();
    } else {
      setCode('');
      setDisplayName('');
      setDescription('');
    }
  }, [requestType]);

  useEffect(() => {
    if (requestType && requestType.displayName) {
      setFilterResult(filterFields);
      // setOutputResult(outputFields);
      setOutputResult(filterOutputFields);
      handleCheck();
    } else {
      setFilterResult([]);
      setOutputResult([]);
    }
    // TT - xóa màn trước khi ADD/EDIT
    }, [filterFields, filterOutputFields, requestType
    // , outputFields
  ]);
  const handleChangeTab = (e, index) => {
    setIndex(index);
  };

  const checkValid = () =>
    !validDisplayName &&
    !validCode &&
    !validDescriptioin &&
    filterResult && filterResult.length > 0 &&
    ((outputResult && outputResult.length > 0) || serviceChecked);
  const handleSave = () => {
    if (checkValid()) {
      const item = {
        filterFields: filterResult,
        // outputFields: outputResult,
        filterOutputFields: outputResult,
        requestType: {
          ...requestType,
          displayName: displayName.trim(),
          code: code.trim(),
          verifyService: serviceChecked,
          extraDataJson: JSON.stringify({
            description: description.trim(),
            verifyService: serviceChecked,
          }),
        },
      };
      onSave(item);
    }
  };
  const extendIcons = () => (
    // <Permission permission={FUNCTION_PERMISSIONS_MAPPING.REQUEST_TYPE_PAGE.SAVE}>
    <CustomFab onClick={handleSave} tooltip="Lưu" disabled={!checkValid()}>
      <Save color="primary" />
    </CustomFab>
    // </Permission>
  );

  return (
    <FullscreenDialog
      // TT
      title={titleAddOrEditDetailDialog}
      open={open}
      onClose={onClose}
      extendIcons={extendIcons}
    >
      <Fragment>
        <Paper className={classes.control2}>
          <Grid spacing={4} container className={classes.root}>
            <Grid item md={4} xs={4}>
              <CustomTextField
                fullWidth
                label="Mã nghiệp vụ"
                // error={true}
                required
                {...bindCode}
                disabled={
                  requestType &&
                  requestType.code != null &&
                  requestType.code.length > 0
                }
                error={
                  requestType && requestType.displayName ? false : validCode
                }
                type="snake_Case"
                helperText={
                  requestType && requestType.displayName ? false : validCode
                }
              />
            </Grid>
            <Grid item md={4} xs={4}>
              <CustomTextField
                required
                fullWidth
                label="Tên nghiệp vụ"
                {...bindDisplayName}
                error={validDisplayName}
                helperText={validDisplayName}
              />
            </Grid>
            <Grid item md={4} xs={4}>
              <CustomTextField
                // required
                multiline
                fullWidth
                label="Mô tả"
                error={validDescriptioin}
                {...bindDescription}
                helperText={validDescriptioin}
              />
            </Grid>
          </Grid>
        </Paper>
        <Paper className={classes.paperFullPageList3}>
          <Grid container>
            <Grid
              container
              style={{
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
              <Tabs
                indicatorColor="primary"
                textColor="primary"
                value={tabIndex || 0}
                onChange={handleChangeTab}
                arial-label=""
              >
                <Tab label="Dữ liệu đầu vào" />
                <Tab label="Dữ liệu đầu ra" />
              </Tabs>
              <Grid
                container
                style={{
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  width: 'auto',
                }}
              >
                <Box>
                  <Checkbox
                    checked={serviceChecked}
                    onClick={() => setServiceChecked(!serviceChecked)}
                  />
                </Box>
                <Box>Dịch vụ xác thực</Box>
              </Grid>
            </Grid>
          </Grid>
          {tabIndex === 0 && (
            <TransferTree
              left={inputFields}
              right={filterResult}
              setRight={list => {
                setFilterResult(list);
              }}
              defaultTree={defaultTree}
              height="calc(100vh - 310px)"
            />
            // </Paper>
            // <Paper className={classes.control}>
            // <TransferList
            //   left={inputFields}
            //   right={filterResult}
            //   setRight={setFilterResult}
            //   height="calc(100vh - 450px)"
            //   defaultTree={defaultTree}
            // />
            // </Paper>
          )}
          {tabIndex === 1 && (
            <TransferTree
              left={outputFields}
              right={outputResult}
              setRight={list => {
                setOutputResult(list);
              }}
              defaultTree={defaultTree}
              height="calc(100vh - 310px)"
            />
            // </Paper>
            // <Paper className={classes.control}>
            // <TransferList
            //   left={inputFields}
            //   right={outputResult}
            //   setRight={setOutputResult}
            //   height="calc(100vh - 450px)"
            //   defaultTree={defaultTree}
            // />
            // </Paper>
          )}
        </Paper>
      </Fragment>
    </FullscreenDialog>
  );
}

RequestTypeDetailDialog.propTypes = {
  titleAddOrEditDetailDialog: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  onSave: PropTypes.func,
  requestType: PropTypes.object,
  inputFields: PropTypes.array,
  filterFields: PropTypes.array,
  filterOutputFields: PropTypes.array,
  outputFields: PropTypes.array,
  onGetAllCategories: PropTypes.func,
  allCategories: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  allCategories: makeSelectAllCategoriesInRequestTypePage(),
});

const mapDispatchToProps = dispatch => ({
  onGetAllCategories: queryNoPage => dispatch(getAllCategories(queryNoPage)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(RequestTypeDetailDialog);
