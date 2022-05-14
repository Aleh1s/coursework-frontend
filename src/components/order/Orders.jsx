import React from 'react';
import {Accordion, Row} from "react-bootstrap";
import Order from "./Order";

const Orders = ({orders, setShowCancelOrderModal, setShowMarkAsDeliveredModal}) => {
    return (
        <Row>
            <Accordion>
                {
                    orders ? orders.map(order =>
                        <Order
                            setShowCancelOrderModal={setShowCancelOrderModal}
                            setShowMarkAsDeliveredModal={setShowMarkAsDeliveredModal} order={order}/>
                    ) : <p className={'h3'} align={'center'} style={{color: 'white'}}>No orders</p>
                }
            </Accordion>
        </Row>
    );
};

export default Orders;