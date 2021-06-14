import React, { FC } from 'react';
import { Link, withRouter, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getArticles } from './articles-actions'
import { setApiUrlParams } from '../api/api-actions'
import { AppState } from '../index-reducers'
import Pager from '../pager/Pager'
import { IUrlParams } from './articles-types'

import { compareObjects } from '../utils/compareObjects'
// import { deepEqual } from 'fast-equals';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Articles: FC = (): JSX.Element => {
  const loading = useSelector((state: AppState) => state.api.loading);
  const loaded = useSelector((state: AppState) => state.api.loaded);
  const articles = useSelector((state: AppState) => state.articles.data);
  const storeParams = useSelector((state: AppState) => state.api.urlParams);
  var query: any = useQuery();
  const dispatch = useDispatch();

  /**
   * take the parameters from URL
   * http://localhost:3000/?terms=chu&offset=2
   * @type {object} urlParams - URL parameters in the browser
   */
  const urlParams: IUrlParams = {
    terms: query.get('terms') || '',
    search: query.get('search') || '',
    offset: parseInt(query.get('offset')) || 0,
    page: parseInt(query.get('page')) || 1,
    items: parseInt(query.get('items')) || 0,
    limit: parseInt(query.get('limit')) || 2,
  }

  React.useEffect(() => {
    /**
     * If the URL params in the browser has been change
     * update the store.api.urlParams and
     * get a new list of articles
     *
     * @type {object} urlParams - parameters in the browser
     * @type {object} storeParams - parameters in the redux store
     */
    if (!compareObjects(urlParams, storeParams)) {
      dispatch(setApiUrlParams(urlParams))
      dispatch(getArticles(urlParams))
    }
  }, [
    dispatch,
    urlParams,
    storeParams,
  ]);

  return (
    <div>
      <p>{urlParams.terms !== '' && "articles with terms: " + urlParams.terms}</p>
      {
        !loading && loaded && articles
          ? (
            articles.map((item: any, i: number) => {

              /** render terms div */
              let terms = ''
              terms = item.field_tags.map((term: any, i: number) => {
                return (
                  <div key={i}>
                    <Link to={"/?terms=" + term.name}>{term.name}</Link>
                  </div>
                )
              })

              /** render image div */
              var image: any = ''
              var imageobject: any = ''
              if (item.field_image.image_style_uri) {
                imageobject = item.field_image.image_style_uri;
                imageobject.forEach(function (item: any) {
                  if (item.thumbnail) {
                    image = item.thumbnail
                  }
                })
              }

              /** render article */
              return (
                <div key={i} style={{ marginBottom: "20px" }}>
                  <Link to={item.path.alias}>
                    <h4 style={{ marginBottom: "0px" }}>{item.title}</h4>
                    <img src={image} alt=""></img>
                  </Link>
                  {terms}
                </div>
              )
            })
          )
          : (<div>Loading...</div>)
      }
      <Pager />
    </div>
  );
}

// export default Articles;
export default withRouter(Articles);