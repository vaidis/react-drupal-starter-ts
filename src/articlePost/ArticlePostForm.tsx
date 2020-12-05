import React from 'react'

const ArticlePostForm: React.FC = (props) => {

    // const dispatch = props.dispatch;
    // const handleSumbitForm = props.handleSumbitForm;
    // const getUploadParams = props.getUploadParams;
    // const handleChangeStatus = props.handleChangeStatus;
    // const vocabulary = props.vocabulary;
    // const selected = props.selected;
    // const handleSelectOnChange = props.handleSelectOnChange;
    // const handleSelectOnCreate = props.handleSelectOnCreate;

    return (
        <div>
          {/* <form
            onSubmit={handleSumbitForm}
            style={{ margin: '10px' }}
          >
            <input
              type="text"
              name="title"
              placeholder="Title"
              onChange={(event) => props.dispatch(setArticleTitle(event.target.value))}
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
              onChange={(event) => dispatch(setArticleBody(event.target.value))}
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
          </form> */}
        </div>
      )
}

export default ArticlePostForm;