import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import AdvertisementService from "../../service/AdvertisementService";
import {Col, Container, Image, Pagination, Row, Spinner} from "react-bootstrap";
import SearchBlock from "../UI/SearchBlock";
import ModalCreateAdvertisement from "../modals/ModalCreateAdvertisement";
import House from "./House";

const HouseAdvertisements = () => {

    const navigate = useNavigate()
    const [houses, setHouses] = useState([])
    const [totalPagesCount, setTotalPageCount] = useState(0)
    const isAuthenticated = useSelector(state => state.isAuthenticated)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [activePage, setActivePage] = useState(1)
    const [showSpinner, setShowSpinner] = useState(false)
    const [query, setQuery] = useState('')
    const [queryFlag, setQueryFlag] = useState(false)
    const [currentQuery, setCurrentQuery] = useState('')
    const noResultImage = 'https://cdn.dribbble.com/users/1554526/screenshots/3399669/media/51c98501bc68499ed0220e1ba286eeaf.png?compress=1&resize=400x300'
    const handleShowCreateModal = () => {
        if (isAuthenticated) {
            setShowCreateModal(!showCreateModal)
        } else {
            navigate('/sign-in')
        }
    }


    const fetchAdvertisements = () => {
        setShowSpinner(true)
        AdvertisementService.getPageOfSortedAdvertisements(activePage - 1, 12, 'HOUSE', 'createdAt')
            .then(response => {
                setHouses(response.data.advertisements)
                setTotalPageCount(response.data.totalCount)
                setShowSpinner(false)
            })
            .catch(err => console.log(err))
    }

    const onCreate = () => {
        fetchAdvertisements()
    }

    useEffect(() => {
        fetchAdvertisements()
    }, [activePage])

    let numbers = [];
    for (let number = 1; number <= Math.ceil(totalPagesCount / 12); number++) {
        numbers.push(
            <Pagination.Item key={number} active={number === activePage} onClick={() => setActivePage(number)}>
                {number}
            </Pagination.Item>,
        );
    }

    const fetchAdvertisementsByQuery = () => {
        setShowSpinner(true)
        AdvertisementService.getAdvertisementByQuery(query, activePage - 1, 12, 'HOUSE', 'createdAt')
            .then(response => {
                setQueryFlag(true)
                setHouses(response.data.advertisements)
                setTotalPageCount(response.data.totalCount)
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

    useEffect(() => {
        if (queryFlag) {
            fetchAdvertisementsByQuery()
        } else {
            fetchAdvertisements()
        }
    }, [activePage])

    return (
        <Container>
            <SearchBlock placeHolderText={'Search house'} handleSearch={handleFetchAdvertisementsByQuery}
                         setQuery={setQuery} handleShowCreateModal={handleShowCreateModal}/>
            {showSpinner ?
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
                        houses.length !== 0 ? houses.map(
                                house =>
                                    <House house={house}/>
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
                                      category={'HOUSE'}/>
        </Container>
    );
};

export default HouseAdvertisements;