import {
  GET_ARTICLES,
  SET_ARTICLES
} from '../common/constants'

import {
  IGetArticles,
  ISetArticles
} from './articles-types'

export const getArticles = (payload: IGetArticles) => ({
  type: GET_ARTICLES,
  payload
});

export const setArticles = (payload: ISetArticles) => ({
  type: SET_ARTICLES,
  payload
});
