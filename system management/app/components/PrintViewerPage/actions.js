/*
 *
 * ReportPage actions
 *
 */

import {
  GET_REPORT,
  GET_REPORT_FAILURE,
  GET_REPORT_SUCCESS,
  CLEANUP,
} from './constants';

export function getReports(query) {
  return {
    type: GET_REPORT,
    query,
  };
}

export function getReportsSuccess(data) {
  return {
    type: GET_REPORT_SUCCESS,
    data,
  };
}

export function getReportsFailure(err) {
  return {
    type: GET_REPORT_FAILURE,
    err,
  };
}

export function cleanup(err) {
  return {
    type: CLEANUP,
    err,
  };
}
