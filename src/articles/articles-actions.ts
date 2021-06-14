import {
  GET_ARTICLES,
  SET_ARTICLES
} from '../common/constants'

import {
  ISetArticles,
  IUrlParams
} from './articles-types'

/**
 * Action used to get a list of articles from backend
 * Dispatched by Articles.tsx in useEffect
 * Catched by saga to fetch the article
 *
 * @param payload pager data if needed
 * @returns action
 */
export const getArticles = (payload: IUrlParams) => ({
  type: GET_ARTICLES,
  payload
});

/**
 * 
 * @param payload the backend response
 */
export const setArticles = (payload: ISetArticles) => ({
  type: SET_ARTICLES,
  payload
});


