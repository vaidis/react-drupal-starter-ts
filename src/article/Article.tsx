import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom"

import { AppState } from '../index-reducers'
import { getArticle } from './article-actions'
import * as endpoint from '../api/endpoints'
import TermLink from '../common/TermLink'

const Article: React.FC = () => {

  const loaded = useSelector((state: AppState) => state.api.loaded);
  const loading = useSelector((state: AppState) => state.api.loading);
  const article = useSelector((state: AppState) => state.article);
  const dispatch = useDispatch();
  var path: any = useParams();

  React.useEffect(() => {
    console.log("path", path)
    dispatch(getArticle(path))
  }, [dispatch]);

  return (
    <div>
      {
        !loading && loaded && article.data
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
                  article.data[0].field_tags.map((tag:string, i:number) => {
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