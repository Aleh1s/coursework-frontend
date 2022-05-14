import React from 'react';
import {Col, Tab, Tabs} from "react-bootstrap";
import MyOrdersTable from "../order/MyOrdersTable";
import MySalesTable from "../sale/MySalesTable";

const TabProfile = ({
                        orders,
                        sales,
                        setShowCancelOrderModal,
                        setShowMarkAsDeliveredModal
                    }) => {
    return (
        <Col className={'col-lg-7 col-12 mx-auto my-4'}>
            <Tabs defaultActiveKey="my-orders" id="uncontrolled-tab-example" className="mb-3 justify-content-center">
                <Tab eventKey="my-orders" title="My orders">
                    <MyOrdersTable
                        setShowCancelOrderModal={setShowCancelOrderModal}
                        setShowMarkAsDeliveredModal={setShowMarkAsDeliveredModal} orders={orders}/>
                </Tab>
                <Tab eventKey="my-sales" title="My sales">
                    <MySalesTable sales={sales}/>
                </Tab>
            </Tabs>
        </Col>
    );
};

export default TabProfile;