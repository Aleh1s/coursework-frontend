import React, {useState} from 'react';
import {Button, Col, Image, Row} from "react-bootstrap";
import ModalPhone from "../modals/ModalPhone";

const CreatorInfo = ({creatorInfo}) => {

    const [image, setImage] = useState("https://kis.agh.edu.pl/wp-content/uploads/2021/01/default-avatar.jpg")
    const [showModalPhone, setShowModalPhone] = useState(false)
    const handleShowModalPhone = () => setShowModalPhone(true)
    const handleHideModalPhone = () => setShowModalPhone(false)

    return (
        <>
            <Col className={'my-1'}>
                <Row className={'shadow-lg'}>
                    <Col className={'d-flex justify-content-start align-items-center my-auto p-3 col-6g'}>
                        <Image src={image} className={'img-fluid'} roundedCircle height={'48px'} width={'48px'}/>
                        <p className={'mx-3 my-auto'}
                           style={{fontSize: '17px'}}>Owner: {creatorInfo.firstName} {creatorInfo.lastName}</p>
                    </Col>
                    <Col className={'d-flex justify-content-end align-items-center my-auto col-3'}>
                        +380-XXX-XXX-XXX
                    </Col>
                    <Col className={'d-flex justify-content-end align-items-center my-auto col-3'}>
                        <Button variant={'outline-primary'} as={Col} onClick={handleShowModalPhone}>Phone
                            number</Button>
                    </Col>

                    <ModalPhone show={showModalPhone} phoneNumber={creatorInfo.phoneNumber}
                                onHide={handleHideModalPhone}/>
                </Row>
            </Col>
        </>
    );
};

export default CreatorInfo;