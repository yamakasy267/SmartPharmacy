import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
// import MedicineItem from "./ProductItem";

const MedicineList = observer(() => {
    const {medicine} = useContext(Context)
    return (
        <Row className="d-flex">
            {/*{medicine.medicines.map(medicine =>*/}
            {/*    <MedicineItem key={medicine.id} medicine={medicine}/>*/}
            {/*)}*/}
        </Row>
    );
});

export default MedicineList;