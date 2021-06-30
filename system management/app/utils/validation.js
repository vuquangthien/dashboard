/* eslint-disable no-bitwise */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import moment from 'moment';
export const validateTextFieldReturnError = (
  value,
  rules = {
    isRequired: false,
    minLength: 0,
    maxLength: 500,
    isNumber: false,
    allowSpecialChar: false,
    commonError: null,
  },
) => {
  if (rules.isNumber) {
    if (rules.isRequired) {
      if (value === null || value === '') {
        return `Không được bỏ trống trường này`;
      }
    }
    if (rules.minLength && Number.parseFloat(value) < rules.minLength) {
      return `Không được nhỏ hơn ${rules.minLength}`;
    }
    if (rules.maxLength && Number.parseFloat(value) >= rules.maxLength) {
      return `Không được lớn hơn ${rules.maxLength - 1}`;
    }

    return undefined;
  }

  if (!value && !rules.isRequired) return undefined;
  if (typeof value !== 'string' && rules.isNumber === undefined)
    return rules.commonError || `Không được để trống trường này`;
  const str = value.trim();
  if (!str && !rules.isRequired) return undefined;
  if (str.length < rules.minLength)
    return (
      rules.commonError ||
      `Độ dài chuỗi nhập vào không được nhỏ hơn ${rules.minLength} kí tự`
    );
  if (str.length > rules.maxLength)
    return (
      rules.commonError ||
      `Độ dài chuỗi nhập vào không được lớn hơn ${rules.maxLength} kí tự`
    );
  if (str.length <= 0)
    return rules.commonError || `Không được để trống trường này`;
  // const regex = /^[a-z0-9A-Z_/\sÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/;
  // const regex = /[!@#$%^&*()~<>]/;
  const regex = /[@#$%^&*()~<>]/;
  if (rules.allowSpecialChar) return undefined;
  if (regex.test(str)) {
    return rules.commonError || `Chuỗi nhập vào không được chứa ký tự đặc biệt`;
  }
  return undefined;
};
// TT
export const validateTextFieldAndCheckInListValueReturnError = (
  value,
  rules = {
    isRequired: false,
    minLength: 0,
    maxLength: 500,
    isNumber: false,
    allowSpecialChar: false,
    commonError: null,
    listValue: [],
  },
) => {
  // 1.NUMBER
  if (rules.isNumber) {
    if (rules.isRequired) {
      if (value === null || value === '') {
        return `Không được bỏ trống trường này`;
      }
    }
    if (rules.minLength && Number.parseFloat(value) < rules.minLength) {
      return `Không được nhỏ hơn ${rules.minLength}`;
    }
    if (rules.maxLength && Number.parseFloat(value) >= rules.maxLength) {
      return `Không được lớn hơn ${rules.maxLength - 1}`;
    }

    return undefined;
  }
  // 2.STRING
  if (!value && !rules.isRequired) return undefined;
  if (typeof value !== 'string' && rules.isNumber === undefined)
    return rules.commonError || `Không được để trống trường này`;
  const str = value.trim();
  if (!str && !rules.isRequired) return undefined;
  if (str.length < rules.minLength)
    return (
      rules.commonError ||
      `Độ dài chuỗi nhập vào không được nhỏ hơn ${rules.minLength} kí tự`
    );
  if (str.length > rules.maxLength)
    return (
      rules.commonError ||
      `Độ dài chuỗi nhập vào không được lớn hơn ${rules.maxLength} kí tự`
    );
  if (str.length <= 0)
    return rules.commonError || `Không được để trống trường này`;

  // TT ISSUE 520 - 7
  if (rules.listValue && rules.listValue.length > 0 && str.length > 0) {
    if (rules.listValue.indexOf(str.toUpperCase()) !== -1)
      return rules.commonError || `Mã nghiệp vụ đã tồn tại`;
  }

  // const regex = /^[a-z0-9A-Z_/\sÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/;
  // const regex = /[!@#$%^&*()~<>]/;
  const regex = /[@#$%^&*()~<>]/;
  if (rules.allowSpecialChar) return undefined;
  if (regex.test(str)) {
    return rules.commonError || `Chuỗi nhập vào không được chứa ký tự đặc biệt`;
  }
  return undefined;
};
//
export const validateTextField = (
  value,
  rules = {
    minLength: 0,
    maxLength: 200,
    isRequired: false,
    allowSpecialChar: false,
    isNumber: false,
  },
) => {
  if (!value && !rules.isRequired) return true;
  if (typeof value !== 'string') return false;
  const str = value.trim();
  if (str.length <= 0) return false;
  // const regex = /^[a-z0-9A-Z_/\sÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/;
  if (Number.isInteger(rules.minLength) && str.length < rules.minLength)
    return false;
  if (Number.isInteger(rules.maxLength) && str.length > rules.maxLength)
    return false;

  const regex = /[!@#$%^&*()~<>]/;
  if (rules.allowSpecialChar) return true;
  if (rules.isNumber) {
    return /^[0-9]+$/.test(str);
  }
  return !regex.test(str);
};
// valid list item code [number, text, _]
export const validateCode = (
  value,
  rules = {
    minLength: 0,
    maxLength: 500,
    isRequired: false,
    allowSpecialChar: false,
    commonError: null,
  },
) => {
  if (!value && !rules.isRequired) return null;
  if (typeof value !== 'string')
    return rules.commonError || `Không được để trống trường này`;
  const str = value.trim();
  if (!str && !rules.isRequired) return null;
  if (str.length <= 0)
    return rules.commonError || `Không được để trống trường này`;
  // const regex = /^[a-z0-9A-Z_/\sÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/;
  if (Number.isInteger(rules.minLength) && str.length < rules.minLength)
    return (
      rules.commonError ||
      `Độ dài chuỗi nhập vào không được nhỏ hơn ${rules.minLength} kí tự`
    );
  if (Number.isInteger(rules.maxLength) && str.length > rules.maxLength)
    return (
      rules.commonError ||
      `Độ dài chuỗi nhập vào không được lớn hơn ${rules.maxLength} kí tự`
    );
  const regex = /^[0-9A-Z_]+$/;
  regex.test(str);
  if (!regex.test(str)) {
    return rules.commonError || `Chuỗi nhập vào không được chứa ký tự đặc biệt`;
  }
  return null;
};

// valid datet dd/mm/yyyy
export const validateDate = (
  value,
  options = { dateRange: 5, dateRangeField: 'year' },
  format = 'DD/MM/YYYY',
  sep = '/',
) => {
  // console.log('value', value);
  if (typeof value !== 'string') return false;
  const str = value.trim();
  if (!str.trim()) return false;
  const values = value.split(sep);
  const formats = format.split(sep);
  if (values.length !== formats.length) return false;
  for (let i = 0; i < values.length; i += 1) {
    if (values[i].length !== formats[i].length) return false;
  }
  // hardcord min year and max length for user input
  const minYear = moment().get(options.dateRangeField) - options.dateRange;
  const yearInt = parseInt(values[2], 10);
  if (yearInt < minYear) return false;
  return moment(value, format).isValid();
};
// validate number > 0
export const validateNumber = value => !Number.isNaN(value);

// validate email
export const validateEmail = value => {
  // console.log('value', value);
};
