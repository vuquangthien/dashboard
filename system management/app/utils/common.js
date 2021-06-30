/* eslint-disable prefer-destructuring */
/* eslint-disable no-plusplus */
/* eslint-disable no-bitwise */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import moment from 'moment';
import _ from 'lodash';
import {
  DATE_FORMAT,
  REQUEST_METHOD,
  STATUS_CODE,
  TEMPLATE_URL,
  LIST_ITEM_URL,
  LIST_ITEM_TYPE,
  WORKFLOW_CODE,
  CONFIGURATION_URL,
  ALL_STORAGE_PAGES,
  COMMON_URL,
  GENDER,
  BLOOD_GROUP,
  MARRIAGE_STATUS,
  ADDRESS_URL,
  NATIONAL_URL,
  ETHNIC_URL,
  RELIGION_URL,
  REQUEST_URL,
} from './constants';
import request from './request';
import {
  sampleContents,
  BIRTH_FIELD_NAMES,
  COUNTRY_FIELD_NAMES,
  CITY_FIELD_NAMES,
  DISTRICT_FIELD_NAMES,
  VILLAGE_FIELD_NAMES,
  NATIONALITY_ID_FIELDS,
  HH_RELATIONSHIP,
  CITIZEN_STATUS,
  MILITARY_DUTY,
} from './commonConfig';

export const convertToFormData = data => {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  return formData;
};
export const convertBirthDate = dateString => {
  const year = `${dateString}`.slice(0, 4);
  const month = `${dateString}`.slice(4, 6);
  const day = `${dateString}`.slice(6, 8);
  if (!day && month) {
    return `${month}/${year}`;
  }
  if (!month && !day) {
    return year;
  }
  return `${day}/${month}/${year}`;
};

export const convertToDateString = (date, format = DATE_FORMAT.DATE) =>
  moment(date).format(format);

const formatSecond = secondsInMs => {
  const min = Math.floor(secondsInMs / (60 * 1000));
  const restSeconds = Math.floor((secondsInMs - min * 60 * 1000) / 1000);
  if (restSeconds === 0) {
    return `${min} phút`;
  }
  return `${min} phút ${restSeconds} giây`;
};

const formatMin = minutesInMs => {
  const hour = Math.floor(minutesInMs / (60 * 60 * 1000));
  return `${hour} giờ ${formatSecond(minutesInMs - hour * 60 * 60 * 1000)}`;
};

const formatHour = hoursInMs => {
  const days = Math.floor(hoursInMs / (24 * 60 * 60 * 1000));
  const restDay =
    Math.round((hoursInMs - days * 24 * 60 * 60 * 1000) / (60 * 1000)) *
    (60 * 1000);

  return `${days} ngày ${formatMin(restDay)}`;
};

const formatDay = daysInMs => {
  const months = Math.floor(daysInMs / (30 * 24 * 60 * 60 * 1000));
  return `${months} tháng ${formatHour(
    daysInMs - months * 30 * 24 * 60 * 60 * 1000,
  )}`;
};

const formatMonth = monthsInMs => {
  const years = Math.floor(monthsInMs / (12 * 30 * 24 * 60 * 60 * 1000));
  return `${years} năm ${formatDay(
    monthsInMs - years * 12 * 30 * 24 * 60 * 60 * 1000,
  )}`;
};

export const convertMsToTime = ms => {
  if (ms < 1000) return `${ms} mili giây`;
  if (ms < 60 * 1000) return `${Math.round(ms / 1000)} giây`;
  if (ms < 60 * 60 * 1000) return formatSecond(ms);
  if (ms < 24 * 60 * 60 * 1000) return formatMin(ms);
  if (ms < 30 * 24 * 60 * 60 * 1000) return formatHour(ms);
  if (ms < 12 * 30 * 24 * 60 * 60 * 1000) return formatDay(ms);
  return formatMonth(ms);
};

export const formatNumber = number =>
  number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');

export const getCountByWorkflowType = (statuses, codes) => {
  if (!statuses || statuses.length === 0 || !codes || codes.length === 0)
    return 0;
  let count = 0;

  Object.keys(codes).forEach(key => {
    const item = statuses.find(status => codes[key] === status.label);

    count += item ? item.count : 0;
  });

  return count;
};

export const formatBirthDate = date => {
  if (date) {
    const output = [];
    const sNumber = date.toString();
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < sNumber.length; i++) {
      output.push(+sNumber.charAt(i));
    }
    if (output.length === 8) {
      return `${output[0]}${output[1]}/${output[2]}${output[3]}/${output[4]}${
        output[5]
      }${output[6]}${output[7]}`;
    }
    if (output.length === 6) {
      return `${output[0]}${output[1]}/${output[2]}${output[3]}${output[4]}${
        output[5]
      }`;
    }
    if (output.length === 4) {
      return `${output[0]}${output[1]}${output[2]}${output[3]}`;
    }
  }
  return date;
};

// export const bloodGroupName = code => {
//   // eslint-disable-next-line radix
//   if (!code || parseInt(code) > 4) {
//     // eslint-disable-next-line no-param-reassign
//     code = 0;
//   }
//   // eslint-disable-next-line radix
//   const data = groupBlood.find(obj => obj.code === parseInt(code));
//   return data.name;
// };

// format file size
export const convertFileSize = bytes => {
  if (bytes <= 0) {
    return '0 B';
  }
  const ratio = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(ratio));

  return `${parseFloat((bytes / Math.pow(ratio, i)).toFixed(2))} ${sizes[i]}`;
};

export const serializeQuery = query =>
  query
    ? Object.keys(query)
      .map(key => `${key}=${query[key]}`)
      .join('&')
    : '';

export const s2ab = string => {
  const buffer = new ArrayBuffer(string.length);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < string.length; i += 1) {
    view[i] = string.charCodeAt(i) & 0xff;
  }
  return buffer;
};

export const isInRole = (userRoles, routeRoles) => {
  const role = routeRoles.find(
    routeRole => userRoles.find(userRole => routeRole === userRole) != null,
  );

  return role != null;
};

export const getSampleDisplayName = sampleCode => {
  let displayName = '';

  for (let i = 0; i < sampleContents.length; i++) {
    if (sampleContents[i].code === sampleCode) {
      displayName = sampleContents[i].displayName;
      break;
    }
  }

  return displayName;
};

export const getSampleContents = async sampleCode => {
  const [, workflowCode, taskCode, responseCode] = sampleCode.split('.');
  const body = {
    filter: {
      workflowCode: [workflowCode],
      taskCode: [taskCode],
      responseCode: [responseCode],
    },
  };

  const url = `${TEMPLATE_URL}/query`;
  const response = await request(url, {
    method: REQUEST_METHOD.POST,
    body: JSON.stringify(body),
  });

  if (response.status === STATUS_CODE.SUCCESS) {
    response.results = response.results.map((r, i) => ({
      ...r,
      code: sampleCode,
      displayName: getSampleDisplayName(sampleCode),
      comment: r.templateResponse,
      order: i + 1,
    }));
    return response.results;
  }
  return [];
};

export const getWorkflowIOFields = async (code, requestId, fieldNames) => {
  const url = `${LIST_ITEM_URL}/query`;
  try {
    const bizByCodeBody = { itemType: LIST_ITEM_TYPE.BIS_SERVICE, code };

    const bizByCodeResponse = await request(url, {
      method: REQUEST_METHOD.POST,
      body: JSON.stringify(bizByCodeBody),
    });
    if (bizByCodeResponse && bizByCodeResponse.status === STATUS_CODE.SUCCESS) {
      const { categories } = bizByCodeResponse;
      if (categories && categories[0]) {
        const data = { id: categories[0].id };

        const getInputFields = request(url, {
          method: REQUEST_METHOD.POST,
          body: JSON.stringify({
            itemType: LIST_ITEM_TYPE.FILTER_FIELD,
            parentId: data.id,
          }),
        });
        let getOutputFields;
        try {
          const extraDataJson = JSON.parse(categories[0].extraDataJson);
          if (
            extraDataJson &&
            extraDataJson.verifyService &&
            requestId &&
            Array.isArray(fieldNames)
          ) {
            getOutputFields = request(`${REQUEST_URL}/${requestId}`, {
              method: REQUEST_METHOD.GET,
            }).then(reqDetail => {
              const result = {
                categories: [],
              };
              if (reqDetail.status === STATUS_CODE.SUCCESS) {
                const { filterGroups = [] } = reqDetail;
                filterGroups.forEach(group => {
                  group.filterFields.forEach(field => {
                    result.categories.push(field.filterField);
                  });
                });
                result.categories = _.uniq(result.categories);
                result.categories = fieldNames.filter(
                  field => result.categories.indexOf(field.code) !== -1,
                );
              }
              return result;
            });
          } else {
            getOutputFields = request(url, {
              method: REQUEST_METHOD.POST,
              body: JSON.stringify({
                itemType: LIST_ITEM_TYPE.OUTPUT_FIELD,
                parentId: data.id,
              }),
            });
          }
        } catch (error) {
          getOutputFields = request(url, {
            method: REQUEST_METHOD.POST,
            body: JSON.stringify({
              itemType: LIST_ITEM_TYPE.OUTPUT_FIELD,
              parentId: data.id,
            }),
          });
        }
        //  url = `${REQUEST_URL}/${data.requestId}`;
        const responses = await Promise.all([getInputFields, getOutputFields]);

        return {
          inputFields: responses[0].categories,
          outputFields: responses[1].categories,
        };
      }
    }
  } catch (error) {
    console.log('error', error);
  }
  return {};
};

export const applyConfigWorkflowCodeToQuery = query => {
  const tmp = { ...query };
  tmp.filter = { ...tmp.filter };
  tmp.filter.workflowCode = [WORKFLOW_CODE.INTERGRATION];

  return tmp;
};

export const parseListFieldWithChild = array => {
  const tmp = [...array];
  return tmp
    .map(item => {
      try {
        const extraData = JSON.parse(item.extraDataJson);
        const result = { ...item, ...extraData, hasChild: false };
        if (!item.parentId) {
          result.hasChild =
            array.findIndex(innerItem => innerItem.parentId === item.id) > -1;
        }
        return result;
      } catch (error) {
        return { ...item, hasChild: false };
      }
    })
    .sort((a, b) => a.listOrder - b.listOrder);
};
export const buildTreeList = list => {
  // window.list = [...list];
  if (!list || !list.length) return;
  // const parsedList = parseListFieldWithChild(list);
  // window.parseList = parsedList;
  const parentList = list.filter(item => !item.parentId);
  const childList = list.filter(item => item.parentId);
  // eslint-disable-next-line consistent-return
  return parentList.map(parent => ({
    ...parent,
    children: childList.filter(c => c.parentId === parent.id),
  }));
};

export const buildTreeFromTemplate = (list, template) => {
  if (!template || !template.length || !list || !list.length) return list;
  const result = [];
  template.forEach(node => {
    if (!node.children || !node.children.length) {
      const foundNode = list.find(item => item.code === node.code);
      if (foundNode) {
        result.push({
          ...foundNode,
        });
      }
      return;
    }
    const children = list.filter(l =>
      node.children.find(c => c.code === l.code),
    );
    if (!children.length) return;
    result.push({
      ...node,
      children,
    });
  });
  return result;
};

export const formatDayInChart = (value, type) => {
  const values = value.split('');
  if (type === 'day') {
    return `${values[6]}${values[7]}/${values[4]}${values[5]}`;
  }
  if (type === 'week') {
    return `${values[4]}${values[5]}`;
  }
  if (type === 'month') {
    return `${values[4]}${values[5]}`;
  }
  if (type === 'quarter') {
    return `${values[4]}`;
  }
  return value;
};

export const getWeekInYear = () => {
  const year = new Date().getFullYear();
  const weekDay = moment([year, 0, 1]).isoWeekday();
  const currentDayInYear = moment().dayOfYear();
  if (weekDay === 1) {
    const week = Math.ceil(currentDayInYear / 7);
    return week;
  }
  const week = Math.ceil((currentDayInYear - weekDay) / 7 + 1);

  return week;
  // const currentWeekInYear =
};

export const getNoteFromHistories = histories => {
  for (let i = histories.length - 1; i >= 0; i -= 1) {
    if (histories[i].finishedDate) {
      return histories[i].comments || '';
    }
  }
  return '';
};

export const findMinistryName = (ministries, code) => {
  if (ministries && ministries.length >= 1) {
    const obj =
      ministries.find(objChild => objChild.ministryCode === code) || {};
    return obj ? obj.ministryName : '';
  }
  return '';
};
export const findBizServicesName = (bizServices, code) => {
  if (bizServices && bizServices.length > 0) {
    const obj = bizServices.find(objChild => objChild.code === code) || {};
    return obj ? obj.displayName : '';
  }
  return '';
};

export const getConfigPrint = async data => {
  const url = `${CONFIGURATION_URL}/query`;
  const response = await request(url, {
    method: REQUEST_METHOD.POST,
    body: JSON.stringify(data),
  });
  return response;
};

export const checkCanRefresh = (filter, objectDate, exceptFields) => {
  // console.log('filter', filter);
  // console.log('objectDate', objectDate);
  try {
    const { fromDate, toDate } = objectDate;
    if (fromDate || toDate) return false;
    const newFilter = {};
    Object.keys(filter).forEach(key => {
      if (
        Array.isArray(exceptFields) &&
        exceptFields.length &&
        exceptFields.includes(key)
      )
        return;
      newFilter[key] = filter[key];
    });
    return !Object.values(newFilter).find(val => {
      if (Array.isArray(val) && val.length > 0) {
        return true;
      }
      if (typeof val === 'string' && val.length > 0) {
        return true;
      }
      if (
        typeof val === 'object' &&
        val &&
        Object.keys(val).length > 0 &&
        typeof val.fromDate === 'undefined' &&
        typeof val.toDate === 'undefined'
      ) {
        return true;
      }
      return false;
    });
  } catch (error) {
    // ignore
    console.log('error', error);
    return false;
  }
};
export const saveQuery = (page, query) => {
  try {
    localStorage.setItem(page, JSON.stringify(query));
  } catch (error) {
    localStorage.removeItem(page);
  }
};

export const getQueryByPage = page => {
  try {
    ALL_STORAGE_PAGES.forEach(pageName => {
      if (pageName !== page) {
        localStorage.removeItem(pageName);
      }
    });
    if (!page) return null;
    const queryStr = localStorage.getItem(page);
    return JSON.parse(queryStr);
  } catch (error) {
    return null;
  }
};

export const clearAllQuery = () => getQueryByPage();

export const componentShouldQueryPreviousPage = (queryPaging, queryResults) => {
  if (
    queryPaging &&
    queryPaging.skip !== 0 &&
    Array.isArray(queryResults) &&
    queryResults.length === 0
  ) {
    const newPaging = {
      ...queryPaging,
      skip:
        queryPaging.skip - queryPaging.limit > 0
          ? queryPaging.skip - queryPaging.limit
          : 0,
    };
    return newPaging;
  }
  return null;
};

//  TT - SAVE THEME + GET THEME : saveThemeToLocalStorage , getKeyColorThemeFromLocalStorage
export const saveThemeToLocalStorage = (key, objColor) => {
  try {
    localStorage.setItem(key, JSON.stringify(objColor));
  } catch (error) {
    localStorage.removeItem(key);
  }
};

export const getKeyColorThemeFromLocalStorage = key => {
  try {
    if (!key) return 'default';
    const objColor = localStorage.getItem(key);
    const result = JSON.parse(objColor);
    const arrValueColor = [
      'default',
      'red',
      'white',
      'green',
      'yellow',
      'blue',
    ];
    if (arrValueColor.indexOf(result) !== -1) {
      return result;
    }
  } catch (error) {
    return 'default';
  }
};

export const checkHasPermission = (currentUser, action) =>
  currentUser &&
  currentUser.actions &&
  currentUser.actions.find(e => `${e}` === `${action}`);

export const capitalizeCharacter = str => {
  if (typeof str === 'string') {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return str;
};
export const capitalizeWord = str => {
  if (typeof str === 'string') {
    return str
      .toLowerCase()
      .split("'")
      .map(capitalizeCharacter)
      .join("'")
      .split(' ')
      .map(capitalizeCharacter)
      .join(' ');
  }
  return str;
};

export const getLocal = async data => {
  const url = `${COMMON_URL}/local`;
  try {
    const response = await request(url, {
      method: REQUEST_METHOD.POST,
      body: JSON.stringify(data),
    });

    if (response.status === STATUS_CODE.SUCCESS) {
      return response;
    }
    return [];
  } catch (error) {
    return [];
  }
};
export const parseDateCitizen = date => {
  if (date) {
    const output = [];
    const sNumber = date.toString();
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < sNumber.length; i++) {
      output.push(+sNumber.charAt(i));
    }
    if (output.length === 8) {
      return `${output[6]}${output[7]}/${output[4]}${output[5]}/${output[0]}${
        output[1]
      }${output[2]}${output[3]}`;
    }
    if (output.length === 6) {
      return `${output[4]}${output[5]}/${output[0]}${output[1]}${output[2]}${
        output[3]
      }`;
    }
    if (output.length === 4) {
      return `${output[0]}${output[1]}${output[2]}${output[3]}`;
    }
  }
};

export const getNational = async id => {
  const data = JSON.parse(JSON.parse(id));
  if (data.length > 1) {
    const idCountry = `${data[0]}_${data[1]}`;
    const url = `${NATIONAL_URL}/${idCountry}`;
    try {
      const response = await request(url, {
        method: REQUEST_METHOD.GET,
      });
      if (response.status === STATUS_CODE.SUCCESS && response.data) {
        return response.data ? response.data.nationName : idCountry;
      }
      return idCountry;
    } catch (error) {
      return idCountry;
    }
  } else {
    const idCountry = data;
    const url = `${NATIONAL_URL}/${idCountry}`;
    try {
      const response = await request(url, {
        method: REQUEST_METHOD.GET,
      });
      if (response.status === STATUS_CODE.SUCCESS && response.data) {
        return response.data ? response.data[0].nationName : idCountry;
      }
      return idCountry;
    } catch (error) {
      return idCountry;
    }
  }
};
export const getListNational = async () => {
  const url = `${NATIONAL_URL}`;
  try {
    const response = await request(url, {
      method: REQUEST_METHOD.GET,
    });
    if (response.status) {
      return response.nations;
    }
    return [];
  } catch (error) {
    return [];
  }
};

export const getProvince = async id => {
  const url = `${ADDRESS_URL}/${id}`;
  try {
    const response = await request(url, {
      method: REQUEST_METHOD.GET,
    });
    // eslint-disable-next-line no-undef
    if (
      response.status === STATUS_CODE.SUCCESS &&
      response.orgUnits &&
      response.orgUnits.length > 0
    ) {
      return response.orgUnits[0].province ? response.orgUnits[0].province : id;
    }
    return id;
  } catch (error) {
    return id;
  }
};

export const getDistrict = async (provinceId, districtId) => {
  const url = `${ADDRESS_URL}/${provinceId}/districts/${districtId}`;
  try {
    const response = await request(url, {
      method: REQUEST_METHOD.GET,
    });
    if (
      response.status === STATUS_CODE.SUCCESS &&
      response.districts &&
      response.districts.length > 0
    ) {
      return response.districts[0].district
        ? response.districts[0].district
        : districtId;
    }
    return districtId;
  } catch (error) {
    return districtId;
  }
};

export const getVillage = async (provinceId, districtId, villageId) => {
  const url = `${ADDRESS_URL}/${provinceId}/districts/${districtId}/villages/${villageId}`;
  try {
    const response = await request(url, {
      method: REQUEST_METHOD.GET,
    });
    if (response.status === STATUS_CODE.SUCCESS && response.villages) {
      return response.villages[0].village
        ? response.villages[0].village
        : villageId;
    }
    return villageId;
  } catch (error) {
    return villageId;
  }
};

export const getEthnic = async id => {
  const url = `${ETHNIC_URL}/${id}`;
  try {
    const response = await request(url, {
      method: REQUEST_METHOD.GET,
    });

    if (
      response.status === STATUS_CODE.SUCCESS &&
      response.ethnics &&
      response.ethnics.length > 0
    ) {
      return response.ethnics[0].ethnicName
        ? response.ethnics[0].ethnicName
        : id;
    }
    return id;
  } catch (error) {
    return id;
  }
};

export const getReligion = async id => {
  const url = `${RELIGION_URL}/${id}`;
  try {
    const response = await request(url, {
      method: REQUEST_METHOD.GET,
    });

    if (
      response.status === STATUS_CODE.SUCCESS &&
      response.religions &&
      response.religions.length > 0
    ) {
      return response.religions[0].religionName
        ? response.religions[0].religionName
        : id;
    }
    return id;
  } catch (error) {
    return id;
  }
};
export const getRelationship = code => {
  if (!code || (parseInt(code) > 11 && code !== 99)) {
    // eslint-disable-next-line no-param-reassign
    code = 0;
  }
  const data = HH_RELATIONSHIP.find(obj => obj.code === parseInt(code)) || {};
  return data ? data.name : code;
};
export const getCitizenStatus = code => {
  if (!code || parseInt(code) > 3) {
    // eslint-disable-next-line no-param-reassign
    code = 0;
  }
  const data = CITIZEN_STATUS.find(obj => obj.code === parseInt(code)) || {};
  return data ? data.name : code;
};
export const getMilitaryDuty = value => {
  if (!value || parseInt(value) > 3) {
    // eslint-disable-next-line no-param-reassign
    value === null;
  }
  const data = MILITARY_DUTY.find(obj => obj.value === parseInt(value)) || {};
  return value ? data.name : value;
};

export const getListEthnic = async () => {
  const url = `${ETHNIC_URL}`;
  try {
    const response = await request(url, {
      method: REQUEST_METHOD.GET,
    });
    if (response.status === STATUS_CODE.SUCCESS) {
      return response.ethnics;
    }
    return [];
  } catch (error) {
    return [];
  }
};

export const getListReligion = async () => {
  const url = `${RELIGION_URL}`;
  try {
    const response = await request(url, {
      method: REQUEST_METHOD.GET,
    });
    if (response.status === STATUS_CODE.SUCCESS) {
      return response.religions;
    }
    return [];
  } catch (error) {
    return [];
  }
};

export const renderFieldValue = (
  fieldName,
  fieldValue,
  fieldValueLabel,
  extraData,
) => {
  if (!fieldValue && fieldValue !== 0) return '';
  if (BIRTH_FIELD_NAMES.indexOf(fieldName) !== -1) {
    // if (fieldValue.length)
    // const date = moment(fieldValue, EXPERTISE_RESULT_DATE_FORMAT);
    // if (!date || !date.isValid()) return fieldValue;
    // return date.format('DD/MM/YYYY');
    return convertBirthDate(fieldValue);
  }
  if (NATIONALITY_ID_FIELDS.indexOf(fieldName) !== -1) {
    return (
      window.NATIONS &&
      window.NATIONS.find(e => `${e.value}` === `${fieldValue}`)
    );
  }
  if (CITY_FIELD_NAMES[`${fieldName}`]) {
    let mapData = fieldValue;
    getLocalPerField(fieldValue, 'province', cbData => {
      mapData = cbData;
    });
    return mapData;
  }
  if (DISTRICT_FIELD_NAMES[`${fieldName}`]) {
    let mapData = fieldValue;
    getLocalPerField(fieldValue, 'district', cbData => {
      mapData = cbData;
    });
    return mapData;
  }
  if (VILLAGE_FIELD_NAMES[`${fieldName}`]) {
    let mapData = fieldValue;
    // return ;
    getLocalPerField(fieldValue, 'village', dataCalled => {
      mapData = dataCalled;
    });
    // Promise.all(getLocalPerField(fieldValue, 'village').then(data => data));
    // console.log()
    return mapData;
  }

  if (fieldName === 'BLOOD_GROUP') {
    const bloodGroup = BLOOD_GROUP.find(b => `${b.value}` === `${fieldValue}`);
    if (bloodGroup) return bloodGroup.name;
  }

  if (fieldName === 'GENDER') {
    if (parseInt(fieldValue, 10) === 1) return 'Nam';
    if (parseInt(fieldValue, 10) === 2) return 'Nữ';
    if (parseInt(fieldValue, 10) === 0) return 'Chưa có thông tin';
    if (parseInt(fieldValue, 10) === 3) return 'Khác';
    return 'Không xác định';
  }

  if (fieldName === 'HH_RELATIONSHIP_ID') {
    const relationship = HH_RELATIONSHIP.find(
      b => `${b.value}` === `${fieldValue}`,
    );
    if (relationship) return relationship.name;
  }

  if (fieldName === 'MARRIAGE_STATUS') {
    const status = MARRIAGE_STATUS.find(
      s => s.value === parseInt(fieldValue, 10),
    );
    if (status) return status.name;
  }
  if (fieldName === 'ETHNIC_ID') {
    if (fieldValueLabel) return fieldValueLabel;
    if (extraData && Array.isArray(extraData.ethnics)) {
      const foundEthnic = extraData.ethnics.find(
        e => `${e.value}` === `${fieldValue}`,
      );
      if (foundEthnic) return foundEthnic.name;
    }
    if (window.ETHNICS && window.ETHNICS[fieldValue])
      return window.ETHNICS[fieldValue].name || fieldValue;
  }
  if (fieldName === 'RELIGION_ID') {
    if (fieldValueLabel) return fieldValueLabel;
    if (extraData && Array.isArray(extraData.religions)) {
      const foundReligion = extraData.religions.find(
        e => `${e.value}` === `${fieldValue}`,
      );
      if (foundReligion) return foundReligion.name;
    }
    if (window.RELIGIONS && window.RELIGIONS[fieldValue])
      return window.RELIGIONS[fieldValue].name || fieldValue;
  }
  if (
    COUNTRY_FIELD_NAMES[fieldName] ||
    CITY_FIELD_NAMES[fieldName] ||
    DISTRICT_FIELD_NAMES[fieldName] ||
    VILLAGE_FIELD_NAMES[fieldName] ||
    NATIONALITY_ID_FIELDS.indexOf(fieldName) !== -1
  ) {
    return fieldValueLabel || fieldValue;
  }
  return fieldValue;
};
export const getLocalPerField = (dataFilter, field, callback) => {
  const getLocationQuery = {
    provinceIds: field === 'province' ? [`${dataFilter}`] : [],
    districtIds: field === 'district' ? [`${dataFilter}`] : [],
    villageIds: field === 'village' ? [`${dataFilter}`] : [],
  };

  getLocal(getLocationQuery)
    .then(response => {
      const { districts, provinces, villages } = response;
      // console.log(villages);
      // const provinceKeyById = _.keyBy(provinces, 'provinceId');

      // const districtKeyById = _.keyBy(districts, 'districtId');

      // const villageKeyById = _.keyBy(villages, 'villageId');
      if (field === 'village') callback(villages[0].village);
      if (field === 'district') callback(districts[0].district);
      if (field === 'province') callback(provinces[0].province);
      // setProvince(provinceKeyById[item.targetProvinceId]);
      // setDistrict(districtKeyById[item.targetDistrictId]);
      // setVillage(villageKeyById[item.targetSubDistrictId]);
    })
    .catch(err => {
      console.log(err);
    });
};

export const getGroupBlood = code => {
  // TT - NẾU NHÓM MÁU NULL - THÌ TRẢ VỀ RỖNG.
  if (code === null) {
    return '';
  }
  // eslint-disable-next-line radix
  if (!code) {
    // if (!code || parseInt(code) > 4) {
    // eslint-disable-next-line no-param-reassign
    code = 0;
  }
  // eslint-disable-next-line radix
  const data = BLOOD_GROUP.find(obj => obj.code === parseInt(code)) || {};
  return data ? data.name : '';
};

export const getGender = code => {
  const data = GENDER.find(obj => `${obj.code}` === `${code}`);
  return data ? data.name : code;
};

export const getMarriage = value => {
  if (!value || parseInt(value) > 3) {
    // eslint-disable-next-line no-param-reassign
    value === null;
  }
  const data = MARRIAGE_STATUS.find(obj => obj.value === parseInt(value)) || {};
  return data ? data.name : value;
};

export const convertNotFoundDateToString = string => {
  if (typeof string === 'string') {
    const year = string.slice(0, 4);
    const month = string.slice(4, 6);
    const day = string.slice(6, 8);
    let value;
    if (year !== '' && month !== '' && day !== '')
      value = `${day}/${month}/${year}`;
    if (year !== '' && month !== '' && day === '') value = `${month}/${year}`;
    if (year !== '' && month === '' && day === '') value = `${year}`;

    return value;
    // return {
    // value
    // ,
    // isConverted: true
    // }
  }
};
