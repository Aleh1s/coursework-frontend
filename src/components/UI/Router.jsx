import React from 'react';
import {Route, Routes} from 'react-router-dom';
import SignUpPage from "../../pages/SignUpPage";
import HomePage from "../../pages/HomePage";
import SignInPage from "../../pages/SignInPage";
import AdvertisementPage from "../../pages/AdvertisementPage";
import AboutPage from "../../pages/AboutPage";
import ProfilePage from "../../pages/ProfilePage";
import {useSelector} from "react-redux";
import NotFoundPage from "../../pages/NotFoundPage";
import ModerationPage from "../admin/ModerationPage";
import Feedbacks from "../admin/Feedbacks";

const Router = () => {

    const user = useSelector(state => state.user)
    const isAuthenticated = useSelector(state => state.isAuthenticated)

    if (isAuthenticated && user.role === 'USER') {
        return(
            <Routes>
                <Route path={'/'} element={<HomePage />}/>
                <Route path={'/personal-info'} element={<ProfilePage />}/>
                <Route path={'/about'} element={<AboutPage />}/>
                <Route path={'/advertisements/advertisement/:id'} element={<AdvertisementPage />}/>
                <Route path={'*'} element={<NotFoundPage />}/>
            </Routes>
        );
    } else if (isAuthenticated && user.role === 'ADMIN') {
        return (
            <Routes>
                <Route path={'/'} element={<HomePage />}/>
                <Route path={'/personal-info'} element={<ProfilePage />}/>
                <Route path={'/feedbacks'} element={<Feedbacks />}/>
                <Route path={'/advertisements/advertisement/:id'} element={<AdvertisementPage />}/>
                <Route path={'/moderation'} element={<ModerationPage />}/>
                <Route path={'*'} element={<NotFoundPage />}/>
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
            <Route path={'*'} element={<NotFoundPage />}/>
        </Routes>
    );
};

export default Router;