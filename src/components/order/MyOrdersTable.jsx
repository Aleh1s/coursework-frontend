import React from 'react';
import {Container} from "react-bootstrap";
import MyPurchases from "./MyPurchases";

const MyOrdersTable = ({
                           myOrders,
                           setShowCancelOrderModal,
                           setShowMarkAsDeliveredModal,
                           numbers
                       }) => {

    return (
        <Container>
            <MyPurchases numbers={numbers} setShowMarkAsDeliveredModal={setShowMarkAsDeliveredModal}
                         setShowCancelOrderModal={setShowCancelOrderModal} myOrders={myOrders}/>
        </Container>
    );
};

export default MyOrdersTable;