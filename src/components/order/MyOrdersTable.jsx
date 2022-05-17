import React from 'react';
import {Container} from "react-bootstrap";
import MyOrders from "./MyOrders";

const MyOrdersTable = ({
                           myOrders,
                           setShowCancelOrderModal,
                           setShowMarkAsDeliveredModal
                       }) => {

    return (
        <Container>
            <MyOrders setShowMarkAsDeliveredModal={setShowMarkAsDeliveredModal}
                      setShowCancelOrderModal={setShowCancelOrderModal} myOrders={myOrders}/>
        </Container>
    );
};

export default MyOrdersTable;