import React, { FC } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { AppState } from '../index-reducers'
import 'react-dropzone-uploader/dist/styles.css'

import {
  postArticle,
  setArticleBody,
  setArticleTitle,
} from './articlePost-actions'
import ArticlePostImage from './ArticlePost-image';
import ArticlePostTags from './ArticlePost-tags';
import { payload } from './articlePost-payload';

const ArticlePost: FC = (): JSX.Element => {

  const files = useSelector((state: AppState) => state.articlePost.files);
  const title = useSelector((state: AppState) => state.articlePost.title);
  const body = useSelector((state: AppState) => state.articlePost.body);
  const tags = useSelector((state: AppState) => state.articlePost.tags);
  const selected = useSelector((state: AppState) => state.articlePost.selected);
  const dispatch = useDispatch();

  const handleSumbitForm = (e: any) => {
    e.preventDefault();
    /**
     * Dispatch the POST_ARTICLE action that triggers the
     * saga postArticleWorker to POST the article to drupal
     *
     * @param {object} payload - the POST request body
     */
    dispatch(postArticle(payload({
      title: title,
      body: body,
      fileId: files.id,
      tags: tags
    })));
  }

  return (
    <div>
      <div>Post Article</div>
      <form
        onSubmit={handleSumbitForm}
        style={{ margin: '10px' }}
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={(event: any) => dispatch(setArticleTitle(event.target.value))}
          value={title || ''}
          style={{ margin: '10px 0px' }}
        />

        <ArticlePostImage />

        <ArticlePostTags />

        <textarea
          name="body"
          placeholder="Body"
          onChange={(event: any) => dispatch(setArticleBody(event.target.value))}
          value={body || ''}
          style={{ margin: '10px 0px' }}
        ></textarea>

        <input
          type="submit"
          placeholder="Send"
          value="Submit"
          style={{ margin: '10px 0px' }}
        />

      </form>

      <div style={{ backgroundColor: "#f4f4f4", padding: "10px" }}>
        <code >
          <div><strong>store.articlePost.title:</strong> {JSON.stringify(title)}</div><br />
          <div><strong>store.articlePost.files:</strong> {JSON.stringify(files)}</div><br />
          <div><strong>store.articlePost.body:</strong> {JSON.stringify(body)}</div><br />
          <div><strong>store.articlePost.tags:</strong> {JSON.stringify(tags)}</div><br />
          <div><strong>store.articlePost.selected:</strong> {JSON.stringify(selected)}</div><br />
        </code>
      </div>
    </div >
  )
}

export default ArticlePost;
