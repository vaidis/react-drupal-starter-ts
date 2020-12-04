import {
    GET_ARTICLE,
    SET_ARTICLE,
} from '../common/constants'

export interface IGetArticle {
    type: typeof GET_ARTICLE;
    payload: any;
}

export interface ISetArticle {
    type: typeof SET_ARTICLE;
    payload: any;
}

/** used by the reducer */
export type IArticleActions =
    IGetArticle
    | ISetArticle