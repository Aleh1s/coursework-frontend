import React, {useEffect, useState} from 'react';
import {Col, Container, Image, Pagination, Row} from "react-bootstrap";
import AdminService from "../../service/AdminService";
import Advertisement from "../advertisements/Advertisement";

const ModerationPage = () => {

    const [activePage, setActivePage] = useState(1)
    const [totalCount, setTotalCount] = useState(0)
    const [advertisements, setAdvertisements] = useState([])
    const NO_RESULT_IMAGE = 'https://cdn.dribbble.com/users/1554526/screenshots/3399669/media/51c98501bc68499ed0220e1ba286eeaf.png?compress=1&resize=400x300'

    const fetchAdvertisements = () => {
        AdminService.getAdvertisementsForModeration(12, activePage - 1, 'createdAt')
            .then(response => {
                setAdvertisements(response.data.advertisements)
                setTotalCount(response.data.totalCount)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchAdvertisements()
    }, [activePage])

    let numbers = [];
    for (let number = 1; number <= Math.ceil(totalCount / 12); number++) {
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
        <Container>
            <Row>
                {
                    advertisements.length !== 0 ?
                        advertisements.map(advertisement => <Advertisement advertisement={advertisement}/>)
                        :
                        <Row className={'d-flex justify-content-center'}>
                            <Col className={'cow-12 d-flex justify-content-center'}>
                                <Image src={NO_RESULT_IMAGE} className={'img-fluid'}/>
                            </Col>
                        </Row>
                }
            </Row>
            <Row>
                <Col>
                    <Pagination className={'mx-auto'}>{numbers}</Pagination>
                </Col>
            </Row>
        </Container>
    );
};

export default ModerationPage;