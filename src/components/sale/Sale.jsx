import React from 'react';
import {Accordion, Col, Figure, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";

const Sale = ({sale, show, handleOrder}) => {

    const id = sale.uniqueId
    const dispatch = useDispatch()

    return (
        <Accordion.Item eventKey={sale.uniqueId}>
            <Accordion.Header>{sale.category} - {sale.title}</Accordion.Header>
            <Accordion.Body>
                <Row className={'d-flex justify-content-start align-items-start'}>
                    <Row>
                        <Col className={'col-12'}>
                            <Figure>
                                <Figure.Caption>
                                    Unique number: {sale.uniqueId}, created at: {sale.createdAt.substring(0, 10)}
                                </Figure.Caption>
                            </Figure>
                        </Col>
                        <Col className={'col-12'}>
                            <Figure>
                                <Figure.Caption>
                                    Creator info
                                </Figure.Caption>
                            </Figure>
                        </Col>
                        <Col className={'col-12'}>
                            <p style={{fontSize: '14px'}}>{sale.userResponseModel.email}</p>
                        </Col>
                        <Col className={'col-12'}>
                            <p style={{fontSize: '14px'}}>{sale.userResponseModel.firstName} {sale.userResponseModel.lastName}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <a className={'link-info'} onClick={() => handleOrder(id)}>Show orders</a>
                        </Col>
                    </Row>
                </Row>
            </Accordion.Body>
        </Accordion.Item>
    );
};

export default Sale;