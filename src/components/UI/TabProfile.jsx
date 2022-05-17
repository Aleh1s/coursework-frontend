import React from 'react';
import {Col, Tab, Tabs} from "react-bootstrap";
import MyOrdersTable from "../order/MyOrdersTable";
import MySalesTable from "../sale/MySalesTable";

const TabProfile = ({
                        myOrders,
                        sales,
                        setShowCancelOrderModal,
                        setShowMarkAsDeliveredModal,
                        setShowOrdersModal,
                        showOrdersModal,
                        handleOrder
                    }) => {
    return (
        <Col className={'col-lg-7 col-12 mx-auto my-4'}>
            <Tabs defaultActiveKey="my-orders" id="uncontrolled-tab-example" className="mb-3 justify-content-center">
                <Tab eventKey="my-orders" title="My orders">
                    <MyOrdersTable
                        setShowCancelOrderModal={setShowCancelOrderModal}
                        setShowMarkAsDeliveredModal={setShowMarkAsDeliveredModal}
                        myOrders={myOrders}/>
                </Tab>
                <Tab eventKey="my-sales" title="My advertisements">
                    <MySalesTable handleOrder={handleOrder} sales={sales} show={showOrdersModal} setShow={setShowOrdersModal}/>
                </Tab>
            </Tabs>
        </Col>
    );
};

export default TabProfile;