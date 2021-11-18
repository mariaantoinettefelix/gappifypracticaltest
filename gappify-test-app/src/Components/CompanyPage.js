import React, { Component, Fragment } from 'react';
import { Table, Space, Tooltip, Button, Card, Modal, Form, Input } from 'antd';
import { ProfileOutlined, EditOutlined, ArrowLeftOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import {Row, Col} from 'react-bootstrap';
import ViewField from './ViewField';
import TransactionTable from './TransactionTable';
import staticData from '../Constants/staticData';

let data = staticData.companyList;
let lastId = 3;

class CompanyPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedKey: 1,
            companyList: data,
            dataToView: {
                id: null,
                name: "",
                address: "",
                email: "",
                contactNo: "",
                transactions: []
            },
            modalSettings:{
                show: false,
                content: null,
                className: "",
                title: "",
            }
        };
    }

    resetDataToView=()=>{
        this.setState({
            dataToView: {
                id: null,
                name: "",
                address: "",
                email: "",
                contactNo: "",
                transactions: []
            }
        });
    }

    resetCompanyList=()=>{
        this.setState({
            companyList: data
        });
    }

    resetModalSettings=()=>{
        this.setState({
            modalSettings:{
                show: false,
                content: null,
                className: "",
                title: "",
            }
        });
    }

    getTableColumns=()=>{
        return [
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
              title: 'Address',
              dataIndex: 'address',
              key: 'address',
            },
            {
              title: 'Contact Number',
              dataIndex: 'contactNo',
              key: 'contactNo',
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
              title: 'Action',
              key: 'action',
              render: (text, record) => (
                <Space size="middle">
                    <a className="table-link" onClick={()=>this.onClickView(text, record)}>
                        <Tooltip title="View">
                            <ProfileOutlined />
                        </Tooltip>
                    </a>
                    <a className="table-link" onClick={()=>this.onClickUpdate(text, record)}>
                        <Tooltip title="Update">
                            <EditOutlined />
                        </Tooltip>
                    </a>
                </Space>
              ),
            }
        ];
    }

    onChangeName=(e)=>{
        this.setState({dataToView:{
            ...this.state.dataToView,
            name: e.target.value
        }});
    }

    onChangeContactNo=(e)=>{
        this.setState({dataToView:{
            ...this.state.dataToView,
            contactNo: e.target.value
        }});
    }

    onChangeEmail=(e)=>{
        this.setState({dataToView:{
            ...this.state.dataToView,
            email: e.target.value
        }});
    }

    onChangeAddress=(e)=>{
        this.setState({dataToView:{
            ...this.state.dataToView,
            address: e.target.value
        }});
    }

    onClickAdd=()=>{
        this.resetDataToView();
        this.setState({
            modalSettings:{
                show: true,
                content: this.getAddEditFormPanel(true),
                className: "add-modal",
                title: "Add Company",
            }
        })
    }

    onSubmitAdd=()=>{
        const {dataToView, companyList}=this.state;
        let id = lastId+1;
        lastId++;
        companyList.push({...dataToView, id: id });
        setTimeout(()=>{
            this.resetModalSettings();
        },3);
    }

    onSubmitUpdate=(id)=>{
        const {dataToView, companyList}=this.state;
        const newList = companyList.map(item=>{
            if(item.id === id){
                const updatedItem={
                    ...dataToView,
                }
                return updatedItem;
            }
            return item;
        });

        this.setState({
            companyList: newList
        });

        setTimeout(()=>{
            this.resetModalSettings();
        },3);
    }

    onCloseModal=()=>{
        this.resetDataToView();
        setTimeout(()=>{
            this.resetModalSettings();
        },3);
    }

    onClickView=(text, record)=>{
        this.setState({
            selectedKey: 2,
            dataToView: record
        });
    }

    onClickUpdate=(text, record)=>{
        this.setState({
            dataToView: record
        },()=>{
            setTimeout(()=>{
                this.setState({
                    modalSettings:{
                        show: true,
                        content: this.getAddEditFormPanel(false),
                        className: "update-modal",
                        title: "Update Company",
                    }
                })
            }, 3)
        });
    }

    onClickBack=()=>{
        this.setState({
            selectedKey: 1,
        });
        this.resetDataToView();
    }

    getInitialContent=()=>{
        const{companyList}=this.state;
        return(
            <Row>
                <Col md={12}>
                    <Table columns={this.getTableColumns()} dataSource={[...companyList]} />
                </Col>
            </Row>
        );
    }

    getViewContent=()=>{
        const{dataToView}=this.state;
        return(
            <Fragment>
                <Row>
                    <Col md={12} className="view-content">
                        <Card title="Company Information" bordered={false}>
                            <Row><ViewField label="ID" value={dataToView.id} /></Row>
                            <Row><ViewField label="Name" value={dataToView.name} /></Row>
                            <Row><ViewField label="Address" value={dataToView.address} /></Row>
                            <Row><ViewField label="Contact Number" value={dataToView.contactNo} /></Row>
                            <Row><ViewField label="Email" value={dataToView.email} /></Row>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} className="view-content">
                        <Card title="Company Transactions" bordered={false}>
                            <TransactionTable dataList={dataToView.transactions}/>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col className="footer-panel">
                        <Button 
                            className="back-btn" 
                            type="link" 
                            icon={<ArrowLeftOutlined />} 
                            size={'large'}
                            onClick={this.onClickBack}
                        >
                            Back
                        </Button>
                    </Col>
                </Row>
            </Fragment>
        );
    }

    getAddEditFormPanel=(isAdd)=>{
        const{dataToView, modalSettings}=this.state;
        return(
            <div className="form-panel">
                <Form
                    name="basic"
                    layout={"vertical"}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Name is required' }]}
                        initialValue={dataToView.name}
                    >
                        <Input value={dataToView.name} defaultValue={dataToView.name} onChange={this.onChangeName} />
                    </Form.Item>

                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'Address is required' }]}
                        initialValue={dataToView.address}
                    >
                        <Input value={dataToView.address} defaultValue={dataToView.address} onChange={this.onChangeAddress} />
                    </Form.Item>

                    <Form.Item
                        label="Contact Number"
                        name="contactNo"
                        rules={[{ required: true, message: 'Contact Number is required' }]}
                        initialValue={dataToView.contactNo}
                    >
                        <Input value={dataToView.contactNo} defaultValue={dataToView.contactNo} onChange={this.onChangeContactNo} />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Email is required' }]}
                        initialValue={dataToView.email}
                    >
                        <Input value={dataToView.email} defaultValue={dataToView.email} onChange={this.onChangeEmail} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 14 }}>
                        <Button htmlType="button" onClick={this.onCloseModal}>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit" onClick={isAdd?this.onSubmitAdd:()=>this.onSubmitUpdate(dataToView.id)}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }

    getContentToDisplay=(pages, selectedKey)=>{
        let page = pages.find(page=>{
            return page.key===selectedKey;
        })
        return page.content;
    }

    render(){
        const{selectedKey, modalSettings}=this.state;
        let pages=[
            {key: 1, content:this.getInitialContent()},
            {key: 2, content:this.getViewContent()},
        ]
        return(
            <div className="main-panel">
                {selectedKey===1?<Row>
                    <Col md={10}>
                        <div className="header-title">
                            Companies
                        </div>
                    </Col>
                    <Col md={2}>
                        <Button 
                            type="primary" 
                            shape="round" 
                            icon={<UsergroupAddOutlined />} 
                            size={'large'}
                            onClick={this.onClickAdd}
                        >
                            Add Company
                        </Button>
                    </Col>
                </Row>:null}
                <div className="content-panel">
                    {this.getContentToDisplay(pages, selectedKey)}
                </div>

                {/* Modal */}
                <Modal 
                    title={modalSettings.title} 
                    visible={modalSettings.show} 
                    footer={null}
                    closable={false}
                >
                    {modalSettings.content}
                </Modal>
            </div>
        );
    }
}
export default CompanyPage;