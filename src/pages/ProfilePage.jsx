import React, {useEffect, useState} from 'react';
import {Container, Row} from "react-bootstrap";
import TabProfile from "../components/UI/TabProfile";
import UserInfoTab from "../components/UI/UserInfoTab";
import CancelOrderModal from "../components/modals/CancelOrderModal";
import MarkAsDeliveredModal from "../components/modals/MarkAsDeliveredModal";
import OrdersService from "../service/OrdersService";
import {useSelector} from "react-redux";

const ProfilePage = () => {

    const orderId = useSelector(state => state.orderId)
    const user = useSelector(state => state.user)
    const [showCancelOrderModal, setShowCancelOrderModal] = useState(false)
    const [showMarkAsDeliveredModal, setShowMarkAsDeliveredModal] = useState(false)
    const [orders, setOrders] = useState()

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = () => {
        OrdersService.getAllByEmail()
            .then(response => setOrders(response.data))
            .catch(err => console.log(err))
    }

    const handleCancelOrder = () => {
        OrdersService.cancelOrder(orderId)
            .then(() => {
                setShowCancelOrderModal(false)
                fetchOrders()
            })
            .catch(err => console.log(err))
    }

    const handleMarkAsDelivered = () => {
        OrdersService.changeDeliveryStatus(orderId, 'DELIVERED')
            .then(() => {
                setShowMarkAsDeliveredModal(false)
                fetchOrders()
            })
            .catch(err => console.log(err))
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
            <Row>
                <UserInfoTab user={user}/>
                <TabProfile setShowMarkAsDeliveredModal={setShowMarkAsDeliveredModal}
                            setShowCancelOrderModal={setShowCancelOrderModal} orders={orders} sales={sales}/>
            </Row>
            <CancelOrderModal handleCancelOrder={handleCancelOrder} show={showCancelOrderModal}
                              setShow={setShowCancelOrderModal}/>
            <MarkAsDeliveredModal handleMarkAsDelivered={handleMarkAsDelivered} setShow={setShowMarkAsDeliveredModal}
                                  show={showMarkAsDeliveredModal}/>
        </Container>
    );
};

export default ProfilePage;