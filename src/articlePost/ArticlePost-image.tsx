import React, { FC } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Dropzone from 'react-dropzone-uploader'

import { AppState } from '../index-reducers'
import * as endpoint from '../api/endpoints'
import 'react-dropzone-uploader/dist/styles.css'
import { setArticleFile } from './articlePost-actions'


const ArticlePostImage: FC = (): JSX.Element => {

  const [error_upload, setErrorUpload] = React.useState('');
  const csrf_token = useSelector((state: AppState) => state.user.csrf_token);
  const dispatch = useDispatch();

  /**
   * react-dropzone-uploader POST parameters
   * 
   * The react-dropzone-uploader uses his own xhr library
   * and thus not using the our api.js
   * 
   * used by <Dropzone getUploadParams={getUploadParams} ... />
   *
   * @param {object} file - The image or video file
   * @param {object} meta - Meta data
   */
  const getUploadParams = async ({ file, meta }: { file: any; meta: any }) => {
    var body = file;
    const url = endpoint.ARTICLE_POST_FILE;
    const headers = {
      "Accept": "application/vnd.api+json",
      "Content-Type": "application/octet-stream",
      "Content-Disposition": "file; filename=\"" + file.name + "\"",
      "X-CSRF-Token": csrf_token,
    }
    console.log("getUploadParams body", body)
    console.log("getUploadParams headers", headers)
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
    console.log(' - handleChangeStatus xhr', xhr)
    console.log(' - handleChangeStatus fileWithMeta', fileWithMeta)
    console.log(' - handleChangeStatus status', status)
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
          }
        }
      }
    }
  }

  return (
    <div>
      <Dropzone
        multiple={false}
        maxFiles={1}
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        accept="image/*,audio/*,video/*"
        inputContent={(files, extra) => (extra.reject ? 'png, gif, jpg, jpeg files only, 200Kb max' : 'Drag Files')}
        styles={{
          dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
          inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
        }}
      />
      {error_upload}<br />
    </div >
  )
}

export default ArticlePostImage;
