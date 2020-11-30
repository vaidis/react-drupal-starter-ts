import React from 'react';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { AppState } from './../index-reducers'

interface IProps {
  to: any;
  title: any;
  urlParams: any;
}

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
               