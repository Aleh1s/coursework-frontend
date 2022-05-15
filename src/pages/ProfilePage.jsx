import React, {useEffect, useState} from 'react';
import {Container, Row} from "react-bootstrap";
import TabProfile from "../components/UI/TabProfile";
import UserInfoTab from "../components/UI/UserInfoTab";
import CancelOrderModal from "../components/modals/CancelOrderModal";
import MarkAsDeliveredModal from "../components/modals/MarkAsDeliveredModal";
import OrdersService from "../service/OrdersService";
import {useSelector} from "react-redux";
import AdvertisementService from "../service/AdvertisementService";
import ModalOrders from "../components/modals/ModalOrders";

const ProfilePage = () => {

    const user = useSelector(state => state.user)
    const myOrderId = useSelector(state => state.myOrderId)
    const orderId = useSelector(state => state.orderId)
    const [showOrders, setShowOrders] = useState(false)
    const [showCancelOrderModal, setShowCancelOrderModal] = useState(false)
    const [showMarkAsDeliveredModal, setShowMarkAsDeliveredModal] = useState(false)
    const [myOrders, setMyOrders] = useState([])
    const [order, setOrder] = useState([{
        uniqueId: '',
        createdAt: '',
        orderStatus: '',
        wishes: '',
        deliveryEntity: {
            address: '',
            city: '',
            deliveryStatus: '',
            id: '',
            postOffice: ''
        },
        receiver: {
            email: '',
            firstName: '',
            lastName: '',
            phoneNumber: ''
        }
    }])

    const handleOrder = (id) => {
        OrdersService.getAllByAdvertisementId(id)
            .then(response => {
                setOrder(response.data)
                setShowOrders(true)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchOrders()
        fetchAdvertisements()
    }, [])

    const fetchOrders = () => {
        OrdersService.getAllByEmail()
            .then(response => setMyOrders(response.data))
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

    const fetchAdvertisements = () => {
        AdvertisementService.getAdvertisementByEmail()
            .then(response => {
                setSales(response.data)
                console.log(response)
            })
            .catch(err => console.log(err))
    }

    const [sales, setSales] = useState([])

    return (
        <Container>
            <Row>
                <UserInfoTab user={user}/>
                <TabProfile handleOrder={handleOrder} setShowOrdersModal={setShowOrders} showOrdersModal={showOrders} setShowMarkAsDeliveredModal={setShowMarkAsDeliveredModal}
                            setShowCancelOrderModal={setShowCancelOrderModal} orders={myOrders} sales={sales}/>
            </Row>
            <CancelOrderModal handleCancelOrder={handleCancelOrder} show={showCancelOrderModal}
                              setShow={setShowCancelOrderModal}/>
            <MarkAsDeliveredModal handleMarkAsDelivered={handleMarkAsDelivered} setShow={setShowMarkAsDeliveredModal}
                                  show={showMarkAsDeliveredModal}/>
            <ModalOrders orders={order} handleSetOrders={handleOrder} show={showOrders} setShow={setShowOrders}/>
        </Container>
    );
};

export default ProfilePage;