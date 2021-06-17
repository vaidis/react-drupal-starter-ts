import {
    POST_ARTICLE_FILE,
    POST_TAG,
    SET_ARTICLE_FILE,
    SET_ARTICLE_TITLE,
    SET_ARTICLE_BODY,
    GET_VOCABULARY,
    SET_VOCABULARY,
    GET_SELECTED,
    ADD_SELECTED,
} from '../common/constants'

export interface IPostArticle {
    data: {
        type: string;
        attributes: {
            title: string;
            body: {
                value: string;
                format: string;
            }
        },
        relationships: {
            field_image: {
                data: {
                    type: string;
                    id: string;
                    meta: {
                        alt: string;
                        title: string;
                        width: null;
                        height: null;
                    }
                }
            },
            field_tags: {
                data: string[];
            }
        }
    }
}

export interface IGetSelected {
    type: typeof GET_SELECTED;
    payload: any;
}

export interface ITagPostBodyitem {
    type: "taxonomy_term--tags";
    id: string; 
  }

export interface ISetSelected {
    [key: string]: string | '' | number;
    value: string;
    label: string;
}

export interface IIds {
    type: string;
    id: string;
}

export interface IAddSelected {
    type: typeof ADD_SELECTED;
    payload: any;
}

export interface IGetVocabulary {
    type?: typeof GET_VOCABULARY;
    payload?: string;
}

export interface ISetVocabulary {
    type: typeof SET_VOCABULARY;
    payload: any;
}

export interface IPostArticleFile {
    type: typeof POST_ARTICLE_FILE;
    payload: any;
}

export interface IPostTag {
    type: typeof POST_TAG;
    payload: string;
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
    type: string;
    id: string;
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

