import React from 'react';
import {Container} from "react-bootstrap";
import Sales from "./Sales";

const MySalesTable = ({sales, show, setShow, handleOrder}) => {

    return (
        <Container>
            <Sales handleOrder={handleOrder} setShow={setShow} show={show} sales={sales}/>
        </Container>
    );
};

export default MySalesTable;