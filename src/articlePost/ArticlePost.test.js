import React, { Children } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux'
import store from '../state/store'
import ArticlePost from './ArticlePost';

import * as actions from './articlePost-actions';
import * as types from './articlePost-types';
import * as constants from '../common/constants'

// test('renders header logo', () => {
//     const { getByText } = render(
//         <Provider store={store}>
//             <ArticlePost />
//         </Provider>,
//     );
//     const linkElement = getByText(/Post Article/i);
//     expect(linkElement).toBeInTheDocument();
// });

/** TAGS */
describe('actions', () => {
    it('should create an action to add new tag', () => {
      const tag = 'blah'
      const expectedAction = {
        type: constants.POST_TAG,
        payload: tag
      }
      expect(actions.postTag(tag)).toEqual(expectedAction)
    });
    it('should create an action to add new tag', () => {
        const tag = 'blah'
        const expectedAction = {
          type: constants.POST_TAG,
          payload: tag
        }
        expect(actions.postTag(tag)).toEqual(expectedAction)
      })
  })
