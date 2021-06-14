import { SET_ARTICLES } from '../common/constants'
import { IArticlesActions } from './articles-types'

interface IArticlesState {
  data: string[];
}

const initialStore = {
  data: []
}

/**
 * save the article list to redux store
 */
const reducer = (
  state: IArticlesState = initialStore,
  action: IArticlesActions
): IArticlesState => {
  switch (action.type) {

    case SET_ARTICLES:
      return action.payload;

    default:
      return state;
  }
};

export default reducer;
