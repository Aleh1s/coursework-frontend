import React from 'react';
import {Accordion, Col, Image, Pagination, Row} from "react-bootstrap";
import MyAdvertisement from "./MyAdvertisement";

const MyAdvertisements = ({
                              myAdvertisements,
                              setActivePage,
                              activePage,
                              totalCount,
                              setShowOrders,
                              setShowRemove,
                              handleShowOrders
                          }) => {

    const NO_RESULT_IMAGE = 'https://cdn.dribbble.com/users/1554526/screenshots/3399669/media/51c98501bc68499ed0220e1ba286eeaf.png?compress=1&resize=400x300'

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
                    myAdvertisements.length !== 0 ? myAdvertisements.map(advertisement =>
                            <MyAdvertisement handleShowOrders={handleShowOrders} advertisement={advertisement}
                                             setShowRemove={setShowRemove}
                                             setShowOrders={setShowOrders}/>
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