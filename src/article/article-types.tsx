import {
    GET_ARTICLE,
    SET_ARTICLE,
} from '../common/constants'

export interface IPath {
    path: string;
}
/**
 *  used by: actions
 */
export interface IGetArticle {
    type: typeof GET_ARTICLE;
    payload: IPath
}

export interface ISetArticle {
    type: typeof SET_ARTICLE;
    payload: {[key: string]: any};
}

/**
 *  used by: reducer
 */
export type IArticleActions =
    IGetArticle
    | ISetArticle

export interface IArticle {
    id?: string;
    title: string;
    created: string;
    field_image: {[key: string]: any};
    body: {[key: string]: any};
    field_tags: {[key: string]: any};
}

export interface IArticleState {
    jsonapi: any;
    data: Array<IArticle>;
    meta: any;
    links: any;
  }
