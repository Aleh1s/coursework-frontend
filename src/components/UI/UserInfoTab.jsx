import React, {useEffect, useState} from 'react';
import {Col, Image, Row} from "react-bootstrap";
import {API_URL} from "../../http";

const UserInfoTab = ({user, setAddProfileImageModal, imageStatus}) => {


    const defaultImage = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'


    return (
        <Col className={'col-lg-4 col-10 mx-auto my-4 shadow'}>
            <Row>
                <Col className={'col-12 d-flex justify-content-center align-items-center'}>
                    <Image className={'mx-auto my-4 rounded-circle'}
                           src={imageStatus ? `${API_URL}/v1/users/image?_email=${user.email}` : defaultImage}
                           height={'200px'}
                           width={'200px'}
                           onClick={() => setAddProfileImageModal(true)}
                    />
                </Col>
                <Col className={'col-12 mx-auto my-4'}>
                    <p className={'h6'} align={'center'}>{`${user.firstName} ${user.lastName}`}</p>
                    <hr/>
                    <p>Email: {user.email}</p>
                    <hr/>
                    <p>Phone number: {
                        user.phoneNumber.includes('+38') ?
                            user.phoneNumber : `+38${user.phoneNumber}`}</p>
                </Col>
            </Row>
        </Col>
    );
};

export default UserInfoTab;