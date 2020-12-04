import {
  SET_ARTICLE,
} from '../common/constants'

const reducer = (
  state = {
    article: {
      data: []
    }
  },
  action: any
) => {
  switch (action.type) {

    case SET_ARTICLE:
      return action.payload;

    default:
      return state;
  }
};

export default reducer;