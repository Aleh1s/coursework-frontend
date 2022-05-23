import React, {useEffect, useState} from 'react';
import {Col, Container, Pagination, Row, Spinner} from "react-bootstrap";
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

    const onCreate = () => {
        fetchAdvertisements()
    }

    useEffect(() => {
        fetchAdvertisements()
    }, [activePage])

    return (
        <Container>
            <SearchBlock placeHolderText={'Search service'} handleShowCreateModal={handleShowCreateModal}/>
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
                            ) : <p align={'center'} className={'h3 mx-auto my-4'}>No services :(</p>
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