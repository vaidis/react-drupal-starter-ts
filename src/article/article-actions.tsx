import {
  GET_ARTICLE,
  SET_ARTICLE,
} from '../common/constants'

import {
  IGetArticle,
  ISetArticle
} from './article-types'

export const getArticle = (payload: IGetArticle) => ({
    type: GET_ARTICLE,
    payload
  });

export const setArticle = (payload: ISetArticle) => ({
  type: SET_ARTICLE,
  payload
});
