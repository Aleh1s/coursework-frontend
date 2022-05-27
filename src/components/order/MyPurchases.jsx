import React, {useEffect, useState} from 'react';
import {Accordion, Col, Image, Pagination, Row} from "react-bootstrap";
import MyPurchase from "./MyPurchase";
import OrdersService from "../../service/OrdersService";

const MyPurchases = ({user}) => {

    const [myPurchases, setMyPurchases] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [activePage, setActivePage] = useState(1)

    const NO_RESULT_IMAGE = 'https://cdn.dribbble.com/users/1554526/screenshots/3399669/media/51c98501bc68499ed0220e1ba286eeaf.png?compress=1&resize=400x300'

    const fetchPurchases = () => {
        OrdersService.getAllByUserEmail(user.email, 10, activePage - 1, 'createdAt')
            .then(response => {
                setMyPurchases(response.data.orders)
                setTotalCount(response.data.totalCount)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchPurchases()
    }, [activePage])

    let numbers = [];
    for (let number = 1; number <= Math.ceil(totalCount / 10); number++) {
        numbers.push(
            <Pagination.Item key={number} active={number === activePage} onClick={() => setActivePage(number)}>
                {number}
            </Pagination.Item>
        );
    }

    return (
        <Row>
            <Accordion>
                {
                    myPurchases.length !== 0 ? myPurchases.map(purchase =>
                            <MyPurchase fetchPurchases={fetchPurchases} purchase={purchase}/>
                        ) :
                        <Row className={'d-flex justify-content-center'}>
                            <Col className={'cow-12 d-flex justify-content-center'}>
                                <Image src={NO_RESULT_IMAGE} className={'img-fluid'}/>
                            </Col>
                        </Row>
                }
            </Accordion>
            <Row>
                <Col>
                    <Pagination className={'mx-auto'}>{numbers}</Pagination>
                </Col>
            </Row>
        </Row>
    );
};

export default MyPurchases;