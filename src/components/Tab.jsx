import React from 'react';
import {Tabs} from "react-bootstrap";
import Items from "./Items";

const Tab = ({items}) => {
    return (
        <Tabs defaultActiveKey="items" id="uncontrolled-tab-example" className="mb-3 justify-content-center ">
            <Tab eventKey="items" title="Items">
                <Items items={items}/>
            </Tab>
            <Tab eventKey="services" title="Services">

            </Tab>
            <Tab eventKey="houses" title="Houses">

            </Tab>
        </Tabs>
    );
};

export default Tab;