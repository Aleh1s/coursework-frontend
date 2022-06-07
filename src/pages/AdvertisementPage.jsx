import React, {useEffect, useState} from 'react';
import {Alert, Button, Col, Container, Figure, Image, Row} from "react-bootstrap";
import ModalMakeOrder from "../components/modals/ModalMakeOrder";
import {useSelector} from "react-redux";
import AdvertisementService from "../service/AdvertisementService";
import CreatorInfo from "../components/UI/CreatorInfo";
import {useNavigate, useParams} from "react-router-dom";
import {API_URL} from "../http";
import AdminService from "../service/AdminService";

const AdvertisementPage = () => {

    const {id} = useParams()
    const user = useSelector(state => state.user)
    const isAuthenticated = useSelector(state => state.isAuthenticated)
    const [notification, setNotification] = useState({
        show: false,
        message: ''
    })
    const navigate = useNavigate()
    const locationImage = 'https://icons-for-free.com/download-icon-location-131965017472890605_512.png'
    const [showModalForm, setShowModalForm] = useState(false)

    const handleShowModalForm = () => {
        if (isAuthenticated) {
            setShowModalForm(true)
        } else {
            navigate('/sign-in')
        }
    }

    const handleCloseModalForm = () => setShowModalForm(false)

    const [itemInfo, setItemInfo] = useState({
        title: '',
        description: '',
        city: '',
        category: '',
        createdAt: '',
        status: '',
        userResponse: {
            email: '',
            firstName: '',
            lastName: '',
            phoneNumber: ''
        }
    })

    const fetchDetails = () => {
        AdvertisementService.getAdvertisementDetails(id)
            .then(response => {
                setItemInfo(response.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchDetails()
    }, [])

    const handleChangeAdvertisementStatus = (status) => {
        AdminService.changeAdvertisementStatus(id, status)
            .then(() => {
                setNotification({show: true, message: `Advertisement status was changed to ${status.toLowerCase()}`})
                window.scrollTo(0, 0)
                fetchDetails()
            })
            .catch(err => console.log(err))
    }

    const getActionButton = () => {
        if (user.role === 'ADMIN') {
            return (
                <Row className={'d-flex justify-content-center align-items-center'}>
                    <Col className={'col-12 d-flex justify-content-between align-items-center'}>
                        {getStatus(itemInfo.status)}
                        <Button style={{width: '120px'}} variant={'success'} className={'mx-auto'}
                                onClick={() => handleChangeAdvertisementStatus('CHECKED')}>Accept</Button>
                        <Button style={{width: '120px'}} variant={'danger'} className={'mx-auto'}
                                onClick={() => handleChangeAdvertisementStatus('BLOCKED')}>Block</Button>
                    </Col>
                </Row>
            )
        } else if (itemInfo.category === 'ITEM' && itemInfo.userResponse.email !== user.email) {
            return (
                <Row>
                    <Button variant={'primary'} as={Col} className={'mx-1'} onClick={handleShowModalForm}>Order
                        online</Button>
                </Row>
            )
        } else {
            return (
                <></>
            )
        }
    }

    const handleChangeUserStatus = (status) => {
        AdminService.changeUserStatus(itemInfo.userResponse.email, status)
            .then(() => {
                setNotification({show: true, message: `User status was changed to ${status.toLowerCase()}`})
                window.scrollTo(0, 0)
                fetchDetails()
            })
            .catch(err => console.log(err))
    }

    const getStatus = (status) => {
        switch (status) {
            case 'UNCHECKED':
                return (
                    <p>Status: <strong style={{color: 'orange'}}>Unchecked</strong></p>
                )
            case 'CHECKED':
                return (
                    <p>Status: <strong style={{color: 'green'}}>Checked</strong></p>
                )
            case 'BLOCKED':
                return (
                    <p>Status: <strong style={{color: 'red'}}>Blocked</strong></p>
                )
            default:
                return <></>
        }
    }

    return (
        <Container className={'p-2'}>
            {
                notification.show ?
                    <Alert key={'notification'} variant={'success'}>
                        {notification.message}
                    </Alert>
                    :
                    <></>
            }
            <Row className={'my-3'}>
                <Col className={'col-lg-7 col-12 p-2 shadow my-auto d-flex'}>
                    <Image src={`${API_URL}/v1/images/advertisements?_id=${id}`} className={'img-fluid'}/>
                </Col>
                <Col className={'d-flex col-12 col-lg-5 shadow my-lg-0 my-3 p-2'}>
                    <Row className={'h-100 d-flex col-12 mx-auto justify-content-center align-items-center'}>
                        <Col className={'col-12 align-items-center justify-content-center d-flex'}>
                            <Image src={locationImage} width={'40px'} height={'40px'}/>
                            <p className={'h4'}>{itemInfo.city}</p>
                        </Col>
                        {getActionButton()}
                    </Row>
                </Col>
                <Col className={'d-flex col-12 shadow-lg mx-auto my-4 p-2'}>
                    <Row className={'d-flex row-flex p-2'}>
                        <Col className={'col-12 d-flex justify-content-start align-self-start'}>
                            <p className={'h2'}>{itemInfo.title}</p>
                        </Col>
                        <Col className={'col-12 d-flex justify-content-start align-items-start'}>
                            <Figure>
                                <Figure.Caption>Created
                                    at: {itemInfo.createdAt.substring(0, 10)} {itemInfo.createdAt.substring(11, 19)}</Figure.Caption>
                            </Figure>
                        </Col>
                        <Col className={'col-12 d-flex justify-content-start align-self-start'}>
                            <p>{itemInfo.description}</p>
                        </Col>
                    </Row>
                </Col>
                <CreatorInfo creatorInfo={itemInfo.userResponse}
                             handleChangeUserStatus={handleChangeUserStatus}/>
                <ModalMakeOrder show={showModalForm} onHide={handleCloseModalForm}
                                setNotification={setNotification}/>
            </Row>
        </Container>
    );
};

export default AdvertisementPage;