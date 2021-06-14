import { SET_ARTICLE } from '../common/constants'
import { IArticleState, IArticleActions } from './article-types';

const initialState = {
  jsonapi: {},
  data: [],
  meta: {},
  links: {}
}
/**
 * Store article data from backend to redux store
 */
const reducer = (
  state: IArticleState = initialState,
  action: IArticleActions
): IArticleState  => {
  switch (action.type) {
    
    case SET_ARTICLE:
      return action.payload.data;

    default:
      return state;
  }
};

export default reducer;
