import React from 'react';
import {Route, Routes} from 'react-router-dom';
import SignUpPage from "../../pages/SignUpPage";
import HomePage from "../../pages/HomePage";
import SignInPage from "../../pages/SignInPage";
import AdvertisementPage from "../../pages/AdvertisementPage";
import ServicePage from "../../pages/ServicesPage";
import AboutPage from "../../pages/AboutPage";
import ProfilePage from "../../pages/ProfilePage";
import {useSelector} from "react-redux";
import OrderDetailsPage from "../../pages/OrderDetailsPage";
import NotFound from "../../pages/NotFound";

const Router = () => {

    const isAuthenticated = useSelector(state => state.isAuthenticated)

    if (isAuthenticated) {
        return(
            <Routes>
                <Route path={'/'} element={<HomePage />}/>
                <Route path={'/personal-info'} element={<ProfilePage />}/>
                <Route path={'/about'} element={<AboutPage />}/>
                <Route path={'/my-orders'}/>
                <Route path={'/my-sales'}/>
                <Route path={'/advertisements/advertisement'} element={<AdvertisementPage />}/>
                <Route path={'/order/details'} element={<OrderDetailsPage />}/>
                <Route path={'*'} element={<NotFound />}/>
            </Routes>
        );
    }

    return(
        <Routes>
            <Route path={'/'} element={<HomePage />}/>
            <Route path={'/sign-in'} element={<SignInPage />}/>
            <Route path={'/sign-up'} element={<SignUpPage />}/>
            <Route path={'/about'} element={<AboutPage />}/>
            <Route path={'/advertisements/advertisement'} element={<AdvertisementPage />}/>
            <Route path={'*'} element={<NotFound />}/>
        </Routes>
    );
};

export default Router;