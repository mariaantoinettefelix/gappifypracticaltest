import React, { Component } from 'react';
import {Col} from 'react-bootstrap';

class ViewField extends Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    render(){
        const {label, value}=this.props;
        return(
            <Col className="view-field" {...this.props}>
                <div className="view-field-label">{label}</div>
                <div className="view-field-value">{value}</div>
            </Col>
        );
    }
}
export default ViewField;