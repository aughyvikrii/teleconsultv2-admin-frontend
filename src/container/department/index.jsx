import React, { useEffect, useState, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Table, Row, Col, Input, Form, Popconfirm, message, Skeleton, Avatar } from 'antd';
import { Main, TableWrapper } from '../styled';

// Component
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { AlertError } from '../../components/alerts/alerts';
import { Modal } from '../../components/modals/antd-modals';
import Loading from '../../components/loadings';
import Heading from '../../components/heading/heading';
import { Popover } from '../../components/popup/popup';

import {
    loadingStart,
    loadingClose,
    loadingContent,
    loadingError,
    loadingSuccess
} from '../../redux/loadingmodal/actionCreator';


// Api Function
import  { get_department, update_department, create_department, delete_department, createParams, rootUrl } from '../../api';
const { Search, TextArea } = Input;

const Department = () => {
    const dispatch = useDispatch();
    const [alert, setAlert] = useState(null);
    const [form] = Form.useForm();
    const [data, setData] = useState({});
    const [source, setSource] = useState([]);
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        setLoading(true);
        const {result, error, message} = await get_department(filter);
        
        if(error) {
            setAlert(<AlertError message={message}/>);
        } else {
            setData(result.data);
        }
        setLoading(false);
    }

    const processData = () => {
        let result = [];
        let _data = data?.data?.length > 0 ? data.data : [];

        _data.map(row => {
            return result.push({
                key: row.department_id,
                id: row.department_id,

                mobile_data: (<>
                    <Cards border={true} headless={true} className="text-left">
                        <b>ID</b> #{row.department_id} <br/>

                        <b>Nama</b> <br/>
                        {row.name} <br/>

                        <b>Keterangan</b> <br/>
                        {row.description} <br/> <br/>

                        <Button className="btn-icon" size="default" block={true} type="primary" title="Detail" onClick={() => modalEdit(row)}>
                            <i aria-hidden="true" className="fa fa-pencil"></i> Edit Data
                        </Button> &nbsp;
                        <Popconfirm
                            title="Yakin menghapus data ini?"
                            onConfirm={() => deleteData(row)}
                            okText="Ya"
                            cancelText="Batal"
                        >
                            <Button className="btn-icon" size="default" outlined block={true} type="danger" title="Hapus">
                            <i aria-hidden="true" className="fa fa-trash-o"></i> Hapus Data
                            </Button>
                        </Popconfirm>
                    </Cards>
                </>),

                name: (
                    <div className="user-info">
                        <figure>
                            <Suspense
                                fallback={
                                    <Skeleton avatar active/>
                                }
                            >
                                <Avatar shape="square" size={{ xs: 40, sm: 40, md: 40, lg: 40, xl: 40, xxl: 40 }} src={row.thumbnail} />
                            </Suspense>
                        </figure>
                        <figcaption>
                            <Heading className="user-name" as="h6">
                            {row.name}
                            </Heading>
                            <span className="user-designation">{row.alt_name}</span>
                        </figcaption>
                    </div>
                ),
                description: row.description ? row.description : '-',
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

    // START: Table event & config
        const [filter, setFilter] = useState({ query: null, page: 0, data_per_page: 10, paginate: true });

        const columns = [
            { title: 'Data', dataIndex: 'mobile_data', key: 'mobile_data', responsive: ['xs'] },
            { title: 'ID', dataIndex: 'id', key: 'id', responsive: ['sm'] },
            { title: 'Departemen', dataIndex: 'name', key: 'name', responsive: ['sm'] },
            { title: 'Keterangan', dataIndex: 'description', key: 'description', responsive: ['sm'] },
            { title: '#', dataIndex: 'action', key: 'action', width: '150px', responsive: ['sm'] },
        ];

        useEffect(() => {
            getData();
        }, [filter]);

        const onTableChange = (e) => {
            setFilter({
                ...filter,
                page: e.current,
                data_per_page: e.pageSize,
            });
        }
    // END: Table event & config

    // Start: Cropper
        const [image, setImage] = useState();
        const [cropData, setCropData] = useState();
        const [cropper, setCropper] = useState();

        const imageChange = (e) => {
            e.preventDefault();
            setCropData('');
            let files;
            if(e.dataTransfer) {
                files = e.dataTransfer.files;
            } else {
                files = e.target.files;
            }

            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            }
            reader.readAsDataURL(files[0]);
        }

        const getCropData = () => {
            if(typeof cropper !== 'undefined') {
                setCropData(cropper.getCroppedCanvas({
                    width: 480,
                    height: 480
                }).toDataURL());
            }
        }

        useEffect(() => {
            form.setFieldsValue({
                thumbnail: cropData
            });
            // eslint-disable-next-line
        }, [cropData]);
    // End: Cropper

    /* Start: Modal event & config */

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
                setImage('');
                setCropData('');
            }
        }

        const showModal = (reset=false) => {
            if(reset) {
                setModalForm({ ...modalForm, action: 'add', id: 0 });
                form.resetFields()
            }
            setModal({ ...modal, visible: true });
        }

        const submitForm = async (values) => {
            if(modalForm.action === 'update') updateData(values);
            else createData(values);
        }
        
        const modalEdit = (data) =>  {
            setImage('');
            setCropData('');
            setModalForm({
                action: 'update',
                id: data.department_id
            });
            setImage(data.thumbnail);
            form.setFieldsValue({
                name: data.name,
                description: data.description,
                file: ''
            });
            setCropData(data.thumbnail);
            showModal();
        }
    
        const createData = async (values) => {

            dispatch(loadingStart());
            dispatch(loadingContent('Menambah data...'));

            const {error, message} = await create_department(values);

            if(error) {
                dispatch(loadingError());
                dispatch(loadingContent(message));
                setTimeout(() => dispatch(loadingClose()), 3000);
            } else {
                dispatch(loadingSuccess());
                dispatch(loadingContent(message));

                form.resetFields();
                setModal({ ...modal, visible: false });
                setImage(null);
                setCropData(null);

                setTimeout(() => dispatch(loadingClose()), 3000);
                getData();
            }
        }
    
        const updateData = async (values) => {

            dispatch(loadingStart());
            dispatch(loadingContent('Update data...'));

            const {error, message} = await update_department(modalForm.id, values);

            if(error) {
                dispatch(loadingError());
                dispatch(loadingContent(message));
                setTimeout(() => dispatch(loadingClose()), 3000);
            } else {
                dispatch(loadingSuccess());
                dispatch(loadingContent(message));

                form.resetFields();
                setModal({ ...modal, visible: false });
                setImage(null);
                setCropData(null);

                setTimeout(() => dispatch(loadingClose()), 3000);
                getData();
            }
        }

        const deleteData = async (data) => {
            const hide = message.loading('Proses menghapus data..', 0);
            const result = await delete_department(data.department_id);
    
            if(result.error) {
                hide();
                message.error(result.error);
            } else {
                hide();
                message.success('Berhasil menghapus data');
                getData();
            }
        }
        
    /* Start: Modal event & config */

    

    const print = async (type, page) => {
        if(page === 'all_page') filter['paginate'] = false;

        filter['print_type'] = type;

        const params = await createParams(filter);
        const url = rootUrl + '/report/department?' + params;
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
            title="Halaman Departemen"
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
                title={ (modalForm.action === 'add' ? 'Tambah' :  'Update') + " Data Departemen" }
                visible={modal.visible}
                onConfirm={() => form.submit()}
                onCancel={closeModal}
                maskClosable={false}
                disableButton={ modalLoading ? true : false }
                getContainer={false}
            >
                {modalAlert}
                {   modalLoading ? <Loading /> : (
                        <Form
                            form={form}
                            name="modal"
                            layout="vertical"
                            onFinish={submitForm}
                        >

                            <Form.Item>
                                <input type="file" accept="image/*" onChange={imageChange} /> <br/>

                                <center>
                                    <img style={{ width: "50%", display: ( !cropData ? 'none' : '' ) }} src={cropData} alt="cropped" />
                                </center>
                                <div style={{ display: ( !image ? 'none' : '' ) }} >
                                    <Cropper
                                        style={{ height: 400, width: "100%", display: ( cropData ? 'none' : '' ) }}
                                        aspectRatio={1}
                                        src={image}
                                        viewMode={1}
                                        guides={true}
                                        background={false}
                                        responsive={true}
                                        autoCropArea={1}
                                        checkOrientation={false}
                                        onInitialized={(instance) => {
                                            setCropper(instance);
                                        }}
                                    /> <br/>
                                    <button type="button" style={{ float: "right", display: ( cropData ? 'none' : '' ) }} onClick={getCropData}>
                                        Potong Gambar
                                    </button>
                                </div>
                            </Form.Item>
                            <Form.Item
                                label="crop image"
                                name="thumbnail"
                                style={{display:'none'}}
                            >
                                <Input placeholder="..."/>
                            </Form.Item>
                            <Form.Item
                                label="Nama"
                                name="name"
                                initialValue={modalForm.name}
                                rules={[
                                {
                                    required: true,
                                    message: 'Masukan nama departemen!',
                                }
                                ]}
                            >
                                <Input placeholder="..."/>
                            </Form.Item>
                            
                            <Form.Item
                                label="Keterangan"
                                name="description"
                                initialValue={modalForm.description}
                                rules={[
                                {
                                    required: false,
                                    message: 'Masukan keterangan!',
                                },
                                ]}
                            >
                                <TextArea placeholder="..."/>
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
                <Col span={24}>
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

export default Department;
