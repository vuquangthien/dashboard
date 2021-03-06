export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

// BASE URL
export const PUBLIC_PATH = 'pmtichhop';
export const SOCKET_URL = `ws:http://10.0.15.26:7003/${PUBLIC_PATH}`;

export const APP_URL =
  process.env.NODE_ENV === 'development'
    ? `http://10.0.15.26:7003/${PUBLIC_PATH}`
    : `/${PUBLIC_PATH}`;

// COMMON API URL
export const AUTHENTICATE_URL = `${APP_URL}/common/api/v1/authenticate`;
export const COMMON_URL = `${APP_URL}/common/api/v1`;
export const CONFIGURATION_URL = `${APP_URL}/common/api/v1/configurations`;
export const LIST_ITEM_URL = `${APP_URL}/common/api/v1/list-items`;
export const MINISTRY_URL = `${APP_URL}/common/api/v1/ministries`;
export const CURRENT_INFO_URL = `${APP_URL}/common/api/v1/securities/current-user`;
export const USER_INFO_BY_ROLE_URL = `${APP_URL}/common/api/v1/securities/roles`;
export const USER_INFO_BY_GROUP_URL = `${APP_URL}/common/api/v1/groups`;
export const NOTIFICATION_URL = `${APP_URL}/common/api/v1/notification`;
export const TEMPLATE_URL = `${APP_URL}/common/api/v1/template-responses`;
export const CONNECT_NOTIFICATION_URL = `${APP_URL}/common/api/v1/notifications`;
export const SOURCE_TYPE_URL = `${APP_URL}/common/api/v1/source-types`;
export const MINISTRY_BY_ROLE_URL = `${APP_URL}/common/api/v1/source-types/current-user`;
export const LOCAL_URL = `${APP_URL}/common/api/v1/local`;
export const ADDRESS_URL = `${APP_URL}/common/api/v1/provinces`;
export const NATIONAL_URL = `${APP_URL}/common/api/v1/nations`;
export const ETHNIC_URL = `${APP_URL}/common/api/v1/ethnics`;
export const RELIGION_URL = `${APP_URL}/common/api/v1/religions`;

// INTERGRATION API URL
export const REQUEST_URL = `${APP_URL}/api/v1/requests`;
export const RECEIVE_REQUEST_URL = `${APP_URL}/api/v1/receive_requests`;
export const APPROVE_REQUEST_URL = `${APP_URL}/api/v1/approve_requests`;

export const TASK_URL = `${APP_URL}/api/v1/tasks`;
export const TASK_URL_2 = `${APP_URL}/api/v1/requests/task-instance`;
export const REPORT_URL = `${APP_URL}/api/v1/report`;
export const DASHBOARD_URL = `${APP_URL}/api/v1/dashboard`;
export const EXPORT_REQUEST_URL = `${APP_URL}/api/v1/requests/export`;
export const API_TIME = `${APP_URL}/api/v1/schedule-jobs/createJob`;
export const API_UPDATE_TIME = `${APP_URL}/api/v1/schedule-jobs/update`;
export const API_DELETE_TIME = `${APP_URL}/api/v1/schedule-jobs/delete`;
export const API_TIME2 = `${APP_URL}/api/v1/schedule-jobs`;
export const SCHEDULE_JOBS_URL = `${APP_URL}/api/v1/schedule-jobs`;
export const ASSIGNEE_URL = `${APP_URL}/common/api/v1/assignee-names`;
export const PROFILE_URL = `${APP_URL}/api/v1/profileConfig`;
export const FINISH_TIME = `${APP_URL}/api/v1/time`;
// TT : 
export const BLOOD_GROUP_URL = `${APP_URL}/common/api/v1/blood-groups`;
// INTERGRATION SOCKET URL
export const NOTIFICATION_SOCKET_URL = `${SOCKET_URL}/integration/common/api/v1/notifications`;

export const REQUEST_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
};

export const FILE_TYPE = {
  XML: 'xml',
  DOCX: 'docx',
  PDF: 'pdf',
  XLSX: 'xlsx',
};

export const TASK_TYPE = {
  RECEIVE: 'receive',
  APPROVAL: 'approval',
  PROCESS: 'proccess',
};

export const DATE_FORMAT = {
  DATE: 'DD/MM/YYYY',
  DATE_TIME: 'HH:mm DD/MM/YYYY',
  TIME: 'HH:mm',
  MONTH: 'MM/YYYY',
};

export const FORMAT_TYPE = {
  DATE: 'date',
  BIRTH_DATE: 'birth_date',
  DATE_TIME: 'datetime',
  TIME: 'time',
  PROGRESS: 'PROGRESS',
  NUMBER: 'number',
  LINK: 'link',
  MONTH: 'month',
  FILE_SIZE: 'file_size',
  TOOLTIP: 'tooltip',
  FORMATTED_MS: 'formatted_ms',
  CATEGORY: 'category',
};

export const LOCAL_STORAGE = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
};

export const LIST_ITEM_TYPE = {
  BIS_SERVICE: 'int-biz-service',
  FIELD_NAME: 'field-name',
  OUTPUT_FIELD: 'int-output-field',
  FILTER_FIELD: 'int-filter-field',
  SCHEDULE_CONFIG: 'int-process-schedule',
};

export const WORKFLOW_CODE = {
  INTERGRATION: 'WF_TH',
};

export const TASK_CODE = {
  RECEIVE_REQUEST: 'TSK_TH_TN',
  APPRORVE_REQUEST: 'TSK_TH_PD',
  HANDLE_REQUEST: 'TSK_TH_XL',
};

export const RESPONSE_CODE = {
  RECEIVE_HANDLE_REQUEST: 'RS_TH_TN_TN',
  RETURN_REQUEST: 'RS_TH_TN_TL',
  SEND_REQUEST: 'RS_TH_TN_GPD',
  RECEIVE_APPROVE_REQUEST: 'RS_TH_PD_TN',
  DENIE_REQUEST: 'RS_TH_PD_TC',
  APPRORVE_REQUEST: 'RS_TH_PD_PD',
};
// 3 TR???NG TH??I C???A H??? S?? TI???P NH???N : "ch??? ti???p nh???n" - "ti???p nh???n" - "t??? ch???i ph?? duy???t"
export const WF_RECEIVE_CODE = {
  WAITING_RECEIVE_REQUEST: 'WS_TH_TN_CTN',
  RECEIVE_REQUEST: 'WS_TH_TN_TN',
  DENIE_REQUEST: 'WS_TH_PD_TC',
};

export const WF_APPROVE_CODE = {
  WAITING_APPROVE_REQUEST: 'WS_TH_PD_CPD',
  APPROVE_REQUEST: 'WS_TH_PD_TN',
};

export const WF_HANDLE_CODE = {
  WAITING_HANDLE_REQUEST: 'WS_TH_XL_CXL',
  HANDLE_REQUEST: 'WS_TH_XL_TN',
};

export const WF_COMPLETE_CODE = {
  RETURN_REQUEST: 'WS_TH_TN_TL',
  FINISH_REQUEST: 'WS_TH_XL_HT',
  ERROR_REQUEST: 'WS_TH_XL_LOI',
};

export const WF_STATUS_CODE = {
  ...WF_RECEIVE_CODE,
  ...WF_APPROVE_CODE,
  ...WF_HANDLE_CODE,
  ...WF_COMPLETE_CODE,
};

export const STATUS_CODE = {
  SUCCESS: '1',
};

export const FILTER_OPERATOR = [
  {
    value: 'ct',
    label: 'Ch???a',
  },
  {
    value: 'nct',
    label: 'Kh??ng ch???a',
  },
  {
    value: 'isNull',
    label: 'Kh??ng c?? gi?? tr???',
  },
  {
    value: 'isNotNull',
    label: 'C?? gi?? tr???',
  },
  {
    value: 'ne',
    label: 'Kh??c',
  },
  {
    value: 'le',
    label: '<=',
  },
  {
    value: 'eq',
    label: '=',
  },
  {
    value: 'lt',
    label: '<',
  },
  // {
  //   value: 'ke',
  //   label: '<=',
  // },
  {
    value: 'gt',
    label: '>',
  },
  {
    value: 'ge',
    label: '>=',
  },
];

export const VIEW_CONFIG_PREFIX = 'TBC.INT';

export const SAMPLE_CONFIG_PREFIX = 'WFC';

export const BIZ_CONFIG_PREFIX = `BSC.INT`;

export const PRINT_CONFIG_PREFIX = 'PRNC.INT';

export const REPORT_CONFIG_PREFIX = 'REPORT';

export const APPROVAL_REQUEST_CONFIG_PREFIX = 'REQUEST_APPROVAL';

export const CONFIRM_CONFIG_PREFIX = 'CONFIRM';

export const PERMISSION_PREFIX = 'INT.ALLOWED_SOURCES';

export const PRINT_TEMPLATE_VALUE = {
  REQUEST_APPROVAL: 0,
  REPORT: 1,
};

export const REPORT_TYPE = {
  SOURCE_TYPE: 1,
  RECEIVE_EMPLOYEE: 2,
  APPROVAL_EMPLOYEE: 3,
  TASK_STATUS: 4,
  PROCESS_TIME_BY_SOURCE_TYPE: 5,
  PROCESS_TIME_BY_SOURCE_TYPE_TASK_STATUS: 6,
  PROCESS_TIME_BY_SOURCE_TYPE_PROCESSING: 7,
};

export const APPROVAL_REQUEST_TYPE = {
  REQUEST_APPROVAL_TYPE: 1,
};

export const AGGTYPES = {
  day: 'Ng??y',
  week: 'Tu???n',
  month: 'Th??ng',
  quarter: 'Qu??',
  year: 'N??m',
};

export const ROLES = {
  ADMIN: 'ADMIN',
  APPROVER: 'APPROVER',
  RECEIVER: 'RECEIVER',
  USER: 'USER',
};
export const ROLES_MAPPING = [
  { value: 'ADMIN', code: '0160003' },
  { value: 'APPROVER', code: '0160001' },
  { value: 'RECEIVER', code: '0160000' },
  { value: 'USER', code: '' },
];
export const LIST_MONTH = [
  {
    label: '1',
    value: 1,
  },
  {
    label: '2',
    value: 2,
  },
  {
    label: '3',
    value: 3,
  },
  {
    label: '4',
    value: 4,
  },
  {
    label: '5',
    value: 5,
  },
  {
    label: '6',
    value: 6,
  },
  {
    label: '7',
    value: 7,
  },
  {
    label: '8',
    value: 8,
  },
  {
    label: '9',
    value: 9,
  },
  {
    label: '10',
    value: 10,
  },
  {
    label: '11',
    value: 11,
  },
  {
    label: '12',
    value: 12,
  },
];
export const QUARTER = [
  {
    label: '1',
    value: 1,
  },
  {
    label: '2',
    value: 2,
  },
  {
    label: '3',
    value: 3,
  },
  {
    label: '4',
    value: 4,
  },
];
export const AGGTYPES_LABEL = [
  {
    label: 'Ng??y',
    value: 'day',
  },
  {
    label: 'Tu???n',
    value: 'week',
  },
  {
    label: 'Th??ng',
    value: 'month',
  },
  {
    label: 'Qu??',
    value: 'quarter',
  },
  // {
  //   label: '6 th??ng ?????u n??m',
  //   value: 'halfYear',
  // },
  {
    label: 'N??m',
    value: 'year',
  },
];
export const DATE_FIELD_NAMES = [
  'HUSBAND_BIRTH_DATE',
  'FATHER_BIRTH_DATE',
  'MOTHER_BIRTH_DATE',
  'WIFE_BIRTH_DATE',
  'PROTECTOR_BIRTH_DATE',
  'BIRTH_DATE',
  'NOTFOUND_DATE',
];
export const GENDER = [
  {
    name: 'Ch??a c?? th??ng tin',
    value: '0',
    code: 0,
  },
  {
    name: 'Nam',
    value: '1',
    code: 1,
  },
  {
    name: 'N???',
    value: '2',
    code: 2,
  }, {
    name: 'Kh??c',
    value: '3',
    code: 3,
  },
];
// TT - BLOOD GROUP - CH??? D??NG ????? MAP T??N NH??M M??U / KH??NG ????A V??O OPTION SELECT
export const BLOOD_GROUP = [
  {
    code: 0,
    name: 'Ch??a c?? th??ng tin',
    value: '0',
  },
  {
    code: 1,
    name: 'Nh??m m??u A',
    value: '1',
  },
  {
    code: 2,
    name: 'Nh??m m??u B',
    value: '2',
  },
  {
    code: 3,
    name: 'Nh??m m??u AB',
    value: '3',
  },
  {
    code: 4,
    name: 'Nh??m m??u O',
    value: '4',
  },
  {
    code: 5,
    name: 'Kh??c',
    value: '5',
  },
  // TT B??? SUNG M?? M???I
  {
    code: '00',
    name: 'Ch??a c?? th??ng tin',
    value: '00',
  },
  {
    code: '01',
    name: 'Nh??m m??u A',
    value: '01',
  },
  {
    code: '02',
    name: 'Nh??m m??u B',
    value: '02',
  },
  {
    code: '03',
    name: 'Nh??m m??u AB',
    value: '03',
  },
  {
    code: '04',
    name: 'Nh??m m??u O',
    value: '04',
  },
  {
    code: '05',
    name: 'Kh??c',
    value: '05',
  },
];

export const MARRIAGE_STATUS = [
  {
    name: 'Ch??a c?? th??ng tin',
    value: 0,
  },
  {
    name: 'Ch??a k???t h??n',
    value: 1,
  },
  {
    name: '??ang c?? v???/ch???ng',
    value: 2,
  },
  {
    name: '???? ly h??n ho???c g??a v???/ch???ng',
    value: 3,
  },
];

export const REQUEST_LEVEL = [
  {
    id: 0,
    displayName: 'Trung b??nh',
    value: 1,
  },
  {
    id: 1,
    displayName: 'Th???p',
    value: 0,
  },
  {
    id: 2,
    displayName: 'Cao',
    value: 2,
  },
];

export const approvalTypes = [
  {
    label: 'Ph?? duy???t th??? c??ng',
    value: 'MANUAL',
  },
  {
    label: 'Ph?? duy???t t??? ?????ng',
    value: 'AUTO',
  },
];

export const FREQUENCY = {
  MINUTELY: 'minutely',
  HOURLY: 'hourly',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
};

export const SCHEDULE_FREQUENCIES = [
  {
    label: 'H??ng gi???',
    value: FREQUENCY.HOURLY,
  },
  {
    label: 'H??ng ph??t',
    value: FREQUENCY.MINUTELY,
  },
];

export const SCHEDULE_STATUS = [
  {
    displayName: 'K??ch ho???t',
    value: 1,
  },
  {
    displayName: 'V?? hi???u h??a',
    value: 0,
  },
];

export const DASHBOARD_PAGE_WS_STATUS_CODE = {
  TN: 'TN',
  CTN: 'CTN',
  PD: 'PD',
  CPD: 'CPD',
  XL: 'XL',
  CXL: 'CXL',
  AUTO_XL: 'AUTO_XL',
  AUTO_CXL: 'AUTO_CXL',
  WS_TH_XL_LOI: 'WS_TH_XL_LOI',
};

export const ALL_STORAGE_PAGES = [];

export const FRONT_END_FOOTER_MODE = 'FE';
export const BACK_END_FOOTER_MODE = 'BE';
export const FOOTER_MODE = FRONT_END_FOOTER_MODE;
export const FRONT_END_FOOTER_STR =
  "<div style='float: left!important; display: block;'><div style=' display: flex; align-items: center; line-height: 1.5em; font-size: 14px; margin-top: 8px; padding-top:8px;  margin-bottom: 8px; padding-bottom:8px;'><div style=' font-weight: bold; margin-right: 5px;'>C???C C???NH S??T QU???N L?? H??NH CH??NH V??? TR???T T??? X?? H???I, B??? C??NG AN</div><div><span style='margin: 0px 5px 0px 5px;'>-</span> ?????a ch???: 47 Ph???m V??n ?????ng, C???u Gi???y, H?? N???i</div><div><span style='margin: 0px 5px 0px 5px;'>-</span> S??T: 069.234.2593</div></div></div>";

export const NOTIFY_CODE = {
  SEND_REQUEST: 'G???i ph?? duy???t h??? s?? th??nh c??ng',
  RETURN_REQUEST: 'G???i tr??? h??? s?? th??nh c??ng',
  RECEIVE_HANDLE_REQUEST: 'Ti???p nh???n h??? s?? th??nh c??ng',
  APPRORVE_REQUEST: 'Ph?? duy???t h??? s?? th??nh c??ng',
  DENIE_REQUEST: 'T??? ch???i ph?? duy???t h??? s?? th??nh c??ng',
  APPRORVE_CONFIG: 'C???u h??nh ph?? duy???t h??? s?? th??nh c??ng',
  PRINT_CONFIG: 'C???u h??nh trang in th??nh c??ng',
  CREATE_MAJOR: 'Th??m m???i nghi???p v??? th??nh c??ng',
  UPDATE_MAJOR: 'C???p nh???t nghi???p v??? th??nh c??ng',
  DELETE_MAJOR: 'X??a nghi???p v??? th??nh c??ng',
  CREATE_SAMPLE: 'Th??m m???i n???i dung m???u th??nh c??ng',
  UPDATE_SAMPLE: 'C???p nh???t n???i dung m???u th??nh c??ng',
  DELETE_SAMPLE: 'X??a n???i dung m???u th??nh c??ng',
  CREATE_THREAD_HANDLING_CONFIG: 'Th??m m???i ph??n lu???ng x??? l?? h??? s?? th??nh c??ng',
  UPDATE_THREAD_HANDLING_CONFIG: 'C???p nh???t ph??n lu???ng x??? l?? h??? s?? th??nh c??ng',
  DELETE_THREAD_HANDLING_CONFIG: 'X??a ph??n lu???ng x??? l?? h??? s?? th??nh c??ng',
  CREATE_PROFILE_HANDLING_CONFIG:
    'Th??m m???i c???u h??nh th???i gian x??? l?? h??? s?? th??nh c??ng',
  UPDATE_PROFILE_HANDLING_CONFIG:
    'C???p nh???t c???u h??nh th???i gian x??? l?? h??? s?? th??nh c??ng',
  DELETE_PROFILE_HANDLING_CONFIG:
    'X??a c???u h??nh ph??n lu???ng x??? l?? h??? s?? th??nh c??ng',
  SETUP_TIME_PROFILE_HANDLING: 'C??i ?????t th???i gian x??? l?? h??? s?? th??nh c??ng',
  UPDATE_TIME_PROFILE_HANDLING: 'C???p nh???t th???i gian x??? l?? h??? s?? th??nh c??ng',
  DELETE_TIME_PROFILE_HANDLING: 'X??a th???i gian x??? l?? h??? s?? th??nh c??ng',
};

export const FUNCTION_PERMISSIONS_MAPPING = {
  DASHBOARD_PAGE: {
    SEARCH: '016001003001',
    VIEW_DETAIL: '016001003002',
    EXPORT_FILE: '016001003003',
    PRINT_SEARCH_RESULT: '016001003004',
    ZOOM: '016001003005',
  },
  RECEIVE_PAGE: {
    RECEIVE_PROFILE: '016001001',
    SEARCH: '016001001001',
    RETURN: '016001001002',
    RECEIVE: '016001001003',
    SEND_APPROVAL: '016001001004',
    RECEIVE_APPROVAL: '016001001005',
    PRINT_SUGGEST_APPROVAL: '016001001006',
    VIEW_TABLE_CONFIG: '016001001007',
    VIEW_DETAIL: '016001001008',
    PRINT: '016001001009',
    SAVE: '016001001010',
    CANCEL: '016001001011',
    HISTORY: '016001001012',
  },
  APPROVAL_PAGE: {
    SEARCH: '016001002001',
    VIEW_TABLE_CONFIG: '016001002002',
    VIEW_DETAIL: '016001002003',
    APPROVAL: '016001002004',
    DO_NOT_APPROVAL: '016001002005',
    SAVE: '016001002006',
    CANCEL: '016001002007',
    VIEW_HISTORY: '016001002008',
  },
  SEARCH_PAGE: {
    SEARCH: '016001004006',
    VIEW_TABLE_CONFIG: '016001004005',
    VIEW_DETAIL: '016001004004',
    EXPORT_FILE: '016001004003',
    PRINT_RESULT: '016001004002',
    HISTORY: '016001004001',
    PRINT_TICKET: '016001004007',
  },
  REQUEST_TYPE_PAGE: {
    SEARCH: '016001005001',
    VIEW_TABLE_CONFIG: '016001005002',
    ADD_REQUEST_TYPE: '016001005003',
    UPDATE_REQUEST_TYPE: '016001005004',
    DELETE_REQUEST_TYPE: '016001005005',
    SAVE: '016001005006',
    AGREE: '016001005007',
    CANCEL: '016001005008',
  },
  SAMPLE_PAGE: {
    SEARCH: '016001006001',
    VIEW_TABLE_CONFIG: '016001006002',
    SAVE: '016001006003',
    AGREE: '016001006004',
    CANCEL: '016001006005',
    ADD_SAMPLE: '016001006006',
    UPDATE_SAMPLE: '016001006007',
    DELETE_SAMPLE: '016001006008',
  },
  APPRORVE_CONFIG_PAGE: {
    SEARCH: '016001007001',
    SAVE: '016001007002',
  },
  PRINT_CONFIG_PAGE: {
    SAVE: '016001008001',
  },
  PERMISSION_SETTING_PAGE: {
    SEARCH: '016001009001',
    VIEW_TABLE_CONFIG: '016001009002',
    ADD: '016001009003',
    UPDATE: '016001009004',
    DELETE: '016001009005',
    SAVE: '016001009006',
    AGREE: '016001009007',
    CANCEL: '016001009008',
  },
  SCHEDULE_CONFIG_PAGE: {
    SEARCH: '016001010006',
    ADD_SCHEDULE: '016001010005',
    UPDATE_SCHEDULE: '016001010004',
    DELETE_SCHEDULE: '016001010002',
    TIME_SETTING: '016001010003',
    SAVE: '016001010001',
    AGREE: '016001010007',
    CANCEL: '016001010008',
    UPDATE_TIME_SETTING: '016001010009',
    DELETE_TIME_SETTING: '016001010010',
  },
  REPORT_SOURCE_PAGE: {
    SEARCH: '016001011001',
    EXPORT_FILE: '016001011002',
    PRINT_SEARCH_RESULT: '016001011003',
  },
  REPORT_RECEIVER_PAGE: {
    SEARCH: '016001012001',
    EXPORT_FILE: '016001012002',
    PRINT_SEARCH_RESULT: '016001012003',
  },
  REPORT_MANAGER_APPROVAL_PAGE: {
    SEARCH: '016001013001',
    EXPORT_FILE: '016001013002',
    PRINT_SEARCH_RESULT: '016001013003',
  },
  REPORT_TASK_TYPE_PAGE: {
    SEARCH: '016001014001',
    EXPORT_FILE: '016001014002',
    PRINT_SEARCH_RESULT: '016001014003',
  },
  REPORT_PROCESS_TIME_BY_SOURCE_TYPE_PAGE: {
    SEARCH: '016001015001',
    EXPORT_FILE: '016001015002',
    PRINT_SEARCH_RESULT: '016001015003',
  },
  REPORT_PROCESS_TIME_BY_SOURCE_TYPE_PROCESSING_PAGE: {
    SEARCH: '016001016001',
    EXPORT_FILE: '016001016002',
    PRINT_SEARCH_RESULT: '016001016003',
  },
  DOCUMENT_PAGE: {
    VIEW_DETAIL: '016001017001',
    EXPORT_FILE: '016001017002',
  },
};

export const FUNCTION_NAME_MAPPING = [
  {
    code: '016001001',
    value: 'receive',
  },
  {
    code: '016001002',
    value: 'approval',
  },
  {
    code: '016001003',
    value: 'dashboard',
  },
  {
    code: '016001004',
    value: 'search',
  },
  {
    code: '016001005',
    value: 'setting_business_integration',
  },
  {
    code: '016001006',
    value: 'setting_sample_content',
  },
  {
    code: '016001007',
    value: 'setting_config_approval',
  },
  {
    code: '016001008',
    value: 'setting_config_print',
  },
  {
    code: '016001009',
    value: 'setting_config_threading_handling',
  },
  {
    code: '016001010',
    value: 'setting_config_handling_file',
  },
  {
    code: '016001011',
    value: 'report_by_ministry',
  },
  {
    code: '016001012',
    value: 'report_by_offcers_receive',
  },
  {
    code: '016001013',
    value: 'report_by_leader_approval',
  },
  {
    code: '016001014',
    value: 'report_by_status',
  },
  {
    code: '016001015',
    value: 'report_by_tgxl_by_ministry',
  },
  {
    code: '016001016',
    value: 'report_by_tgxl_by_ministry_processing process',
  },
  {
    code: '016001017',
    value: 'tutorial',
  },
];
export const REQUEST_TYPES = {
  birthDate: [
    'husbandBirthDate',
    'fatherBirthDate',
    'motherBirthDate',
    'wifeHusbandBirthDate',
    'protectorBirthDate',
    'birthDate',
    'notfoundDate',
    'approverDate',
  ],
  nationals: [
    // 'permanentCountryId',
    // 'regPlaceCountryId',
    // 'residentCountryId',
    // 'homeCountryId',
    // 'birthCountryId',
    // 'workCountryId',
    // 'tempResidentCountryId',
  ],
  nationalsId: [
    'husbandNationalityId1',
    'fatherNationalityId1',
    'motherNationalityId1',
    'wifeHusbandNationalityId',
    'protectorNationalityId1',
    'nationalityId',
    'permanentCountryId',
    'regPlaceCountryId',
    'residentCountryId',
    'homeCountryId',
    'birthCountryId',
    'workCountryId',
    'tempResidentCountryId',
    // 'nationalityArray',
  ],
  nationalityId: ['nationalityArray'],
  provinces: [
    'permanentCityId',
    'regPlaceCityId',
    'residentCityId',
    'homeCityId',
    'birthCityId',
    'workCityId',
    'tempResidentCityId',
  ],
  districts: [
    'permanentDistrictId',
    'regPlaceDistrictId',
    'residentDistrictId',
    'homeDistrictId',
    'birthDistrictId',
    'workDistrictId',
    'tempResidentDistrictId',
  ],
  villages: [
    'permanentVillageId',
    'regPlaceVillageId',
    'residentVillageId',
    'homeVillageId',
    'birthVillageId',
    'workVillageId',
    'tempResidentVillageId',
  ],
  ethnics: ['ethnicId'],
  relationship: ['hhRelationshipId'],
  militaryDuty: ['militaryDuty'],
  bloods: ['bloodGroup'],
  gender: ['gender'],
  marriage: ['marriageStatus'],
  religion: ['religionId'],
  citizenStatus: ['citizenStatus'],
};
