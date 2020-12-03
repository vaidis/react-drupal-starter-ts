import React from 'react';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { AppState } from './../index-reducers'

interface IProps {
  to: any;
  title: any;
  urlParams: any;
}

/**
 * Renders a pager item
 * 
 * @param {string} to        - Destination url
 * @param {string} title     - Menu item label
 * @param {string} urlParams   Current URL parameters
 * 
 * @example
 * 
 *     <PagerLink 
 *        to={2} 
 *        title={'NEXT'} 
 *        urlParams={
 *          items:0, 
 *          limit: 10, 
 *          offset:0, 
 *          page:1, 
 *          search: "", 
 *          terms: "some tag"
 *        } 
 *     />
 * 
 */
const PagerLink: React.FC<IProps> = ({ to, title, urlParams }) => {

  /** include the taxonomy term if needed */
  if (typeof (urlParams.terms) !== 'undefined') {
    if (urlParams.terms !== '') {
      return <Link to={"/?terms=" + urlParams.terms + "&offset=" + to}>
        {title + " : " + to}
      </Link>
    }
  }

/** the url does not have any taxonomy term parameters */
  return <Link to={"/?offset=" + to}>{title + " : " + to}</Link>
}

const mapStateToProps = (state: AppState) => ({
  urlParams: state.api.urlParams,
})

export default connect(mapStateToProps, null)(PagerLink)
               