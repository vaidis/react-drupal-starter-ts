import React, { FC } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom"

import { IPath } from './article-types';
import { AppState } from '../index-reducers'
import { getArticle } from './article-actions'

import * as endpoint from '../api/endpoints'
import TermLink from '../common/TermLink'

const Article: FC = (): JSX.Element => {
  const loaded = useSelector((state: AppState) => state.api.loaded);
  const loading = useSelector((state: AppState) => state.api.loading);
  const article = useSelector((state: AppState) => state.article);
  const dispatch = useDispatch();
  const path: IPath = useParams();

  React.useEffect(() => {
    /** 
     * get the article according to the url path
     * http://localhost:3000/article/cogo-decet-magna-utrum
     * cogo-decet-magna-utrum is the drupal url alias of the article
     */
    dispatch(getArticle(path))
  }, [
    path,
    dispatch
  ]);

  return (
    <div>
      {
        !loading && loaded && article.data.length > 0
          ? (
            <div>
              <h1>{article.data[0].title}</h1>
              <div>{article.data[0].created}</div>
              <div>
                <img
                  src={endpoint.BASE + "/" + article.data[0].field_image.uri.url}
                  alt={article.data[0].title}
                />
              </div>
              <div>{article.data[0].body.value.substring(0, 255)}</div>
              <div>
                {
                  article.data[0].field_tags.lenght &&
                  article.data[0].field_tags.map((tag: string, i: number) => {
                    return (
                      <span key={i}>
                        <TermLink name={tag} />
                      </span>
                    )
                  })
                }
              </div>
            </div>
          )
          : (
            <div>loading...</div>
          )
      }
    </div>
  );
}

export default Article;