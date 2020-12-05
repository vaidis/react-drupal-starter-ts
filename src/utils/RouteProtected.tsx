import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from "react-redux";
import { Route } from 'react-router-dom';

import { AppState } from '../index-reducers'

interface IProps {
    path: string;
    component: any;
}
/**
 * Render the component if the user is logged in
 *
 * @param {component} destination component
 */
const RouteProtected = ({component, ...rest}: any) => {
    const user = useSelector((state: AppState) => state.user);
    const isAuthenticated = user.current_user.uid === 0 ? false : true;

    const routeComponent = (props: any) => (
        isAuthenticated
            ? React.createElement(component, props)
            : <Redirect to={{pathname: '/user/login'}}/>
    );
    return <Route {...rest} render={routeComponent}/>;
}

export default RouteProtected;