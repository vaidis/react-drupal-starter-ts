import React, { Children } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux'
import store from '../state/store'
import ArticlePost from './ArticlePost';

import * as actions from './articlePost-actions';
import * as constants from '../common/constants'
import reducer from './articlePost-reducers';
import { initialState } from './articlePost-reducers';
import { payload } from './articlePost-payload';

import { vocabularyResponse, vocabularyStored } from './ArticlePost-utils';

import { getVocabularyWorker } from './articlePost-sagas'
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

describe('SAGAS', () => {
  const vocab = 'tag';
  const action = actions.getVocabulary(vocab);
  const generator = getVocabularyWorker(action);
  it('get vocabulary tag', () => {
    expect(generator.next().value).toEqual(put({ type: SET_LOADING_ON }));
    expect(generator.next().value).toEqual(put({ type: SET_LOADED_FALSE }));
    expect(generator.next().value).toEqual(call(api.get, endpoint.VOCABULARY(vocab)));
  })
})

describe('REDUCERS', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should set the vocabulary select options', () => {
    const state = reducer(undefined, {
      type: 'SET_VOCABULARY',
      payload: vocabularyResponse
    })
    expect(state.vocabulary).toEqual(vocabularyStored)
  })

})


describe('ACTIONS', () => {

  it('should create an action to add new tag', () => {
    const tag = 'blah'
    const expectedAction = {
      type: constants.POST_TAG,
      payload: tag
    }
    expect(actions.postTag(tag)).toEqual(expectedAction)
  });

  it('should create an action to add new article', () => {
    const postBody = payload({
      title: "test title",
      body: "test body",
      fileId: "1",
      tags: ["one", "two", "three"]
    })
    const expectedAction = {
      type: constants.POST_ARTICLE,
      payload: postBody
    }
    expect(actions.postArticle(postBody)).toEqual(expectedAction)
  });

})