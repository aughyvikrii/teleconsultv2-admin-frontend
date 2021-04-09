import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Table, Row, Col, Input, Form, Popconfirm, message } from 'antd';
import { Main, TableWrapper } from '../styled';

// Component
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { AlertError } from '../../components/alerts/alerts';
import { Modal } from '../../components/modals/antd-modals';
import Loading from '../../components/loadings';
import { Popover } from '../../components/popup/popup';

import {
    loadingStart,
    loadingClose,
    loadingContent,
    loadingError,
    loadingSuccess
} from '../../redux/loadingmodal/actionCreator';

// Api Function
import  { get_specialist, update_specialist, create_specialist, delete_specialist, rootUrl, createParams } from '../../api';

const Specialists = () => {

    const dispatch = useDispatch();

    const [alert, setAlert] = useState(null);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [source, setSource] = useState([]);

    // START: Table event & config
        const [tableLoading, setTableLoading] = useState(true);
        const [dataCount, setDataCount] = useState(0);
        const [filter, setFilter] = useState({ query: null, page: 0, data_per_page: 10, paginate: true });

        const columns = [
            { title: 'ID', dataIndex: 'id', key: 'id' },
            { title: 'Titel', dataIndex: 'title', key: 'title' },
            { title: 'Keterangan', dataIndex: 'alt_name', key: 'alt_name' },
            { title: '#', dataIndex: 'action', key: 'action', width: '150px' },
        ];

        const getData = async () => {
            setLoading(true);
            const {result, error, message} = await get_specialist(filter);
            if(error) {
                setAlert(<AlertError message={message}/>);
            } else {
                setData(result.data);
            }
            setLoading(false);
        }

        useEffect(() => {
            getData();
        }, [filter]);

        const onTableChange = (e) => setFilter({ ...filter, page: e.current, data_per_page: e.pageSize });

        const processData = () => {

            let result = [];
            let _data = data?.data?.length > 0 ? data.data : [];

            _data.map(row => {
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

            setSource(result);
        }

        useEffect(processData, [data]);
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

    const createData = async (values) => {
        dispatch(loadingStart());
        dispatch(loadingContent('Menambah data...'));

        const {error, message, errors} = await create_specialist(values);

        if(error) {
            dispatch(loadingError());
            dispatch(loadingContent(message));

            form.setFields(errors);

            setTimeout(() => dispatch(loadingClose()), 3000);
        } else {

            dispatch(loadingSuccess());
            dispatch(loadingContent(message));

            form.resetFields();
            getData();

            setModal({ ...modal, visible: false });

            setTimeout(() => dispatch(loadingClose()), 3000);
        }
    }

    const updateData = async (values) => {

        dispatch(loadingStart());
        dispatch(loadingContent('Update data...'));

        const {error, message} = await update_specialist(modalForm.id, values);

        if(error) {
            dispatch(loadingError());
            dispatch(loadingContent(message));
            setTimeout(() => dispatch(loadingClose()), 3000);
        } else {

            dispatch(loadingSuccess());
            dispatch(loadingContent(message));

            form.resetFields();
            setModal({ ...modal, visible: false });
            getData();
        }
    }

    const deleteData = async (data) => {
        const hide = message.loading('Menghapus data..', 0);
        const result = await delete_specialist(data.sid);

        if(result.error) {
            hide();
            message.error(result.message);
        } else {
            hide();
            message.success('Berhasil menghapus data');
            getData();
        }
    }
    
    const print = async (type, page) => {
        if(page === 'all_page') filter['paginate'] = false;

        filter['print_type'] = type;

        const params = await createParams(filter);
        const url = rootUrl + '/report/specialist?' + params;
        window.open(url ,'__target=blank');
    }

    const printOption = (<>
        <Link to="#" onClick={() => print('pdf', 'this_page')}>
            <i className="fa fa-file-pdf-o color-error"></i>
            <span>Cetak PDF Halaman Ini</span>
        </Link>
        <Link to="#" onClick={() => print('xls', 'this_page')}>
            <i className="fa fa-file-pdf-o color-success"></i>
            <span>Cetak Excel Halaman Ini</span>
        </Link>
        <Link to="#" onClick={() => print('pdf', 'all_page')}>
            <i className="fa fa-file-pdf-o color-error"></i>
            <span>Cetak PDF Seluruh Halaman</span>
        </Link>
        <Link to="#" onClick={() => print('xls', 'all_page')}>
            <i className="fa fa-file-pdf-o color-success"></i>
            <span>Cetak Excel Seluruh Halaman</span>
        </Link>
    </>);


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
                <Popover
                    action="click"
                    placement="bottom"
                    content={printOption}
                >
                    <Button type="primary">
                        <i className="fa fa-print"></i> Cetak
                    </Button>
                </Popover>
                <Button size="small" key="4" type="primary" onClick={() => history.goBack()}>
                    <i aria-hidden="true" className="fa fa-arrow-circle-left"></i> Kembali
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
                        <TableWrapper>
                            <Table
                                loading={loading}
                                bordered={false}
                                columns={columns}
                                dataSource={source}
                                pagination={{
                                    defaultPageSize: filter.data_per_page,
                                    total: data.total,
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
