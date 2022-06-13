import React, {useEffect, useState} from 'react';
import {Alert, Button, Col, Form, FormControl, Image, InputGroup, Row} from "react-bootstrap";
import {API_URL} from "../../http";
import UserService from "../../service/UserService";
import {useDispatch, useSelector} from "react-redux";

const UserInfoTab = ({setAddProfileImageModal, imageExists}) => {

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [formValid, setFormValid] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [countryCode, setCountryCode] = useState('+380')
    const [error, setError] = useState({
        message: '',
        show: false
    })
    const DEFAULT_IMAGE = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'

    const [updateData, setUpdateData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
    })

    const [dataError, setDataError] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: ''
    })

    const dataValidator = (e) => {
        switch (e.target.name) {
            case 'firstName':
                const firstName = e.target.value
                setUpdateData({...updateData, firstName: firstName})
                const regExpFN = /^[A-Za-z][A-Za-z ]{2,40}[A-Za-z]$/
                if (firstName && !regExpFN.test(String(firstName))) {
                    setDataError({...dataError, firstName: 'First name must contains only latin letters'})
                } else {
                    setDataError({...dataError, firstName: ''})
                }
                break
            case 'lastName':
                const lastName = e.target.value
                setUpdateData({...updateData, lastName: lastName})
                const regExpLN = /^[A-Za-z][A-Za-z ]{2,40}[A-Za-z]$/
                if (lastName && !regExpLN.test(String(lastName))) {
                    setDataError({...dataError, lastName: 'Last name must contains only latin letters'})
                } else {
                    setDataError({...dataError, lastName: ''})
                }
                break
            case 'phoneNumber':
                const phoneNumber = e.target.value
                setUpdateData({...updateData, phoneNumber: phoneNumber})
                const isValid = /^\d{8,10}$/
                if (!isValid.test(String(e.target.value))) {
                    setDataError({...dataError, phoneNumber: 'Invalid phone number'})
                } else {
                    setDataError({...dataError, phoneNumber: ''})
                }
                break
            default:
                console.log('Unknown name')
        }
    }

    useEffect(() => {
        if (dataError.firstName || dataError.lastName || dataError.phoneNumber) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [dataError])

    const submitUpdating = () => {
        if (updateData.phoneNumber || updateData.firstName || updateData.lastName) {
            UserService.update({
                firstName: updateData.firstName,
                lastName: updateData.lastName,
                phoneNumber: countryCode + updateData.phoneNumber
            })
                .then(response => {
                    dispatch({type: 'UPDATE_USER_DATA', payload: response.data})
                    setUpdateData({
                        firstName: '',
                        lastName: '',
                        phoneNumber: ''
                    })
                    setIsEditing(false)
                })
                .catch(err => setError({message: err.response.data.message, show: true}))
        }
    }

    return (
        <Col className={'col-lg-4 col-10 mx-auto my-4 shadow'}>
            <Row>
                <Col className={'col-12 d-flex justify-content-center align-items-center'}>
                    <Image className={'mx-auto my-4 rounded-circle'}
                           src={imageExists ? `${API_URL}/v1/images/users?_email=${user.email}` : DEFAULT_IMAGE}
                           height={'200px'}
                           width={'200px'}
                           onClick={() => setAddProfileImageModal(true)}
                    />
                </Col>
                <Col className={'col-12 d-flex justify-content-center'}>
                    <Button variant={'secondary'} onClick={() => {
                        setIsEditing(!isEditing)
                        setError({message: '', show: false})
                    }}>
                        Edit profile
                    </Button>
                </Col>
                {
                    error.show ?
                        <Col className={'col-12 my-2'}>
                            <Alert key={'danger'} variant={'danger'}>
                                {error.message}
                            </Alert>
                        </Col>
                        :
                        <></>
                }
                {
                    isEditing ?
                        <Col className={'col-12 mx-auto'}>
                            <Row>
                                <Form>
                                    <Form.Group as={Col} className="mb-3" controlId="formGridFirstName">
                                        <Form.Label>First name</Form.Label>
                                        <Form.Control name={'firstName'}
                                                      placeholder="Enter first name" value={updateData.firstName}
                                                      onChange={
                                                          event => dataValidator(event)
                                                      }/>
                                        <Form.Text className={'text-danger'}
                                                   hidden={!dataError.firstName}>{dataError.firstName}</Form.Text>
                                    </Form.Group>

                                    <Form.Group as={Col} className="mb-3" controlId="formGridLastName">
                                        <Form.Label>Last name</Form.Label>
                                        <Form.Control name={'lastName'}
                                                      placeholder="Enter last name" value={updateData.lastName}
                                                      onChange={
                                                          event => dataValidator(event)
                                                      }/>
                                        <Form.Text className={'text-danger'}
                                                   hidden={!dataError.lastName}>{dataError.lastName}</Form.Text>
                                    </Form.Group>

                                    <Row className="mb-3 d-flex justify-content-center">
                                        <Form.Label>Country code</Form.Label>
                                        <Form.Select style={{width: '480px'}} value={countryCode} onChange={event => setCountryCode(event.target.value)}>
                                            <option value="+380">Ukraine (+380)</option>
                                            <option value="+48">Poland (+48)</option>
                                            <option value="+49">Germany (+49)</option>
                                            <option value="+33">France (+33)</option>
                                            <option value="+44">England (+44)</option>
                                            <option value="+39">Italy (+39)</option>
                                            <option value="+34">Spain (+34)</option>
                                            <option value="+370">Lithuania (+370)</option>
                                            <option value="+371">Latvia (+371)</option>
                                            <option value="+372">Estonia (+372)</option>
                                            <option value="+421">Slovakia (+421)</option>
                                            <option value="+43">Austria (+43)</option>
                                            <option value="+351">Portugal (+351)</option>
                                        </Form.Select>

                                        <Form.Label className={'my-2'}>Phone number</Form.Label>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text id="basic-addon1">{countryCode}</InputGroup.Text>
                                            <FormControl
                                                name="phoneNumber"
                                                placeholder="Phone number"
                                                aria-label="Phone number"
                                                aria-describedby="basic-addon1"
                                                value={updateData.phoneNumber}
                                                onChange={event => dataValidator(event)}
                                            />
                                            <InputGroup.Text className={'text-danger'}
                                                             hidden={!dataError.phoneNumber}>{dataError.phoneNumber}</InputGroup.Text>
                                        </InputGroup>
                                    </Row>
                                    <Col className={'my-2'}>
                                        <Button variant="primary" disabled={!formValid}
                                                onClick={() => submitUpdating()}>
                                            Update
                                        </Button>
                                    </Col>
                                </Form>
                            </Row>
                        </Col>
                        :
                        <Col className={'col-12 mx-auto my-4'}>
                            <Row className={'col-12 mx-auto d-flex justify-content-center align-items-center'}>
                                <Col className={'col-12 my-2 d-flex justify-content-center'}>
                                    <p className={'h6'} align={'center'}>{`${user.firstName} ${user.lastName}`}</p>
                                </Col>
                                {
                                    user.role === 'ADMIN' ?
                                        <Col className={'d-flex col-12 justify-content-center my-auto'}>
                                            <strong style={{color: 'green'}}>ADMINISTRATOR</strong>
                                        </Col>
                                        :
                                        <></>
                                }
                                <Col className={'col-12 d-flex justify-content-center my-auto'}>
                                    <p>Email: {user.email} </p>
                                </Col>
                                <Col className={'col-12 d-flex justify-content-center my-auto'}>
                                    <p>
                                        Phone number: {user.phoneNumber}
                                    </p>
                                </Col>
                            </Row>
                        </Col>
                }
            </Row>
        </Col>
    );
};

export default UserInfoTab;