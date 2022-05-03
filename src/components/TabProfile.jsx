import React from 'react';
import {Col, Tab, Tabs} from "react-bootstrap";
import MyOrdersTable from "./MyOrdersTable";
import MySalesTable from "./MySalesTable";

const TabProfile = ({orders, sales}) => {
    return (
        <Col className={'col-lg-7 col-12  mx-auto'}>
            <Tabs defaultActiveKey="my-orders" id="uncontrolled-tab-example" className="mb-3 justify-content-center">
                <Tab  eventKey="my-orders" title="My orders">
                    <MyOrdersTable orders={orders}/>
                </Tab>
                <Tab eventKey="my-sales" title="My sales">
                    <MySalesTable sales={sales}/>
                </Tab>
            </Tabs>
        </Col>
    );
};

export default TabProfile;