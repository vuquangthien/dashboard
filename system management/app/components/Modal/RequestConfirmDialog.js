/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';
import moment from 'moment';
import CustomDialog from './CustomDialog';
import CustomTextField from '../CustomTextField';
import CustomAutocomplete from '../CustomAutocomplete';
import { CustomDatePicker } from '../DateRangePicker/DatePicker';
import { validateTextField } from '../../utils/validation';

export function RequestConfirmDialog(props) {
  const {
    onSave,
    onClose,
    open,
    title,
    samples,
    sampleTitle,
    dataSample,
    showDueDate,
    assignees,
    dialogAction,
    labelNote,
    fromSamplePage,
    showSamples,
    dueDate,
    setDueDate,
    maxDate,
    savePermission,
    closePermission,
    currentUser,
    extraAction,
  } = props;

  const [comment, setComment] = useState('');
  const [templateResponse, setTemplateResponse] = useState('');
  const [sample, setSample] = useState(dataSample || {});
  const [assignee, setAssignee] = useState(null);

  const minDate = moment()
    .add('d', 1)
    .startOf('d');

  const commentRules = {
    minLength: 5,
    maxLength: 500,
    isRequired: true,
    isSample: true,
  };

  useEffect(() => {
    if (open) {
      if (dataSample && samples) {
        setSample(dataSample);
        setComment(dataSample.comment || '');
        setTemplateResponse(dataSample.templateResponse || '');
      } else if (samples && samples.length > 0) {
        setSample(samples[0]);
        setComment(samples[0].comment || '');
        setTemplateResponse(samples[0].templateResponse || '');
      }
    }
    return () => {
      setSample(null);
      setComment('');
      setTemplateResponse('');
    };
  }, [open, samples]);

  const checkValidate = () =>
    validateTextField(comment, commentRules) &&
    (assignees ? assignee != null : true) &&
    (showDueDate
      ? dueDate &&
        moment(dueDate).isValid() &&
        !moment(dueDate).isBefore(minDate) &&
        !moment(dueDate).isAfter(maxDate)
      : true);

  const handleChange = value => {
    const newSample = {
      id: sample.id || null,
      ...value,
    };
    setSample(newSample);
    if (!fromSamplePage) {
      setComment(value && value.comment ? value.comment : '');
      setTemplateResponse(
        value && value.templateResponse ? value.templateResponse : '',
      );
    }
  };

  const handleSave = () => {
    if (checkValidate()) {
      const data = {
        ...sample,
        comment: comment.trim(),
        templateResponse: templateResponse.trim(),
      };
      if (assignee) {
        data.assignee = assignee.userName;
      }
      if (showDueDate) {
        if (dueDate) {
          data.dueDate = dueDate.unix() * 1000;
        } else {
          return;
        }
      }
      onSave(data);
    }
  };

  const handleChangeDate = date => {
    setDueDate(date);
  };

  return (
    <CustomDialog
      title={title}
      open={open}
      onClose={onClose}
      onSave={handleSave}
      canSave={checkValidate() === true}
      onCancel={onClose}
      dialogAction={dialogAction}
      savePermission={savePermission}
      closePermission={closePermission}
      currentUser={currentUser}
      extraAction={extraAction && extraAction(comment)}
    >
      <Grid container spacing={2}>
        {assignees && (
          <Grid item xs>
            <CustomAutocomplete
              optionLabel="displayName"
              value={assignee}
              required
              textLabel="Cán bộ xử lý"
              onChange={value => setAssignee(value)}
              options={assignees}
              isItemDisabled={u => u.disabled}
              disabledLabel="Đã thay cán bộ xử lý"
            />
          </Grid>
        )}
        {showDueDate && (
          <Grid item xs>
            <CustomDatePicker
              value={dueDate}
              required
              onDateChange={date => handleChangeDate(date)}
              minDate={minDate}
              maxDate={maxDate && maxDate}
              label="Thời hạn xử lý"
            />
          </Grid>
        )}
        {showSamples && (
          <Grid item xs={12}>
            <CustomAutocomplete
              optionLabel={sampleTitle ? 'displayName' : 'comment'}
              value={sample}
              required={fromSamplePage}
              textLabel={fromSamplePage ? 'Quy trình phản hồi' : 'Nội dung mẫu'}
              onChange={value => handleChange(value)}
              options={samples || []}
              disableClearable={
                sampleTitle
                  ? sample && !sample.displayName
                  : sample && !sample.comment
              }
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <CustomTextField
            value={templateResponse || comment}
            multiline
            error={
              !validateTextField(templateResponse || comment, commentRules)
            }
            rows={10}
            fullWidth
            required
            label={labelNote || 'Nội dung'}
            helperText={
              !validateTextField(templateResponse || comment, commentRules) &&
              `Tối thiểu ${commentRules.minLength} kí tự, tối đa ${
                commentRules.maxLength
              } kí tự`
            }
            rules={commentRules}
            onChange={e => {
              setComment(e.target.value);
              setTemplateResponse(e.target.value);
              if (!fromSamplePage) {
                setSample({});
              }
            }}
          />
        </Grid>
      </Grid>
    </CustomDialog>
  );
}

RequestConfirmDialog.defaultProps = {
  // samples: [],
  showDueDate: false,
  fromSamplePage: false,
  showSamples: true,
};

RequestConfirmDialog.propTypes = {
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  open: PropTypes.bool,
  samples: PropTypes.array,
  title: PropTypes.string,
  sampleTitle: PropTypes.bool,
  assignees: PropTypes.array,
  showDueDate: PropTypes.bool,
  dialogAction: PropTypes.bool,
  labelNote: PropTypes.string,
  fromSamplePage: PropTypes.bool,
  showSamples: PropTypes.bool,
  savePermission: PropTypes.string,
  closePermission: PropTypes.string,
  currentUser: PropTypes.string,
  extraAction: PropTypes.object,
};

export default memo(RequestConfirmDialog);
