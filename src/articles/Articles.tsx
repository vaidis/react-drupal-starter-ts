import React from 'react';
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getArticles } from './articles-actions'
import { setApiUrlParams } from '../api/api-actions'
import { compareObjects } from '../utils/compareObjects'
import { AppState } from '../index-reducers'
import Pager from '../pager/Pager'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Articles: React.FC<any> = () => {

  const loading = useSelector((state: AppState) => state.api.loading);
  const loaded = useSelector((state: AppState) => state.api.loaded);
  const articles = useSelector((state: AppState) => state.articles.data);
  const storeParams = useSelector((state: AppState) => state.api.urlParams);
  // const pager = useSelector((state: AppState) => state.api.pager);

  var query: any = useQuery();
  const dispatch = useDispatch();

   /**
   * @type {object} urlParams - URL parameters in the browser
   */
  const urlParams: any = {
    terms: query.get('terms') || '',
    search: query.get('search') || '',
    offset: parseInt(query.get('offset')) || 0,
    page: parseInt(query.get('page')) || 1,
    items: parseInt(query.get('items')) || 0,
    limit: parseInt(query.get('limit')) || 2,
  }

  React.useEffect(() => {
    /**
     * If the browser URL params has been change
     * update the store.api.urlParams and
     * get the new list of articles
     *
     * @type {object} urlParams - parameter in the browser
     * @type {object} storeParams - parameter in the redux
     */
    if (!compareObjects(urlParams, storeParams)) {
      dispatch(setApiUrlParams(urlParams))
      dispatch(getArticles(urlParams))
    }
  }, [
    urlParams,
    storeParams,
  ]);

  // console.log("Articles", articles)

  return (
    <div>
      <p>{urlParams.terms !== '' && "articles with terms: " + urlParams.terms}</p>
      {
        !loading && loaded && articles
          ? (
            articles.map((item: any, i: number) => {

              /** terms */
              // console.log("item.field_tags", item.field_tags)
              let terms = ''
              terms = item.field_tags.map((term: any, i: number) => {
                return (
                  <div key={i}>
                    <Link to={"/?terms=" + term.name}>{term.name}</Link>
                  </div>
                )
              })

              /** image */
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

              /** article */
              return (
                <div key={i} style={{ marginBottom: "20px" }}>
                  <Link to={item.path.alias}>
                    <h4 style={{ marginBottom: "0px" }}>{item.title}</h4>
                    <img src={image} alt="Girl in a jacket"></img>
                  </Link>
                  {terms}
                </div>
              )
            })
          )
          : ( <div>Loading...</div> )
      }
      <Pager />
    </div>
  );
}

export default Articles;