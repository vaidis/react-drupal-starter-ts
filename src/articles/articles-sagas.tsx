import { SagaIterator } from '@redux-saga/core';

import {
  all,
  takeLatest,
  call,
  put
} from 'redux-saga/effects';

import {
  SET_LOADING_ON,
  SET_LOADING_OFF,
  SET_LOADED_TRUE,
  SET_LOADED_FALSE,
  GET_ARTICLES,
  SET_ARTICLES,
  SET_API_PAGER_LINKS,
} from '../common/constants'

import { api } from '../api/api';
import * as endpoint from '../api/endpoints';
import { IGetArticles } from './articles-types';

export interface IPagerBackendUrl {
  href: string
}
export interface IPagerBackend {
  [key: string]: IPagerBackendUrl;
  first: IPagerBackendUrl;
  prev: IPagerBackendUrl;
  next: IPagerBackendUrl;
  self: IPagerBackendUrl;
}
// export interface IPagerFrontend {
//   [key: string]: string | null;
// }

// export interface IPagerFrontend {
//   [key: string]: string;
//   first: string;
//   prev: string;
//   next: string;
//   self: string;
// }

export interface IPagerFrontend {
  [key: string]: string | null;
  // [key: string]: string | undefined | '' | null;
}

/**
 * Create the pager links from GET_ARTICLES response
 *
 * @param {object} links - Pager data from backend
 * @returns {object} pager - Stored in store.api.pager
 */
const createPagerObject = (links: IPagerBackend) => {

  console.log('createPagerObject', links)

  var pager: IPagerFrontend = {
    // var pager: any = {
    first: '',
    prev: '',
    next: '',
    self: '',
  }

  /**
   * convert backend drupal response object
   * 
   * {
  *    first: { href: "https://localhost/jsonapi/node/article?query...2"},
   *   last: { href: "https://localhost/jsonapi/node/article?query...20"},
   *   next: { href: "https://localhost/jsonapi/node/article?query...2"},
   *   prev: { href: "https://localhost/jsonapi/node/article?query..."},
   *   self: { href: "https://localhost/jsonapi/node/article?query..."},
   * }
   *  
   * to something smaller
   * 
   * {
   *   first: "2",
   *   prev: "",
   *   next: "2",
   *   last: "20"
   *   self: "0"
   * }
   */
  Object.keys(links)
    .forEach(function (item) {

      /** get a pager button url */
      pager[item] = links[item].href
      console.log(' pager[item]', pager[item])

      /** get the params from that url */
      const params = new URLSearchParams(pager[item] as any);

      /** save the offset if needed */
      if (typeof params.get('page[offset]') === "string") {
        pager[item] = params.get('page[offset]'); 
      }
    })
  console.log(' pager', pager)
  return pager
}
/**
 * 
 * @param param0 
 */
function* getArticlesWorker({ payload }: IGetArticles): SagaIterator<void> {
  yield put({ type: SET_LOADING_ON })
  yield put({ type: SET_LOADED_FALSE })

  try {
    /** get and save the articles */
    const response = yield call(api.get, endpoint.ARTICLES(payload));
    yield put({ type: SET_ARTICLES, payload: response.data });

    /** create pager */
    const pagerObject = createPagerObject((response.data.links))
    yield put({ type: SET_API_PAGER_LINKS, payload: pagerObject });

    yield put({ type: SET_LOADED_TRUE })

  } catch (error) {
    yield put({ type: SET_LOADED_FALSE })

  } finally {
    yield put({ type: SET_LOADING_OFF })
  }
}

export default function* root() {
  yield all([
    takeLatest(GET_ARTICLES, getArticlesWorker),
  ]);
}
