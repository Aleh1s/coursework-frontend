import React, {useEffect, useState} from 'react';
import {Button, Col, Image, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import {API_URL} from "../../http";
import ImageService from "../../service/ImageService";
import ModalPhone from "../modals/ModalPhone";

const CreatorInfo = ({creatorInfo, handleChangeUserStatus}) => {

    const user = useSelector(state => state.user)
    const [imageExists, setImageExists] = useState(false)
    const DEFAULT_IMAGE = "https://kis.agh.edu.pl/wp-content/uploads/2021/01/default-avatar.jpg"
    const [showModalPhone, setShowModalPhone] = useState(false)
    const handleShowModalPhone = () => setShowModalPhone(true)
    const handleCloseModalPhone = () => setShowModalPhone(false)

    const getActionButton = () => {
        if (user.role === 'ADMIN') {
            return (
                    <Col className={'d-flex justify-content-around align-items-center'}>
                        <Button variant={'danger'} onClick={() => handleChangeUserStatus('BLOCKED')}>Block user</Button>
                        <Button variant={'success'} onClick={() => handleChangeUserStatus('ACTIVE')}>Unblock user</Button>
                        <Button variant={'outline-primary'} onClick={handleShowModalPhone}>Phone number</Button>
                    </Col>
            )
        } else {
            return (
                    <Col className={'d-flex justify-content-center align-items-center'}>
                        <Button variant={'outline-primary'} onClick={handleShowModalPhone}>Phone
                            number</Button>
                    </Col>
            )
        }
    }

    const checkImage = () => {
        ImageService.userProfileImageExists(creatorInfo.email)
            .then(response => setImageExists(response.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if (creatorInfo.email !== '') {
            checkImage()
        }
    }, [creatorInfo.email])

    const getStatus = (status) => {
        switch (status) {
            case 'ACTIVE':
                return <strong style={{color: 'green'}}>Active</strong>
            case 'BLOCKED':
                return <strong style={{color: 'red'}}>Blocked</strong>
            default:
                return ''
        }
    }

    return (
        <>
            <Col className={'my-1'}>
                <Row className={'shadow-lg'}>
                    <Col className={'d-flex justify-content-start align-items-center my-auto p-3 col-6g'}>
                        <Image src={imageExists ? `${API_URL}/v1/images/users?_email=${creatorInfo.email}` : DEFAULT_IMAGE} className={'mx-auto'} roundedCircle height={'48px'} width={'48px'}/>
                        <p className={'mx-3 my-auto'}
                           style={{fontSize: '17px'}}>Owner: {creatorInfo.firstName} {creatorInfo.lastName} {user.role === 'ADMIN' ? getStatus(creatorInfo.status) : ''}</p>
                    </Col>
                    <Col className={'d-flex justify-content-end align-items-center my-auto col-3'}>
                        +380-XXX-XXX-XXX
                    </Col>
                    {getActionButton()}
                    <ModalPhone show={showModalPhone} phoneNumber={creatorInfo.phoneNumber} onHide={handleCloseModalPhone}/>
                </Row>
            </Col>
        </>
    );
};

export default CreatorInfo;