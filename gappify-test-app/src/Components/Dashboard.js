import React, { Component } from 'react';
import { Calendar } from 'antd';
import {Row, Col} from 'react-bootstrap';
import TimeWidget from './TimeWidget';
import UserDetailsWidget from './UserDetailsWidget';

class Dashboard extends Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    render(){
        return(
            <div className="dashboard-main">
                <Row className="dashboard-main-header">Dashboard</Row>
                <Row className="dashboard-main-content">
                    <Col xs={12} sm={12} md={12} lg={4} className="dashboard-content right-panel">
                        <UserDetailsWidget />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={4} className="dashboard-content right-panel">
                        <TimeWidget />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={4} className="dashboard-content right-panel">
                        <Calendar fullscreen={false} />
                    </Col>
                </Row>
            </div>
        );
    }
}
export default Dashboard;