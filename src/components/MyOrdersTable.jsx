import React, {useState} from 'react';
import {Col, Container, Row, Table} from "react-bootstrap";
import Orders from "./Orders";

const MyOrdersTable = ({orders}) => {

    const style = {
        backgroundColor: 'white',
        color: 'black'
    }



    return (
        <Container>
            <Orders orders={orders}/>
        </Container>
    );
};

export default MyOrdersTable;