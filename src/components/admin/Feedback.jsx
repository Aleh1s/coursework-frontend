import React from 'react';
import {Toast} from "react-bootstrap";

const Feedback = ({feedback}) => {
    return (
        <Toast className={'my-2'} style={{width: '100%'}}>
            <Toast.Header>
                <strong className="me-auto">{feedback.email}</strong>
                <small>{feedback.createdAt.substring(0, 10)}</small>
            </Toast.Header>
            <Toast.Body>
                {feedback.text}
            </Toast.Body>
        </Toast>
    );
};

export default Feedback;