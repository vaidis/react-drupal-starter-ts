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
  GET_ARTICLE,
  SET_ARTICLE,
  SET_LOADED_TRUE,
  SET_LOADED_FALSE,
} from '../common/constants'

import { api } from '../api/api';
import * as endpoint from '../api/endpoints'
import { IGetArticle, IArticle } from './article-types';

/**
 * 1. get the article and 
 * 2. save it in the redux store
 * @param {object} payload - basename of the article, used by URL Alias drupal module
 * 
 * example payload: "cogo-decet-magna-utrum"
 * front: http://localhost:3000/article/cogo-decet-magna-utrum
 * back: https://localhost:8080/jsonapi/node/article?filter[field_path][value]=/article/cogo-decet-magna-utrum
 */
function* getArticleWorker(payload: IGetArticle): SagaIterator<void> {
  yield put({ type: SET_LOADING_ON })
  yield put({ type: SET_LOADED_FALSE })

  try {
    const article: IArticle = yield call(api.get, endpoint.ARTICLE(payload));
    yield put({ type: SET_ARTICLE, payload: article });
    yield put({ type: SET_LOADED_TRUE });

  } catch (error) {
    console.log("getArticleWorker error", error);
  } finally {
    yield put({ type: SET_LOADING_OFF })
  }
}

export default function* root() {
  yield all([
    takeLatest(GET_ARTICLE, getArticleWorker),
  ]);
}
