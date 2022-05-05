import React from 'react';
import {Alert} from "react-bootstrap";

const ServerErrorAlert = ({show, onHide, message}) => {

    return (
        <Alert show={show} onClick={() => onHide()} key={'danger'} variant={'danger'}>
            {message}
        </Alert>
    );
};

export default ServerErrorAlert;