import React, {useEffect, useState} from 'react';
import {Accordion, Col, Image, Pagination, Row} from "react-bootstrap";
import MyAdvertisement from "./MyAdvertisement";
import AdvertisementService from "../../service/AdvertisementService";

const MyAdvertisements = ({user, setError}) => {

    const [myAdvertisements, setMyAdvertisements] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [activePage, setActivePage] = useState(1)

    const NO_RESULT_IMAGE = 'https://cdn.dribbble.com/users/1554526/screenshots/3399669/media/51c98501bc68499ed0220e1ba286eeaf.png?compress=1&resize=400x300'

    const fetchAdvertisements = () => {
        AdvertisementService.getAdvertisementsByEmail(user.email, 10, 'createdAt', activePage - 1)
            .then(response => {
                setMyAdvertisements(response.data.advertisements)
                setTotalCount(response.data.totalCount)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchAdvertisements()
    }, [activePage])

    let numbers = [];
    for (let number = 1; number <= Math.ceil(totalCount / 10); number++) {
        numbers.push(
            <Pagination.Item key={number} active={number === activePage} onClick={() => {
                setActivePage(number)
                window.scrollTo(0, 0)
            }}>
                {number}
            </Pagination.Item>
        );
    }

    return (
        <Row>
            <Accordion>
                {
                    myAdvertisements.length !== 0 ? myAdvertisements.map(advertisement =>
                            <MyAdvertisement fetchAdvertisements={fetchAdvertisements} advertisement={advertisement} setError={setError}/>
                        ) :
                        <Row className={'d-flex justify-content-center'}>
                            <Col className={'cow-12 d-flex justify-content-center'}>
                                <Image src={NO_RESULT_IMAGE} className={'img-fluid'}/>
                            </Col>
                        </Row>
                }
            </Accordion>
            <Row className={'my-2'}>
                <Col>
                    <Pagination className={'mx-auto'}>{numbers}</Pagination>
                </Col>
            </Row>
        </Row>
    );
};

export default MyAdvertisements;