import React from 'react';
import {Container} from "react-bootstrap";
import MyAdvertisements from "./MyAdvertisements";

const MyAdvertisementsTable = ({sales, show, setShow, handleOrder, handleRemove}) => {

    return (
        <Container>
            <MyAdvertisements handleRemove={handleRemove} handleOrder={handleOrder} setShow={setShow} show={show} sales={sales}/>
        </Container>
    );
};

export default MyAdvertisementsTable;