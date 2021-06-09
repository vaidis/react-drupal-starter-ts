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

export interface IGetSelected {
    type: typeof GET_SELECTED;
    payload: any;
}

export interface ISetSelected {
    type: typeof SET_SELECTED;
    payload: any;
}

export interface IAddSelected {
    type: typeof ADD_SELECTED;
    payload: any;
}

export interface IGetVocabulary {
    type?: typeof GET_VOCABULARY;
    payload?: any;
}

export interface ISetVocabulary {
    type: typeof SET_VOCABULARY;
    payload: any;
}

export interface IPostArticle {
    type: typeof POST_ARTICLE;
    payload: any;
}

export interface IPostArticleFile {
    type: typeof POST_ARTICLE_FILE;
    payload: any;
}

export interface IPostTag {
    type: typeof POST_TAG;
    payload: any;
}

export interface ISetArticleFile {
    type: typeof SET_ARTICLE_FILE;
    payload: File | null;
}

export interface ISetArticleTitle {
    type: typeof SET_ARTICLE_TITLE;
    payload: any;
}

export interface ISetArticleBody {
    type: typeof SET_ARTICLE_BODY;
    payload: any;
}

export interface ISetArticleTags {
    type: typeof SET_ARTICLE_TAGS;
    payload: any;
}

/** used by the reducer */
export type IArticlePostActions =
    IGetSelected
    | ISetSelected
    | IAddSelected
    | IGetVocabulary
    | ISetVocabulary
    | IPostArticle
    | IPostArticleFile
    | IPostTag
    | ISetArticleFile
    | ISetArticleTitle
    | ISetArticleBody
    | ISetArticleTags