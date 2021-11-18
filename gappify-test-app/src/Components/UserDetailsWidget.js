import React, { Component, Fragment } from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import avatarBg from '../img/avatar-bg.png';

class UserDetailsWidget extends Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    render(){
        return(
            <Fragment>
                <div className="avatar-main">
                    <div className="user-details-panel-avatar-bg" style={{backgroundImage: `url(${avatarBg})`}} />
                    <div className="user-details-panel-avatar">
                        <div><Avatar size={64} icon={<UserOutlined />} /></div>
                    </div> 
                </div>
                <div className="user-details-panel-details">
                    <div className="name">Maria Antoinette P. Felix</div>
                    <div className="job-dscp">Software Developer</div>
                </div>
            </Fragment>
        );
    }
}
export default UserDetailsWidget;