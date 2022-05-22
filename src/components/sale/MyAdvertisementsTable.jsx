import React from 'react';
import {Container} from "react-bootstrap";
import MyAdvertisements from "./MyAdvertisements";

const MyAdvertisementsTable = ({sales, show, setShow, handleOrder}) => {

    return (
        <Container>
            <MyAdvertisements handleOrder={handleOrder} setShow={setShow} show={show} sales={sales}/>
        </Container>
    );
};

export default MyAdvertisementsTable;