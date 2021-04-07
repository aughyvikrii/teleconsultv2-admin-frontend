import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Form, Input, InputNumber } from 'antd';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Main, BasicFormWrapper } from '../styled';
import { useHistory, useParams } from 'react-router-dom';

// Component
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import Heading from '../../components/heading/heading';
import { Button } from '../../components/buttons/buttons';
import { AlertError, AlertSuccess } from '../../components/alerts/alerts';
import { SelectBranch, SelectDepartment, SelectSpecialist, RadioWeekDay, RadioGender } from '../../components/form';

// API
import { create_doctor, detail_doctor, update_doctor } from '../../api';

import { SelectDate, SelectMonth, SelectYear, InputTime } from '../../components/input';
import {
    loadingStart,
    loadingClose,
    loadingContent,
    loadingError,
    loadingSuccess
} from '../../redux/loadingmodal/actionCreator';

const CreateOrUpdate = () => {

    const {id} = useParams();

    const history = useHistory();
    const dispatch = useDispatch();

    const [alert, setAlert] = useState('');
    const [formValue, setFormValue] = useState({});
    const storage = !id ? 'doctorCreate' : 'doctorUpdate';
    const [form] = Form.useForm();
    
    const getData = async() => {

        const {result, error, message} = await detail_doctor(id);

        if(error) {
            setAlert(<AlertError message={message}/>);
        } else {
            const person = result?.data?.person;

            let birth_date = person?.birth_date ? person.birth_date : "0-0-0";
                birth_date = birth_date.split('-');
            let birth_date_d = parseInt(birth_date[2]),
                birth_date_m = parseInt(birth_date[1]),
                birth_date_y = parseInt(birth_date[0]);

            let _form_data = {
                email: person?.email,
                display_name: person?.display_name,
                specialist: person?.specialist_id,
                phone_number: person?.phone_number,
                gender: person?.gender_id,
                birth_place: person?.birth_place,
                birth_date_d: birth_date_d,
                birth_date_m: birth_date_m,
                birth_date_y: birth_date_y,
                cropData: person?.profile_pic,
            };

            form.setFieldsValue(_form_data);
            setFormValue(_form_data);
            setCropData(person?.profile_pic);

            localStorage.setItem(storage, JSON.stringify(_form_data));
        }
    }
    
    useEffect(() => {

        let storageCreate = localStorage.getItem(storage);
            storageCreate = JSON.parse(storageCreate);

        if( storageCreate && Object.keys(storageCreate).length > 0) {
            setFormValue(storageCreate);
            form.setFieldsValue(storageCreate);
            console.log(formValue);
            if(id && storageCreate?.cropData) {
                setCropData(storageCreate.cropData);
            }
        } else {
            if(id) getData();
        }
    }, []);
    
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
        }, [cropData]);
    // End: Cropper

    const onSubmit = async (fields) => {

        dispatch(loadingStart());
        dispatch(loadingContent(!id ? 'Proses menambah dokter...' : 'Proses update dokter...'));
        setAlert(null);

        fields['birth_date'] = fields['birth_date_y'] +'-'+ fields['birth_date_m'] + '-' + fields['birth_date_d']

        let request;

        if(id) {
            request = await update_doctor(id, fields);
        } else {
            request = await create_doctor(fields);
        }

        const {result, error, message, errors} = request;
        if(error) {
            dispatch(loadingError());
            dispatch(loadingContent(message));
            setAlert(<AlertError message={message} />);
            form.setFields(errors);
            setTimeout(() =>  dispatch(loadingClose()), 3000);
        } else {
            dispatch(loadingSuccess());
            dispatch(loadingContent(message));
            setAlert(<AlertSuccess message={message}/>);
            localStorage.removeItem(storage);
            setTimeout(() => {
                dispatch(loadingClose());
                history.push('/admin/doctor/'+result.data.pid+'/information')
            }, 2000);
        }
    }

    const onValuesChange = (e) => {
        let key = Object.keys(e)[0];
        let value = e[key];

        formValue[key] = value;

        setFormValue(formValue);
        
        localStorage.setItem(storage, JSON.stringify(formValue));
    }

    return(
        <>
            <PageHeader
                ghost
                title={ (id ? 'Update' : 'Tambah') + " Dokter"}
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
                            <BasicFormWrapper>
                                <Form
                                    form={form}
                                    onFinish={onSubmit}
                                    onValuesChange={onValuesChange}
                                >
                                    <Heading>
                                        Foto Profil
                                    </Heading>
                                    <Row gutter={25}>
                                        <Col lg={24} xs={24}>
                                            <Form.Item>
                                                <input type="file" accept="image/*" onChange={imageChange} /> <br/>

                                                <div style={{ width: "100%", display: ( cropData.length > 2 ? '' : 'none' ) }}>
                                                    <img src={cropData} alt="cropped" />
                                                </div>

                                                <div style={{ display: ( image ? '' : 'none' ) }} >
                                                    <Cropper
                                                        style={{ height: 400, width: "100%", display: ( cropData.length < 2 ? '' : 'none' ) }}
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

                                    <Heading>
                                        Akun Aplikasi
                                    </Heading>

                                    <Row gutter={[25, 25]}>
                                        <Col lg={12} xs={24}>
                                            <Form.Item name="email" label="Alamat Email"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Masukan alamat email'
                                                    }
                                                ]}
                                            >
                                                <Input placeholder="..." />
                                            </Form.Item>
                                        </Col>
                                        <Col lg={12} xs={24}>
                                            <Form.Item name="password" label="Password" extra={( !id ? '' : (<small className="color-error">Biarkan kosong jika tidak akan diupdate</small>))}
                                                rules={[
                                                    {
                                                        required: !id ? true : false,
                                                        message: 'Masukan password akun'
                                                    }
                                                ]}
                                            >
                                                <Input placeholder="..." />
                                            </Form.Item>
                                        </Col>
                                    </Row> <br/>

                                    <Heading>
                                        Informasi Pribadi
                                    </Heading>

                                    <Row gutter={[25, 25]}>
                                        <Col lg={12} xs={24}>
                                            <Form.Item name="display_name" label="Nama Tampilan"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Masukan nama tampilan'
                                                    }
                                                ]}
                                            >
                                                <Input placeholder="..." />
                                            </Form.Item>
                                        </Col>

                                        <Col lg={12} xs={24}>
                                            <Form.Item name="specialist" label="Spesialis"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Pilih spesialis'
                                                    }
                                                ]}
                                            >
                                                <SelectSpecialist/>
                                            </Form.Item>
                                        </Col>
                                    </Row> <br/>

                                    <Row gutter={25}>
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
                                        <Col lg={12} xs={24}>
                                            <Form.Item name="gender" label="Jenis Kelamin"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Pilih jenis kelamin'
                                                    }
                                                ]}
                                            >
                                                <RadioGender/>
                                            </Form.Item>
                                        </Col>
                                    </Row> <br/>

                                    <Row gutter={25}>
                                        <Col lg={12} xs={24}>
                                            <Form.Item name="birth_place" label="Tempat Lahir" rules={[{ required: true, message: 'Masukan tempat lahir' } ]} >
                                                <Input placeholder="..." />
                                            </Form.Item>
                                        </Col>
                                        <Col lg={12} xs={24}>
                                            <Row gutter={[8, 8]}>
                                                <Col span={8}>
                                                    <Form.Item name="birth_date_d" label="Tanggal Lahir" rules={[ { required: true, message: 'Masukan tanggal lahir' } ]} >
                                                        <SelectDate/>
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item name="birth_date_m" label={(<br/>)} className="no-required" rules={[ { required: true, message: 'Masukan bulan lahir' } ]} >
                                                        <SelectMonth/>
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item name="birth_date_y" label={(<br/>)} className="no-required" rules={[ { required: true, message: 'Masukan tahun lahir' } ]} >
                                                        <SelectYear start={1850}/>
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row> <br/>
                                    
                                    {!id && (<>
                                        <Heading>
                                        Jadwal Praktek
                                    </Heading>

                                    <Row gutter={25}>
                                        <Col xs={24} lg={12}>
                                            <Form.Item name="branch" label="Cabang" rules={[ { required: true, message: 'Pilih cabang praktek' } ]} >
                                                <SelectBranch/>
                                            </Form.Item>
                                        </Col>

                                        <Col xs={24} lg={12}>
                                            <Form.Item name="department" label="Departemen" rules={[ { required: true, message: 'Pilih departemen' } ]} >
                                                <SelectDepartment/>
                                            </Form.Item>
                                        </Col>
                                    </Row> <br/>

                                    <Row gutter={25}>
                                        <Col lg={12} xs={24}>
                                            <Form.Item name="weekday" label="Hari" rules={[ { required: true, message: 'Pilih hari' } ]} >
                                                <RadioWeekDay/>
                                            </Form.Item>
                                        </Col>

                                        <Col lg={12} xs={24}>
                                            <Form.Item name="fee" label="Tarif Konsultasi" rules={[{ required: true, message: 'Masukan tarif konsultasi'}]} >
                                                <InputNumber placeholder="..." min={1} />
                                            </Form.Item>
                                        </Col>
                                    </Row> <br/>

                                    <Row gutter={25}>
                                        <Col lg={4} xs={24}>
                                            <Form.Item label="Jam Mulai" name="start_hour" rules={[{ required: true, message: 'Masukan jam mulai'}]}>
                                                <InputTime/>
                                            </Form.Item>
                                        </Col>
                                        <Col lg={4} xs={24}>
                                            <Form.Item label="Jam Selesai" name="end_hour" rules={[{ required: true, message: 'Masukan jam selesai'}]}>
                                                <InputTime/>
                                            </Form.Item>
                                        </Col>
                                        <Col lg={4} xs={24}>
                                            <Form.Item label="Durasi" name="duration" rules={[{ required: true, message: 'Masukan durasi'}]}>
                                                <InputNumber placeholder="..." min={1} />
                                            </Form.Item>
                                        </Col>
                                    </Row> <br/>
                                    </>)}

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" className="login-form-button" block={true}>
                                                {id ? 'Update Data' : 'Tambah Data'}
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

export default CreateOrUpdate;