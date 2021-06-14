import React from 'react';
import { Link } from "react-router-dom"

/**
 * Renders the site logo
 *
 * Used by the Header.tsx
 *
 * @return {string} HTML element of logo
 */
const Logo: React.FC = (): JSX.Element => {
    return (
        <div id="Logo">
            <h1><Link to={"/"}>Logo</Link></h1>
        </div>
    )
}

export default Logo;