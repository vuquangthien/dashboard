import {
  RESPONSE_CODE,
  WORKFLOW_CODE,
  TASK_CODE,
  WF_STATUS_CODE,
} from './constants';

export const receiveResponses = [
  {
    displayName: 'Tiếp nhận xử lý',
    code: RESPONSE_CODE.RECEIVE_HANDLE_REQUEST,
  },
  {
    displayName: 'Trả lại yêu cầu',
    code: RESPONSE_CODE.RETURN_REQUEST,
  },
  {
    displayName: 'Gửi phê duyệt',
    code: RESPONSE_CODE.SEND_REQUEST,
  },
];

export const approvalResponses = [
  {
    displayName: 'Tiếp nhận phê duyệt',
    code: RESPONSE_CODE.RECEIVE_APPROVE_REQUEST,
  },
  {
    displayName: 'Từ chối phê duyệt',
    code: RESPONSE_CODE.DENIE_REQUEST,
  },
  {
    displayName: 'Phê duyệt',
    code: RESPONSE_CODE.APPRORVE_REQUEST,
  },
];

export const taskResponses = [...receiveResponses, ...approvalResponses];

export const receiveStatus = [
  {
    order: 0,
    displayName: 'Chờ tiếp nhận',
    code: WF_STATUS_CODE.WAITING_RECEIVE_REQUEST,
  },
  {
    order: 1,
    displayName: 'Tiếp nhận hồ sơ',
    code: WF_STATUS_CODE.RECEIVE_REQUEST,
  },
  {
    code: WF_STATUS_CODE.DENIE_REQUEST,
    displayName: 'Từ chối phê duyệt',
  },
];

export const approvalStatus = [
  {
    order: 3,
    displayName: 'Chờ phê duyệt',
    code: WF_STATUS_CODE.WAITING_APPROVE_REQUEST,
  },
  {
    order: 4,
    displayName: 'Tiếp nhận phê duyệt',
    code: WF_STATUS_CODE.APPROVE_REQUEST,
  },
];

export const handleStatus = [
  {
    order: 6,
    displayName: 'Chờ xử lý',
    code: WF_STATUS_CODE.WAITING_HANDLE_REQUEST,
  },
  {
    order: 7,
    displayName: 'Tiếp nhận xử lý',
    code: WF_STATUS_CODE.HANDLE_REQUEST,
  },
];

export const finishStatus = [
  {
    order: 5,
    displayName: 'Trả lại yêu cầu',
    code: WF_STATUS_CODE.RETURN_REQUEST,
  },
  {
    order: 8,
    displayName: 'Xử lý hoàn thành',
    code: WF_STATUS_CODE.FINISH_REQUEST,
  },
  {
    order: 9,
    displayName: 'Xử lý lỗi',
    code: WF_STATUS_CODE.ERROR_REQUEST,
  },
];

export const workflowStatus1 = [
  {
    code: WF_STATUS_CODE.WAITING_RECEIVE_REQUEST,
    displayName: 'Chờ tiếp nhận',
  },
  { code: WF_STATUS_CODE.RECEIVE_REQUEST, displayName: 'Tiếp nhận hồ sơ' },
  { code: WF_STATUS_CODE.RETURN_REQUEST, displayName: 'Trả lại hồ sơ' },

  {
    code: WF_STATUS_CODE.WAITING_APPROVE_REQUEST,
    displayName: 'Chờ phê duyệt',
  },
  // { code: WF_STATUS_CODE.APPROVE_REQUEST, displayName: 'Tiếp nhận phê duyệt' },
  { code: WF_STATUS_CODE.DENIE_REQUEST, displayName: 'Từ chối phê duyệt' },
  { code: WF_STATUS_CODE.WAITING_HANDLE_REQUEST, displayName: 'Chờ xử lý' },
  { code: WF_STATUS_CODE.HANDLE_REQUEST, displayName: 'Tiếp nhận xử lý' },
  { code: WF_STATUS_CODE.FINISH_REQUEST, displayName: 'Xử lý hoàn thành' },
  { code: WF_STATUS_CODE.ERROR_REQUEST, displayName: 'Xử lý lỗi' },
];

export const workflowStatus = [
  ...receiveStatus,
  ...approvalStatus,
  handleStatus[0],
  ...finishStatus,
].sort((a, b) => a.order - b.order);

export const taskStatus = {
  TS_TH_TN_CTN: 'Chờ tiếp nhận',
  TS_TH_TN_GPD: 'Gửi phê duyệt',
  TS_TH_TN_TN: 'Tiếp nhận',
  TS_TH_TN_TL: 'Trả lại hồ sơ',
  TS_TH_PD_TC: 'Từ chối phê duyệt',
  TS_TH_PD_TN: 'Tiếp nhận phê duyệt',
  TS_TH_PD_PD: 'Phê duyệt',
  TS_TH_XL_CXL: 'Chờ xử lý',
  TS_TH_XL_TN: 'Đang xử lý',
  TS_TH_XL_LOI: 'Xử lý lỗi',
  TS_TH_XL_HT: 'Hoàn thành',
  TS_TH_TTN_GTN: 'Cho tiếp nhận',
  TS_TH_TTN_GXL: 'Chuyển xử lý',
  TS_TH_PD_CPD: "Chờ phê duyệt"
};

export const taskTypes = [
  {
    displayName: 'Tiếp nhận',
    code: TASK_CODE.RECEIVE_REQUEST,
    responses: receiveResponses,
  },
  {
    displayName: 'Phê duyệt',
    code: TASK_CODE.APPRORVE_REQUEST,
    responses: approvalResponses,
  },
  {
    displayName: 'Xử lý',
    code: TASK_CODE.HANDLE_REQUEST,
  },
];

export const workFlow = {
  displayName: 'Tích hợp',
  code: WORKFLOW_CODE.INTERGRATION,
  taskTypes,
};
