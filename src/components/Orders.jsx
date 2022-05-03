import React from 'react';
import {Row} from "react-bootstrap";
import Order from "./Order";

const Orders = ({orders}) => {
    return (
        <Row>
            {
                orders ? orders.map(order =>
                    <Order order={order} />
                ) : <p className={'h3'} align={'center'} style={{color: 'white'}}>No orders</p>
            }
        </Row>
    );
};

export default Orders;