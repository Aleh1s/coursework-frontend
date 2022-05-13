import React, {useState} from 'react';
import {Container, Row} from "react-bootstrap";
import TabProfile from "../components/UI/TabProfile";
import UserInfoTab from "../components/UI/UserInfoTab";

const ProfilePage = () => {

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
                <TabProfile sales={sales}/>
            </Row>
        </Container>
    );
};

export default ProfilePage;