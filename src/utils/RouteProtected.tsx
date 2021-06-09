import React, { FC } from 'react';
import { Redirect } from 'react-router-dom'
import { useSelector } from "react-redux";
import { Route } from 'react-router-dom';

import { AppState } from '../index-reducers'

interface IProps {
    path: string;
    component: FC;
}
/**
 * Render the component if the user is logged in
 * else go to login page
 *
 * @param {component} destination component
 */
const RouteProtected: FC<IProps> = ({component, ...rest}: IProps): JSX.Element => {
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