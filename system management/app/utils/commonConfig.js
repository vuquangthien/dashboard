import {
  FORMAT_TYPE,
  SAMPLE_CONFIG_PREFIX,
  WORKFLOW_CODE,
  TASK_CODE,
  RESPONSE_CODE,
  REPORT_TYPE,
  VIEW_CONFIG_PREFIX,
  APPROVAL_REQUEST_TYPE,
  PRINT_TEMPLATE_VALUE,
} from './constants';

export const VIEW_CONFIG = {
  RECEIVE_LIST: {
    PARAMETER: `${VIEW_CONFIG_PREFIX}.RECEIVE_PAGE.LIST_TABLE`,
    DEFAULT_COLUMNS: [
      {
        name: 'order',
        title: 'STT',
        checked: true,
        order: 1,
        width: 100,
        formatType: FORMAT_TYPE.NUMBER,
        isSortable: false,
      },
      {
        name: 'requestCodeInt',
        title: 'Mã hồ sơ',
        formatType: FORMAT_TYPE.LINK,
        checked: true,
        order: 2,
        width: 200,
      },
      {
        name: 'sourceTypeDisplayName',
        title: 'Bộ ngành',
        checked: true,
        order: 3,
        width: 180,
      },
      {
        name: 'requestTypeDisplayName',
        title: 'Nghiệp vụ',
        // formatType: FORMAT_TYPE.TOOLTIP,
        checked: true,
        order: 4,
        width: 250,
      },
      {
        name: 'receiveDisplayName',
        title: 'Cán bộ tiếp nhận',
        checked: true,
        order: 5,
        width: 180,
      },
      {
        name: 'createdDate',
        title: 'Ngày yêu cầu',
        formatType: FORMAT_TYPE.DATE_TIME,
        checked: true,
        order: 7,
        width: 180,
      },
      {
        name: 'receiveDate',
        title: 'Ngày tiếp nhận',
        formatType: FORMAT_TYPE.DATE_TIME,
        checked: true,
        order: 7,
        width: 180,
      },
      // {
      //   name: 'requestLevel',
      //   title: 'Mức độ yêu cầu',
      //   checked: true,
      //   order: 8,
      //   width: '',
      // },
      {
        name: 'statusDisplayName',
        title: 'Trạng thái',
        checked: true,
        order: 8,
        width: 120,
      },

      {
        name: 'comments',
        title: 'Ghi chú',
        checked: true,
        order: 9,
        width: 200,
      },
      {
        name: 'actions',
        title: 'Thao tác',
        checked: true,
        order: 11,
        isRightColumn: true,
        isDragable: false,
        isSortable: false,
        width: 150,
      },
    ],
  },

  DASHBOARD: {
    PARAMETER: `${VIEW_CONFIG_PREFIX}.DASHBOARD.LIST`,
    DEFAULT_COLUMNS: [
      {
        name: 'order',
        title: 'STT',
        checked: true,
        order: 1,
        width: 100,
        formatType: FORMAT_TYPE.NUMBER,
        isSortable: false,
      },
      {
        name: 'requestCodeInt',
        title: 'Mã hồ sơ',
        checked: true,
        order: 1,
        // width: 100,
        formatType: FORMAT_TYPE.LINK,
      },
      {
        name: 'orderValue',
        title: 'Mức độ ưu tiên',
        checked: true,
        order: 1,
        width: 250,
      },
    ],
  },

  APPROVAL_LIST: {
    PARAMETER: `${VIEW_CONFIG_PREFIX}.APPROVAL_PAGE.LIST_TABLE`,
    DEFAULT_COLUMNS: [
      {
        name: 'order',
        title: 'STT',
        checked: true,
        order: 1,
        width: 100,
        formatType: FORMAT_TYPE.NUMBER,
        isSortable: false,
      },
      {
        name: 'requestCodeInt',
        title: 'Mã hồ sơ',
        checked: true,
        order: 2,
        formatType: FORMAT_TYPE.LINK,
        width: 220,
      },
      {
        name: 'sourceTypeDisplayName',
        title: 'Bộ ngành',
        checked: true,
        order: 3,
        width: 220,
      },
      {
        name: 'requestTypeDisplayName',
        title: 'Nghiệp vụ',
        // formatType: FORMAT_TYPE.TOOLTIP,
        checked: true,
        width: 250,
        order: 4,
      },
      {
        name: 'receiveDisplayName',
        title: 'Cán bộ tiếp nhận',
        checked: true,
        order: 5,
      },
      {
        name: 'receiveApproveDate',
        title: 'Ngày yêu cầu phê duyệt',
        formatType: FORMAT_TYPE.DATE_TIME,
        checked: true,
        order: 6,
        width: 200,
      },
      // {
      //   name: 'requestLevel',
      //   title: 'Mức độ yêu cầu',
      //   checked: true,
      //   order: 8,
      //   width: '',
      // },
      {
        name: 'statusDisplayName',
        title: 'Trạng thái',
        checked: true,
        order: 7,
        width: 200,
      },
      {
        name: 'comments',
        title: 'Ghi chú',
        // formatType: FORMAT_TYPE.TOOLTIP,
        checked: true,
        order: 8,
        width: '',
      },
      {
        name: 'actions',
        title: 'Thao tác',
        checked: true,
        order: 9,
        isRightColumn: true,
        isDragable: false,
        isSortable: false,
        width: 150,
      },
    ],
  },
  REQUEST_LIST: {
    PARAMETER: `${VIEW_CONFIG_PREFIX}.REQUEST_PAGE.LIST_TABLE`,
    DEFAULT_COLUMNS: [
      {
        name: 'order',
        title: 'STT',
        checked: true,
        order: 1,
        width: 100,
        formatType: FORMAT_TYPE.NUMBER,
        isSortable: false,
      },
      {
        name: 'requestCodeInt',
        formatType: FORMAT_TYPE.LINK,
        title: 'Mã hồ sơ',
        checked: true,
        order: 2,
        width: 200,
      },
      // {
      //   name: 'requestCategory',
      //   title: 'Thể loại',
      //   formatType: FORMAT_TYPE.CATEGORY,
      //   checked: true,
      //   order: 10,
      //   // width: 150,
      // },

      {
        name: 'requestTypeDisplayName',
        title: 'Nghiệp vụ',
        // formatType: FORMAT_TYPE.TOOLTIP,
        checked: true,
        order: 3,
        width: 250,
      },
      {
        name: 'sourceTypeDisplayName',
        title: 'Bộ ngành',
        checked: true,
        order: 4,
        width: 150,
      },

      {
        name: 'receiveDisplayName',
        title: 'Cán bộ tiếp nhận',
        checked: true,
        order: 6,
        width: 160,
      },
      {
        name: 'approveDisplayName',
        title: 'Lãnh đạo phê duyệt',
        checked: true,
        order: 7,
        width: 160,
      },
      // {
      //   name: 'approveDisplayName',
      //   title: 'Lãnh đạo phê duyệt',
      //   checked: true,
      //   order: 7,
      //   width: 160,
      // },
      {
        name: 'createdDate',
        title: 'Ngày yêu cầu',
        formatType: FORMAT_TYPE.DATE_TIME,
        checked: true,
        order: 8,
        width: 150,
      },
      {
        name: 'receiveDate',
        title: 'Ngày tiếp nhận',
        formatType: FORMAT_TYPE.DATE_TIME,
        checked: true,
        order: 9,
        width: 150,
      },

      {
        name: 'approveDate',
        title: 'Ngày phê duyệt',
        checked: true,
        formatType: FORMAT_TYPE.DATE_TIME,
        order: 11,
        width: 150,
      },
      {
        name: 'comments',
        title: 'Ghi chú',
        // formatType: FORMAT_TYPE.TOOLTIP,
        checked: true,
        order: 12,
        width: 150,
      },
      {
        name: 'statusDisplayName',
        title: 'Trạng thái',
        checked: true,
        order: 13,
        width: 150,
      },
      {
        name: 'actions',
        title: 'Thao tác',
        isRightColumn: true,
        isDragable: false,
        isSortable: false,
        checked: true,
        order: 14,
        width: 100,
      },
    ],
  },
  REQUEST_HISTORY: {
    PARAMETER: `${VIEW_CONFIG_PREFIX}.REQUEST_PAGE.REQUEST_HISTORY`,
    DEFAULT_COLUMNS: [
      {
        name: 'order',
        title: 'STT',
        checked: true,
        formatType: FORMAT_TYPE.NUMBER,
        order: 1,
        isSortable: false,
        width: 150,
      },
      {
        name: 'finishedDate',
        title: 'Ngày thực hiện',
        checked: true,
        formatType: FORMAT_TYPE.DATE_TIME,
        order: 2,
        isSortable: false,
        width: 200,
      },
      // {
      //   name: 'completeDurationMs',
      //   title: 'Thời gian thực hiện',
      //   checked: true,
      //   order: 3,
      //   formatType: FORMAT_TYPE.FORMATTED_MS,
      //   width: '',
      // },
      {
        name: 'status',
        title: 'Các bước thực hiện',
        checked: true,
        order: 4,
        width: 250,
        isSortable: false,
      },
      // {
      //   name: 'status',
      //   title: 'Trạng thái',
      //   checked: true,
      //   order: 5,
      //   width: 200,
      // },
      {
        name: 'assigneeDisplayName',
        title: 'Người thực hiện',
        checked: true,
        order: 6,
        isSortable: false,
        width: 250,
      },
      {
        name: 'comments',
        title: 'Ghi chú',
        // formatType: FORMAT_TYPE.TOOLTIP,
        checked: true,
        order: 7,
        isSortable: false,
        width: '',
      },
    ],
  },
  REQUEST_RESULT_INT: {
    PARAMETER: `${VIEW_CONFIG_PREFIX}.REQUEST_PAGE.REQUEST_RESULT_INT`,
    DEFAULT_COLUMNS: [
      {
        name: 'order',
        title: 'STT',
        checked: true,
        formatType: FORMAT_TYPE.NUMBER,
        order: 1,
        width: 150,
        isSortable: false,
      },
      {
        name: 'citizenPid',
        title: 'Số ĐDCD/CCCD',
        checked: true,
        // formatType: FORMAT_TYPE.DATE_TIME,
        order: 2,
        width: 180,
      },
      // {
      //   name: 'completeDurationMs',
      //   title: 'Thời gian thực hiện',
      //   checked: true,
      //   order: 3,
      //   formatType: FORMAT_TYPE.FORMATTED_MS,
      //   width: '',
      // },
      {
        name: 'status',
        title: 'Số CMND',
        checked: true,
        order: 4,
        width: 150,
      },
      // {
      //   name: 'status',
      //   title: 'Trạng thái',
      //   checked: true,
      //   order: 5,
      //   width: 200,
      // },
      {
        name: 'fullName',
        title: 'Họ và tên',
        checked: true,
        order: 6,
        width: 200,
      },
      {
        name: 'birthDate',
        title: 'Ngày tháng năm sinh',
        checked: true,
        order: 6,
        width: 150,
      },
      {
        name: 'gender',
        title: 'Giới tính',
        checked: true,
        order: 6,
        width: 150,
      },
      {
        name: 'bloodGroup',
        title: 'Nhóm máu',
        checked: true,
        order: 6,
        width: 150,
      },
      {
        name: 'residentAddress',
        title: 'Nơi sinh',
        // formatType: FORMAT_TYPE.TOOLTIP,
        checked: true,
        order: 7,
        width: 300,
      },
    ],
  },
  REQUEST_TYPE: {
    PARAMETER: `${VIEW_CONFIG_PREFIX}.REQUEST_TYPE_PAGE.LIST_TABLE`,
    DEFAULT_COLUMNS: [
      {
        name: 'order',
        title: 'STT',
        checked: true,
        order: 1,
        width: 100,
        isSortable: false,
        formatType: FORMAT_TYPE.NUMBER,
      },
      {
        name: 'code',
        title: 'Mã nghiệp vụ',
        checked: true,
        order: 2,
        width: '',
      },
      {
        name: 'displayName',
        title: 'Tên nghiệp vụ',
        width: 250,
        // formatType: FORMAT_TYPE.TOOLTIP,
        checked: true,
        order: 3,
        // width: '',
      },
      {
        name: 'description',
        title: 'Ghi chú',
        checked: true,
        order: 4,
        width: 300,
      },
      {
        name: 'isActive',
        title: 'Kích hoạt',
        formatType: FORMAT_TYPE.NUMBER,
        checked: true,
        order: 5,
        isRightColumn: true,
        isDragable: false,
        isSortable: false,
        width: 150,
      },
      {
        name: 'actions',
        title: 'Thao tác',
        checked: true,
        order: 6,
        isRightColumn: true,
        isDragable: false,
        isSortable: false,
        width: 150,
      },
    ],
  },
  SAMPLE_LIST: {
    PARAMETER: `${VIEW_CONFIG_PREFIX}.SAMPLE_PAGE.LIST_TABLE`,
    DEFAULT_COLUMNS: [
      {
        name: 'order',
        title: 'STT',
        checked: true,
        order: 1,
        width: 100,
        formatType: FORMAT_TYPE.NUMBER,
        isSortable: false,
      },
      {
        name: 'displayName',
        title: 'Quy trình phản hồi',
        checked: true,
        order: 2,
        width: '',
        isSortable: false,
      },
      {
        name: 'templateResponse',
        title: 'Nội dung mẫu',
        checked: true,
        order: 3,
        width: '',
      },
      {
        name: 'actions',
        title: 'Thao tác',
        checked: true,
        order: 4,
        isRightColumn: true,
        isDragable: false,
        isSortable: false,
        width: 150,
      },
    ],
  },
  SCHEDULE_CONFIG: {
    PARAMETER: `${VIEW_CONFIG_PREFIX}.SCHEDULE_CONFIG.SCHEDULE_CONFIGS`,
    DEFAULT_COLUMNS: [
      {
        name: 'order',
        title: 'STT',
        checked: true,
        order: 1,
        width: 80,
        formatType: FORMAT_TYPE.NUMBER,
        isSortable: false,
      },
      {
        name: 'displayName',
        title: 'Tên cấu hình',
        checked: true,
        order: 2,
        // formatType: FORMAT_TYPE.LINK,
        width: 200,
      },
      {
        name: 'start',
        title: 'Thời gian bắt đầu',
        checked: true,
        order: 3,
        width: 200,
        formatType: FORMAT_TYPE.NUMBER,
        isSortable: false,
      },
      {
        name: 'period',
        title: 'Tần suất',
        checked: true,
        order: 4,
        width: 200,
        isSortable: false,
      },
      {
        name: 'sourceType',
        title: 'Bộ ngành',
        checked: true,
        order: 4,
        // width: 150,
      },
      {
        name: 'description',
        title: 'Mô tả',
        checked: true,
        order: 5,
        // width: 150,
      },
      {
        name: 'isActive',
        title: 'Trạng thái',
        checked: true,
        order: 6,
        width: 150,
        formatType: FORMAT_TYPE.NUMBER,
      },
      {
        name: 'timeSetting',
        title: 'Cài đặt thời gian',
        checked: true,
        formatType: FORMAT_TYPE.NUMBER,
        order: 6,
        width: 180,
        isSortable: false,
      },
      {
        name: 'actions',
        title: 'Thao tác',
        checked: true,
        order: 13,
        isRightColumn: true,
        isDragable: false,
        isSortable: false,
        width: 200,
      },
    ],
  },
  PERMISSION_LIST: {
    PARAMETER: `${VIEW_CONFIG_PREFIX}.PERMISSION_PAGE.PERMISSION_LIST`,
    DEFAULT_COLUMNS: [
      {
        name: 'order',
        title: 'STT',
        checked: true,
        formatType: FORMAT_TYPE.NUMBER,
        order: 1,
        width: 100,
        isSortable: false,
      },
      {
        name: 'ownerNameDisplayName',
        title: 'Cán bộ thực hiện',
        checked: true,
        order: 2,
        width: '',
      },
      {
        name: 'value_display_name',
        title: 'Bộ ngành',
        checked: true,
        order: 3,
        width: '',
      },
      {
        name: 'affectDate',
        title: 'Ngày hiệu lực',
        formatType: FORMAT_TYPE.DATE,
        checked: true,
        order: 3,
        width: '',
      },
      {
        name: 'actions',
        title: 'Thao tác',
        checked: true,
        order: 4,
        isRightColumn: true,
        isDragable: false,
        isSortable: false,
        width: 150,
      },
    ],
  },
};

export const sampleCode = {
  return: `${SAMPLE_CONFIG_PREFIX}.${WORKFLOW_CODE.INTERGRATION}.${
    TASK_CODE.RECEIVE_REQUEST
  }.${RESPONSE_CODE.RETURN_REQUEST}.DEFAULT_COMMENTS`,
  send: `${SAMPLE_CONFIG_PREFIX}.${WORKFLOW_CODE.INTERGRATION}.${
    TASK_CODE.RECEIVE_REQUEST
  }.${RESPONSE_CODE.SEND_REQUEST}.DEFAULT_COMMENTS`,
  denie: `${SAMPLE_CONFIG_PREFIX}.${WORKFLOW_CODE.INTERGRATION}.${
    TASK_CODE.APPRORVE_REQUEST
  }.${RESPONSE_CODE.DENIE_REQUEST}.DEFAULT_COMMENTS`,
  approve: `${SAMPLE_CONFIG_PREFIX}.${WORKFLOW_CODE.INTERGRATION}.${
    TASK_CODE.APPRORVE_REQUEST
  }.${RESPONSE_CODE.APPRORVE_REQUEST}.DEFAULT_COMMENTS`,
};

export const receiveSample = [
  {
    code: sampleCode.return,
    displayName: 'Tiếp nhận - Gửi trả',
  },
  {
    code: sampleCode.send,
    displayName: 'Tiếp nhận - Gửi phê duyệt',
  },
];

export const approvalSample = [
  {
    code: sampleCode.denie,
    displayName: 'Phê duyệt - Không phê duyệt',
  },
  {
    code: sampleCode.approve,
    displayName: 'Phê duyệt - Phê duyệt',
  },
];

export const sampleContents = [...receiveSample, ...approvalSample];

export const frequencies = [
  {
    value: 1,
    displayName: 'Tuần',
  },
  {
    value: 2,
    displayName: 'Tháng',
  },
  {
    value: 3,
    displayName: 'Quý',
  },
  {
    value: 5,
    displayName: '6 Tháng đầu năm',
  },
  {
    value: 4,
    displayName: 'Năm',
  },
];

export const printTemplates = [
  {
    label: 'Phiếu đề xuất phê duyệt',
    value: PRINT_TEMPLATE_VALUE.REQUEST_APPROVAL,
  },
  {
    label: 'Báo cáo',
    value: PRINT_TEMPLATE_VALUE.REPORT,
  },
];

export const reportTypes = [
  {
    label: 'Bộ ngành',
    value: REPORT_TYPE.SOURCE_TYPE,
  },
  {
    label: 'Cán bộ tiếp nhận',
    value: REPORT_TYPE.RECEIVE_EMPLOYEE,
  },
  {
    label: 'Lãnh đạo phê duyệt',
    value: REPORT_TYPE.APPROVAL_EMPLOYEE,
  },
  {
    label: 'Trạng thái thực hiện',
    value: REPORT_TYPE.TASK_STATUS,
  },
  // {
  //   label: 'Thống kê thời gian xử lý',
  //   value: REPORT_TYPE.PROCESS_TIME,
  // },
  // {
  //   label: 'Thống kê thời gian xử lý theo cán bộ tiếp nhận',
  //   value: REPORT_TYPE.PROCESS_TIME_BY_RECEIVE_EMPLOYEE,
  // },
  // {
  //   label: 'Thống kê thời gian xử lý theo Lãnh đạo phê duyệt',
  //   value: REPORT_TYPE.PROCESS_TIME_BY_APPROVAL_EMPLOYEE,
  // },
  {
    label: 'Thời gian xử lý theo bộ ngành',
    value: REPORT_TYPE.PROCESS_TIME_BY_SOURCE_TYPE,
  },
  // {
  //   label: 'Thống kê thời gian xử lý theo bộ / ngành và trạng thái xử lý',
  //   value: REPORT_TYPE.PROCESS_TIME_BY_SOURCE_TYPE_TASK_STATUS,
  // },
  {
    label: 'Thời gian xử lý theo bộ ngành và quy trình xử lý',
    value: REPORT_TYPE.PROCESS_TIME_BY_SOURCE_TYPE_PROCESSING,
  },
];

export const approvalRequestTypes = [
  {
    label: 'Phiếu đề xuất phê duyệt',
    value: APPROVAL_REQUEST_TYPE.REQUEST_APPROVAL_TYPE,
  },
];

export const dateFilterTypes = [
  {
    label: 'Ngày yêu cầu',
    value: 1,
  },
  {
    label: 'Ngày tiếp nhận',
    value: 2,
  },
  {
    label: 'Ngày phê duyệt',
    value: 3,
  },
];

export const PAGE_CONFIG = {
  FOOTER: {
    // eslint-disable-next-line prettier/prettier
    key: "footer",
    param: 'TEMPLATE.INT.FOOTER',
  },
};
export const BIRTH_FIELD_NAMES = [
  'HUSBAND_BIRTH_DATE',
  'FATHER_BIRTH_DATE',
  'MOTHER_BIRTH_DATE',
  'WIFE_HUSBAND_BIRTH_DATE',
  'PROTECTOR_BIRTH_DATE',
  'BIRTH_DATE',
  'NOTFOUND_DATE',
];

export const COUNTRY_FIELD_NAMES = {
  PERMANENT_COUNTRY_ID: {
    children: [
      'PERMANENT_CITY_ID',
      'PERMANENT_DISTRICT_ID',
      'PERMANENT_VILLAGE_ID',
    ],
    villages: 'PERMANENT_VILLAGE_ID',
    address: 'PERMANENT_ADDRESS',
  },
  REG_PLACE_COUNTRY_ID: {
    children: [
      'REG_PLACE_CITY_ID',
      'REG_PLACE_DISTRICT_ID',
      'REG_PLACE_VILLAGE_ID',
    ],
    villages: 'REG_PLACE_VILLAGE_ID',
    address: 'REG_PLACE_ADDRESS',
  },
  TEMP_RES_COUNTRY_ID: {
    children: [
      'TEMP_RES_CITY_ID',
      'TEMP_RES_DISTRICT_ID',
      'TEMP_RES_VILLAGE_ID',
    ],
    villages: 'TEMP_RES_VILLAGE_ID',
    address: 'TEMP_RES_ADDRESS',
  },
  RESIDENT_COUNTRY_ID: {
    children: [
      'RESIDENT_CITY_ID',
      'RESIDENT_DISTRICT_ID',
      'RESIDENT_VILLAGE_ID',
    ],
    villages: 'RESIDENT_VILLAGE_ID',
    address: 'RESIDENT_ADDRESS',
  },
  HOME_COUNTRY_ID: {
    children: ['HOME_CITY_ID', 'HOME_DISTRICT_ID', 'HOME_VILLAGE_ID'],
    villages: 'HOME_VILLAGE_ID',
    address: 'HOME_ADDRESS',
  },
  WORK_COUNTRY_ID: {
    children: ['WORK_CITY_ID', 'WORK_DISTRICT_ID', 'WORK_VILLAGE_ID'],
    villages: 'WORK_VILLAGE_ID',
    address: 'WORK_ADDRESS',
  },
  BIRTH_COUNTRY_ID: {
    children: ['BIRTH_CITY_ID', 'BIRTH_DISTRICT_ID', 'BIRTH_VILLAGE_ID'],
    villages: 'BIRTH_VILLAGE_ID',
    address: 'BIRTH_ADDRESS',
  },
};

export const CITY_FIELD_NAMES = {
  TEMP_RES_CITY_ID: {
    children: ['TEMP_RES_DISTRICT_ID', 'TEMP_RES_VILLAGE_ID'],
    nationFieldName: 'TEMP_RES_COUNTRY_ID',
  },
  PERMANENT_CITY_ID: {
    children: ['PERMANENT_DISTRICT_ID', 'PERMANENT_VILLAGE_ID'],
    nationFieldName: 'PERMANENT_COUNTRY_ID',
  },
  REG_PLACE_CITY_ID: {
    children: ['REG_PLACE_DISTRICT_ID', 'REG_PLACE_VILLAGE_ID'],
    nationFieldName: 'REG_PLACE_COUNTRY_ID',
  },
  RESIDENT_CITY_ID: {
    children: ['RESIDENT_DISTRICT_ID', 'RESIDENT_VILLAGE_ID'],
    nationFieldName: 'RESIDENT_COUNTRY_ID',
  },
  HOME_CITY_ID: {
    children: ['HOME_DISTRICT_ID', 'HOME_VILLAGE_ID'],
    nationFieldName: 'HOME_COUNTRY_ID',
  },
  WORK_CITY_ID: {
    children: ['WORK_DISTRICT_ID', 'WORK_VILLAGE_ID'],
    nationFieldName: 'WORK_COUNTRY_ID',
  },
  BIRTH_CITY_ID: {
    children: ['BIRTH_DISTRICT_ID', 'BIRTH_VILLAGE_ID'],
    nationFieldName: 'BIRTH_COUNTRY_ID',
  },
};

export const DISTRICT_FIELD_NAMES = {
  PERMANENT_DISTRICT_ID: {
    nationFieldName: 'PERMANENT_COUNTRY_ID',
    children: ['PERMANENT_VILLAGE_ID'],
    parent: 'PERMANENT_CITY_ID',
  },
  TEMP_RES_DISTRICT_ID: {
    nationFieldName: 'TEMP_RES_COUNTRY_ID',
    children: ['TEMP_RES_VILLAGE_ID'],
    parent: 'TEMP_RES_CITY_ID',
  },
  REG_PLACE_DISTRICT_ID: {
    nationFieldName: 'REG_PLACE_COUNTRY_ID',
    children: ['REG_PLACE_VILLAGE_ID'],
    parent: 'REG_PLACE_CITY_ID',
  },
  RESIDENT_DISTRICT_ID: {
    nationFieldName: 'RESIDENT_COUNTRY_ID',
    children: ['RESIDENT_VILLAGE_ID'],
    parent: 'RESIDENT_CITY_ID',
  },
  HOME_DISTRICT_ID: {
    nationFieldName: 'HOME_COUNTRY_ID',
    children: ['HOME_VILLAGE_ID'],
    parent: 'HOME_CITY_ID',
  },
  WORK_DISTRICT_ID: {
    nationFieldName: 'WORK_COUNTRY_ID',
    children: ['WORK_VILLAGE_ID'],
    parent: 'WORK_CITY_ID',
  },
  BIRTH_DISTRICT_ID: {
    nationFieldName: 'BIRTH_COUNTRY_ID',
    children: ['BIRTH_VILLAGE_ID'],
    parent: 'BIRTH_CITY_ID',
  },
};

export const VILLAGE_FIELD_NAMES = {
  PERMANENT_VILLAGE_ID: {
    nationFieldName: 'PERMANENT_COUNTRY_ID',
    children: [],
    parent: 'PERMANENT_DISTRICT_ID',
  },
  TEMP_RES_VILLAGE_ID: {
    nationFieldName: 'TEMP_RES_COUNTRY_ID',
    children: [],
    parent: 'TEMP_RES_DISTRICT_ID',
  },
  REG_PLACE_VILLAGE_ID: {
    nationFieldName: 'REG_PLACE_COUNTRY_ID',
    children: [],
    parent: 'REG_PLACE_DISTRICT_ID',
  },
  RESIDENT_VILLAGE_ID: {
    nationFieldName: 'RESIDENT_COUNTRY_ID',
    children: [],
    parent: 'RESIDENT_DISTRICT_ID',
  },
  HOME_VILLAGE_ID: {
    nationFieldName: 'HOME_COUNTRY_ID',
    children: [],
    parent: 'HOME_DISTRICT_ID',
  },
  WORK_VILLAGE_ID: {
    nationFieldName: 'WORK_COUNTRY_ID',
    children: [],
    parent: 'WORK_DISTRICT_ID',
  },
  BIRTH_VILLAGE_ID: {
    nationFieldName: 'BIRTH_COUNTRY_ID',
    children: [],
    parent: 'BIRTH_DISTRICT_ID',
  },
};

export const ADDRESS_FIELD_NAMES = {
  PERMANENT_ADDRESS: {
    nationFieldName: 'PERMANENT_COUNTRY_ID',
    children: [],
    parent: 'PERMANENT_DISTRICT_ID',
  },
  TEMP_RES_ADDRESS: {
    nationFieldName: 'TEMP_RES_COUNTRY_ID',
    children: [],
    parent: 'TEMP_RES_DISTRICT_ID',
  },
  REG_PLACE_ADDRESS: {
    nationFieldName: 'REG_PLACE_COUNTRY_ID',
    children: [],
    parent: 'REG_PLACE_DISTRICT_ID',
  },
  RESIDENT_ADDRESS: {
    nationFieldName: 'RESIDENT_COUNTRY_ID',
    children: [],
    parent: 'RESIDENT_DISTRICT_ID',
  },
  HOME_ADDRESS: {
    nationFieldName: 'HOME_COUNTRY_ID',
    children: [],
    parent: 'HOME_DISTRICT_ID',
  },
  WORK_ADDRESS: {
    nationFieldName: 'WORK_COUNTRY_ID',
    children: [],
    parent: 'WORK_DISTRICT_ID',
  },
  BIRTH_ADDRESS: {
    nationFieldName: 'BIRTH_COUNTRY_ID',
    children: [],
    parent: 'BIRTH_DISTRICT_ID',
  },
};

export const NATIONALITY_ID_FIELDS = [
  'NATIONALITY_ID',
  'HUSBAND_NATIONALITY_ID1',
  'FATHER_NATIONALITY_ID1',
  'MOTHER_NATIONALITY_ID1',
  'WIFE_NATIONALITY_ID1',
  'PROTECTOR_NATIONALITY_ID1',
  'WIFE_HUSBAND_NATIONALITY_ID1',
  'NATIONALITY_ARRAY',
];
export const GENDER = [
  {
    name: 'Chưa có thông tin',
    value: 0,
    code: 0,
  },
  {
    name: 'Giới tính nam',
    value: 1,
    code: 1,
  },
  {
    name: 'Giới tính nữ',
    value: 2,
    code: 2,
  },
];

export const CITIZEN_STATUS = [
  {
    value: 0,
    name: 'Chưa có thông tin',
    code: 0,
  },
  {
    value: 1,
    name: 'Còn sống',
    code: 1,
  },
  {
    value: 2,
    name: 'Đã chết',
    code: 2,
  },
  {
    value: 3,
    name: 'Mất tích',
    code: 3,
  },
];
export const MILITARY_DUTY = [
  {
    name: 'Chưa đi',
    value: 0,
  },
  {
    name: 'Đã đi',
    value: 1,
  },
];

export const MARRIAGE_STATUS = [
  {
    name: 'Chưa có thông tin',
    value: 0,
  },
  {
    name: 'Chưa kết hôn',
    value: 1,
  },
  {
    name: 'Đang có vợ/chồng',
    value: 2,
  },
  {
    name: 'Đã ly hôn hoặc góa vợ/chồng',
    value: 3,
  },
];

export const HH_RELATIONSHIP = [
  {
    name: 'Chưa có thông tin',
    value: 0,
    code: 0,
  },
  {
    name: 'Ông',
    value: 1,
    code: 1,
  },
  {
    name: 'Bà',
    value: 2,
    code: 2,
  },
  {
    name: 'Cha',
    value: 3,
    code: 3,
  },
  {
    name: 'Mẹ',
    value: 4,
    code: 4,
  },
  {
    name: 'Vợ',
    value: 5,
    code: 5,
  },
  {
    name: 'Chồng',
    value: 6,
    code: 6,
  },
  {
    name: 'Con',
    value: 7,
    code: 7,
  },
  {
    name: 'Anh',
    value: 8,
    code: 8,
  },
  {
    name: 'Chị',
    value: 9,
    code: 9,
  },
  {
    name: 'Em',
    value: 10,
    code: 10,
  },
  {
    name: 'Cháu ruột',
    value: 11,
    code: 11,
  },
  {
    name: 'Khác',
    value: 99,
    code: 99,
  },
];
export const buildColumsFromRequestTypeOutputFields = (
  outputFields,
  fieldNames,
  isHandlePage = true,
) => {
  window.fieldNames = fieldNames;
  const codeToExtraData = {};
  fieldNames.forEach(f => {
    if (f.extraDataJson) {
      try {
        const extraDataJson = JSON.parse(f.extraDataJson);
        codeToExtraData[f.code] = extraDataJson;
      } catch (error) {
        console.log('error', error);
      }
    }
  });
  let results = [];
  if (isHandlePage) {
    results = [
      {
        name: 'order',
        title: 'STT',
        checked: true,
        order: 1,
        width: 100,
        formatType: FORMAT_TYPE.NUMBER,
        isSortable: false,
        isDragable: false,
      },
    ];
  } else {
    results = [
      {
        name: 'order',
        title: 'STT',
        checked: true,
        order: 1,
        width: 100,
        formatType: FORMAT_TYPE.NUMBER,
        isSortable: false,
        isDragable: false,
      },
    ];
  }
  if (outputFields && outputFields.length) {
    outputFields.forEach((o, index) => {
      let dataType = null;
      // if (o.code === 'CITIZEN_PID') return;
      // if (o.code === 'CITIZEN_PID') {
      // }
      if (codeToExtraData[o.code]) {
        if (codeToExtraData[o.code].dataType === 'date') {
          dataType = FORMAT_TYPE.BIRTH_DATE;
        }
        if (codeToExtraData[o.code].dataType === 'number') {
          dataType = FORMAT_TYPE.NUMBER;
        }
        results.push({
          name: codeToExtraData[o.code].aliasApp,
          title: o.displayName,
          checked: true,
          order: results.length + 1,
          isSortable: false,
          // width: outputFields.length >= 5 ? '330' : '',
          formatType: dataType,
          isDragable: false,
        });
      }
    });
  }
  // else{
  //   results = results.map(item => {
  //     if (item.name !== 'order') {
  //       item.width = 'auto';
  //     }
  //   });
  //   return results;
  // }
  return results;
};
