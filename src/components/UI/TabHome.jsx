import React from 'react';
import {Col, Container, Row, Tabs} from "react-bootstrap";
import Items from "../item/Items";
import Services from "../service/Services";
import HouseAdvertisements from "../houseAdv/HouseAdvertisements";

const TabHome = () => {

    return (
        <Container>
            <Row>
                <Col>
                    <Tabs defaultActiveKey="items" id="uncontrolled-tab-example"
                          className="mb-3 justify-content-center ">
                        <TabHome eventKey="items" title="Items">
                            <Items />
                        </TabHome>
                        <TabHome eventKey="services" title="Services">
                            <Services />
                        </TabHome>
                        <TabHome eventKey="houses" title="Houses">
                            <HouseAdvertisements />
                        </TabHome>
                    </Tabs>
                </Col>
            </Row>
        </Container>
    );
};

export default TabHome;