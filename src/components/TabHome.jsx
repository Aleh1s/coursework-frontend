import React from 'react';
import {Tabs} from "react-bootstrap";
import Items from "./Items";
import Services from "./Services";

const TabHome = ({items, services}) => {
    return (
        <Tabs defaultActiveKey="items" id="uncontrolled-tab-example" className="mb-3 justify-content-center ">
            <TabHome eventKey="items" title="Items">
                <Items items={items}/>
            </TabHome>
            <TabHome eventKey="services" title="Services">
                <Services services={services}/>
            </TabHome>
            <TabHome eventKey="houses" title="Houses">

            </TabHome>
        </Tabs>
    );
};

export default TabHome;