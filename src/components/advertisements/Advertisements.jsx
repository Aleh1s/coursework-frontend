import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import AdvertisementService from "../../service/AdvertisementService";
import {Alert, Col, Container, Image, Pagination, Row, Spinner} from "react-bootstrap";
import SearchBlock from "../UI/SearchBlock";
import ModalCreateAdvertisement from "../modals/ModalCreateAdvertisement";
import Advertisement from "./Advertisement";

const Advertisements = ({category}) => {

    const navigate = useNavigate()
    const isAuthenticated = useSelector(state => state.isAuthenticated)
    const NO_RESULT_IMAGE = 'https://cdn.dribbble.com/users/1554526/screenshots/3399669/media/51c98501bc68499ed0220e1ba286eeaf.png?compress=1&resize=400x300'
    const [query, setQuery] = useState('')
    const [activePage, setActivePage] = useState(1)
    const [showSpinner, setShowSpinner] = useState(false)
    const [advertisements, setAdvertisements] = useState([])
    const [totalPagesCount, setTotalPageCount] = useState(0)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [notification, setNotification] = useState({
        show: false,
        message: ''
    })

    const handleShowCreateModal = () => {
        if (isAuthenticated) {
            setShowCreateModal(!showCreateModal)
        } else {
            navigate('/sign-in')
        }
    }

    const fetchAdvertisements = () => {
        setShowSpinner(true)
        AdvertisementService.getAll(activePage - 1, 12, category, 'createdAt', query)
            .then(response => {
                setAdvertisements(response.data.advertisements)
                setTotalPageCount(response.data.totalCount)
                window.scrollTo(0, 0)
                setShowSpinner(false)
            })
            .catch(err => console.log(err))
    }

    const onCreate = () => {
        setNotification({show: true, message: 'Advertisement will be posted after moderation'})
        window.location.reload()
    }

    useEffect(() => {
        fetchAdvertisements()
    }, [activePage])

    let numbers = [];
    for (let number = 1; number <= Math.ceil(totalPagesCount / 12); number++) {
        numbers.push(
            <Pagination.Item key={number} active={number === activePage} onClick={() => {
                setActivePage(number)
                window.scrollTo(0, 0)
            }}>
                {number}
            </Pagination.Item>
        );
    }

    return (
        <Container>
            <SearchBlock placeHolderText={`Search ${category.toLowerCase()}`} handleShowCreateModal={handleShowCreateModal}
                         handleSearch={fetchAdvertisements} setQuery={setQuery}/>
            {
                notification.show ?
                    <Alert key={'notification'} variant={'success'}>
                        {notification.message}
                    </Alert>
                    :
                    <></>
            }
            {showSpinner ?
                <Row className={'d-flex justify-content-center align-items-center my-4 mx-auto'}>
                    <Col className={'d-flex justify-content-center align-items-center my-auto'}>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Col>
                </Row>
                :
                <Row className={'d-flex justify-content-lg-start mx-auto justify-content-center'}>
                    {
                        advertisements.length !== 0 ? advertisements.map(
                                advertisement =>
                                    <Advertisement advertisement={advertisement}/>
                            ) :
                            <Row className={'d-flex justify-content-center'}>
                                <Col className={'cow-12 d-flex justify-content-center'}>
                                    <Image src={NO_RESULT_IMAGE} className={'img-fluid'}/>
                                </Col>
                            </Row>
                    }
                    <Row>
                        <Col>
                            <Pagination className={'mx-auto'}>{numbers}</Pagination>
                        </Col>
                    </Row>
                </Row>
            }
            <ModalCreateAdvertisement onCreate={onCreate} show={showCreateModal} handleClose={handleShowCreateModal}
                                      category={category}/>
        </Container>
    );
};

export default Advertisements;