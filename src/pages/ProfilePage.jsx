import React, {useState} from 'react';
import {Col, Container, Image, Row} from "react-bootstrap";
import TabProfile from "../components/TabProfile";
import UserInfoTab from "../components/UserInfoTab";

const ProfilePage = () => {

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
            <Row>
                <UserInfoTab />
                <TabProfile orders={orders} sales={sales}/>
            </Row>
        </Container>
    );
};

export default ProfilePage;