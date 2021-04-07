import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { Main, BasicFormWrapper } from '../styled';
import { useHistory } from 'react-router-dom';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

// Component
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import Heading from '../../components/heading/heading';
import { Button } from '../../components/buttons/buttons';
import { AlertError } from '../../components/alerts/alerts';

import {
    loadingStart,
    loadingClose,
    loadingContent,
    loadingError,
    loadingSuccess
} from '../../redux/loadingmodal/actionCreator';

// API
import { create_branch } from '../../api';

const Create = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [alert, setAlert] = useState(null);
    
    const [form] = Form.useForm();

    const [showSimRS,  setShowSimRS] = useState(false);

    // Start: Cropper
    const [image, setImage] = useState();
    const [cropData, setCropData] = useState(null);
    const [cropper, setCropper] = useState(null);

    const imageChange = (e) => {
        e.preventDefault();
        setCropData(null);
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
    }, [cropData]);
// End: Cropper

    const onSubmit = async (fields) => {
        setAlert(null);
        dispatch(loadingStart());
        dispatch(loadingContent('Proses menambah cabang...'));

        const {result, error, message} = await create_branch(fields);

        if(error) {
            setAlert(<AlertError message={message}/>);
            dispatch(loadingError());
            dispatch(loadingContent(message));
            setTimeout(() => dispatch(loadingClose()), 3000);

        } else {
            dispatch(loadingSuccess());
            dispatch(loadingContent(message));

            setTimeout(() => {
                dispatch(loadingClose());
                history.push(`/admin/branch/detail/${result.data.bid}`)
            }, 3000);
        }
    }

    return(
        <>
            <PageHeader
                ghost
                title="Tambah Cabang"
                buttons={[
                    <div key="6" className="page-header-actions">
                        <Button size="small" key="4" type="primary" onClick={() => history.goBack()}>
                        <i aria-hidden="true" className="fa fa-arrow-circle-left"></i>
                            Kembali
                        </Button>
                    </div>,
                    ]}
            />
            <Main>
                <Row gutter={25}>
                    <Col lg={24} xs={24}>
                        {alert}
                        <Cards headless={true} >
                            <BasicFormWrapper>
                                <Form
                                    className=""
                                    layout="vertical"
                                    form={form}
                                    name="create_new"
                                    onFinish={onSubmit}
                                >
                                    <Heading>
                                        Umum
                                    </Heading>

                                    <Row gutter={[8, 8]}>
                                        <Col lg={24} xs={24}>
                                            <Form.Item label="Gambar/Logo Cabang">
                                                <input type="file" accept="image/*" onChange={imageChange} /> <br/>

                                                <div style={{ width: "100%", display: ( cropData?.length > 2 ? '' : 'none' ) }}>
                                                    <img src={cropData} alt="cropped" />
                                                </div>

                                                <div style={{ display: ( image ? '' : 'none' ) }} >
                                                    <Cropper
                                                        style={{ height: 400, width: "100%", display: ( !cropData ? '' : 'none' ) }}
                                                        // initialAspectRatio={1}
                                                        // preview=".img-preview"
                                                        aspectRatio={2}
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
                                                    <button type="button" style={{ float: "right", display: ( !cropData ? '' : 'none' ) }} onClick={getCropData}>
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
                                        </Col>

                                        <Col lg={12} xs={24}>
                                            <Form.Item name="code" label="Kode"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Masukan kode cabang'
                                                    }
                                                ]}
                                            >
                                                <Input placeholder="..." />
                                            </Form.Item>
                                        </Col>

                                        <Col lg={12} xs={24}>
                                            <Form.Item name="name" label="Nama Cabang"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Masukan nama cabang'
                                                    }
                                                ]}
                                            >
                                                <Input placeholder="..." />
                                            </Form.Item>
                                        </Col>

                                        <Col lg={12} xs={24}>
                                            <Form.Item name="company" label="Perusahaan"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Masukan nama perusahaan'
                                                    }
                                                ]}
                                            >
                                                <Input placeholder="..." />
                                            </Form.Item>
                                        </Col>

                                        <Col lg={12} xs={24}>
                                            <Form.Item name="npwp" label="Nomor NPWP"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Masukan nomor npwp'
                                                    }
                                                ]}
                                            >
                                                <Input placeholder="..." />
                                            </Form.Item>
                                        </Col>

                                        <Col lg={12} xs={24}>
                                            <Form.Item name="bank_name" label="Nama Bank"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Masukan nama bank'
                                                    }
                                                ]}
                                            >
                                                <Input placeholder="..." />
                                            </Form.Item>
                                        </Col>

                                        <Col lg={12} xs={24}>
                                            <Form.Item name="account_number" label="Nomor Rekening"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Masukan nomor rekening'
                                                    }
                                                ]}
                                            >
                                                <Input placeholder="..." />
                                            </Form.Item>
                                        </Col>

                                        <Col lg={12} xs={24}>
                                            <Form.Item name="whatsapp_number" label="Nomor Whatsapp"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Masukan nomor  whatsapp'
                                                    }
                                                ]}
                                            >
                                                <Input placeholder="..." />
                                            </Form.Item>
                                        </Col>

                                        <Col lg={12} xs={24}>
                                            <Form.Item name="phone_number" label="Nomor Telepon"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Masukan nomor telepon'
                                                    }
                                                ]}
                                            >
                                                <Input placeholder="..." />
                                            </Form.Item>
                                        </Col>

                                        <Col span={24}>
                                            <Heading>
                                                Integrasi Midtrans
                                            </Heading>
                                            <small className="color-error">Setelah data tersimpan, inputan  integrasi tidak akan menampilkan apapun.</small>

                                            <Row gutter={[8, 8]}>
                                                <Col lg={12} xs={24}>
                                                    <Form.Item name="midtrans_id_merchant" label="ID Merchant"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Masukan data'
                                                            }
                                                        ]}
                                                    >
                                                        <Input placeholder="..." />
                                                    </Form.Item>
                                                </Col>

                                                <Col lg={12} xs={24}>
                                                    <Form.Item name="midtrans_client_key" label="Client key"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Masukan data'
                                                            }
                                                        ]}
                                                    >
                                                        <Input placeholder="..." />
                                                    </Form.Item>
                                                </Col>

                                                <Col lg={12} xs={24}>
                                                    <Form.Item name="midtrans_server_key" label="Server Key"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Masukan data'
                                                            }
                                                        ]}
                                                    >
                                                        <Input placeholder="..." />
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            { false && (<Row gutter={[8, 8]}>
                                                <Col lg={12} xs={24}>
                                                    <Form.Item name="espay_commcode" label="Espay Commmunity Code"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Masukan data'
                                                            }
                                                        ]}
                                                    >
                                                        <Input placeholder="..." />
                                                    </Form.Item>
                                                </Col>

                                                <Col lg={12} xs={24}>
                                                    <Form.Item name="espay_api_key" label="Espay Api Key"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Masukan data'
                                                            }
                                                        ]}
                                                    >
                                                        <Input placeholder="..." />
                                                    </Form.Item>
                                                </Col>

                                                <Col lg={12} xs={24}>
                                                    <Form.Item name="espay_password" label="Espay Password"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Masukan data'
                                                            }
                                                        ]}
                                                    >
                                                        <Input placeholder="..." />
                                                    </Form.Item>
                                                </Col>

                                                <Col lg={12} xs={24}>
                                                    <Form.Item name="espay_signature" label="Espay Signature"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Masukan data'
                                                            }
                                                        ]}
                                                    >
                                                        <Input placeholder="..." />
                                                    </Form.Item>
                                                </Col>
                                            </Row>) }

                                        </Col>

                                        <Col span={24}>
                                            <div onClick={() => setShowSimRS(!showSimRS)} style={{ cursor: 'pointer'}}>
                                                <Heading>
                                                    Integrasi SimRS <i className={"fa fa-"+( !showSimRS ? 'plus' : 'minus' )+"-square"}></i>
                                                </Heading>
                                            </div>
                                        </Col>

                                        <Col span={24}  style={{ display: (showSimRS ? '' : 'none')}}>
                                            <Row gutter={[8, 8]}>
                                                <Col lg={12} xs={24}>
                                                    <Form.Item name="his_api_production" label="Link API Production">
                                                        <Input placeholder="..." />
                                                    </Form.Item>
                                                </Col>

                                                <Col lg={12} xs={24}>
                                                    <Form.Item name="his_api_development" label="Link API Development">
                                                        <Input placeholder="..." />
                                                    </Form.Item>
                                                </Col>

                                                <Col lg={12} xs={24}>
                                                    <Form.Item name="his_api_user" label="Username API">
                                                        <Input placeholder="..." />
                                                    </Form.Item>
                                                </Col>

                                                <Col lg={12} xs={24}>
                                                    <Form.Item name="his_api_pass" label="Password API">
                                                        <Input placeholder="..." />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row> <br/><br/>

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" className="login-form-button" block={true}>
                                                Tambah Data
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </BasicFormWrapper>
                        </Cards>
                    </Col>
                </Row>
            </Main>
        </>
    );
}

export default Create;