import { LOCAL_STORAGE } from './constants';

/*
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  // console.log(response.json());
  // response.json().then(result => {
  //   // if(result.data.error_cod)
  // });
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
// function checkStatus(response) {
//   if (response.status >= 200 && response.status < 300) {
//     // console.log(response);
//     return response;
//   }

//   const error = new Error(response.statusText);
//   error.response = response;
//   throw error;
// }

// eslint-disable-next-line consistent-return
async function checkStatus(response) {
  // return response;
  if (response.status >= 200 && response.status < 300) {
    // console.log(response);
    return response;
  }
  // // if (response.status === 401) {
  // //   // console.log(response);
  // //   throw response;
  // // }
  // console.log('response error', response);
  // console.log('response', response.json());
  // const error = new Error(response.errorDescription || 'Lỗi hệ thống');
  // // error.response = ;
  // throw error;
  const rsJson = await response.json().then(res => {
    const error = new Error(
      res.errorDescription || res.message || 'Lỗi hệ thống',
    );
    // error.response = ;
    throw error;
  });
  return rsJson;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */

/* eslint no-param-reassign: ["error", { "props": false }] */

export default function request(url, options) {
  const { cookie } = document;
  const accessToken = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);
  if (!accessToken) {
    localStorage.setItem(
      LOCAL_STORAGE.ACCESS_TOKEN,
      'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ5ZW5kZXB6YWkiLCJBVVRIT1JJVElFU19LRVkiOiJST0xFX0FETUlOLFJPTEVfQVBQUk9WRVIsUk9MRV9FU0IsUk9MRV9SRUNFSVZFUixST0xFX1VTRVIiLCJpYXQiOjE1OTE3MTY2NDMsImV4cCI6MTU5MjUxNjY0M30.aPxBsE9aiSdSYihR2rom3ruxmhNvmWJBfKqMy9jV360UPZ6aBUbCczdPfM3KfUxhcSd2CoIyb1Pz4biPmMtSYw',
    );
  }
  if (!cookie) {
    document.cookie = `${
      LOCAL_STORAGE.ACCESS_TOKEN
    }=Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsIkFVVEhPUklUSUVTX0tFWSI6IiIsImlhdCI6MTYwNDEyMzk5NywiZXhwIjoxNjA0OTIzOTk3fQ.4v3BYN7X6IN5Id96fRcCoNvYalDJfyxpS_2ht9sC7LhrOzu5imUfLFLFXV06Knmbo_5phnSo5PE_FsVbUkMD2w`;
  }

  // const newHeaders = Object.assign(
  //   {
  //     Authorization: localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN),
  //     'Content-Type': 'application/json;charset=UTF-8',
  //   },
  //   options.headers,
  // );
  const newHeaders = Object.assign(
    {
      // Authorization: accessToken,
      'Content-Type': 'application/json;charset=UTF-8',
    },
    options.headers,
  );
  options.headers = newHeaders;
  options.credentials = 'include';
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}

export async function requestFile(url, options) {
  const accessToken = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);
  if (!accessToken) {
    localStorage.setItem(
      LOCAL_STORAGE.ACCESS_TOKEN,
      'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ5ZW5kZXB6YWkiLCJBVVRIT1JJVElFU19LRVkiOiJST0xFX0FETUlOLFJPTEVfQVBQUk9WRVIsUk9MRV9FU0IsUk9MRV9SRUNFSVZFUixST0xFX1VTRVIiLCJpYXQiOjE1OTE3MTY2NDMsImV4cCI6MTU5MjUxNjY0M30.aPxBsE9aiSdSYihR2rom3ruxmhNvmWJBfKqMy9jV360UPZ6aBUbCczdPfM3KfUxhcSd2CoIyb1Pz4biPmMtSYw',
    );
  }
  const newHeaders = Object.assign(
    {
      Authorization: localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN),
      'Content-Type': 'application/json;charset=UTF-8',
    },
    options.headers,
  );
  options.headers = newHeaders;
  options.credentials = 'include';
  const response = await fetch(url, options);
  return checkStatus(response);
}
