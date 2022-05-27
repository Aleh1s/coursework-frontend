import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

import {Card, Col, Row} from "react-bootstrap";
import {API_URL} from "../../http";

const Advertisement = ({advertisement}) => {
    const id = advertisement.id
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [overlay, setOverlay] = useState(false)
    const DEFAULT_IMAGE = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%' +
        '2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E' +
        '%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18085cd478e%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont' +
        '-family%3Avar(--bs-font-sans-serif)%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%2' +
        '2holder_18085cd478e%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3' +
        'E%3Ctext%20x%3D%22108.53125%22%20y%3D%2297.44000034332275%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'

    const handleViewMore = () => {
        dispatch({type: 'SET_ADVERTISEMENT_ID', payload: id})
        navigate('/advertisements/advertisement')
    }

    const style = {
        width: '18rem',
        height: '23rem'
    }

    return (
        <Col className={'col-lg-3 my-3'}>
            <Card border={'primary'} style={style} onMouseEnter={() => setOverlay(true)}
                  onMouseLeave={() => setOverlay(false)} onClick={() => handleViewMore()}>
                <Card.Img variant="top"
                          src={`${API_URL}/v1/images/advertisements?_id=${id}`}
                          width={'286px'}
                          height={'180px'}
                          alt={DEFAULT_IMAGE}
                />
                <Card.Body>
                    <Card.Title>{advertisement.title}</Card.Title>
                    <Card.Text>
                        {advertisement.description.length > 150 ? advertisement.description.substring(0, 151) + '...' : advertisement.description}
                    </Card.Text>
                </Card.Body>
                <Col className={'card-img-overlay'} hidden={!overlay} style={{backgroundColor: 'rgba(0, 0, 0, 0.4)'}}>
                    <Row className={'d-flex justify-content-center align-items-center h-100'}>
                        <Col className={'col-12 d-flex justify-content-center align-items-center h-100'}>
                            <p style={{color: 'white', fontSize: '15px'}}>Show details</p>
                        </Col>
                    </Row>
                </Col>
            </Card>
        </Col>
    );
};

export default Advertisement;