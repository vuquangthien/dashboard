/* eslint-disable no-fallthrough */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-array-index-key */
import React, { Fragment, useCallback, useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import GridList from '.';
// import ProfileDialog from '../Modal/ProfileDialog';
import {
  parseDateCitizen,
  getLocal,
  getListReligion,
  getListEthnic,
  getListNational,
  getRelationship,
  getGroupBlood,
  getGender,
  getMarriage,
  getCitizenStatus,
  convertNotFoundDateToString,
  convertBirthDate,
  getMilitaryDuty,
} from '../../utils/common';
import { REQUEST_TYPES, INT_STATUS } from '../../utils/constants';
import { taskTypes, taskStatus } from '../../utils/workFlow';

export function FileDetailsList(props) {
  const {
    isLoading,
    data,
    onLoadData,
    count,
    columns,
    viewConfigPermission,
    openLinkPermission,
    textSearchPermission,
    totalData,
  } = props;
  // const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const [itemSelected, setItemSelected] = useState(null);
  const [locals, setLocals] = useState({
    status: null,
    provinces: [],
    districts: [],
    villages: [],
  });
  const [ethnics, setEthnics] = useState([]);
  const [religions, setReligions] = useState([]);
  const [nationals, setNationals] = useState([]);
  //
  // const handleCloseLink = useCallback(() => {
  //   setOpenProfileDialog(false);
  // }, []);

  useEffect(() => {
    if (columns && columns.length > 0 && data) {
      const dataLocal = {
        provinceIds: [],
        districtIds: [],
        villageIds: [],
        idOrCode: 'code',
      };
      columns.forEach(item => {
        for (const key in REQUEST_TYPES) {
          if (REQUEST_TYPES[key].includes(item.name)) {
            switch (key) {
              case 'provinces':
                dataLocal.provinceIds = dataLocal.provinceIds
                  .concat(
                    data.filter(obj => obj[item.name]).map(c => c[item.name]),
                  )
                  .reduce(
                    (unique, item) =>
                      unique.includes(item) ? unique : [...unique, item],
                    [],
                  );
                break;
              case 'districts':
                dataLocal.districtIds = dataLocal.districtIds
                  .concat(
                    data.filter(obj => obj[item.name]).map(c => c[item.name]),
                  )
                  .reduce(
                    (unique, item) =>
                      unique.includes(item) ? unique : [...unique, item],
                    [],
                  );
                break;
              case 'villages':
                dataLocal.villageIds = dataLocal.villageIds
                  .concat(
                    data.filter(obj => obj[item.name]).map(c => c[item.name]),
                  )
                  .reduce(
                    (unique, item) =>
                      unique.includes(item) ? unique : [...unique, item],
                    [],
                  );
                break;
              default:
                break;
            }
          }
        }
      });
      if (
        dataLocal.provinceIds.length > 0 ||
        dataLocal.provinceIds.length > 0 ||
        dataLocal.villageIds.length > 0
      ) {
        onGetLocal(dataLocal, setLocals);
      }
    }
  }, [columns, data]);

  useEffect(() => {
    onGetEthnics(setEthnics);
    onGetReligions(setReligions);
    onGetNational(setNationals);
  }, []);
  // console.log(data);
  
  // useEffect(() => {
  //   data = {};
  // }, [onLoadData]);

  const onGetLocal = (data, setData) => {
    getLocal(data).then(data => {
      // eslint-disable-next-line no-unused-expressions
      setData && setData(data);
    });
  };

  const onGetEthnics = setData => {
    getListEthnic().then(data => {
      // eslint-disable-next-line no-unused-expressions
      setData && setData(data);
    });
  };

  const onGetReligions = setData => {
    getListReligion().then(data => {
      // eslint-disable-next-line no-unused-expressions
      setData && setData(data);
    });
  };

  const onGetNational = setData => {
    getListNational().then(data => {
      // eslint-disable-next-line no-unused-expressions
      setData && setData(data);
    });
  };

  const handleOpenLink = item => {
    // setOpenProfileDialog(true);
    setItemSelected(item);
  };
  const parseNational = id => {
    const data = nationals.find(
      obj => obj && parseInt(obj.nationId) === parseInt(id),
    );
    return data ? data.nationName : id;
  };
  const parseNationalId = id => {
    // const newNationArray = nationals.filter(nation => {
    //   if (Array.isArray(id)) {
    //     if (id.find(e => e === nation.nationCode)) {
    //       return nation;
    //     }
    //   } else {
    //     if (`${nation.nationCode}` === `${id}`) {
    //       return nation
    //     }
    //   }
    const newId = id.split(',');
    const newNationArray = nationals.filter(nation => {
      if (Array.isArray(newId)) {
        if (newId.find(e => e === nation.nationCode)) {
          return nation;
        }
      }
    });
    return newNationArray.map(e => e.nationName);
  };
  const parseNationalArrayId = id => {
    try {
      const nations = id;
      return nations.map(nationId => {
        const foundNation = nationals.find(
          inner => `${inner.nationId}` === `${nationId}`,
        );
        if (foundNation) {
          return foundNation.nationName;
        }
        return nationId;
      });
    } catch (error) {
      return [];
    }
  };
  const parseLocal = (id, key) => {
    if (key === 'provinces') {
      const data = locals[key].find(
        obj => obj && parseInt(obj.provinceCode) === parseInt(id),
      );
      return data ? data.province : id;
    }
    if (key === 'districts') {
      const data = locals[key].find(
        obj => obj && parseInt(obj.districtCode) === parseInt(id),
      );
      return data ? data.district : id;
    }
    if (key === 'villages') {
      const data = locals[key].find(
        obj => obj && parseInt(obj.villageCode) === parseInt(id),
      );
      return data ? data.village : id;
    }
    return id;
  };
  const parseEthnic = id => {
    const data = ethnics.find(
      obj => obj && parseInt(obj.ethnicCode) === parseInt(id),
    );
    return data ? data.ethnicName : id;
  };

  const parseReligion = id => {
    const data = religions.find(
      obj => obj && parseInt(obj.religionCode) === parseInt(id),
    );
    return data ? data.religionName : id;
  };

  // const parseSyncStatus = code => {
  //   const data = INT_STATUS.find(obj => obj && obj.code === code);
  //   return data ? data.label : code;
  // };
  const mapDataFunction = useCallback(
    (column, value, item) => {
      let name = null;
      for (const key in REQUEST_TYPES) {
        if (REQUEST_TYPES[key].includes(column.name)) name = key;
      }
      if (name) {
        switch (name) {
          case 'birthDate':
            if (value || value === 0) {
              return convertBirthDate(value);
            }
          case 'nationals':
            if (value || value === 0) {
              return parseNational(value);
            }
          case 'nationalsId':
            if (value || value === 0) {
              return parseNationalId(value).join(', ');
            }
          case 'nationalityId':
            if (value || value === 0) {
              return parseNationalArrayId(value).join(', ');
            }
          case 'provinces':
            if (value || value === 0) {
              return parseLocal(value, name);
            }
          case 'districts':
            if (value || value === 0) {
              return parseLocal(value, name);
            }
          case 'villages':
            if (value || value === 0) {
              return parseLocal(value, name);
            }
          case 'ethnics':
            if (value || value === 0) {
              return parseEthnic(value);
            }
          case 'relationship':
            if (value || value === 0) {
              return getRelationship(value);
            }
          case 'bloods':
            if (value || value === 0) {
              return getGroupBlood(value);
            }
          case 'gender':
            return getGender(value);
          case 'marriage':
            return getMarriage(value);
          case 'religion':
            if (value || value === 0) {
              return parseReligion(value);
            }
          case 'militaryDuty':
            return getMilitaryDuty(value);
          case 'citizenStatus':
            if (value || value === 0) {
              return getCitizenStatus(value);
            }
          default:
            return value;
        }
      }
      // if (column.name === 'syncStatus') {
      //   return parseSyncStatus(value);
      // }
      if (column.name === 'taskType') {
        const data = taskTypes.find(r => r.code === value);
        return data ? data.displayName : value;
      }
      if (column.name === 'status') {
        const statusDisplayName = taskStatus[value];
        if (statusDisplayName) return statusDisplayName;
      }
      if (column.name === 'resultExpertised') {
        if (value) {
          return (
            <>
              {value
                .split(',')
                .filter(str => str.trim())
                .map(str => (
                  <>
                    <span>{str.trim()}</span>
                    <br />
                  </>
                ))}
            </>
          );
        }
      }
      return value;
    },
    [locals, ethnics, religions, nationals],
  );
  return (
    <Fragment>
      {columns.length > 0 ? (
        <GridList
          viewConfigPermission={viewConfigPermission}
          openLinkPermission={openLinkPermission}
          textSearchPermission={textSearchPermission}
          isFileDetailTable
          tableConfig={{ PARAMETER: '', DEFAULT_COLUMNS: columns }}
          isLoading={isLoading}
          rows={data}
          count={totalData ? totalData.totalCount : 0}
          onLoadData={onLoadData}
          // onOpenLink={handleOpenLink}
          mapDataFunction={mapDataFunction}
          // onChangeSorting={handleSortData}
          showViewConfig={false}
          tableHeight={370}
          // client
        />
      ) : null}
    </Fragment>
  );
}

FileDetailsList.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.array,
  onLoadData: PropTypes.func,
  count: PropTypes.number,
  columns: PropTypes.array,
  totalData: PropTypes.array,
};

export default memo(FileDetailsList);
