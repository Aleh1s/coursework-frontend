import React from 'react';
import {Tab, Tabs} from "react-bootstrap";
import MyOrdersTable from "./MyOrdersTable";
import MySalesTable from "./MySalesTable";

const TabProfile = () => {
    return (
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3 justify-content-center">
            <Tab eventKey="my-orders" title="My orders">
                <MyOrdersTable />
            </Tab>
            <Tab eventKey="my-sales" title="My sales">
                <MySalesTable />
            </Tab>
        </Tabs>
    );
};

export default TabProfile;