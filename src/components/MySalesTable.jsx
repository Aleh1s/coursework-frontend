import React, {useState} from 'react';
import {Card, Col, Container, Row, Table} from "react-bootstrap";
import Sales from "./Sales";

const MySalesTable = () => {

    const style = {
        backgroundColor: 'white',
        color: 'black'
    }

    const [sales, setSales] = useState([{
        id: '1',
        category: 'ITEM',
        name: 'Iphone',
        receiver: 'Bob@gmail.com',
        city: 'Manchester',
        status: 'SOLD_OUT'
    },
        {
            id: '2',
            category: 'SERVICE',
            name: 'Haircut',
            receiver: '',
            city: 'London',
            status: 'FOR_SALE'
        },
        {
            id: '3',
            category: 'HOUSE',
            name: 'House in Gdansk',
            receiver: 'Alex@gmail.com',
            city: 'Gdansk',
            status: 'SOLD_OUT'
        }])

    return (
        <Container>
            <Sales sales={sales}/>
        </Container>
    );
};

export default MySalesTable;