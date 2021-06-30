/* eslint-disable prettier/prettier */
import React, { memo, useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import CustomAutocomplete from '../CustomAutocomplete';
import { BIZ_CONFIG_PREFIX } from '../../utils/constants';


function Ministry2Biz(props) {
  const { onChange, sourceType, requestType, ministries, bizServices, allApprovalBiz } = props;
  const [localMinistries, setLocalMinistries] = useState([]);
  const [localBizServices, setLocalBizServices] = useState([]);
  const [localSourceType, setLocalSourceType] = useState([]);
  const [localRequestType, setLocalRequestType] = useState([]);

  const parseParameter = (bizCode, ministryCode) =>
    `${BIZ_CONFIG_PREFIX}.${ministryCode}.${bizCode}`;

  useEffect(() => {
    setLocalSourceType(sourceType);
  }, [sourceType]);

  useEffect(() => {
    setLocalRequestType(requestType);
  }, [requestType]);

  useEffect(() => {
    setLocalMinistries(ministries);
  }, [ministries]);

  useEffect(() => {
    setLocalBizServices(bizServices);
  }, [bizServices]);

  const handleChange = (name, value) => {
    if (name === 'requestType') {
      setLocalRequestType(value);
    }
    onChange(name, value);
  };

  const handleChangeSourceType = (name, value) => {
    setLocalSourceType(value);
    onSourceTypeChange(value);
    onChange(name, value);
  }

  const onSourceTypeChange = (newSourceType) => {
    if (!newSourceType || !newSourceType.length) {
      setLocalBizServices(bizServices);
    } else {
      const newLocalBizServices = bizServices.filter(biz => {
        if (Array.isArray(allApprovalBiz)) {
          return !!newSourceType.find(m => !!allApprovalBiz.find(a => a.parameter === parseParameter(biz.code, m.ministryCode)));
        }
        return false;
      });

      const newLocalRequestType = localRequestType.filter(r => newLocalBizServices.find(biz => biz.code === r.code));
      if (localRequestType.length) {
        setLocalRequestType(newLocalRequestType);
        onChange('requestType', newLocalRequestType);
      }
      setLocalBizServices(newLocalBizServices);
    
    }
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <CustomAutocomplete
            multiple
            optionLabel="ministryName"
            value={localSourceType}
            textLabel="Bộ ngành"
            onChange={value => handleChangeSourceType('sourceType', value)}
            options={localMinistries}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomAutocomplete
            multiple
            value={localRequestType}
            textLabel="Loại nghiệp vụ"
            onChange={value => handleChange('requestType', value)}
            options={localBizServices}
          />
        </Grid>
      </Grid>
    </>
  )
}
export default memo(Ministry2Biz);

Ministry2Biz.defaultProps = {
  
};

Ministry2Biz.propTypes = {
  onChange: PropTypes.func,
  sourceType: PropTypes.array,
  requestType: PropTypes.array,
  ministries: PropTypes.array,
  bizServices: PropTypes.array,
  allApprovalBiz: PropTypes.object,
}