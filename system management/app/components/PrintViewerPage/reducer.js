/* eslint-disable no-case-declarations */
/*
 *
 * ReportPage reducer
 *
 */
import produce from 'immer';
import {
  GET_REPORT,
  GET_REPORT_SUCCESS,
  GET_REPORT_FAILURE,
  CLEANUP,
} from './constants';

export const initialState = {
  isLoading: false,
  report: null,
};

/* eslint-disable default-case, no-param-reassign */
const reportPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_REPORT:
        draft.isLoading = true;
        break;
      case GET_REPORT_SUCCESS:
        draft.report = action.data;
        draft.isLoading = false;
        break;
      case GET_REPORT_FAILURE:
        draft.report = null;
        draft.isLoading = false;
        break;
      case CLEANUP:
        draft.report = null;
        draft.isLoading = false;
        break;
    }
  });

export default reportPageReducer;
