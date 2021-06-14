import React from 'react';
import { useSelector } from "react-redux";

import PagerLink from './PagerLink'
import { AppState } from './../index-reducers'

/**
 * Render the Pager for Articles
 *
 * Used by: /src/Articles/Articles.tsx
 * Using: drupal backend response saved in redux store
 *
 */
const Pager: React.FC = (): JSX.Element => {
  const urlParams = useSelector((state: AppState) => state.api.urlParams);
  const pager = useSelector((state: AppState) => state.api.pager);

  return (
    <div>
      <button type="button" disabled={!pager.first}>
        {
          pager.first ? (
            <PagerLink to={pager.first} title={'FIRST'} urlParams={urlParams} />
          ) : ('[FIRST]')
        }
      </button>
      <button type="button" disabled={!pager.prev}>
        {
          pager.prev ? (
            <PagerLink to={pager.prev} title={'PREV'} urlParams={urlParams} />
          ) : ('[PREV]')
        }
      </button>
      <button type="button" disabled={!pager.next}>
        {
          pager.next ? (
            <PagerLink to={pager.next} title={'NEXT'} urlParams={urlParams} />
          ) : ('[NEXT]')
        }
      </button>
      <button type="button" disabled={!pager.last}>
        {
          pager.last ? (
            <PagerLink to={pager.last} title={'LAST'} urlParams={urlParams} />
          ) : ('[END]')
        }
      </button>
    </div>
  );
}

export default Pager;