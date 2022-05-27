import React, {useEffect, useState} from 'react';
import {Alert, Col, Container, Row, Tab, Tabs} from "react-bootstrap";
import UserInfoTab from "../components/UI/UserInfoTab";
import OrdersService from "../service/OrdersService";
import {useDispatch, useSelector} from "react-redux";
import AdvertisementService from "../service/AdvertisementService";
import ModalOrders from "../components/modals/ModalOrders";
import AcceptEventModal from "../components/modals/AcceptEventModal";
import AddProfileImageModal from "../components/modals/AddProfileImageModal";
import ImageService from "../service/ImageService";
import MyPurchases from "../components/order/MyPurchases";
import MyAdvertisements from "../components/sale/MyAdvertisements";

const ProfilePage = () => {

    const user = useSelector(state => state.user)
    const [currentAdvertisementId, setCurrentAdvertisementId] = useState('')
    const myOrderId = useSelector(state => state.id.myOrder)
    const myPurchaseId = useSelector(state => state.id.myPurchase)
    const advertisementToRemove = useSelector(state => state.id.advertisement)

    const [showOrders, setShowOrders] = useState(false)
    const [imageExists, setImageExists] = useState(false)
    const [showSentModal, setShowSentModal] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [showDeclineModal, setShowDeclineModal] = useState(false)
    const [showAddProfileImage, setShowAddProfileImage] = useState(false)
    const [showCancelOrderModal, setShowCancelOrderModal] = useState(false)
    const [showRemoveAdvertisement, setShowRemoveAdvertisement] = useState(false)
    const [showMarkAsDeliveredModal, setShowMarkAsDeliveredModal] = useState(false)

    const [myAdvertisements, setMyAdvertisements] = useState([])
    const [totalMyAdvertisements, setTotalMyAdvertisements] = useState(0)
    const [activeMyAdvertisementsPage, setActiveMyAdvertisementsPage] = useState(1)

    const [myOrders, setMyOrders] = useState([])
    const [totalMyOrders, setTotalMyOrders] = useState(0)
    const [activeMyOrdersPage, setActiveMyOrdersPage] = useState(1)

    const [myPurchases, setMyPurchases] = useState([])
    const [totalMyPurchases, setTotalMyPurchases] = useState(0)
    const [activeMyPurchasesPage, setActiveMyPurchasesPage] = useState(1)

    const [error, setError] = useState({
        show: false,
        message: ''
    })

    const fetchPurchases = () => {
        OrdersService.getAllByUserEmail(user.email, 10, activeMyPurchasesPage - 1, 'createdAt')
            .then(response => {
                setMyPurchases(response.data.orders)
                setTotalMyPurchases(response.data.totalCount)
            })
            .catch(err => console.log(err))
    }

    useState(() => {
        fetchPurchases()
    }, [activeMyPurchasesPage])

    const handleShowOrders = (id) => {
        setCurrentAdvertisementId(id)
        fetchOrders(id)
    }

    const fetchOrders = (id) => {
        if (id !== '') {
            OrdersService.getAllByAdvertisementId(id, 10, activeMyOrdersPage - 1, 'createdAt')
                .then(response => {
                    setMyOrders(response.data.orderDetails)
                    setTotalMyOrders(response.data.totalCount)
                })
                .catch(err => console.log(err))
        }
    }

    useState(() => {
        if (currentAdvertisementId !== '') {
            fetchOrders(currentAdvertisementId)
        }
    }, [activeMyOrdersPage])

    const fetchAdvertisements = () => {
        AdvertisementService.getAdvertisementsByEmail(user.email, 10, 'createdAt', activeMyAdvertisementsPage - 1)
            .then(response => {
                setMyAdvertisements(response.data.advertisements)
                setTotalMyAdvertisements(response.data.totalCount)
            })
            .catch(err => console.log(err))
    }

    useState(() => {
        fetchAdvertisements()
    }, [activeMyAdvertisementsPage])

    const handleCancelPurchase = () => {
        OrdersService.cancelOrder(myPurchaseId)
            .then(() => {
                setShowCancelOrderModal(false)
                fetchPurchases()
            })
            .catch(err => console.log(err))
    }

    const handleChangeDeliveryStatusOfPurchaseDelivered = () => {
        changeDeliveryStatusOfPurchase(myPurchaseId, 'DELIVERED')
    }

    const handleChangeDeliveryStatusOfMyOrderInRoad = () => {
        changeDeliveryStatusOfPurchase(myOrderId, 'IN_ROAD')
    }

    const changeDeliveryStatusOfPurchase = (id, status) => {
        OrdersService.changeDeliveryStatus(id, status)
            .then(() => {
                setShowSentModal(false)
                fetchAdvertisements()
            })
            .catch(err => console.log(err))
    }

    const handleConfirmOrder = () => {
        OrdersService.confirmOrder(myOrderId)
            .then(() => {
                setShowConfirmModal(false)
                fetchOrders(currentAdvertisementId)
            })
            .catch(err => console.log(err))
    }

    const handleDeclineOrder = () => {
        OrdersService.declineOrder(myOrderId)
            .then(() => {
                setShowDeclineModal(false)
                fetchOrders(currentAdvertisementId)
            })
            .catch(err => console.log(err))
    }

    const checkImage = () => {
        ImageService.userProfileImageExists(user.email)
            .then(response => setImageExists(response.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        checkImage()
    }, [])

    const handleAddImage = (image) => {
        const data = new FormData()
        data.append('_image', image)
        ImageService.addUserProfileImage(data)
            .then(() => {
                setShowAddProfileImage(false)
                checkImage()
            })
            .catch(err => console.log(err))
    }

    const removeAdvertisement = () => {
        AdvertisementService.removeAdvertisementById(advertisementToRemove)
            .then(() => {
                setShowRemoveAdvertisement(false)
                fetchAdvertisements()
            })
            .catch(err => {
                setShowRemoveAdvertisement(false)
                window.scrollTo(0, 0)
                setError({show: true, message: err.response.data.message})
            })
    }

    return (
        <Container>
            <Row>
                {
                    error.show ?
                        <Col className={'col-12'}>
                            <Alert key={'danger'} variant={'danger'}>
                                {error.message}
                            </Alert>
                        </Col>
                        :
                        <></>
                }
                <UserInfoTab imageExists={imageExists} setAddProfileImageModal={setShowAddProfileImage} user={user}/>

                <Col className={'col-lg-7 col-12 mx-auto my-4'}>
                    <Tabs defaultActiveKey="my-orders" id="uncontrolled-tab-example"
                          className="mb-3 justify-content-center">
                        <Tab eventKey="my-purchases" title="My purchases">
                            <MyPurchases setShowMarkAsDeliveredModal={setShowMarkAsDeliveredModal}
                                         setShowCancelOrderModal={setShowCancelOrderModal}
                                         activePage={activeMyPurchasesPage}
                                         setActivePage={setActiveMyPurchasesPage} myPurchases={myPurchases}
                                         totalCount={totalMyPurchases}
                            />
                        </Tab>
                        <Tab eventKey="my-sales" title="My advertisements">
                            <MyAdvertisements totalCount={totalMyAdvertisements} activePage={activeMyAdvertisementsPage}
                                              setActivePage={setActiveMyAdvertisementsPage}
                                              myAdvertisements={myAdvertisements}
                                              setShowOrders={setShowOrders}
                                              setShowRemove={setShowRemoveAdvertisement}
                                              handleShowOrders={handleShowOrders}
                            />
                        </Tab>
                    </Tabs>
                </Col>
            </Row>

            <AddProfileImageModal addImage={handleAddImage} show={showAddProfileImage}
                                  setShow={setShowAddProfileImage}/>

            <AcceptEventModal title={'Remove advertisement ?'} body={'Do you want to remove advertisement ?'}
                              action={removeAdvertisement}
                              show={showRemoveAdvertisement}
                              setShow={setShowRemoveAdvertisement}/>

            <AcceptEventModal title={'Cancel order ?'} body={'Do you want to cancel order ?'}
                              action={handleCancelPurchase}
                              show={showCancelOrderModal}
                              setShow={setShowCancelOrderModal}/>

            <AcceptEventModal title={'Mark as delivered?'} body={'Do you want to mark as delivered?'}
                              action={handleChangeDeliveryStatusOfPurchaseDelivered}
                              setShow={setShowMarkAsDeliveredModal}
                              show={showMarkAsDeliveredModal}/>

            <AcceptEventModal title={'Was parcel sent ?'} body={'Have you sent parcel ?'}
                              action={handleChangeDeliveryStatusOfMyOrderInRoad}
                              setShow={setShowSentModal} show={showSentModal}/>

            <AcceptEventModal title={'Decline order ?'} body={'Do you want to decline order ?'}
                              action={handleDeclineOrder}
                              setShow={setShowDeclineModal} show={showDeclineModal}/>

            <AcceptEventModal title={'Confirm order ?'} body={'Do you want to confirm order ?'}
                              action={handleConfirmOrder}
                              setShow={setShowConfirmModal} show={showConfirmModal}/>

            <ModalOrders setShowSentModal={setShowSentModal} setShowDeclineModal={setShowDeclineModal}
                         setShowConfirmModal={setShowConfirmModal}
                         show={showOrders} setShow={setShowOrders}
                         setActivePage={setActiveMyOrdersPage} activePage={activeMyOrdersPage}
                         totalCount={totalMyOrders} myOrders={myOrders}
            />
        </Container>
    );
};

export default ProfilePage;