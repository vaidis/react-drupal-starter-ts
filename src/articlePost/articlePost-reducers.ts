import {
  POST_ARTICLE,
  POST_ARTICLE_FILE,
  SET_ARTICLE_FILE,
  SET_ARTICLE_TITLE,
  SET_ARTICLE_BODY,
  SET_ARTICLE_TAGS,
  ADD_ARTICLE_TAGS,
  SET_VOCABULARY,
  SET_SELECTED,
  ADD_SELECTED,
} from '../common/constants'

export const initialState = {
  images: [],
  files: [],
  tags: [],
  title: '',
  body: '',
  selected: [],
  vocabulary: [],
}

const reducer = (
  state = initialState,
  action: any
) => {
  switch (action.type) {

    case POST_ARTICLE:
      console.log("POST_ARTICLE");
      return action.payload;

    case POST_ARTICLE_FILE:
      console.log("POST_ARTICLE_FILE");
      return action.payload;

    case SET_ARTICLE_TITLE:
      return { ...state, title: action.payload }

    case SET_ARTICLE_BODY:
      return { ...state, body: action.payload }

    case SET_SELECTED:
      console.log("SET_SELECTED", action.payload);
      return {
        ...state,
        selected: action.payload
      }

    case ADD_SELECTED:
      return {
        ...state,
        selected: [...state.selected, action.payload]
      }

    case SET_ARTICLE_TAGS:
      return { ...state, tags: action.payload }

    case ADD_ARTICLE_TAGS:
      return {
        ...state,
        tags: [...state.tags, action.payload]
      }

    case SET_VOCABULARY:
      /**
       * @param {string[]} terms - named 'value' instead of 'id'
       *     for the needs of the react-select component
       */
      const terms = action.payload.data.map((item: any) => (
        { value: item.id, label: item.name }
      ))
      return { ...state, vocabulary: terms }

    case SET_ARTICLE_FILE:
      console.log("SET_ARTICLE_FILE");
      const id = action.payload;
      const files = {
        ...state.images,
        id,
      };
      return {
        ...state,
        files,
      };

    default:
      return state;
  }
};

export default reducer;
