import './no-result-card.css';
import React from "react";
import Row from "react-bootstrap/Row";


const NoResultCard = () => {
    return (
        <Row className="mx-1">
            <div className="no-result-wrapper mx-1">
            <span>
                No Result found!
            </span>
            </div>
        </Row>
    );
}

export default NoResultCard;
