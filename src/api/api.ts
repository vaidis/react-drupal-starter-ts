import axios from 'axios';
import * as endpoint from './endpoints'

/**
 * drupal api
 * https://www.drupal.org/docs/8/core/modules/rest/javascript-and-drupal-8-restful-web-services
 */

/**
 * GET a csrf token
 *
 * Differect token every time for anonymous users
 * The same token for logged in users
 *
 * used by: api functions get, login, post...
 * using: url of token endpoint
 *
 * @return {string} The actual csrf token
 */
export const getCsrfToken = async (): Promise<string> => {
  const csrf_token: string = await axios(endpoint.CSRF_TOKEN)
    .then(response => response.data)
    .catch((error) => {
      if (error.message === undefined) {
        error.message = "Connection Timeout"
      }
      throw new Error(error)
    });
  return csrf_token
}

export const api = {



  /**
   * GET request
   *
   * @param {string} url - The backend url
   * @return {object}      The backend response
   */
  get: async function get(
    url: string
  ): Promise<any> {
    return axios.get(url, {
      headers: {
        "Content-Type": "application/hal+json",
        "X-CSRF-Token": await getCsrfToken(),
      },
      withCredentials: true,
      timeout: 5000,
    })
      .then(response => {
        console.log('api.get(...) response', response); console.groupEnd();
        return response
      })
      .catch(error => {
        throw new Error(
          `${error.response.statusText} (${error.response.status})`
        );
      });
  },


  /**
   * POST request for login
   *
   * @param {string} url  - The backend url
   * @param {object} data - The body of POST request
   * @return {object}       The backend response
   */
  login: async function login(
    url: string,
    data: object
  ): Promise<any> {
    const csrf_token = await getCsrfToken()
    if (csrf_token !== "Connection Error") {
      const options: object = {
        url: url,
        method: 'post',
        headers: {
          "Content-Type": "application/hal+json",
          "X-CSRF-Token": csrf_token,
        },
        withCredentials: true,
        timeout: 2000,
        data: JSON.stringify(data),
      }
      return axios(options)
        .then(response => response)
        .catch(error => {
          throw new Error(`${error.response.statusText} (${error.response.status})`);
        });
    }
  },



  /**
   * POST request for new articles
   *
   * @param {string} url        - The backend url endpoint
   * @param {object} data       - The body of POST request
   * @param {string} csrf_token - CSRF token of the logged in user from redux store
   * @return {object}             The backend response
   */
  post: async function post(
    url: string,
    data: string,
    csrf_token: string
  ): Promise<any> {
    const token = csrf_token ? csrf_token : await getCsrfToken()
    const options: object = {
      url: url,
      method: 'post',
      headers: {
        "Content-Type": "application/vnd.api+json",
        "X-CSRF-Token": token,
      },
      withCredentials: true,
      timeout: 2000,
      data: JSON.stringify(data),
    }
    return axios(options)
      .then(
        response => {
          console.log('response', response.data)
          return response
        })
      .catch(error => {
        throw new Error("Conection time out");
      });
  },



  /**
   * POST request for uploading files
   *
   * @param {string} url        - The backend url
   * @param {string} file       - The filename
   * @param {object} data       - The body of POST request
   * @param {string} csrf_token - From the logged in user
   * @return {object}             The backend response
   */
  postFile: async function postFile(
    url: string,
    file: string,
    data: object,
    csrf_token: string
  ): Promise<any> {
    const token = csrf_token ? csrf_token : await getCsrfToken()
    const options: object = {
      url: url,
      method: 'post',
      headers: {
        "Accept": "application/vnd.api+json",
        "Content-Type": "application/octet-stream",
        "X-CSRF-Token": token,
        "Content-Disposition": "file; filename=\"" + file + "\"",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9",
        "Connection": "keep-alive",
      },
      withCredentials: true,
      timeout: 2000,
      data: data,
    }
    return axios(options)
      .then(response => response)
      .catch(error => {
        throw new Error("Conection time out");
      });
  },



  /**
   * POST logout
   *
   * @param {string} url  - The backend url
   * @param {object} data - CSRF and logout tokens
   * @return {object}       The backend response
   */
  logout: async function logout(
    url: string,
    token: string
  ): Promise<any> {
    console.log("api.logout(url, tokens): ", decodeURI(url), token)
    const csrf_token: any = getCsrfToken()
    if (csrf_token !== "Connection Error") {
      const logout_token = token
      const options: object = {
        url: url + "&token=" + logout_token,
        method: 'post',
        headers: {
          "Content-Type": "application/hal+json",
        },
        withCredentials: true,
        timeout: 2000,
      }
      console.log("api.logout / axios / options : ", options)
      return axios(options).then(response => response)
        .catch(error => {
          throw new Error("Conection time out");
        });
    }
  },



  patch: function patch(url: string, data: object) {
    console.log("api.patch ", url, data);
  },


  delete: function del(url: string, data: object) {
    console.log("api.delete ", url, data);
  }
}