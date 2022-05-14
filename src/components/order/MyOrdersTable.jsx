import React from 'react';
import {Container} from "react-bootstrap";
import Orders from "./Orders";

const MyOrdersTable = ({
                           orders,
                           setShowCancelOrderModal,
                           setShowMarkAsDeliveredModal
                       }) => {

    return (
        <Container>
            <Orders setShowMarkAsDeliveredModal={setShowMarkAsDeliveredModal}
                    setShowCancelOrderModal={setShowCancelOrderModal} orders={orders}/>
        </Container>
    );
};

export default MyOrdersTable;