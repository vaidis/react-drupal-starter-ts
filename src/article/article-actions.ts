import {
  GET_ARTICLE,
  SET_ARTICLE,
} from '../common/constants'

import {
  IPath,
  ISetArticle
} from './article-types'

/**
 * Action used to get an article from backend
 * Dispatched by Article.tsx in useEffect
 * Catched by saga to fetch the article
 *
 * @param payload the basename of article
 * @returns action
 */
export const getArticle = (payload: IPath) => ({
  type: GET_ARTICLE,
  payload
});

  /**
   * Save the article to redux store
   * Used by saga to store the article data
   *
   * @param payload article data
   * @returns action
   */
export const setArticle = (payload: ISetArticle) => ({
  type: SET_ARTICLE,
  payload
});