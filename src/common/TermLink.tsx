import React from 'react';
import { Link } from "react-router-dom"

interface IProps {
  name: string;
}

/**
 * Render a taxonomy term link
 *
 * Using: the name of the term
 * Used by: articles list and article page
 *
 * @param {string} tag - term alias from backend
 * @return {string}      term link for frontend
*/
const TermLink: React.FC<IProps> = ({ name }: { name: string}): JSX.Element => {
  const getLastItem = (thePath: string) => thePath.substring(thePath.lastIndexOf('/') + 1)
  const link = <Link to={"/?terms=" + getLastItem(name)}> {name}</Link>
  return link
}

export default TermLink;