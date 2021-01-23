import React, { useEffect, useState } from 'react';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Table, Row, Col, Input, Form, Popconfirm, message } from 'antd';
import { Main } from '../styled';

// Component
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { AlertError, AlertSuccess } from '../../components/alerts/alerts';
import { Modal } from '../../components/modals/antd-modals';
import Loading from '../../components/loadings';

// Api Function
import  { get_departement, update_departement, create_departement, delete_departement } from '../../api';
const { Search, TextArea } = Input;

const Departement = () => {

    const [alert, setAlert] = useState('');
    const [form] = Form.useForm();

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
                title: 'Departemen',
                dataIndex: 'departement',
                key: 'departement',
            },
            {
                title: 'Keterangan',
                dataIndex: 'description',
                key: 'description',
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
        const defaultSrc = "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";
        const [image, setImage] = useState(defaultSrc);
        const [cropData, setCropData] = useState("#");
        const [cropper, setCropper] = useState('');

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
                setCropData(cropper.getCroppedCanvas().toDataURL());
            }
        }

        useEffect(() => {
            form.setFieldsValue({
                thumbnail: cropData
            });
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
            }
        }

        const showModal = (reset=false) => {
            if(reset) {
                console.log('reset');
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
        
    /* Start: Modal event & config */

    const getData = async () => {
        setTableLoading(true);

        const [result, error] = await get_departement(filter);

        console.log(result, error);
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
            result.push({
                key: row.deid,
                id: row.deid,
                departement: row.name,
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
        setDataCount(data.total);
        setSource(result);
    }

    const deleteData = async (data) => {
        const hide = message.loading('Proses menghapus data..', 0);
        const [result, error] = await delete_departement(data.deid);

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
        const [result, error] = await create_departement(values);
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
        const [result, error] = await update_departement(modalForm.id, values);
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
            title="Halaman Departemen"
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
                title={ (modalForm.action === 'add' ? 'Tambah' :  'Update') + " Data Departemen" }
                visible={modal.visible}
                onConfirm={() => form.submit()}
                onCancel={closeModal}
                maskClosable={false}
                disableButton={ modalLoading ? true : false }
            >
                {modalAlert}
                {   modalLoading ? <Loading status={status} /> : (
                        <Form
                            form={form}
                            name="modal"
                            layout="vertical"
                            onFinish={submitForm}
                        >

                            <Form.Item>
                                <input type="file" onChange={imageChange} /> <br/>

                                <center>
                                    <img style={{ width: "50%", display: ( cropData.length > 2 ? '' : 'none' ) }} src={cropData} alt="cropped" />
                                </center>
                                <Cropper
                                    style={{ height: 400, width: "100%", display: ( cropData.length < 2 ? '' : 'none' ) }}
                                    // initialAspectRatio={1}
                                    // preview=".img-preview"
                                    aspectRatio={1}
                                    src={image}
                                    viewMode={1}
                                    guides={true}
                                    // minCropBoxHeight={10}
                                    // minCropBoxWidth={10}
                                    background={false}
                                    responsive={true}
                                    autoCropArea={1}
                                    checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                                    onInitialized={(instance) => {
                                        setCropper(instance);
                                    }}
                                /> <br/>
                                <button type="button" style={{ float: "right", display: ( cropData.length < 2 ? '' : 'none' ) }} onClick={getCropData}>
                                    Potong Gambar
                                </button>
                            </Form.Item>
                            <Form.Item
                                label="crop image"
                                name="thumbnail"
                                style={{display:'none'}}
                            >
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
                <Col lg={24} xs={24}>
                {alert}
                    <Cards headless={true} >
                        <Search placeholder="input search text" onSearch={(value) => setFilter({...filter, query: value })}/> <br/> <br/>
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
                    </Cards>
                </Col>
            </Row>
        </Main>
        </>
    );
};

export default Departement;
