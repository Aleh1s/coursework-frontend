import React, {useEffect, useState} from 'react';
import {Container, Row} from "react-bootstrap";
import TabProfile from "../components/UI/TabProfile";
import UserInfoTab from "../components/UI/UserInfoTab";
import OrdersService from "../service/OrdersService";
import {useSelector} from "react-redux";
import AdvertisementService from "../service/AdvertisementService";
import ModalOrders from "../components/modals/ModalOrders";
import ProfileModal from "../components/modals/ProfileModal";
import AddProfileImageModal from "../components/modals/AddProfileImageModal";
import UserService from "../service/UserService";

const ProfilePage = () => {

    const user = useSelector(state => state.user)
    const myOrderId = useSelector(state => state.myOrderId)
    const advertisementOrderId = useSelector(state => state.myAdvertisementOrderId)
    const [showOrders, setShowOrders] = useState(false)
    const [showCancelOrderModal, setShowCancelOrderModal] = useState(false)
    const [showMarkAsDeliveredModal, setShowMarkAsDeliveredModal] = useState(false)
    const [myOrders, setMyOrders] = useState([])
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [showSentModal, setShowSentModal] = useState(false)
    const [showDeclineModal, setShowDeclineModal] = useState(false)
    const [myAdvertisements, setMyAdvertisements] = useState([])
    const [showAddProfileImage, setShowAddProfileImage] = useState(false)
    const [imageExists, setImageExists] = useState(false)
    const [advertisementsOrder, setAdvertisementsOrder] = useState([{
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
                setAdvertisementsOrder(response.data)
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
        OrdersService.cancelOrder(myOrderId)
            .then(() => {
                setShowCancelOrderModal(false)
                fetchOrders()
            })
            .catch(err => console.log(err))
    }

    const handleChangeDeliveryStatusDelivered = () => {
        OrdersService.changeDeliveryStatus(myOrderId, 'DELIVERED')
            .then(() => {
                setShowMarkAsDeliveredModal(false)
                fetchOrders()
            })
            .catch(err => console.log(err))
    }

    const handleChangeDeliveryStatusInRoad = () => {
        OrdersService.changeDeliveryStatus(advertisementOrderId, 'IN_ROAD')
            .then(() => {
                setShowSentModal(false)
                fetchAdvertisements()
            })
            .catch(err => console.log(err))
    }

    const fetchAdvertisements = () => {
        AdvertisementService.getAdvertisementByEmail()
            .then(response => {
                setMyAdvertisements(response.data)
            })
            .catch(err => console.log(err))
    }

    const handleConfirmOrder = () => {
        OrdersService.confirmOrder(advertisementOrderId)
            .then(() => {
                setShowConfirmModal(false)
                fetchOrders()
            })
            .catch(err => console.log(err))
    }

    const handleDeclineOrder = () => {
        OrdersService.declineOrder(advertisementOrderId)
            .then(() => {
                setShowDeclineModal(false)
                fetchOrders()
            })
            .catch(err => console.log(err))
    }

    const checkImage = () => {
        UserService.checkImage(user.email)
            .then(response => setImageExists(response.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        checkImage()
    }, [])

    const handleAddImage = (image) => {
        const data = new FormData()
        data.append('_image', image)
        UserService.addImage(data)
            .then(() => {
                setShowAddProfileImage(false)
                checkImage()
            })
            .catch(err => console.log(err))
    }

    return (
        <Container>
            <Row>
                <UserInfoTab imageStatus={imageExists} setAddProfileImageModal={setShowAddProfileImage} user={user}/>
                <TabProfile handleOrder={handleOrder} setShowOrdersModal={setShowOrders} showOrdersModal={showOrders}
                            setShowMarkAsDeliveredModal={setShowMarkAsDeliveredModal}
                            setShowCancelOrderModal={setShowCancelOrderModal} myOrders={myOrders}
                            sales={myAdvertisements}/>
            </Row>

            <AddProfileImageModal addImage={handleAddImage} show={showAddProfileImage} setShow={setShowAddProfileImage} />
            <ProfileModal title={'Cancel order ?'} body={'Do you want to cancel order ?'} action={handleCancelOrder}
                          show={showCancelOrderModal}
                          setShow={setShowCancelOrderModal}/>

            <ProfileModal title={'Mark as delivered?'} body={'Do you want to mark as delivered?'}
                          action={handleChangeDeliveryStatusDelivered} setShow={setShowMarkAsDeliveredModal}
                          show={showMarkAsDeliveredModal}/>

            <ProfileModal title={'Was parcel sent ?'} body={'Have you sent parcel ?'}
                          action={handleChangeDeliveryStatusInRoad}
                          setShow={setShowSentModal} show={showSentModal}/>

            <ProfileModal title={'Decline order ?'} body={'Do you want to decline order ?'} action={handleDeclineOrder}
                          setShow={setShowDeclineModal} show={showDeclineModal}/>

            <ProfileModal title={'Confirm order ?'} body={'Do you want to confirm order ?'} action={handleConfirmOrder}
                          setShow={setShowConfirmModal} show={showConfirmModal}/>

            <ModalOrders setShowSentModal={setShowSentModal} setShowDeclineModal={setShowDeclineModal}
                         setShowConfirmModal={setShowConfirmModal} orders={advertisementsOrder}
                         handleSetOrders={handleOrder} show={showOrders} setShow={setShowOrders}/>
        </Container>
    );
};

export default ProfilePage;