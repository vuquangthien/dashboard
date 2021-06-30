export const handlingRequestData = {
  errorCode: 0,
  status: 1,
  data: {
    message: '',
    requests: [
      {
        id: '1bf79887-e295-46ce-b0b4-df871f760f41',
        profileCode: 'TD001',
        requestName: 'Hồ sơ Thẩm định',
        requestNo: 2,
        channelType: 'Cổng thông tin điện tử',
        sourceType: 'Bộ Y Tế',
        receiveDate: 1590050413,
        receiveUser: 'Trần Văn Anh',
        handleDate: 1590050413,
        handleUser: 'Trần Văn Em',
        approvalDate: 1590050413,
        approvalUser: 'Trần Thị Chị',
        status: 'Approved',
      },
    ],
    paging: {
      pageId: 1,
      limit: 10,
    },
  },
};

export const handleRequestData = {
  errorCode: 0,
  status: 1,
  data: {
    message: '',
    requests: [
      {
        id: '1bf79887-e295-46ce-b0b4-df871f760f41',
        personalId: '010101090999',
        fullname: 'Nguyễn Thùy Linh',
        desc: '',
        status: 'Approval',
      },
    ],
    taskHistories: [
      {
        taskId: '1bf79887-e295-46ce-b0b4-df871f760f41',
        createdDate: 1577666040,
        dueDate: 1577666040,
        receivedDate: 1577666040,
        finishedDate: 1577666040,
        taskType: 'Receive',
        responseName: 'SendForApproval',
        assigneeName: 'user1',
        comment: 'Du dieu kien xu ly',
      },
      {
        taskId: '1bf79887-e295-46ce-b0b4-df871f760f41',
        createdDate: 1577666040,
        dueDate: 1577666040,
        receivedDate: 1577666040,
        finishedDate: 1577666040,
        taskType: 'Approval',
        responseName: 'Appove',
        assigneeName: 'user2',
        comment: 'Dong y xu ly',
      },
    ],
  },
  paging: {
    pageId: 1,
    limit: 10,
  },
};

export const requestDetails = {
  errorCode: 0,
  status: 1,
  data: {
    message: '',
    requests: [
      {
        id: '1bf79887-e295-46ce-b0b4-df871f760f41',
        personalId: '010101090999',
        fieldName: 'HoVaTen',
        fieldValue: 'Nguyễn Thị Thùy Linh',
        verifyResult: 'Nguyễn Thùy Linh; Nguyễn Thị Thủy Linh',
        expertise: 'Nguyễn Thị Thùy Linh',
      },
    ],
  },
};

export const fieldNames = {
  errorCode: 0,
  status: 1,
  data: {
    message: 'Cập nhật trạng thái thành công',
    info: [
      {
        sourceName: 'CSDLQG',
        sourceData: {
          personalId: '010101090999',
          fullname: 'Nguyễn Thùy Linh',
          lastName: '',
          middleName: '',
          firstName: '',
          gender: '',
          birthDate: '',
          birthYear: '',
          folk: '',
          religion: '',
          marital: '',
          bloodGroup: '',
          birthUnitCode: '',
          birthUnitDetail: '',
          birthNationCode: '',
          homeTownUnitCode: '',
          homeTownDetail: '',
          homeTownNationCode: '',
          residentUnitCode: '',
          residentDetail: '',
          residentNationCode: '',
          livingUnitCode: '',
          livingDetail: '',
          livingNationCode: '',
          nationalityCode: '',
          relative: {
            personalId: '',
            nationality: '',
            lastName: '',
            middleName: '',
            firstName: '',
            fullName: '',
            type: '',
          },
          headHousehold: {
            personalId: '',
            isHeader: '',
            lastName: '',
            middleName: '',
            firstName: '',
            fullName: '',
            typeCode: '',
          },
          status: {
            status: '',
            lostDate: '',
            lostYear: '',
            lostTime: '',
          },
        },
      },
    ],
  },
};

export const sampleInformation = {
  errorCode: 0,
  status: 1,
  data: {
    message: 'Cập nhật trạng thái thành công',
    templateLink: "'LinkBanMau':  'https://...'",
  },
};

export const requestsData = {
  errorCode: 0,
  data: {
    message: 'Gửi yêu cầu xác minh thành công',
    results: [
      {
        requestId: '1bf79887-e295-46ce-b0b4-df871f760f41',
        requestCodeInt: 'TD0120041888',
        sourceType: 'Bộ Y tế',
        createdUserName: '1bf79887-e295-46ce-b0b4-df871f760f41',
        receivedUserName: '1bf79887-e295-46ce-b0b4-df871f760f41',
        approvedUserName: '1bf79887-e295-46ce-b0b4-df871f760f41',
        createdDate: 1577666040,
        receivedDate: 1577666040,
        approvedDate: 1577666040,
        requestStatus: 'SendForReceive',
      },
      {
        requestId: '1bf79887-e295-46ce-b0b4-df871f760f41',
        requestCodeInt: 'TD01273215610',
        sourceType: 'Bộ Tư pháp',
        createdUserName: '1bf79887-e295-46ce-b0b4-df871f760f41',
        receivedUserName: '1bf79887-e295-46ce-b0b4-df871f760f41',
        approvedUserName: '1bf79887-e295-46ce-b0b4-df871f760f41',
        createdDate: 1577666040,
        receivedDate: 1577666040,
        approvedDate: 1577666040,
        requestStatus: 'SendForHandle',
      },
      {
        requestId: '1bf79887-e295-46ce-b0b4-df871f760f41',
        requestCodeInt: 'TH01212543232',
        sourceType: 'Bộ Tư pháp',
        createdUserName: '1bf79887-e295-46ce-b0b4-df871f760f41',
        receivedUserName: '1bf79887-e295-46ce-b0b4-df871f760f41',
        approvedUserName: '1bf79887-e295-46ce-b0b4-df871f760f41',
        createdDate: 1577666040,
        receivedDate: 1577666040,
        approvedDate: 1577666040,
        requestStatus: 'Approval',
      },
    ],
    count: 100,
  },
};

const verifyRequests = {
  errorCode: 0,
  data: {
    message: '',
    verifyData: [
      {
        id: '1bf79887-e295-46ce-b0b4-df871f760f41',
        verifyNo: 'XM001',
        CCCD: '010111199999',
        profileCode: 'BTY20052020010111199999',
        unitCode: 'Bộ Y Tế',
        createdDate: 1590053326,
        createdUser: 'Trần Văn Anh',
        replyDate: 1590053326,
        status: 1,
        desc: 'Xác minh tên, nhóm máu',
      },
    ],
    paging: {
      pageId: 1,
      limit: 10,
    },
  },
};

const verifyRequestDetails = {
  errorCode: 0,
  data: {
    message: '',
    replyDecisionNo: 'Công văn số xxx/xxx Bộ Y tế',
    verifyNo: 'XM001',
    profileCode: 'HS001',
    personalId: '019242342423',
    desc: '',
    unitCode: 'Bộ Y tế',
    createdUser: 'CVTD001',
    createdDate: 1590053326,
    replyDate: 1590053326,
    verifyDetail: [
      {
        verifyDetailId: '1bf79887-e295-46ce-b0b4-df871f760f41',
        fieldName: 'HoVaTen',
        fieldValue: 'Vũ Anh Tuấn',
      },
    ],
    paging: {
      pageId: 1,
      limit: 10,
    },
  },
};

const ruleConfigs = {
  errorCode: 0,
  data: {
    message: '',
    ruleData: [
      {
        id: '1bf79887-e295-46ce-b0b4-df871f760f41',
        ruleName: 'Quan Hệ Cha Con',
        processorName: '@QuanHeChaCon',
        officerId: 'CVTD001',
        desc: 'Đối sánh tuổi cha có lớn hơn tuổi con hay không',
        creatorId: 'CVTD001',
      },
    ],
    paging: {
      pageId: 1,
      limit: 10,
    },
  },
};

const campaignDetails = {
  errorCode: 0,
  data: {
    message: '',
    campaignData: [
      {
        id: '1bf79887-e295-46ce-b0b4-df871f760f41',
        campaignName: 'Quan Hệ Cha Con',
        time: '00:30',
        frequency: 'Chủ Nhật hàng tuần',
        dataSource: 'Bộ Y tế',
        status: 1,
        desc: 'Đối sánh tuổi cha có lớn hơn tuổi con hay không',
        creatorId: 'CVTD001',
      },
    ],
    paging: {
      pageId: 1,
      limit: 10,
    },
  },
};

const campaignHistory = {
  errorCode: 0,
  data: {
    message: '',
    requests: [
      {
        id: '1bf79887-e295-46ce-b0b4-df871f760f41',
        personalId: '010101090999',
        fullname: 'Nguyễn Thùy Linh',
        desc: '',
        status: 'Approval',
      },
    ],
    taskHistories: [
      {
        id: '1bf79887-e295-46ce-b0b4-df871f760f41',
        ruleName: 'Quy tắc 1',
        desc: 'Quy tắc phát hiện mối quan hệ trong gia đình',
        status: 1,
        requestNo: 1577666040,
      },
    ],
  },
  paging: {
    pageId: 1,
    limit: 10,
  },
};
