import React, {useEffect, useState} from 'react';
import {Col, Container, Pagination, Row, Spinner} from "react-bootstrap";
import Item from "./Item";
import SearchBlock from "../UI/SearchBlock";
import ModalCreateAdvertisement from "../modals/ModalCreateAdvertisement";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import AdvertisementService from "../../service/AdvertisementService";

const Items = () => {

    const navigate = useNavigate()
    const [items, setItems] = useState([])
    const [totalPagesCount, setTotalPageCount] = useState(0)
    const isAuthenticated = useSelector(state => state.isAuthenticated)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [activePage, setActivePage] = useState(1)
    const [showSpinner, setShowSpinner] = useState(false)
    const [query, setQuery] = useState('')
    const [queryFlag, setQueryFlag] = useState(false)

    const handleShowCreateModal = () => {
        if (isAuthenticated) {
            setShowCreateModal(!showCreateModal)
        } else {
            navigate('/sign-in')
        }
    }

    const fetchAdvertisementsByQuery = () => {
        setShowSpinner(true)
        AdvertisementService.getAdvertisementByQuery(query, activePage - 1, 12, 'ITEM', 'createdAt')
            .then(response => {
                setQueryFlag(true)
                setItems(response.data.advertisements)
                setTotalPageCount(response.data.totalCount) // todo: Parameter value [\] did not match expected type
                setShowSpinner(false)
            })
            .catch(err => console.log(err))
    }

    const fetchAdvertisements = () => {
        setShowSpinner(true)
        AdvertisementService.getPageOfSortedAdvertisements(activePage - 1, 12, 'ITEM', 'createdAt')
            .then(response => {
                setItems(response.data.advertisements)
                setTotalPageCount(response.data.totalCount)
                setShowSpinner(false)
            })
            .catch(err => console.log(err))
    }

    const onCreate = () => {
        fetchAdvertisements()
    }

    useEffect(() => {
        if (queryFlag) {
            fetchAdvertisementsByQuery()
        } else {
            fetchAdvertisements()
        }
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
            <SearchBlock placeHolderText={'Search item'} handleShowCreateModal={handleShowCreateModal}
                         handleSearch={fetchAdvertisementsByQuery} setQuery={setQuery}/>
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
                        items.length !== 0 ? items.map(
                            (item, index) =>
                                <Item key={index} item={item}/>
                        ) : <p align={'center'} className={'h3 mx-auto my-4'}>No items :(</p>
                    }

                    <Row>
                        <Col>
                            {numbers.length !== 0 ?
                                <Pagination className={'mx-auto'}>{numbers}</Pagination>
                                :
                                <></>
                            }
                        </Col>
                    </Row>
                </Row>
            }
            <ModalCreateAdvertisement onCreate={onCreate} show={showCreateModal} handleClose={handleShowCreateModal}
                                      category={'ITEM'}/>
        </Container>
    );
};

export default Items;