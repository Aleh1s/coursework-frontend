import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import AdvertisementService from "../../service/AdvertisementService";
import {Col, Container, Pagination, Row, Spinner} from "react-bootstrap";
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

    // const fetchAdvertisementsByQuery = () => {
    //     setShowSpinner(true)
    //     AdvertisementService.getAdvertisementByQuery(query, 0, 12, 'HOUSE', 'createdAt')
    //         .then(response => {
    //             setItems(response.data)
    //             setShowSpinner(false)
    //         })
    //         .catch(err => console.log(err))
    // }

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

    return (
        <Container>
            <SearchBlock placeHolderText={'Search house'} handleShowCreateModal={handleShowCreateModal}/>
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
                        ) : <p align={'center'} className={'h3 mx-auto my-4'}>No houses :(</p>
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