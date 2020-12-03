import React from 'react';
import { connect } from 'react-redux'
import PagerLink from './PagerLink'
import { AppState } from './../index-reducers'

interface Props {  
  pager: {
    first: number;
    prev: number;
    next: number;
    last:  number;
  };
  urlParams: {
    items: number;
    offset: number;
    page: number;
    search: string;
    terms: string[];
  };
}

/**
 * Render Pager
 * 
 * Used by: /src/Articles/Articles.tsx
 * 
 * Using: drupal backend response saved in redux store
 * 
 * @param {Object} pager      - Drupal pager
 * @param {String} urlParams  - Current URL parameters
 */
const Pager: React.FC<Props> = ({
  pager,
  urlParams,
}) => {
  console.log(urlParams)
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

const mapStateToProps = (state: AppState) => ({
  urlParams: state.api.urlParams,
  pager: state.api.pager,
})


export default connect(mapStateToProps, null)(Pager)
