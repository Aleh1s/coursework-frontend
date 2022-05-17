import React from 'react';
import {Accordion, Row} from "react-bootstrap";
import MyOrder from "./MyOrder";

const MyOrders = ({myOrders, setShowCancelOrderModal, setShowMarkAsDeliveredModal}) => {
    return (
        <Row>
            <Accordion>
                {
                    myOrders ? myOrders.map(order =>
                        <MyOrder
                            setShowCancelOrderModal={setShowCancelOrderModal}
                            setShowMarkAsDeliveredModal={setShowMarkAsDeliveredModal} order={order}/>
                    ) : <p className={'h3'} align={'center'} style={{color: 'white'}}>No orders</p>
                }
            </Accordion>
        </Row>
    );
};

export default MyOrders;