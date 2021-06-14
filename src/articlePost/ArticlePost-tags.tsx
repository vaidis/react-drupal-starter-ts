import React, { FC } from 'react';
import { useSelector, useDispatch } from "react-redux";
import CreatableSelect from 'react-select/creatable';
import { AppState } from '../index-reducers'

import {
  postTag,
  setArticleTags,
  getVocabulary,
  setSelected,
} from './articlePost-actions'

import {
  ISetSelected,
  ITagPostBodyitem
} from './articlePost-types';

const ArticlePostTags: FC = (): JSX.Element => {

  const tags = useSelector((state: AppState) => state.articlePost.tags);
  const vocabulary = useSelector((state: AppState) => state.articlePost.vocabulary);
  const selected = useSelector((state: AppState) => state.articlePost.selected);
  const dispatch = useDispatch();

  /** get a fresh vocabulary to fill the react-select options list */
  React.useEffect(() => {
    const vocabName: any = "tags";
    dispatch(getVocabulary(vocabName));
  }, [dispatch]);

  const tagPostBodyitem = (item: string): ITagPostBodyitem => {
    return (
      { "type": "taxonomy_term--tags", "id": item }
    )
  }


  /**
   * TAGS
   * 
   * called from react-select when a tag added or removed
   * save all selected values to store.articlePost.tags
   *
   * @param {string[]} value - term name
   *     [{"value":"00d9f5ee-9121-46c3","label":"some tag"}]
   * @dispatch {string[]} ids - the selected terms
   */
  const handleSelectOnChange = (value: any): void => {
    console.log("handleSelectOnChange value", JSON.stringify(value))
    console.log("handleSelectOnChange value", typeof (value))
    dispatch(setSelected(value))
    if (value) {
      const ids: { type: string; id: string } = value.map((x: ISetSelected) => tagPostBodyitem(x.value));
      console.log("handleSelectOnChange ids", JSON.stringify(ids))
      dispatch(setArticleTags(ids));
    }
  }

  /**
   * POST new term
   * Used by: react-select component
   *
   * @param {string} name - The name of the tag
   * @dispatch {object} body - The body of POST request
   */
  const handleSelectOnCreate = (name: string): void => {
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
    </div>
  )
}

export default ArticlePostTags;
