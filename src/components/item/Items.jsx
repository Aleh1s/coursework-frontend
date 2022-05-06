import React, {useEffect, useState} from 'react';
import {Col, Container, Pagination, Row} from "react-bootstrap";
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
    const handleShowCreateModal = () => {
        if (isAuthenticated) {
            setShowCreateModal(!showCreateModal)
        } else {
            navigate('/sign-in')
        }
    }

    const onCreate = (status) => {
        if (status && status === 201) {
            window.location.reload()
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

    useEffect(() => {
        AdvertisementService.getPageOfSortedAdvertisements(activePage - 1, 12, 'ITEM', 'UNCONFIRMED')
            .then(response => {
                setItems(response.data.advertisements)
                setTotalPageCount(response.data.totalCount)
            })
            .catch(err => console.log(err))
    }, [activePage])



    return (
        <Container>
            <SearchBlock placeHolderText={'Search item'} handleShowCreateModal={handleShowCreateModal}/>
            <Row>
                {
                    items ? items.map(
                        (item, index) =>
                            <Item key={index} item={item}/>
                    ) : <p>No items</p>
                }
            </Row>
            <Row>
                <Col>
                    <Pagination className={'mx-auto'}>{numbers}</Pagination>
                </Col>
            </Row>
            <ModalCreateAdvertisement onCreate={onCreate} show={showCreateModal} handleClose={handleShowCreateModal} category={'ITEM'}/>
        </Container>
    );
};

export default Items;