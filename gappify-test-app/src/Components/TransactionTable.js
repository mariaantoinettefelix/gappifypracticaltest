import React, { Component, Fragment } from 'react';
import { Table, Space, Tooltip, Button, Card, Modal, Form, Input, Select, DatePicker } from 'antd';
import { ProfileOutlined, EditOutlined, ArrowLeftOutlined, FileAddOutlined } from '@ant-design/icons';
import {Row, Col} from 'react-bootstrap';

class UserDetailsWidget extends Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    getTableColumns=()=>{
        const{hasActions,onView,onUpdate}=this.props;
        let columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Company',
                key: 'companyName',
                dataIndex: 'companyName',
            },
            {
              title: 'Amount',
              dataIndex: 'amount',
              key: 'amount',
            },
            {
                title: 'Reference No.',
                dataIndex: 'referenceNo',
                key: 'referenceNo',
            },
            {
                title: 'Transaction Date',
                dataIndex: 'transactionDate',
                key: 'transactionDate',
            },
            {
                title: 'Remarks',
                dataIndex: 'remarks',
                key: 'remarks',
            }
        ];

        if(hasActions){
            columns.push({
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                  <Space size="middle">
                      <a className="table-link" onClick={()=>{
                          onView && onView(text,record)
                        }}>
                          <Tooltip title="View">
                              <ProfileOutlined />
                          </Tooltip>
                      </a>
                      <a className="table-link" onClick={()=>{
                          onUpdate && onUpdate(text,record)
                        }}>
                          <Tooltip title="Update">
                              <EditOutlined />
                          </Tooltip>
                      </a>
                  </Space>
                ),
              });
        }

        return columns;
    }

    render(){
        return(
            <Fragment>
                <Row>
                    <Col md={12}>
                        <Table columns={this.getTableColumns()} dataSource={[...this.props.dataList]} />
                    </Col>
                </Row>
            </Fragment>
        );
    }
}
export default UserDetailsWidget;