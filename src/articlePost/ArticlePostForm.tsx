import React from 'react'

const ArticlePost: React.FC = () => {

    return (
        <div>
            FORM

          {/* <form
            onSubmit={handleSumbitForm}
            style={{ margin: '10px' }}
          >
            <input
              type="text"
              name="title"
              placeholder="Title"
              onChange={(event) => dispatch(setArticleTitle(event.target.value))}
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
              type="text"
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
          </form>
          <div style={{ backgroundColor: "#f4f4f4", padding: "10px" }}>
            <code >
              <div><strong>store.articlePost.title:</strong> {JSON.stringify(title)}</div><br />
              <div><strong>store.articlePost.files:</strong> {JSON.stringify(files)}</div><br />
              <div><strong>store.articlePost.body:</strong> {JSON.stringify(body)}</div><br />
              <div><strong>store.articlePost.tags:</strong> {JSON.stringify(tags)}</div><br />
              <div><strong>store.articlePost.selected:</strong> {JSON.stringify(selected)}</div><br />
            </code>
          </div> */}
        </div>
      )
}

export default ArticlePost;