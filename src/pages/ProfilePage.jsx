import React from 'react';
import {Col, Container, Image, Row} from "react-bootstrap";
import TabProfile from "../components/TabProfile";

const ProfilePage = () => {
    return (
        <Container>
            <Row>
                <Col className={'col-lg-4 col-10 mx-auto my-4 shadow'} style={{backgroundColor: '#37474f', color: 'white'}}>
                    <div className={'p-4'}>
                        <Image className={'img-fluid mx-auto d-block my-auto rounded-circle'}
                               src={'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18085cd478e%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3Avar(--bs-font-sans-serif)%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18085cd478e%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22108.53125%22%20y%3D%2297.44000034332275%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'}
                               height={'300px'}
                               width={'300px'}
                        />
                        <div className={'my-4'}>
                            <p className={'h6'} align={'center'}>Full name</p>
                            <hr/>
                            <p>Email: name@gmail.com</p>
                            <hr/>
                            <p>Age: 30</p>
                            <hr/>
                            <p>City: London</p>
                            <hr/>
                            <p>Phone number: +380XXXXXXXXX</p>
                        </div>
                    </div>
                </Col>
                <Col className={'col-lg-7 col-12  mx-auto'}>
                    <TabProfile />
                </Col>
            </Row>
        </Container>
    );
};

export default ProfilePage;