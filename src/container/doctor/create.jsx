import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Select, TimePicker, InputNumber, DatePicker } from 'antd';
import moment from 'moment';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Main, BasicFormWrapper } from '../styled';
import { useHistory } from 'react-router-dom';

// Component
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import Heading from '../../components/heading/heading';
import { Button } from '../../components/buttons/buttons';
import Loading from '../../components/loadings';
import { AlertError, AlertSuccess } from '../../components/alerts/alerts';
import { SelectBranch, SelectDepartment, SelectSpecialist, RadioWeekDay, RadioGender } from '../../components/form';

// API
import { createFormError, create_doctor, get_specialist } from '../../api';

const Detail = () => {
    const history = useHistory();
    const [alert, setAlert] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingStatus, setLoadingStatus] = useState();
    const [loadingMessage, setLoadingMessage] = useState();
    const [specialists, setSpecialists] = useState([]);
    const [formValue, setFormValue] = useState({});
    const [form] = Form.useForm();
    
    
    useEffect(() => {
        const getData = async () => {
            _get_specialist();
        }
        getData();

        let storageCreate = localStorage.getItem('doctorCreate');
            storageCreate = JSON.parse(storageCreate);

        if( storageCreate && Object.keys(storageCreate).length > 0) {
            setFormValue(storageCreate);
            if(storageCreate['birth_date']) {
                storageCreate['birth_date'] = moment(storageCreate['birth_date'], 'YYYY-MM-DD');
            }

            if(storageCreate['start_hour']) {
                storageCreate['start_hour'] = moment(storageCreate['start_hour'], 'HH:mm');
            }

            if(storageCreate['end_hour']) {
                storageCreate['end_hour'] = moment(storageCreate['end_hour'], 'HH:mm');
            }

            form.setFieldsValue(storageCreate);
        }
    }, []);

    const _get_specialist = async () => {
        const [result, error] = await get_specialist({all_data: true});
        if(error) {
            console.log('Spesialis: ',error );
        } else {
            setSpecialists(result.data);
        }
    }

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
        if(fields['birth_date']) {
            fields['birth_date'] = fields['birth_date'].format('YYYY-MM-DD');
        }

        if(fields['start_hour']) {
            fields['start_hour'] = fields['start_hour'].format('HH:mm');
        }

        if(fields['end_hour']) {
            fields['end_hour'] = fields['end_hour'].format('HH:mm');
        }

        setAlert('');
        setLoading(true);

        const [result, error] = await create_doctor(fields);
        console.log(result, error);
        if(error) {
            let error_fields = createFormError(result?.errors);
            setAlert(
                AlertError(error)
            );
            setLoading(false);
            form.setFields(error_fields);
        } else {
            setAlert(
                AlertSuccess(
                    result?.message
                )
            );
            setLoading(false);
            localStorage.removeItem('doctorCreate');
            setTimeout(() => {
                history.push('/admin/doctor/detail/'+result.data.pid+'/information');
            }, 2000);
        }
    }

    const createPassword = (e) => {
        let str = form.getFieldValue('email');
        var nameReplace = str.replace(/@.*$/,"");
        var name = nameReplace!==str ? nameReplace : null;

        form.setFieldsValue({
            password: name
        });
        formValue['password'] = name;

        setFormValue(formValue);
    }

    const onValuesChange = (e) => {
        let key = Object.keys(e)[0];
        let value = e[key];

        if(key === 'birth_date') {
            if(value) value = value.format('YYYY-MM-DD');
        }
        else if(key === 'start_hour') {
            if(value) value = value.format('HH:mm');
        }
        else if(key === 'end_hour') {
            if(value) value = value.format('HH:mm');
        }

        formValue[key] = value;

        setFormValue(formValue);
        
        localStorage.setItem('doctorCreate', JSON.stringify(formValue));
    }

    const FormInput = () => {
        return(
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

                    <Row gutter={25}>
                        <Col lg={12} xs={24}>
                            <Form.Item name="email" label="Alamat Email" onChange={createPassword}
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
                            <Form.Item name="password" label="Password" extra={<small className="color-error">Otomatis dari username email atau isi manual.</small>}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Masukan password akun'
                                    }
                                ]}
                            >
                                <Input placeholder="..." />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Heading>
                        Informasi Pribadi
                    </Heading>

                    <Row gutter={25}>
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
                                {/* <Select
                                    showSearch
                                    placeholder="Pilih spesialis"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.join('').toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {   Object.keys(specialists).map(index => {
                                            let data = specialists[index];
                                            return <Select.Option key={data.specialist_id} value={data.specialist_id}>{data.title} ( {data.alt_name} )</Select.Option>;
                                        })
                                    }
                                </Select> */}
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
                            <Form.Item name="birth_date" label="Tanggal Lahir" rules={[ { required: true, message: 'Masukan tanggal lahir' } ]} >
                                <DatePicker />
                            </Form.Item>
                        </Col>
                    </Row> <br/>
                    
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
                                <TimePicker initialValue={moment('00:00', 'HH:mm')} format={'HH:mm'} />
                            </Form.Item>
                        </Col>
                        <Col lg={4} xs={24}>
                            <Form.Item label="Jam Selesai" name="end_hour" rules={[{ required: true, message: 'Masukan jam selesai'}]}>
                                <TimePicker initialValue={moment('00:00', 'HH:mm')} format={'HH:mm'} />
                            </Form.Item>
                        </Col>
                        <Col lg={4} xs={24}>
                            <Form.Item label="Durasi" name="duration" rules={[{ required: true, message: 'Masukan durasi'}]}>
                                <InputNumber placeholder="..." min={1} />
                            </Form.Item>
                        </Col>
                    </Row> <br/>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" block={true}>
                                Tambah Data
                        </Button>
                    </Form.Item>
                </Form>
            </BasicFormWrapper>
        );
    }

    return(
        <>
            <PageHeader
                ghost
                title="Tambah Dokter"
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
                                FormInput()
                            }
                        </Cards>
                    </Col>
                </Row>
            </Main>
        </>
    );
}

export default Detail;