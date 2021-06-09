import React, { FC } from 'react';
import { useSelector, useDispatch } from "react-redux";
// import Dropzone from 'react-dropzone-uploader'
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
import axios from 'axios';

import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';


const ArticlePost: FC = (): JSX.Element => {

  // const files = useSelector((state: AppState) => state.articlePost.files);
  const title = useSelector((state: AppState) => state.articlePost.title);
  const body = useSelector((state: AppState) => state.articlePost.body);
  const tags = useSelector((state: AppState) => state.articlePost.tags);
  const vocabulary = useSelector((state: AppState) => state.articlePost.vocabulary);
  const selected = useSelector((state: AppState) => state.articlePost.selected);
  const csrf_token = useSelector((state: AppState) => state.user.csrf_token);

  const dispatch = useDispatch();





  /** used by the react-dropzone-uploader for the image field */
  // const [error_upload, setErrorUpload] = React.useState('');

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
              // "id": files.id,
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


  // const getUploadParams = async ({ file, meta }: any) => {
  //   var body = file;
  //   const url = endpoint.ARTICLE_POST_FILE;
  //   const headers = {
  //     "Accept": "application/vnd.api+json",
  //     "Content-Type": "application/octet-stream",
  //     "Content-Disposition": "file; filename=\"" + file.name + "\"",
  //     "X-CSRF-Token": csrf_token,
  //   }
  //   console.log("body", body)
  //   console.log("headers", headers)
  //   return { url, headers, body }
  // }

  // const handleChangeStatus = ({ xhr }: any, fileWithMeta: any, status: any) => {
  //   if (xhr) {
  //     console.log('xhr', xhr)
  //     xhr.onreadystatechange = () => {
  //       if (xhr.readyState === 4) {
  //         const result = JSON.parse(xhr.response);
  //         console.log('xhr.response', result)
  //         if (result.hasOwnProperty('data')) {
  //           dispatch(setArticleFile(result.data.id))
  //         }
  //         if (result.hasOwnProperty('errors')) {
  //           status[0].remove()
  //           setErrorUpload(fileWithMeta)
  //         }
  //       }
  //     }
  //   }
  // }



  React.useEffect(() => {
    /** 
     * get a fresh vocabulary to fill the react-select options list 
     */
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

  {/* ---------------------------------------------------------------------------- */ }
  // const [fileSelected, setFileSelected] = React.useState<File | undefined>()

  // const formImage = React.useRef<HTMLFormElement>(null)
  // const formImage: any = React.useRef(null)

  // const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
  //   const fileList = e.target.files;
  //   if (!fileList) return;
  //   console.log('handleImageChange fileList', fileList[0])
  //   setFileSelected(fileList[0]);
  // };
  // const handleImageChange = function (e: any) {
  //   const fileList = e.target.files;
  //   if (!fileList) return;
  //   console.log('handleImageChange fileList', fileList[0])
  //   setFileSelected(fileList[0]);
  // };


  // const uploadFile = function (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
  //   console.log('uploadFile e', e)
  //   if (fileSelected) {

  //     /** FormData */
  //     // if (formImage) {
  //     // let formData: <HTMLFormElement, undefined> = new FormData(formImage);
  //     // formData.append("image", fileSelected, fileSelected.name);
  //     let formData: any = new FormData(formImage);
  //     formData.append("image", fileSelected);

  //     // }
  //     console.log('uploadFile fileSelected', fileSelected)

  //     // formData.append("file", fileSelected);

  //     // for (var [key, value] of formData.entries()) { 
  //     //   console.log(key, value);
  //     // }

  //     // var data = formData;

  //     /** options */
  //     const url = 'https://stevaidis.mywire.org:444/jsonapi/node/article/field_image';
  //     var config: any = {
  //       method: 'post',
  //       headers: {
  //         'Accept': 'application/vnd.api+json',
  //         'content-type': 'multipart/form-data',
  //         'X-CSRF-Token': csrf_token,
  //         'Content-Disposition': 'file; filename="' + fileSelected.name + '"',
  //         'X-Requested-With': 'XMLHttpRequest',
  //       },
  //       withCredentials: true,
  //       data: formData
  //     };
  //     console.log('uploadFile axios(config)', config)

  //     /** axios */
  //     // return axios.post(url,formData, config)
  //     //   .then(function (response) {
  //     //     console.log(JSON.stringify(response.data));
  //     //   })
  //     //   .catch(function (error) {
  //     //     console.log(error);
  //     //   });


  //     // const options: object = {
  //     //   url: endpoint.ARTICLE_POST_FILE,
  //     //   method: 'post',
  //     //   headers: {
  //     //     "Accept": "application/vnd.api+json",
  //     //     "Content-Type": "application/octet-stream",
  //     //     "X-CSRF-Token": csrf_token,
  //     //     "Content-Disposition": "file; filename=\"" + fileSelected.name + "\"",
  //     //   },
  //     //   withCredentials: true,
  //     //   timeout: 2000,
  //     //   data: formData,
  //     // data: Buffer.from(data, "binary"),
  //     // }
  //     // return axios(options)
  //     //   .then(response => response)
  //     //   .catch(error => {
  //     //     throw new Error("Conection time out");
  //     //   });

  //   }
  // };
  {/* ---------------------------------------------------------------------------- */ }




  //   FilePond.setOptions({
  //     server: {
  //         url: 'https://stevaidis.mywire.org:444',
  //         process: {
  //             url: './jsonapi/node/article/field_image',
  //             method: 'POST',
  //             withCredentials: true,
  //             headers: {},
  //             timeout: 7000,
  //             onload: null,
  //             onerror: null,
  //             ondata: null
  //         }
  //     }
  // });

  // const pond = FilePond.
  const [files, setFiles] = React.useState([])

  return (
    <div>
     
      <FilePond
        name={'image'}
        files={files}
        // onupdatefiles={setFiles}
        server={{
          url: '',
          process: {
            url: 'https://stevaidis.mywire.org:444/jsonapi/node/article/field_image',
            method: 'POST',
            withCredentials: true,
            headers: {
              'X-CSRF-TOKEN': csrf_token,
            },
          },
        }}
      />

      <div>
        {/* ---------------------------------------------------------------------------- */}
        {/* <form ref={formImage}>
          <input
            accept="image/*"
            id="photo"
            name="photo"
            type="file"
            multiple={false}
            onChange={handleImageChange}
          />
          <div>fileSelected: {JSON.stringify(fileSelected?.name)}</div><br />
          <button onClick={uploadFile}>Choose Picture</button>
        </form> */}
        {/* ---------------------------------------------------------------------------- */}
      </div>

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
    </div >
  )
}

export default ArticlePost;