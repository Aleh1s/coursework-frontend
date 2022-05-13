import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import Orders from "./Orders";
import OrdersService from "../../service/OrdersService";

const MyOrdersTable = () => {

    const [orders, setOrders] = useState([])

    useEffect(() => {
        OrdersService.getAllByEmail()
            .then(response => setOrders(response.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <Container>
            <Orders orders={orders}/>
        </Container>
    );
};

export default MyOrdersTable;