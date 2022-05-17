import React from 'react';
import {Accordion} from "react-bootstrap";
import Sale from "./Sale";

const Sales = ({sales, show, setShow, handleOrder}) => {
    return (
        <Accordion>
            {
                sales ? sales.map(sale =>
                    <Sale handleOrder={handleOrder} sale={sale} show={show} setShow={setShow}/>
                ) : <p style={{color: 'white'}}>No sales</p>
            }
        </Accordion>
    );
};

export default Sales;