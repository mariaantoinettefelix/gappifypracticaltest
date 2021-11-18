import React, { Component, Fragment } from 'react';
import { Button, Card, Modal, Form, Input, Select, DatePicker } from 'antd';
import { ArrowLeftOutlined, FileAddOutlined } from '@ant-design/icons';
import moment from 'moment';
import {Row, Col} from 'react-bootstrap';
import ViewField from './ViewField';
import staticData from '../Constants/staticData';
import TransactionTable from './TransactionTable';

const { Option } = Select;
let data = staticData.transactionList;
let lastId = 4;

class TransactionsPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedKey: 1,
            txnList: data,
            dataToView: {
                id: null,
                name: "",
                transactionDate: null,
                amount: "",
                referenceNo: "",
                remarks: "",
                companyName: null,
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
                transactionDate: "",
                amount: "",
                referenceNo: "",
                remarks: "",
                companyName: null,
            }
        },()=>{
            this.forceUpdate();
        });
    }

    resetCompanyList=()=>{
        this.setState({
            txnList: data
        });
    }

    resetModalSettings=(succCB)=>{
        this.setState({
            modalSettings:{
                show: false,
                content: null,
                className: "",
                title: "",
            }
        },()=>{
            setTimeout(()=>{
                succCB && succCB();
            },3);
        });
    }

    onChangeCompany=(value)=>{
        this.setState({
            dataToView:{
                ...this.state.dataToView,
                companyName: value,
            }
        })
    }

    onChangeName=(e)=>{
        this.setState({dataToView:{
            ...this.state.dataToView,
            name: e.target.value
        }});
    }

    onChangeDate=(date, dateString)=>{
        this.setState({dataToView:{
            ...this.state.dataToView,
            transactionDate: dateString
        }});
    }

    onChangeAmount=(e)=>{
        this.setState({dataToView:{
            ...this.state.dataToView,
            amount: e.target.value
        }});
    }

    onChangeRefNo=(e)=>{
        this.setState({dataToView:{
            ...this.state.dataToView,
            referenceNo: e.target.value
        }});
    }

    onChangeRemarks=(e)=>{
        this.setState({dataToView:{
            ...this.state.dataToView,
            remarks: e.target.value
        }});
    }

    onClickAdd=()=>{
        this.resetDataToView();
        this.setState({
            modalSettings:{
                show: true,
                content: this.getAddEditFormPanel(true),
                className: "add-modal",
                title: "Add Transaction",
            }
        })
    }

    onSubmitAdd=()=>{
        const {dataToView, txnList}=this.state;
        let id = lastId+1;
        lastId++;
        txnList.push({...dataToView, id: id });
        setTimeout(()=>{
            this.resetModalSettings();
        },3);
    }

    onSubmitUpdate=(id)=>{
        const {dataToView, txnList}=this.state;
        const newList = txnList.map(item=>{
            if(item.id === id){
                const updatedItem={
                    ...dataToView,
                }
                return updatedItem;
            }
            return item;
        });

        this.setState({
            txnList: newList
        });

        setTimeout(()=>{
            this.resetModalSettings();
        },3);
    }

    onCloseModal=()=>{
        this.resetModalSettings(this.resetDataToView);
    }

    onClickView=(text, record)=>{
        this.setState({
            selectedKey: 2,
            dataToView: {...record}
        });
    }

    onClickUpdate=(text, record)=>{
        this.setState({
            dataToView: {...record}
        },()=>{
            setTimeout(()=>{
                this.setState({
                    modalSettings:{
                        show: true,
                        content: this.getAddEditFormPanel(false),
                        className: "update-modal",
                        title: "Update Company",
                    }
                });
                this.forceUpdate();
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
        const{txnList}=this.state;
        return(
            <TransactionTable 
                hasActions={true} 
                dataList={txnList} 
                onView={this.onClickView}  
                onUpdate={this.onClickUpdate}
            />
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
                            <Row><ViewField label="Company" value={dataToView.companyName} /></Row>
                            <Row><ViewField label="Amount" value={dataToView.amount} /></Row>
                            <Row><ViewField label="Reference No." value={dataToView.referenceNo} /></Row>
                            <Row><ViewField label="Transaction Date" value={dataToView.transactionDate} /></Row>
                            <Row><ViewField label="Remarks" value={dataToView.remarks} /></Row>
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
        const{dataToView}=this.state;
        let transactionDate = dataToView.transactionDate!=null?moment(dataToView.transactionDate):null; 
        return(
            <div className="form-panel">
                <Form
                    name="basic"
                    layout={"vertical"}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Company"
                        name="company"
                        rules={[{ required: true, message: 'Company is required' }]}
                        initialValue={dataToView.companyName}
                    >
                        <Select
                            placeholder="Select a option and change input text above"
                            onChange={this.onChangeCompany}
                            allowClear
                            defaultValue={dataToView.companyName}
                            value={dataToView.companyName}
                        >
                            {staticData.companyList.map(item=>(
                                <Option value={item.name}>{item.name}</Option>
                            ))};
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Name is required' }]}
                        initialValue={dataToView.name}
                    >
                        <Input value={dataToView.name} defaultValue={dataToView.name} onChange={this.onChangeName} />
                    </Form.Item>

                    <Form.Item
                        label="Transaction Date"
                        name="transactionDate"
                        rules={[{ required: true, message: 'TransactionDate is required' }]}
                        initialValue={transactionDate}
                    >
                        <DatePicker format="MMM DD YYYY" value={transactionDate} defaultValue={transactionDate} onChange={this.onChangeDate} />
                    </Form.Item>

                    <Form.Item
                        label="Amount"
                        name="amount"
                        rules={[{ required: true, message: 'Amount is required' }]}
                        initialValue={dataToView.amount}
                    >
                        <Input value={dataToView.amount} defaultValue={dataToView.amount} onChange={this.onChangeAmount} />
                    </Form.Item>

                    <Form.Item
                        label="Reference No."
                        name="referenceNo"
                        rules={[{ required: true, message: 'Reference No. is required' }]}
                        initialValue={dataToView.referenceNo}
                    >
                        <Input value={dataToView.referenceNo} defaultValue={dataToView.referenceNo} onChange={this.onChangeRefNo} />
                    </Form.Item>

                    <Form.Item
                        label="Remarks"
                        name="remarks"
                        rules={[{ required: true, message: 'Remarks is required' }]}
                        initialValue={dataToView.remarks}
                    >
                        <Input value={dataToView.remarks} defaultValue={dataToView.remarks} onChange={this.onChangeRemarks} />
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
                            Transactions
                        </div>
                    </Col>
                    <Col md={2}>
                        <Button 
                            type="primary" 
                            shape="round" 
                            icon={<FileAddOutlined />} 
                            size={'large'}
                            onClick={this.onClickAdd}
                        >
                            Add Transaction
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
export default TransactionsPage;