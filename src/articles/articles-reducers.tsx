import { SET_ARTICLES } from '../common/constants'

const reducer = (
  state = { data: ''},
  action: any
) => {
  switch (action.type) {

    case SET_ARTICLES:
      return action.payload;

    default:
      return state;
  }
};

export default reducer;
