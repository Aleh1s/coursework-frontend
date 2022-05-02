import React from 'react';
import {Route, Routes} from 'react-router-dom';
import SignUpPage from "../pages/SignUpPage";
import HomePage from "../pages/HomePage";
import SignInPage from "../pages/SignInPage";

const Router = ({isAuthenticated}) => {
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
            <Route path={'/'} element={<HomePage />}/>
            <Route path={'/sign-in'} element={<SignInPage />}/>
            <Route exact path={'/sign-up'} element={<SignUpPage />}/>
            <Route path={'/items'}/>
            <Route path={'/houses'}/>
            <Route path={'/services'}/>
            <Route path={'*'}/>
        </Routes>
    );
};

export default Router;