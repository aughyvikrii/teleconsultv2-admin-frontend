import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Input, Form, Popconfirm, message } from 'antd';
import { Main, TableWrapper } from '../styled';

// Component
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { AlertError, AlertSuccess } from '../../components/alerts/alerts';
import { Modal } from '../../components/modals/antd-modals';
import Loading from '../../components/loadings';

// Api Function
import  { get_specialist, update_specialist, create_specialist, delete_specialist } from '../../api';
const { Search } = Input;

const Specialists = () => {

    const [alert, setAlert] = useState('');

    // START: Table event & config
        const [tableLoading, setTableLoading] = useState(true);
        const [source, setSource] = useState([]);
        const [dataCount, setDataCount] = useState(0);
        const [filter, setFilter] = useState({ query: null, page: 0, data_per_page: 10 });

        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: 'Titel',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: 'Keterangan',
                dataIndex: 'alt_name',
                key: 'alt_name',
            },
            {
                title: '#',
                dataIndex: 'action',
                key: 'action',
                width: '150px',
            },
        ];

        useEffect(() => {
            getData();
            // eslint-disable-next-line
        }, [filter]);

        const onTableChange = (e) => {
            setFilter({
                ...filter,
                page: e.current,
                data_per_page: e.pageSize,
            });
        }
    // END: Table event & config

    // Start: Modal event & config
        const [form] = Form.useForm();
        const modalFormStruct = {
            title: '',
            alt_name: '',
            id: 0,
            action: 'add'
        };

        const modalStruct = {
            title: 'Tambah Data Spesialis',
            type: 'primary',
            colorModal: false,
            disableButton: false,
            visible: false
        };

        const [modalLoading, setModalLoading] = useState(false);
        const [modalAlert, setModalAlert] = useState('');
        const [modalForm, setModalForm] = useState(modalFormStruct);
        const [modal, setModal] = useState(modalStruct);

        const closeModal = () => {
            setModal({
                ...modal,
                visible: false,
            });

            if(modalForm.action === 'update') {
                setModalForm({
                    ...modalForm,
                    action: 'add',
                    id:0
                });
            }
        }

        const showModal = (reset=false) => {
            if(reset) {
                setModalForm({
                    ...modalForm,
                    action: 'add',
                    id: 0
                });
                form.setFieldsValue(modalFormStruct)
            }
            setModal({
                ...modal,
                visible: true,
            });
        }

        const submitForm = async (values) => {
            if(modalForm.action === 'update') updateData(values);
            else createData(values);
        }
        
        const modalEdit = (data) =>  {
            setModalForm({
                action: 'update',
                id: data.sid
            });

            form.setFieldsValue(data);
            showModal();
        }
        
    // END: Modal event & config


    const getData = async () => {
        setTableLoading(true);

        const [result, error] = await get_specialist(filter);

        if(!result) {
            setAlert(
                AlertError(error)
            );
        } else {
            processData(result.data);
        }

        setTableLoading(false);
    }

    const processData = (data) => {
        let result = [];
        data.data.map(row => {
            return result.push({
                key: row.sid,
                id: row.sid,
                title: row.title,
                alt_name: row.alt_name,
                action: (
                    <div className="table-actions">
                        <>
                            <Button className="btn-icon" size="default" shape="round" type="primary" title="Detail" onClick={() => modalEdit(row)}>
                                <i aria-hidden="true" className="fa fa-pencil"></i>
                            </Button> &nbsp;
                            <Popconfirm
                                title="Yakin menghapus data ini?"
                                onConfirm={() => deleteData(row)}
                                okText="Ya"
                                cancelText="Batal"
                            >
                                <Button className="btn-icon" size="default" outlined shape="round" type="danger" title="Hapus">
                                <i aria-hidden="true" className="fa fa-trash-o"></i>
                                </Button>
                            </Popconfirm>
                        </>
                    </div>
                )
            });
        });
        setDataCount(data.total);
        setSource(result);
    }

    const deleteData = async (data) => {
        const hide = message.loading('Proses menghapus data..', 0);
        const [result, error] = await delete_specialist(data.sid);

        if(!result) {
            hide();
            message.error(error);
        } else {
            hide();
            message.success('Berhasil menghapus data');
            getData();
        }
    }

    const createData = async (values) => {
        setModalLoading(true);
        const [result, error] = await create_specialist(values);
        setModalLoading(false);
        if(!result) {
            setModalAlert(
                AlertError(error)
            );
        } else {
            form.resetFields();
            setModal({
                ...modal,
                visible: false
            });
            setAlert(
                AlertSuccess(
                    result.message
                )
            );
            getData();
        }
    }

    const updateData = async (values) => {
        setModalLoading(true);
        const [result, error] = await update_specialist(modalForm.id, values);
        setModalLoading(false);
        if(!result) {
            setModalAlert(
                AlertError(error)
            );
        } else {
            form.resetFields();
            setModal({
                ...modal,
                visible: false
            });
            setAlert(
                AlertSuccess(
                    result.message
                )
            );
            getData();
        }
    }

    return (
        <>
        <PageHeader
            ghost
            title="Halaman Spesialis"
            buttons={[
            <div key="6" className="page-header-actions">
                <Button size="small" key="4" type="primary" onClick={() => showModal(true)}>
                <i aria-hidden="true" className="fa fa-plus"></i>
                Tambah Baru
                </Button>
            </div>,
            ]}
        />
        <Main>
            <Modal
                type={modal.type}
                title={ (modalForm.action === 'add' ? 'Tambah' :  'Update') + " Data Spesialis" }
                visible={modal.visible}
                onConfirm={() => form.submit()}
                onCancel={closeModal}
                maskClosable={false}
                disableButton={ modalLoading ? true : false }
            >
                {modalAlert}
                {   modalLoading ? <Loading /> : (
                        <Form
                            form={form}
                            name="modal"
                            layout="vertical"
                            onFinish={submitForm}
                        >
                            <Form.Item
                                label="Titel"
                                name="title"
                                initialValue={modalForm.title}
                                rules={[
                                {
                                    required: true,
                                    message: 'Masukan titel!',
                                }, {
                                    max: 5,
                                    message: 'Maksimal 5 karakter'
                                }
                                ]}
                            >
                                <Input placeholder="..."/>
                            </Form.Item>
                            
                            <Form.Item
                                label="Keterangan"
                                name="alt_name"
                                initialValue={modalForm.alt_name}
                                rules={[
                                {
                                    required: true,
                                    message: 'Masukan keterangan!',
                                },
                                ]}
                            >
                                <Input placeholder="..."/>
                            </Form.Item>

                            <Form.Item style={{display: 'none'}} >
                                <Button type="primary" htmlType="submit" className="login-form-button" block={true}>
                                Submit
                                </Button>
                            </Form.Item>

                        </Form>
                    )
                }
            </Modal>
            <Row gutter={25}>
                <Col lg={24} xs={24}>
                {alert}
                    <Cards headless={true} >
                        <Search placeholder="input search text" onSearch={(value) => setFilter({...filter, query: value })}/> <br/> <br/>
                        <TableWrapper>
                            <Table
                                loading={tableLoading}
                                bordered={false}
                                columns={columns}
                                dataSource={source}
                                pagination={{
                                    defaultPageSize: filter.data_per_page,
                                    total: dataCount,
                                    showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} data`,
                                    showQuickJumper: true,
                                    showSizeChanger: true
                                }}
                                onChange={onTableChange}
                            />
                        </TableWrapper>
                    </Cards>
                </Col>
            </Row>
        </Main>
        </>
    );
};

export default Specialists;
