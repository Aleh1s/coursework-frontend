import React from 'react';
import {Card, Col} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const Service = ({key, service}) => {

    const navigate = useNavigate()
    const defaultImage = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http' +
        '%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdef' +
        's%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18085cd478e%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfo' +
        'nt-family%3Avar(--bs-font-sans-serif)%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D' +
        '%22holder_18085cd478e%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%' +
        '3E%3Ctext%20x%3D%22108.53125%22%20y%3D%2297.44000034332275%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'

    const handleViewMore = () => {
        navigate('/services/service')
    }

    const style = {
        width: '18rem'
    }

    return (
        <Col className={'col-lg-3 my-3'}>
            <Card border={'primary'} style={style}>
                <Card.Img variant="top"
                          src={service.image ? service.image : defaultImage} alt={defaultImage}/>
                <Card.Body>
                    <Card.Title>{service.title}</Card.Title>
                    <Card.Text>
                        {service.text}
                    </Card.Text>
                    <a className={'link-info'} onClick={handleViewMore}>View more</a>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default Service;