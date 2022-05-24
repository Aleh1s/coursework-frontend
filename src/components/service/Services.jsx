import React, {useEffect, useState} from 'react';
import {Col, Container, Image, Pagination, Row, Spinner} from "react-bootstrap";
import Service from "./Service";
import SearchBlock from "../UI/SearchBlock";
import AdvertisementService from "../../service/AdvertisementService";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import ModalCreateAdvertisement from "../modals/ModalCreateAdvertisement";

const Services = () => {

    const isAuthenticated = useSelector(state => state.isAuthenticated)
    const [showSpinner, setShowSpinner] = useState(false)
    const [services, setServices] = useState([])
    const [totalPagesCount, setTotalPagesCount] = useState(0)
    const [activePage, setActivePage] = useState(1)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [query, setQuery] = useState('')
    const [queryFlag, setQueryFlag] = useState(false)
    const noResultImage = 'https://cdn.dribbble.com/users/1554526/screenshots/3399669/media/51c98501bc68499ed0220e1ba286eeaf.png?compress=1&resize=400x300'
    const [currentQuery, setCurrentQuery] = useState('')
    const navigate = useNavigate()

    const handleShowCreateModal = () => {
        if (isAuthenticated) {
            setShowCreateModal(!showCreateModal)
        } else {
            navigate('/sign-in')
        }
    }

    let numbers = [];
    for (let number = 1; number <= Math.ceil(totalPagesCount / 12); number++) {
        numbers.push(
            <Pagination.Item key={number} active={number === activePage} onClick={() => setActivePage(number)}>
                {number}
            </Pagination.Item>,
        );
    }

    const fetchAdvertisements = () => {
        setShowSpinner(true)
        AdvertisementService.getPageOfSortedAdvertisements(activePage - 1, 12, 'SERVICE', 'createdAt')
            .then(response => {
                setServices(response.data.advertisements)
                setTotalPagesCount(response.data.totalCount)
                setShowSpinner(false)
            })
            .catch(err => console.log(err))
    }

    const fetchAdvertisementsByQuery = () => {
        setShowSpinner(true)
        AdvertisementService.getAdvertisementByQuery(query, activePage - 1, 12, 'SERVICE', 'createdAt')
            .then(response => {
                setQueryFlag(true)
                setServices(response.data.advertisements)
                setTotalPagesCount(response.data.totalCount)
                setShowSpinner(false)
            })
            .catch(err => console.log(err))
        setCurrentQuery(query)
    }

    const handleFetchAdvertisementsByQuery = () => {
        switch (query) {
            case currentQuery:
                fetchAdvertisementsByQuery()
                break
            case '':
                fetchAdvertisements()
                break
            default:
                setActivePage(1)
                fetchAdvertisementsByQuery()
                break
        }
    }

    const onCreate = () => {
        fetchAdvertisements()
    }

    useEffect(() => {
        fetchAdvertisements()
    }, [activePage])

    useEffect(() => {
        if (queryFlag) {
            fetchAdvertisementsByQuery()
        } else {
            fetchAdvertisements()
        }
    }, [activePage])

    return (
        <Container>
            <SearchBlock placeHolderText={'Search service'} setQuery={setQuery} handleSearch={handleFetchAdvertisementsByQuery} handleShowCreateModal={handleShowCreateModal}/>
            {
                showSpinner ?
                    <Row className={'d-flex justify-content-center align-items-center my-4'}>
                        <Col className={'d-flex justify-content-center align-items-center'}>
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </Col>
                    </Row>
                    :
                    <Row>
                        {
                            services.length !== 0 ? services.map(
                                service =>
                                    <Service service={service}/>
                            ) :
                                <Row className={'d-flex justify-content-center'}>
                                    <Col className={'cow-12 d-flex justify-content-center'}>
                                        <Image src={noResultImage} className={'img-fluid'}/>
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
                                      category={'SERVICE'}/>
        </Container>
    );
};

export default Services;