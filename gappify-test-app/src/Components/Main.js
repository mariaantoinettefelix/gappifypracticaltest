import React, { Component, Fragment } from 'react';

import dashboardIcon from '../Icons/dashboard-icon.svg';
import companyIcon from '../Icons/company-icon.svg';
import transactionsIcon from '../Icons/transactions-icon.svg';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import CompanyPage from'./CompanyPage';
import TransactionsPage from'./TransactionsPage';

const menuList = [
    {
        id: "1",
        name: "Dashboard",
        content: <Dashboard />,
        icon: dashboardIcon,
        className: "dashboard-menu-link",
        children:[]
    },
    {
        id: "2",
        name: "Company",
        content: <CompanyPage />,
        icon: companyIcon,
        className: "company-menu-link",
    },
    {
        id: "3",
        name: "Transactions",
        content: <TransactionsPage />,
        icon: transactionsIcon,
        className: "txn-menu-link",
    }
];

class Main extends Component{
    constructor(props) {
        super(props);
        this.state = {
            pageToDisplay: <Dashboard />
        };
    }

    handleOnClickLink=(menuItem)=>{
        this.setState({
            pageToDisplay: menuItem != null? menuItem.content: null
        });
    }

    render(){
        return(
            <Fragment>
                <Navbar menuList={menuList} onClickLink={this.handleOnClickLink}>
                    {this.state.pageToDisplay}
                </Navbar>
            </Fragment>
        );
    }
}
export default Main;