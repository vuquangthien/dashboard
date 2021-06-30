/* eslint-disable prettier/prettier */
import React, { useEffect, useState, memo } from 'react';
import { getLocalPerField, convertBirthDate } from '../../utils/common';
import {
  NATIONALITY_ID_FIELDS,
  BIRTH_FIELD_NAMES,
  DISTRICT_FIELD_NAMES,
  CITY_FIELD_NAMES,
  VILLAGE_FIELD_NAMES,
  HH_RELATIONSHIP,
  COUNTRY_FIELD_NAMES,
  MARRIAGE_STATUS,
  CITIZEN_STATUS,
  MILITARY_DUTY,
} from '../../utils/commonConfig';
// TT
import { BLOOD_GROUP } from '../../utils/constants';
export const RenderFieldValue = props => {
  const { fieldName, fieldValue, fieldValueLabel, extraData } = props;
  const [state, setState] = useState(fieldValue);

  useEffect(() => {
    if (!fieldValue && fieldValue !== 0) return '';
    if (BIRTH_FIELD_NAMES.indexOf(fieldName) !== -1) {
      setState(convertBirthDate(fieldValue));
    }
    if (NATIONALITY_ID_FIELDS.indexOf(fieldName) !== -1 || COUNTRY_FIELD_NAMES[fieldName]) {
      if (window.NATIONS && window.NATIONS[fieldValue])
        setState(window.NATIONS[fieldValue].label || fieldValue);
    }
    if (CITY_FIELD_NAMES[`${fieldName}`]) {
      getLocalPerField(fieldValue, 'province', cbData => {
        setState(cbData);
      });
    }
    if (DISTRICT_FIELD_NAMES[`${fieldName}`]) {
      getLocalPerField(fieldValue, 'district', cbData => {
        setState(cbData);
      });
    }
    if (VILLAGE_FIELD_NAMES[`${fieldName}`]) {
      getLocalPerField(fieldValue, 'village', cbData => {
        setState(cbData);
      });
    }
    if (fieldName === 'MILITARY_DUTY') {
      const militaryDuty = MILITARY_DUTY.find(
        b => `${b.value}` === `${fieldValue}`,
      );
      if (militaryDuty) setState(militaryDuty.name);
    }
    if (fieldName === 'CITIZEN_STATUS') {
      const citizenStatus = CITIZEN_STATUS.find(
        b => `${b.value}` === `${fieldValue}`,
      );
      if (citizenStatus) setState(citizenStatus.name);
    }
    // TT
    if (fieldName === 'BLOOD_GROUP') {
      const bloodGroup = BLOOD_GROUP.find(
        b => `${b.code}` === `${fieldValue}`,
        // b => `${b.value}` === `${fieldValue}`,
      );
      if (bloodGroup) setState(bloodGroup.name);
    }

    if (fieldName === 'GENDER') {
      let data = fieldValue;
      if (`${fieldValue}` === '1') data = 'Nam';
      else if (`${fieldValue}` === '2') data = 'Nữ';
      else if (`${fieldValue}` === '3') data = 'Khác';
      else if (`${fieldValue}` === '0') data = 'Chưa có thông tin';
      else data = 'Không xác định';
      setState(data);
    }

    if (fieldName === 'HH_RELATIONSHIP_ID') {
      const relationship = HH_RELATIONSHIP.find(
        b => `${b.value}` === `${fieldValue}`,
      );
      if (relationship) setState(relationship.name);
    }

    if (fieldName === 'MARRIAGE_STATUS') {
      const status = MARRIAGE_STATUS.find(
        s => s.value === parseInt(fieldValue, 10),
      );
      if (status) setState(status.name);
    }
    if (fieldName === 'ETHNIC_ID') {
      if (fieldValueLabel) setState(fieldValueLabel);
      if (extraData && Array.isArray(extraData.ethnics)) {
        const foundEthnic = extraData.ethnics.find(
          e => `${e.value}` === `${fieldValue}`,
        );
        if (foundEthnic) setState(foundEthnic.name);
      }
      if (window.ETHNICS && window.ETHNICS[fieldValue])
        setState(window.ETHNICS[fieldValue].name || fieldValue);
    }
    if (fieldName === 'RELIGION_ID') {
      if (fieldValueLabel) setState(fieldValueLabel);
      if (extraData && Array.isArray(extraData.religions)) {
        const foundReligion = extraData.religions.find(
          e => `${e.value}` === `${fieldValue}`,
        );
        if (foundReligion) setState(foundReligion.name);
      }
      if (window.RELIGIONS && window.RELIGIONS[fieldValue])
        setState(window.RELIGIONS[fieldValue].name || fieldValue);
    }
    // if (
    //   COUNTRY_FIELD_NAMES[fieldName] ||
    //   CITY_FIELD_NAMES[fieldName] ||
    //   DISTRICT_FIELD_NAMES[fieldName] ||
    //   VILLAGE_FIELD_NAMES[fieldName] ||
    //   NATIONALITY_ID_FIELDS.indexOf(fieldName) !== -1
    // ) {
    //   setState(fieldValueLabel || fieldValue);
    // }
  }, []);

  return <>{state}</>;
};

export default memo(RenderFieldValue);