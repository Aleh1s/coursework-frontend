import React, {useState} from 'react';
import {Card, Col, Container, Row, Table} from "react-bootstrap";
import Sales from "./Sales";

const MySalesTable = ({sales}) => {

    const style = {
        backgroundColor: 'white',
        color: 'black'
    }

    return (
        <Container>
            <Sales sales={sales}/>
        </Container>
    );
};

export default MySalesTable;