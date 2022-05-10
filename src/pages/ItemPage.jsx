import React, {useEffect, useState} from 'react';
import {Button, Carousel, Col, Container, Image, Row} from "react-bootstrap";
import ModalItemForm from "../components/modals/ModalItemForm";
import ModalPhone from "../components/modals/ModalPhone";
import {useSelector} from "react-redux";
import AdvertisementService from "../service/AdvertisementService";
import CreatorInfo from "../components/UI/CreatorInfo";

const ItemPage = () => {

    const id = useSelector(state => state.advertisementId)
    const image = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18085ec4d35%20text%20%7B%20fill%3A%23ffffff%3Bfont-weight%3Anormal%3Bfont-family%3Avar(--bs-font-sans-serif)%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18085ec4d35%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22289.71875%22%20y%3D%22221.36000137329103%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'
    const locationImage = 'https://icons-for-free.com/download-icon-location-131965017472890605_512.png'
    const [showModalForm, setShowModalForm] = useState(false)
    const handleShowModalForm = () => setShowModalForm(true)
    const handleCloseModalForm = () => setShowModalForm(false)
    const [advertisementInfo, setAdvertisementInfo] = useState({})
    useEffect
    (() => {
        AdvertisementService.getAdvertisementDetails("ITEM", id)
            .then(response => setAdvertisementInfo(response.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <Container className={'p-2'}>
            <Row className={'my-3'}>
                <Col className={'col-lg-7 col-12 p-2 shadow-lg my-auto'}>
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={image}
                                alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={image}
                                alt="Second slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={image}
                                alt="Third slide"
                            />
                        </Carousel.Item>
                    </Carousel>
                </Col>
                <Col className={'d-flex col-12 col-lg-4 shadow-lg offset-1 my-lg-0 my-4 p-2'}>
                    <Row className={'h-100 d-flex col-12 mx-auto justify-content-center align-items-start'}>
                        <Col className={'col-12 d-flex col-12 mx-auto justify-content-center'}>
                            <p className={'h3'}>Location</p>
                        </Col>
                        <Col className={'col-12 d-flex mx-auto justify-content-between align-items-center'}>
                            <Row className={'d-flex mx-auto flex-row'}>
                                <Col className={'d-flex col-6 mx-auto justify-content-center align-items-center'}>
                                    <Image src={locationImage} width={'40px'} height={'40px'}/>
                                    <p className={'align-self-center'}>{advertisementInfo.creatorCity}</p>
                                </Col>
                            </Row>
                        </Col>
                        <Col className={'col-12 d-flex align-self-end justify-content-center mx-auto my-auto'}>
                            <Button variant={'primary'} as={Col} className={'mx-1'} onClick={handleShowModalForm}>Order
                                online</Button>
                        </Col>
                    </Row>
                </Col>
                <Col className={'d-flex col-12 shadow-lg mx-auto my-5 p-2'}>
                    <Row className={'d-flex row-flex p-2'}>
                        <Col className={'col-12 d-flex justify-content-start align-self-start'}>
                            <p className={'h2'}>{advertisementInfo.title}</p>
                        </Col>
                        <Col className={'col-12 d-flex justify-content-start align-self-start'}>
                            <p>{advertisementInfo.description}</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
            {/*<Row className={'my-4 mx-auto'}>*/}
            {/*    <Col className={'col-lg-6 col-12 p-2 shadow'}>*/}
            {/*
            {/*    </Col>*/}
            {/*    <Col className={'col-lg-6 col-12 my-lg-0 my-4 shadow'}>*/}
            {/*        <p className={'h1'}>{advertisementInfo.title}</p>*/}
            {/*        <hr/>*/}
            {/*        <p>{advertisementInfo.description}</p>*/}
            {/*        }
            {/*    </Col>*/}
            {/*</Row>*/}
            <CreatorInfo advertisementInfo={advertisementInfo}/>
            <ModalItemForm show={showModalForm} onHide={handleCloseModalForm}/>
        </Container>
    );
};

export default ItemPage;