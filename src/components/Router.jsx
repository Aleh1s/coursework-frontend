import React from 'react';
import {Route, Routes} from 'react-router-dom';
import SignUpPage from "../pages/SignUpPage";
import HomePage from "../pages/HomePage";
import SignInPage from "../pages/SignInPage";
import ItemPage from "../pages/ItemPage";
import ServicePage from "../pages/ServicesPage";
import AboutPage from "../pages/AboutPage";
import ProfilePage from "../pages/ProfilePage";

const Router = ({isAuthenticated}) => {
    if (isAuthenticated) {
        return(
            <Routes>
                <Route path={'/'} element={<HomePage />}/>
                <Route path={'/personal-info'} element={<ProfilePage />}/>
                <Route path={'/about'} element={<AboutPage />}/>
                <Route path={'/my-orders'}/>
                <Route path={'/my-sales'}/>
                <Route path={'/items/item'} element={<ItemPage />}/>
                <Route path={'/houses/house'}/>
                <Route path={'/services/service'} element={<ServicePage />}/>
                <Route path={'*'}/>
            </Routes>
        );
    }

    return(
        <Routes>
            <Route path={'/'} element={<HomePage />}/>
            <Route path={'/sign-in'} element={<SignInPage />}/>
            <Route path={'/sign-up'} element={<SignUpPage />}/>
            <Route path={'/about'} element={<AboutPage />}/>
            <Route path={'/houses/house'}/>
            <Route path={'/services/service'} element={<ServicePage />}/>
            <Route path={'/items/item'} element={<ItemPage />}/>
            <Route path={'*'}/>
        </Routes>
    );
};

export default Router;