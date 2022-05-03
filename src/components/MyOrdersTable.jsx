import React, {useState} from 'react';
import {Col, Container, Row, Table} from "react-bootstrap";
import Orders from "./Orders";

const MyOrdersTable = () => {

    const style = {
        backgroundColor: 'white',
        color: 'black'
    }

    const [orders, setOrders] = useState([{
        id: '1',
        category: 'ITEM',
        name: 'Iphone',
        sender: 'Bob@gmail.com',
        city: 'Manchester',
        status: 'SOLD_OUT'
    },
        {
            id: '2',
            category: 'SERVICE',
            name: 'Haircut',
            sender: 'Alice@gmail.com',
            city: 'London',
            status: 'SOLD_OUT'
        },
        {
            id: '3',
            category: 'HOUSE',
            name: 'House in Gdansk',
            sender: 'Alex@gmail.com',
            city: 'Gdansk',
            status: 'SOLD_OUT'
        }])

    return (
        <Container>
            <Orders orders={orders}/>
        </Container>
    );
};

export default MyOrdersTable;