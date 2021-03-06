import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import Dropzone from 'react-dropzone-uploader'
import CreatableSelect from 'react-select/creatable';
import { AppState } from '../index-reducers'
import {
  postArticle,
  postTag,
  setArticleFile,
  setArticleBody,
  setArticleTags,
  setArticleTitle,
  getVocabulary,
  setSelected,
} from '../articlePost/articlePost-actions'

import * as endpoint from '../api/endpoints'
import 'react-dropzone-uploader/dist/styles.css'

const ArticlePost: React.FC = () => {

  const files= useSelector((state: AppState) => state.articlePost.files);
  const title= useSelector((state: AppState) => state.articlePost.title);
  const body= useSelector((state: AppState) => state.articlePost.body);
  const tags= useSelector((state: AppState) => state.articlePost.tags);
  const vocabulary= useSelector((state: AppState) => state.articlePost.vocabulary);
  const selected= useSelector((state: AppState) => state.articlePost.selected);
  const csrf_token= useSelector((state: AppState) => state.user.csrf_token);

  const dispatch = useDispatch();

  /** used by the react-dropzone-uploader for the image field */
  const [error_upload, setErrorUpload] = React.useState('');

  const handleSumbitForm = (e: any) => {
    e.preventDefault();
    /**
     * @type {object} payload - the body of POST request of
     *     an article that contains an image and at least one
     *     term. There is no validation yet
     */
    const payload: any = {
      "data": {
        "type": "node--article",
        "attributes": {
          "title": title,
          "body": {
            "value": body,
            "format": "plain_text"
          }
        },
        "relationships": {
          "field_image": {
            "data": {
              "type": "file--file",
              "id": files.id,
              "meta": {
                "alt": "Json Uploaded Testing1",
                "title": "Json Uploaded Testing1",
                "width": null,
                "height": null
              }
            }
          },
          "field_tags": {
            "data": tags
          }
        }
      }
    }
    // console.log('dispatchPostArticle payload', payload)

    /**
     * Dispatch the POST_ARTICLE action that triggers the
     * saga postArticleWorker to POST the article
     *
     * @param {object} payload - the POST request body
     */
    dispatch(postArticle(payload));
  }

  /**
   * react-dropzone-uploader POST request parameters
   * The react-dropzone-uploader uses his own xhr library
   * and thus not using the api.js
   *
   * @param {object} file - The image or video file
   * @param {object} meta - Meta data
   */
  const getUploadParams = async ({ file, meta }: any) => {
    var body = file;
    const url = endpoint.ARTICLE_POST_FILE;
    const headers = {
      "Accept": "application/vnd.api+json",
      "Content-Type": "application/octet-stream",
      "Content-Disposition": "file; filename=\"" + file.name + "\"",
      "X-CSRF-Token": csrf_token,
    }
    console.log("body", body)
    console.log("headers", headers)
    return { url, headers, body }
  }

  /**
   * IMAGE upload
   *
   * Using: react-dropzone-uploader component
   *
   * Gets the id of the new image just stored in backend
   * api: https://github.com/fortana-co/react-dropzone-uploader/blob/8603b1892f568ef14f35ace5596c3f5b4b6381d3/docs/api.md
   *
   * @param {object} xhr - The fetcher
   * @param {object} fileWithMeta - file callback functions
   * @param {object} status - response status
   *
   */
  const handleChangeStatus = ({ xhr }: any, fileWithMeta: any, status: any) => {
    if (xhr) {
      console.log('xhr', xhr)
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          const result = JSON.parse(xhr.response);
          console.log('xhr.response', result)
          if (result.hasOwnProperty('data')) {
            dispatch(setArticleFile(result.data.id))
          }
          if (result.hasOwnProperty('errors')) {
            status[0].remove()
            setErrorUpload(fileWithMeta)
            /**
             * for some reason, the fileWithMeta gives the data of status
             * and the status gives the data of the fileWithMeta
             */
            // console.log("handleChangeStatus status", status);
            // console.log("xhr.response fileWithMeta", fileWithMeta);
            // console.log('xhr.response result', result)
            // console.log('xhr.response result.error', result.errors)
          }
        }
      }
    }
  }

  React.useEffect(() => {
    /** get a fresh vocabulary to fill the react-select options list */
    const vocabName: any = "tags";
    dispatch(getVocabulary(vocabName));
  }, [dispatch]);

  const tagPostBodyitem = (item: any) => {
    return (
      { "type": "taxonomy_term--tags", "id": item }
    )
  }

  /**
   * called from react-select when a tag added or removed
   * save all selected values to store.articlePost.tags
   *
   * @param {string[]} value - term name
   *     [{"value":"00d9f5ee-9121-46c3","label":"some tag"}]
   * @dispatch {string[]} ids - the selected terms
   */
  const handleSelectOnChange = (value: any) => {
    console.log("handleSelectOnChange value", JSON.stringify(value))
    dispatch(setSelected(value))
    if (value) {
      /**
       * @type {string[]} itds - format: {1234},{5678},{9012}
       */
      const ids = value.map((x: any) => tagPostBodyitem(x.value));

      dispatch(setArticleTags(ids));
    }
  }

  /**
   * POST new tag
   *
   * Used by: react-select component
   *
   * @param {string} name - The name of the tag
   * @dispatch {object} body - The body of POST request
   */
  const handleSelectOnCreate = (name: any) => {
    // console.group('handleSelectOnCreate', name);
    const body: any = {
      "data": {
        "type": "taxonomy_term--tags",
        "attributes": {
          "name": name
        }
      }
    }
    dispatch(postTag(body));
  }

  return (
    <div>
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
        <Dropzone
          multiple={false}
          maxFiles={1}
          getUploadParams={getUploadParams}
          onChangeStatus={handleChangeStatus}
          accept="image/*,audio/*,video/*"
          inputContent={(files, extra) => (extra.reject ? 'Image, audio and video files only' : 'Drag Files')}
          styles={{
            dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
            inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),

          }}
        />
        {error_upload}<br />
        <textarea
          name="body"
          placeholder="Body"
          onChange={(event: any) => dispatch(setArticleBody(event.target.value))}
          value={body || ''}
          style={{ margin: '10px 0px' }}
        ></textarea>
        <CreatableSelect
          placeholder={'Creatable Multi Select'}
          isMulti
          value={selected}
          isClearable
          options={vocabulary}
          onChange={handleSelectOnChange}
          onCreateOption={handleSelectOnCreate}
          style={{ margin: '10px 0px' }}
        />
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
    </div>
  )
}

export default ArticlePost;