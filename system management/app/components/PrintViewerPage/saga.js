import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_REPORT } from './constants';
import request from '../../utils/request';
import { getReportsSuccess, getReportsFailure } from './actions';
import { REQUEST_METHOD, REPORT_URL, STATUS_CODE } from '../../utils/constants';

export function* fetchReport(action) {
  // yield put(getReportsSuccess(mockData));
  // return;
  const { query } = action;
  const { reportType, ...body } = query;

  const url = `${REPORT_URL}/${reportType}`;
  try {
    const response = yield call(request, url, {
      method: REQUEST_METHOD.POST,
      body: JSON.stringify(body),
    });
    if (response.status === STATUS_CODE.SUCCESS) {
      yield put(getReportsSuccess(response));
    } else {
      yield put(getReportsFailure());
    }
  } catch (error) {

    yield put(getReportsFailure(error));
  }
}

// Individual exports for testing
export default function* reportPageSaga() {
  yield takeLatest(GET_REPORT, fetchReport);
}
