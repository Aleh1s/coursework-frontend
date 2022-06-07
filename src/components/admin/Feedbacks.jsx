import React, {useEffect, useState} from 'react';
import AdminService from "../../service/AdminService";
import {Col, Container, Image, Pagination, Row} from "react-bootstrap";
import Feedback from "./Feedback";

const Feedbacks = () => {

    const [feedbacks, setFeedbacks] = useState([])
    const [activePage, setActivePage] = useState(1)
    const [totalCount, setTotalCount] = useState(0)
    const NO_RESULT_IMAGE = 'https://cdn.dribbble.com/users/1554526/screenshots/3399669/media/51c98501bc68499ed0220e1ba286eeaf.png?compress=1&resize=400x300'

    const fetchFeedbacks = () => {
        AdminService.getFeedbacks(12, activePage - 1, 'createdAt')
            .then(response => {
                setFeedbacks(response.data.feedbacks)
                setTotalCount(response.data.count)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchFeedbacks()
    }, [activePage])

    let numbers = [];
    for (let number = 1; number <= Math.ceil(totalCount / 10)   ; number++) {
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
            {
                feedbacks.length !== 0 ? feedbacks.map(feedback =>
                        <Feedback feedback={feedback}/>
                    ) :
                    <Row className={'d-flex justify-content-center'}>
                        <Col className={'cow-12 d-flex justify-content-center'}>
                            <Image src={NO_RESULT_IMAGE} className={'img-fluid'}/>
                        </Col>
                    </Row>
            }
            <Row className={'my-2'}>
                <Col>
                    <Pagination className={'mx-auto'}>{numbers}</Pagination>
                </Col>
            </Row>
        </Container>
    );
};

export default Feedbacks;