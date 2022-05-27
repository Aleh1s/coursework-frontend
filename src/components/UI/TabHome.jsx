import React from 'react';
import {Col, Container, Row, Tabs} from "react-bootstrap";
import Advertisements from "../advertisements/Advertisements";

const TabHome = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <Tabs defaultActiveKey="items" id="uncontrolled-tab-example"
                          className="mb-3 justify-content-center ">
                        <TabHome eventKey="items" title="Items">
                            <Advertisements category={'ITEM'}/>
                        </TabHome>
                        <TabHome eventKey="services" title="Services">
                            <Advertisements category={'SERVICE'}/>
                        </TabHome>
                        <TabHome eventKey="houses" title="Houses">
                            <Advertisements category={'HOUSE'}/>
                        </TabHome>
                    </Tabs>
                </Col>
            </Row>
        </Container>
    );
};

export default TabHome;