import React from 'react';
import {Accordion, Col, Image, Row} from "react-bootstrap";
import MyOrder from "./MyOrder";

const MyOrders = ({myOrders, setShowCancelOrderModal, setShowMarkAsDeliveredModal}) => {

    const noResultImage = 'https://cdn.dribbble.com/users/1554526/screenshots/3399669/media/51c98501bc68499ed0220e1ba286eeaf.png?compress=1&resize=400x300'

    return (
        <Row>
            <Accordion>
                {
                    myOrders.length !== 0 ? myOrders.map(order =>
                        <MyOrder
                            setShowCancelOrderModal={setShowCancelOrderModal}
                            setShowMarkAsDeliveredModal={setShowMarkAsDeliveredModal} order={order}/>
                    ) :
                        <Row className={'d-flex justify-content-center'}>
                            <Col className={'cow-12 d-flex justify-content-center'}>
                                <Image src={noResultImage} className={'img-fluid'}/>
                            </Col>
                        </Row>
                }
            </Accordion>
        </Row>
    );
};

export default MyOrders;