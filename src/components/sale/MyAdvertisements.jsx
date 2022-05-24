import React from 'react';
import {Accordion, Col, Image, Row} from "react-bootstrap";
import MyAdvertisement from "./MyAdvertisement";

const MyAdvertisements = ({sales, show, setShow, handleOrder, handleRemove}) => {

    const noResultImage = 'https://cdn.dribbble.com/users/1554526/screenshots/3399669/media/51c98501bc68499ed0220e1ba286eeaf.png?compress=1&resize=400x300'

    return (
        <Accordion>
            {
                sales.length !== 0 ? sales.map(sale =>
                    <MyAdvertisement handleRemove={handleRemove} handleOrder={handleOrder} sale={sale} show={show} setShow={setShow}/>
                ) :
                    <Row className={'d-flex justify-content-center'}>
                        <Col className={'cow-12 d-flex justify-content-center'}>
                            <Image src={noResultImage} className={'img-fluid'}/>
                        </Col>
                    </Row>

            }
        </Accordion>
    );
};

export default MyAdvertisements;