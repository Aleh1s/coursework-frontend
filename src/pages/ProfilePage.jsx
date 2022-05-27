import React, {useEffect, useState} from 'react';
import {Alert, Col, Container, Row, Tab, Tabs} from "react-bootstrap";
import UserInfoTab from "../components/UI/UserInfoTab";
import {useSelector} from "react-redux";
import AddProfileImageModal from "../components/modals/AddProfileImageModal";
import ImageService from "../service/ImageService";
import MyPurchases from "../components/order/MyPurchases";
import MyAdvertisements from "../components/sale/MyAdvertisements";

const ProfilePage = () => {

    const user = useSelector(state => state.user)

    const [imageExists, setImageExists] = useState(false)
    const [showAddProfileImage, setShowAddProfileImage] = useState(false)
    const [error, setError] = useState({
        show: false,
        message: ''
    })

    const checkImage = () => {
        ImageService.userProfileImageExists(user.email)
            .then(response => setImageExists(response.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        checkImage()
    }, [])

    const handleAddImage = (image) => {
        const data = new FormData()
        data.append('_image', image)
        ImageService.addUserProfileImage(data)
            .then(() => {
                setShowAddProfileImage(false)
                checkImage()
            })
            .catch(err => console.log(err))
    }

    return (
        <Container>
            <Row>
                {
                    error.show ?
                        <Col className={'col-12'}>
                            <Alert key={'danger'} variant={'danger'}>
                                {error.message}
                            </Alert>
                        </Col>
                        :
                        <></>
                }
                <UserInfoTab imageExists={imageExists} setAddProfileImageModal={setShowAddProfileImage} user={user}/>

                <Col className={'col-lg-7 col-12 mx-auto my-4'}>
                    <Tabs defaultActiveKey="my-purchases" id="uncontrolled-tab-example"
                          className="mb-3 justify-content-center">
                        <Tab eventKey="my-purchases" title="My purchases">
                            <MyPurchases user={user}
                            />
                        </Tab>
                        <Tab eventKey="my-sales" title="My advertisements">
                            <MyAdvertisements setError={setError} user={user}/>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>

            <AddProfileImageModal addImage={handleAddImage} show={showAddProfileImage}
                                  setShow={setShowAddProfileImage}/>
        </Container>
    );
};

export default ProfilePage;