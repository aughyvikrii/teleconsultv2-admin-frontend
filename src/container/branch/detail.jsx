import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input } from 'antd';
import { Main, BasicFormWrapper } from '../styled';
import { useHistory, useParams, Link } from 'react-router-dom';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

// Component
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import Heading from '../../components/heading/heading';
import { Button } from '../../components/buttons/buttons';
import Loading from '../../components/loadings';
import { AlertError } from '../../components/alerts/alerts';

// API
import { update_branch, detail_branch } from '../../api';

const Detail = () => {
    const history = useHistory();
    const { id } = useParams();
    const [alert, setAlert] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadingStatus, setLoadingStatus] = useState();
    const [loadingMessage, setLoadingMessage] = useState();
    const [data, setData] = useState({});
    const [form] = Form.useForm();

    useEffect( () => {
        getData();
        // eslint-disable-next-line
    }, []);

    const getData = async () => {
        setLoadingMessage('Proses mengambil data...');
        const [result, error] = await detail_branch(id);

        if(error) {
            setLoadingMessage(error);
            setLoadingStatus('error');
        } else {
            setLoadingStatus('ok');
            setLoadingMessage('Data ditemukan');

            setData(result.data);
            form.setFieldsValue(result.data);
            setCropData(result.data.thumbnail);
            setLoading(false);
        }
    }

    const [showSimRS,  setShowSimRS] = useState(false);

    // Start: Cropper
    const [image, setImage] = useState();
    const [cropData, setCropData] = useState("");
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

    const onSubmit = async (fields) => {
        setAlert('');
        setLoading(true);
        setLoadingStatus('');
        setLoadingMessage('memproses permintaan...');
        const [result, error] = await update_branch(data.branch_id, fields);
        if(!result) {
            setLoading(false);
            setLoadingStatus('');
            setLoadingMessage('');
            setAlert(
                AlertError(error)
            );
        } else {
            setLoadingStatus('ok');
            setLoadingMessage(
                <>
                Proses berhasil! Anda akan dialihkan atau <Link onClick={getData}>klik disini</Link>...
                </>
            );
            setTimeout(() => {
                getData();
            }, 2000);
        }
    }

    return(
        <>
            <PageHeader
                ghost
                title="Update Cabang"
                buttons={[
                    <div key="6" className="page-header-actions">
                        <Button size="small" key="4" type="primary" onClick={() => history.goBack()}>
                        <i aria-hidden="true" className="fa fa-arrow-circle-left"></i>
                            Kembali
                        </Button>
                    </div>
                    ]}
            />
            <Main>
                <Row gutter={25}>
                    <Col lg={24} xs={24}>
                        {alert}
                        <Cards headless={true} >
                            {   loading ?
                                <div className="text-center">
                                    <Loading status={loadingStatus} /> <br/>
                                    {loadingMessage}
                                </div>
                            :
                            <BasicFormWrapper>
                                <Heading>
                                    Umum
                                </Heading>
                                <Form
                                    form={form}
                                    onFinish={onSubmit}
                                >
                                    <Row gutter={25}>
                                        <Col lg={24} xs={24}>
                                            <Form.Item label="Gambar/Logo Cabang">
                                                <input type="file" accept="image/*" onChange={imageChange} /> <br/>

                                                <div style={{ width: "100%", display: ( cropData.length > 2 ? '' : 'none' ) }}>
                                                    <img src={cropData} alt="cropped" />
                                                </div>

                                                <div style={{ display: ( image ? '' : 'none' ) }} >
                                                    <Cropper
                                                        style={{ height: 400, width: "100%", display: ( cropData.length < 2 ? '' : 'none' ) }}
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
                                                    <button type="button" style={{ float: "right", display: ( cropData.length < 2 ? '' : 'none' ) }} onClick={getCropData}>
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
                                    </Row>

                                    <Row gutter={25}>
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
                                    </Row>
                                    <br/>
                                    
                                    <Row gutter={25}>
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
                                    </Row>

                                    <br/>
                                    <Row gutter={25}>
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
                                    </Row>

                                    <br/>
                                    <Row gutter={25}>
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
                                    </Row>
                                    <br/>

                                    <div onClick={() => setShowSimRS(!showSimRS)}>
                                        <Heading>
                                            Integrasi Espay
                                        </Heading>
                                        <small className="color-error">Untuk alasan kerahasiaan, data integrasi tidak akan dimunculkan.</small>
                                    </div> <br/>

                                    <Row gutter={25}>
                                        <Col lg={12} xs={24}>
                                            <Form.Item name="espay_commcode" label="Espay Commmunity Code" >
                                                <Input placeholder="..." />
                                            </Form.Item>
                                        </Col>

                                        <Col lg={12} xs={24}>
                                            <Form.Item name="espay_api_key" label="Espay Api Key" >
                                                <Input placeholder="..." />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <br/>

                                    <Row gutter={25}>
                                        <Col lg={12} xs={24}>
                                            <Form.Item name="espay_password" label="Espay Password" >
                                                <Input placeholder="..." />
                                            </Form.Item>
                                        </Col>

                                        <Col lg={12} xs={24}>
                                            <Form.Item name="espay_signature" label="Espay Signature" >
                                                <Input placeholder="..." />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <br/>

                                    <div onClick={() => setShowSimRS(!showSimRS)} style={{ cursor: 'pointer'}}>
                                        <Heading>
                                            Integrasi SimRS <i className={"fa fa-"+( !showSimRS ? 'plus' : 'minus' )+"-square"}></i>
                                        </Heading>
                                    </div>

                                    <div style={{ display: (showSimRS ? '' : 'none')}}>
                                        <Row gutter={25}>
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
                                        </Row>
                                        <br/>

                                        <Row gutter={25}>
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
                                        <br/>
                                    </div>

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" className="login-form-button" block={true}>
                                                Update Data
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </BasicFormWrapper>
                            }
                        </Cards>
                    </Col>
                </Row>
            </Main>
        </>
    );
}

export default Detail;