import React from 'react';
import {Accordion, Button, Col, Figure, Image, Row} from "react-bootstrap";
import {API_URL} from "../../http";

const MyAdvertisement = ({sale, handleOrder, handleRemove}) => {

    const id = sale.uniqueId

    return (
        <Accordion.Item eventKey={sale.uniqueId}>
            <Accordion.Header>
                <Row className={'d-flex justify-content-between align-items-center'}>
                    <Col className={'col-3'}>
                        <Image className={'img-thumbnail'} src={`${API_URL}/v1/advertisements/image?_id=${sale.uniqueId}`}/>
                    </Col>
                    <Col className={'col-9'}>
                        {sale.category} - {sale.title}
                    </Col>
                </Row>
            </Accordion.Header>
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
                    <Row className={'d-flex justify-content-center align-items-center'}>
                        <Col className={'d-flex justify-content-between align-items-center'}>
                            <a className={'link-info'} onClick={() => handleOrder(id)}>Show orders</a>
                            <Button variant={'danger'} onClick={() => handleRemove(id)}>Remove</Button>
                        </Col>
                    </Row>
                </Row>
            </Accordion.Body>
        </Accordion.Item>
    );
};

export default MyAdvertisement;