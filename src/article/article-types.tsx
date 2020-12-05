import {
    GET_ARTICLE,
    SET_ARTICLE,
} from '../common/constants'

/**
 *  used by: actions
 */
export interface IGetArticle {
    type: typeof GET_ARTICLE;
    payload: any;
}

export interface ISetArticle {
    type: typeof SET_ARTICLE;
    payload: any;
}

/**
 *  used by: reducer
 */
export type IArticleActions =
    IGetArticle
    | ISetArticle