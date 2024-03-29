import { SagaIterator } from '@redux-saga/core';

import {
  all,
  takeLatest,
  call,
  put,
  putResolve
} from 'redux-saga/effects';

import {
  SET_LOADING_ON,
  SET_LOADING_OFF,
  POST_ARTICLE,
  POST_ARTICLE_FILE,
  POST_TAG,
  SET_LOADED_TRUE,
  SET_LOADED_FALSE,
  SET_VOCABULARY,
  GET_VOCABULARY,
  ADD_SELECTED,
  ADD_ARTICLE_TAGS,
} from '../common/constants'

import { api } from '../api/api';
import * as endpoint from '../api/endpoints'

function* postArticleWorker(payload: any): SagaIterator {
  yield put({ type: SET_LOADING_ON })
  yield put({ type: SET_LOADED_FALSE })

  try {
    const csrf_token = yield call(api.get, endpoint.CSRF_TOKEN);
    yield call(api.post, endpoint.ARTICLE_POST, payload.payload, csrf_token.data);
    yield put({ type: SET_LOADED_TRUE })
  } catch (error) {
    console.log("postArticleWorker error", error);
  } finally {
    yield put({ type: SET_LOADING_OFF })
  }
}

function* postArticleFileWorker(payload: any): SagaIterator {
  yield put({ type: SET_LOADING_ON })
  yield put({ type: SET_LOADED_FALSE })

  try {
    const csrf_token = yield call(api.get, endpoint.CSRF_TOKEN);
    yield call(
      api.postFile,
      endpoint.ARTICLE_POST_FILE,
      payload.file,
      payload.data, csrf_token.data
    );
    yield put({ type: SET_LOADED_TRUE })
  } catch (error) {
    console.log("postArticleWorker error", error);
  } finally {
    yield put({ type: SET_LOADING_OFF })
  }
}

export function* getVocabularyWorker({payload}: {payload:string}): SagaIterator {
  yield put({ type: SET_LOADING_ON })
  yield put({ type: SET_LOADED_FALSE })

  try {
    const response = yield call(api.get, endpoint.VOCABULARY(payload));
    yield put({ type: SET_VOCABULARY, payload: response.data });
    yield put({ type: SET_LOADED_TRUE })
  } catch (error) {
    console.log("getVocabularyWorker error", error);
  } finally {
    yield put({ type: SET_LOADING_OFF })
  }
}

function* postTagWorker(payload: any): SagaIterator {
  yield put({ type: SET_LOADING_ON })
  yield put({ type: SET_LOADED_FALSE })

  try {
    const csrf_token = yield call(api.get, endpoint.CSRF_TOKEN);

    /** post new term */
    yield call(api.post, endpoint.POST_TAG, payload.payload, csrf_token.data);

    /** get fresh vocabulary */
    const vocabulary = yield call(api.get, endpoint.VOCABULARY('tags'));
    yield putResolve({ type: SET_VOCABULARY, payload: vocabulary.data })

    /** add new term to selected terms */
    const name = payload.payload.data.attributes.name;
    const id = vocabulary.data.data.find((item: any) => {
      return item.name === name
    })
    const body = { value: id.id, label: name }
    yield put({ type: ADD_SELECTED, payload: body });
    const tags = { "type": "taxonomy_term--tags", "id": id.id }
    yield put({ type: ADD_ARTICLE_TAGS, payload: tags });
    yield put({ type: SET_LOADED_TRUE })

  } catch (error) {
    console.log("postTagWorker error", error);
  } finally {
    yield put({ type: SET_LOADING_OFF })
  }
}

export default function* root() {
  yield all([
    takeLatest(POST_ARTICLE, postArticleWorker),
    takeLatest(POST_ARTICLE_FILE, postArticleFileWorker),
    takeLatest(POST_TAG, postTagWorker),
    takeLatest(GET_VOCABULARY, getVocabularyWorker),
  ]);
}