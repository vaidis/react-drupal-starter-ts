import {
  POST_ARTICLE,
  POST_ARTICLE_FILE,
  POST_TAG,
  SET_ARTICLE_FILE,
  SET_ARTICLE_TITLE,
  SET_ARTICLE_BODY,
  SET_ARTICLE_TAGS,
  GET_VOCABULARY,
  SET_VOCABULARY,
  SET_SELECTED,
  GET_SELECTED,
  ADD_SELECTED,
} from '../common/constants'

import {
  IGetSelected,
  ISetSelected,
  IAddSelected,
  IGetVocabulary,
  ISetVocabulary,
  IPostArticle,
  IPostArticleFile,
  IPostTag,
  ISetArticleFile,
  ISetArticleTitle,
  ISetArticleBody,
  ISetArticleTags,
} from './articlePost-types'

export const getSelected = (payload: IGetSelected) => ({
  type: GET_SELECTED,
  payload
});

export const setSelected = (payload: ISetSelected) => ({
  type: SET_SELECTED,
  payload
});

export const addSelected = (payload: IAddSelected) => ({
  type: ADD_SELECTED,
  payload
});

export const getVocabulary = (payload: string) => ({
  type: GET_VOCABULARY,
  payload
});

export const setVocabulary = (payload: ISetVocabulary) => ({
  type: SET_VOCABULARY,
  payload
});

export const postArticle = (payload: IPostArticle) => ({
  type: POST_ARTICLE,
  payload
});

export const postArticleFile = (payload: IPostArticleFile) => ({
  type: POST_ARTICLE_FILE,
  payload
});

export const postTag = (payload: string) => ({
  type: POST_TAG,
  payload
});

export const setArticleFile = (payload: ISetArticleFile) => ({
  type: SET_ARTICLE_FILE,
  payload
});

export const setArticleTitle = (payload: ISetArticleTitle) => ({
  type: SET_ARTICLE_TITLE,
  payload
});

export const setArticleBody = (payload: ISetArticleBody) => ({
  type: SET_ARTICLE_BODY,
  payload
});

export const setArticleTags = (payload: ISetArticleTags) => ({
  type: SET_ARTICLE_TAGS,
  payload
});