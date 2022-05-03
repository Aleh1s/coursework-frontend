import React, {useState} from 'react';
import {Button, Carousel, Col, Container, Row} from "react-bootstrap";
import ModalItemForm from "../components/ModalItemForm";

const ItemPage = () => {

    const image = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18085ec4d35%20text%20%7B%20fill%3A%23ffffff%3Bfont-weight%3Anormal%3Bfont-family%3Avar(--bs-font-sans-serif)%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18085ec4d35%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22289.71875%22%20y%3D%22221.36000137329103%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'

    const [showModal, setShowModal] = useState(false)
    const handleShowModal = () => setShowModal(true)
    const handleCloseModal = () => setShowModal(false)


    return (
        <Container>
            <Row className={'my-4'}>
                <Col className={'col-lg-6 col-12'}>
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={image}
                                alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={image}
                                alt="Second slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={image}
                                alt="Third slide"
                            />
                        </Carousel.Item>
                    </Carousel>
                </Col>
                <Col className={'col-lg-6 col-12 my-lg-0 my-4'}>
                    <p className={'h1'}>Title</p>
                    <hr/>
                    <p>Перекладач Google, Google Translate, або Google Translator — сервіс компанії Google, що дозволяє автоматично перекладати слова, фрази та web-сторінки з однієї мови на іншу. Google використовує власне програмне забезпечення для перекладу. Використовується підхід статистичного машинного перекладу.</p>
                    <Button variant={'secondary'} onClick={handleShowModal}>Order</Button>
                </Col>
            </Row>
            <ModalItemForm show={showModal} onHide={handleCloseModal}/>
        </Container>
    );
};

export default ItemPage;