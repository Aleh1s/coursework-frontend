import React from 'react';
import {Accordion} from "react-bootstrap";
import MyAdvertisement from "./MyAdvertisement";

const MyAdvertisements = ({sales, show, setShow, handleOrder}) => {
    return (
        <Accordion>
            {
                sales ? sales.map(sale =>
                    <MyAdvertisement handleOrder={handleOrder} sale={sale} show={show} setShow={setShow}/>
                ) : <p style={{color: 'white'}}>No sales</p>
            }
        </Accordion>
    );
};

export default MyAdvertisements;