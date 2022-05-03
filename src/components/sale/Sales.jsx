import React from 'react';
import {Row} from "react-bootstrap";
import Sale from "./Sale";

const Sales = ({sales}) => {
    return (
        <Row className={'justify-content-between'}>
            {
                sales ? sales.map(sale =>
                    <Sale sale={sale}/>
                ) : <p style={{color: 'white'}}>No sales</p>
            }
        </Row>
    );
};

export default Sales;