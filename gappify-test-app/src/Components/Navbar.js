import React, { Component } from 'react';
import searchIcon from '../search-icon.svg';
import mailboxIcon from '../Icons/mailbox-icon.svg';
import settingsIcon from '../Icons/settings-icon.svg';
import userIcon from '../Icons/user-icon.svg';
import scrollIcon from '../Icons/scroll-icon2.svg';

import { Menu } from 'antd';
import { Badge } from 'antd';
import { HomeOutlined, TeamOutlined, SolutionOutlined } from '@ant-design/icons';
import {Row, Col} from 'react-bootstrap';

class Navbar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            searchInput: null
        };
    }

    handleOnChangeInput=(e)=>{
        this.setState({
            searchInput: e.target? e.target.value: null
        });
    }

    findMenuItemByKey = key => {
        const {menuList} = this.props;
        return menuList.find((element) => {
            return element.id === key;
          })
    }

    handleClick = e => {
        const {onClickLink} = this.props;
        let menuItem = this.findMenuItemByKey(e.key);
        onClickLink && onClickLink(menuItem);
    };

    searchMenuInput=()=>{
        return(
            <form>
                <span className="search-icon-span">
                    <img src={searchIcon} className="search-icon-img" alt="search-icon" />
                </span>
                <input
                    className="search-input"
                    type="text" 
                    value={this.state.searchInput}
                    onChange={(e) => this.handleOnChangeInput(e.target.value)}
                    placeholder={"Search"}
                />
            </form>
        );
    }

    sideMenu = () =>{
        return(
            <Menu
                onClick={this.handleClick}
                style={{ width: 256 }}
                defaultSelectedKeys={['1']}
                mode="inline"
            >
                <div className="app-logo-main">
                    <div><img src={scrollIcon} alt="scroll-icon" /></div>
                    <div className="app-name">Test App</div>
                </div>
                <Menu.Item icon={<HomeOutlined />} key="1">Dashboard</Menu.Item>
                <Menu.Item icon={<TeamOutlined />} key="2">Companies</Menu.Item>
                <Menu.Item icon={<SolutionOutlined />} key="3">Transactions</Menu.Item>
            </Menu>
        );
    }

    render(){
        return(
            <div className="nav-bar-main">
                {this.sideMenu()}
                <div className="nav-bar-right">
                    <Row className="nav-bar-top">
                        <Col md={4} className="search-menu">
                            {this.searchMenuInput()}
                        </Col>
                        <Col md={8} className="navbar-links">
                            <div className="mailbox-icon">
                                <Badge count={1}>
                                    <img src={mailboxIcon} className="mailbox-icon-img" alt="mailbox-icon" />
                                </Badge>
                            </div>
                            <div className="settings-icon">
                                <img src={settingsIcon} className="settings-icon-img" alt="settings-icon" />
                            </div>
                            <div className="user-icon">
                                <img src={userIcon} className="user-icon-img" alt="user-icon" />
                            </div>
                        </Col>
                    </Row>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
export default Navbar;