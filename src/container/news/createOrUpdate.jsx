import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { Main, BasicFormWrapper } from '../styled';
import { useHistory, useParams } from 'react-router-dom';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

// Component
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
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

import sliceUpload from '../../utility/upload';

const createOrUpdate = () => {
    const {
        news_id = null
    } = useParams();

    const type = parseInt(news_id) ? 'update' : 'create';

    const history = useHistory();
    const dispatch = useDispatch();
    const [alert, setAlert] = useState(null);
    
    const [form] = Form.useForm();

    // Start: Cropper
    const [longCropper, setLongCropper] = useState(null);
    const [longImage, setLongImage] = useState(null);
    const [longImageRaw, setLongImageRaw] = useState(null);
    
    const [shortCropper, setShortCropper] = useState(null);
    const [shortImage, setShortImage] = useState(null);
    const [shortImageRaw, setShortImageRaw] = useState(null);

    const imageChange = (e, type) => {
        e.preventDefault();

        if(type==='long') {    
            setLongImageRaw(null);
        } else {
            setShortImageRaw(null);
        }

        let files;
        if(e.dataTransfer) {
            files = e.dataTransfer.files;
        } else {
            files = e.target.files;
        }

        const reader = new FileReader();
        reader.onload = () => {
            if(type === 'long') {
                setLongImageRaw(reader.result);
            } else {
                setShortImageRaw(reader.result);
            }
        }
        reader.readAsDataURL(files[0]);
    }

    const getCropData = (type) => {
        if(typeof longCropper !== 'undefined' && type === 'long') {
            setLongImage(longCropper.getCroppedCanvas({
                width: 720,
                height: 720
            }).toDataURL());
        } else if (typeof shortCropper !==  'undefined' && type === 'short') {
            setShortImage(shortCropper.getCroppedCanvas({
                width: 480,
                height: 480
            }).toDataURL());
        }
    }
// End: Cropper

    const handleImageUploadBefore = async (files, info, uploadHandler) => {
        console.log('START UPLOAD IMAGE...');
        let uploadedFile = new sliceUpload({
            file: files[0]
        });
        console.log(uploadedFile);
        // uploadHandler(files)
    }

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
                title={type === 'update' ? 'Update Data' : "Tambah Berita" }
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
                                    <Row gutter={[8, 8]}>
                                        <Col lg={24} xs={24}>
                                            <Form.Item label="Thumbnail Panjang (1:3)">
                                                <input type="file" accept="image/*" onChange={(e) =>  imageChange(e, 'long')} /> <br/>

                                                <div style={{ width: "100%", display: ( longImage?.length ? '' : 'none' ) }}>
                                                    <img src={longImage} alt="cropped" />
                                                </div>

                                                <div style={{ display: ( longImageRaw && !longImage ? '' : 'none' ) }} >
                                                    <Cropper
                                                        style={{ height: 400, width: "100%" }}
                                                        // initialAspectRatio={1}
                                                        // preview=".img-preview"
                                                        aspectRatio={3}
                                                        src={longImageRaw}
                                                        viewMode={1}
                                                        guides={true}
                                                        // minCropBoxHeight={10}
                                                        // minCropBoxWidth={10}
                                                        background={false}
                                                        responsive={true}
                                                        autoCropArea={1}
                                                        checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                                                        onInitialized={(instance) => {
                                                            setLongCropper(instance);
                                                        }}
                                                    /> <br/>
                                                    <button type="button" style={{ float: "right" }} onClick={() => getCropData('long')}>
                                                        Potong Gambar
                                                    </button>
                                                </div>
                                            </Form.Item>
                                            <Form.Item label="crop image" name="longImage" style={{display:'none'}} >
                                                <Input placeholder="..."/>
                                            </Form.Item>
                                        </Col>

                                        <Col lg={24} xs={24}>
                                            <Form.Item label="Thumbnail kecil (1:1)">
                                                <input type="file" accept="image/*" onChange={(e) =>  imageChange(e, 'short')} /> <br/>

                                                <div style={{ width: "100%", display: ( shortImage?.length ? '' : 'none' ) }}>
                                                    <img src={shortImage} alt="cropped" />
                                                </div>

                                                <div style={{ display: ( shortImageRaw && !shortImage ? '' : 'none' ) }} >
                                                    <Cropper
                                                        style={{ height: 400, width: "100%" }}
                                                        // initialAspectRatio={1}
                                                        // preview=".img-preview"
                                                        aspectRatio={1}
                                                        src={shortImageRaw}
                                                        viewMode={1}
                                                        guides={true}
                                                        // minCropBoxHeight={10}
                                                        // minCropBoxWidth={10}
                                                        background={false}
                                                        responsive={true}
                                                        autoCropArea={1}
                                                        checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                                                        onInitialized={(instance) => {
                                                            setShortCropper(instance);
                                                        }}
                                                    /> <br/>
                                                    <button type="button" style={{ float: "right" }} onClick={() => getCropData('short')}>
                                                        Potong Gambar
                                                    </button>
                                                </div>
                                            </Form.Item>
                                            <Form.Item label="crop image" name="shortImage" style={{display:'none'}} >
                                                <Input placeholder="..."/>
                                            </Form.Item>
                                        </Col>

                                        <Col span={24}>
                                            <Form.Item label="Judul" name="title" rules={[{required: true, message: 'Masukan Judul Berita!'}]} >
                                                <Input placeholder="..."/>
                                            </Form.Item>
                                        </Col>

                                        <Col span={24}>
                                            <Form.Item label="Isi Berita" name="news" rules={[{required: true, message: 'Masukan isi berita!'}]}>
                                                {/* <Input.TextArea rows={5}/> */}
                                                <SunEditor
                                                    onImageUploadBefore={handleImageUploadBefore}
                                                    enableToolbar={true}
                                                    showToolbar={true}
                                                    height="500px"
                                                    setOptions={{
                                                        buttonList: [[
                                                            'font',
                                                            'fontSize',
                                                            'formatBlock',
                                                            'fontColor',
                                                            'align',
                                                            'blockquote',
                                                            'hiliteColor',
                                                            'horizontalRule',
                                                            'lineHeight',
                                                            'list',
                                                            'paragraphStyle',
                                                            'table',
                                                            'link',
                                                            'image',
                                                            // 'video',
                                                            // 'audio',
                                                        ]]
                                                    }}
                                                />
                                            </Form.Item>
                                        </Col>

                                        <Col span={24}>
                                            <Form.Item>
                                                <Button type="primary" htmlType="submit" className="login-form-button" block={true}>
                                                        Tambah Data
                                                </Button>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            </BasicFormWrapper>
                        </Cards>
                    </Col>
                </Row>
            </Main>
        </>
    );
}

export default createOrUpdate;