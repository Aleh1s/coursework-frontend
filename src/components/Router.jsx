import React from 'react';
import {Route, Routes} from 'react-router-dom';

const Router = isAuthenticated => {
    if (isAuthenticated) {
        return(
            <Routes>
                <Route path={'/'}/>
                <Route path={'/personal-info'}/>
                <Route path={'/my-orders'}/>
                <Route path={'/my-sales'}/>
                <Route path={'/items'}/>
                <Route path={'/houses'}/>
                <Route path={'/services'}/>
                <Route path={'*'}/>
            </Routes>
        );
    }

    return(
        <Routes>
            <Route path={'/'}/>
            <Route path={'/sign in'}/>
            <Route path={'/sign up'}/>
            <Route path={'/items'}/>
            <Route path={'/houses'}/>
            <Route path={'/services'}/>
            <Route path={'*'}/>
        </Routes>
    );
};

export default Router;