import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Form, TimePicker, Input } from 'antd';
import moment from 'moment';
import { BasicFormWrapper } from '../style';
import { SelectBranch, SelectDepartment, SelectDoctor, RadioWeekDay } from './index';
import Loading from '../../components/loadings';
import { get_branch, get_department, get_doctor, create_doctor_schedule, update_doctor_schedule } from '../../api';

import {
    loadingStart,
    loadingContent,
    loadingClose,
    loadingSuccess,
    loadingError
} from '../../redux/loadingmodal/actionCreator';

export const FormAddScheduleNew = (props) => {

    let {
        doctor_id = null,
        doctors = [],
        departments = [],
        branches = [],
        basketData = {},
        defaultForm = null,
        fromModal = false,
        type = 'add',
        schedule_id = null,
        callback = null,
        closeModal = null
    } = props;

    const form = !defaultForm ? Form.useForm()[0] : defaultForm;
    const dispatch = useDispatch();

    const [basket, setBasket] = useState({});
    const [listBranch, setListBranch] = useState([]);
    const [listDepartment, setListDepartment] = useState([]);
    const [listDoctor, setListDoctor] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(doctors?.length !== 0 && typeof doctors === 'object') setListDoctor(doctors);
        else if (!doctor_id) get_data_doctor();

        if(departments?.length !== 0 && typeof departments === 'object') setListDepartment(departments);
        else get_data_department();

        if(branches?.length !== 0 && typeof branches === 'object') setListBranch(branches);
        else get_data_branch();
    }, []);

    const get_data_doctor = async () => {
        console.log('get_data_doctor');
    }

    const get_data_department = async () => {
        console.log('get_data_department');
    }

    const get_data_branch = async () => {
        console.log('get_data_branch');
    }

    const onFinish = async (fields) => {
        dispatch(loadingStart());
        dispatch(loadingContent(type === 'add' ? 'Menambah jadwal ...' : 'Mengupdate jadwal...'));

        fields.start_hour = fields?.start_hour?.format("HH:mm");
        fields.end_hour = fields?.end_hour?.format('HH:mm');

        let res;
        if(type === 'add') {
            res = await create_doctor_schedule(doctor_id, fields);
        } else {
            res = await update_doctor_schedule(schedule_id, fields);
        }

        const {
            error, message, errors
        } = res;

        if(error) {
            dispatch(loadingError());
            dispatch(loadingContent(message));
            setTimeout(() => dispatch(loadingClose()), 2000);
            form.setFields(errors);
        } else {
            dispatch(loadingSuccess());
            dispatch(loadingContent(message));
            setTimeout(() => {
                dispatch(loadingClose());
                if(closeModal && typeof closeModal === 'function') closeModal();
                if(callback && typeof callback === 'function') callback();
                form.resetFields();
            }, 3000);
        }
    }

    const onValuesChange = (fields) => {
        console.log('onValuesChange:', fields);
    }

    useEffect(() => {
        if(props?.type) type = props.type;
    }, [props]);

    return(<>
        <BasicFormWrapper>
            <Form
                form={form}
                onFinish={onFinish}
                onValuesChange={onValuesChange}
            >
                { !doctor_id && (<>
                        <Row gutter={25}>
                            <Col lg={24} xs={24}>
                                <Form.Item  name="doctor" label="Dokter" rules={[{ required: true, message: 'Pilih dokter' } ]}>
                                    <SelectDoctor searchable={true} list={listDoctor}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <br/>
                    </>)
                }
                <Row gutter={25}>
                    <Col lg={12} xs={24}>
                        <Form.Item name="branch" label="Cabang" rules={[ { required: true, message: 'Pilih cabang praktek' } ]} >
                            <SelectBranch/>
                        </Form.Item>
                    </Col>
                    <Col lg={12} xs={24}>
                        <Form.Item name="department" label="Departemen" rules={[ { required: true, message: 'Pilih cabang praktek' } ]} >
                            <SelectDepartment/>
                        </Form.Item>
                    </Col>
                </Row> <br/>
                <Row gutter={25}>
                    <Col lg={24} xs={24}>
                        <Form.Item name="weekday" label="Hari" rules={[ { required: true, message: 'Pilih hari' } ]} >
                            <RadioWeekDay/>
                        </Form.Item>
                    </Col>
                    <Col lg={12} xs={24}>
                    </Col>
                </Row> <br/>
                <Row gutter={25}>
                    <Col lg={12} xs={24}>
                            <Form.Item name="fee" label="Tarif Konsultasi" rules={[{ required: true, message: 'Masukan tarif konsultasi'}]} >
                                <Input placeholder="..." min={1} />
                            </Form.Item>
                    </Col>
                    <Col lg={12} xs={24}>
                        <Form.Item label={<>Durasi &nbsp;<span className="color-error">(menit)</span></>} name="duration" rules={[{ required: true, message: 'Masukan durasi'}]}>
                            <Input placeholder="..." min={1} />
                        </Form.Item>
                    </Col>
                </Row> <br/>

                <Row gutter={25}>
                    <Col lg={12} xs={24}>
                        <Form.Item label="Jam Mulai" name="start_hour" rules={[{ required: true, message: 'Masukan jam mulai'}]}>
                            <TimePicker initialValue={moment('00:00', 'HH:mm')} format={'HH:mm'} />
                        </Form.Item>
                    </Col>
                    <Col lg={12} xs={24}>
                        <Form.Item label="Jam Selesai" name="end_hour" rules={[{ required: true, message: 'Masukan jam selesai'}]}>
                            <TimePicker initialValue={moment('00:00', 'HH:mm')} format={'HH:mm'} />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item style={{display: fromModal ? 'none' : ''}} >
                    <button type='submit'>
                    Submit
                    </button>
                </Form.Item>
            </Form>  
        </BasicFormWrapper> 
    </>);
}

export const FormAddSchedule = (props) => {

    const {
        doctor_id = null,
        loadDoctor = false,
        dataBranch = null,
        dataDepartment = null,
        dataDoctor = null,
        fullLoad = false,
        showDoctor = false,
        ...rest
    } = props;

    const [listBranch, setListBranch] = useState([]);
    const [listDepartment, setListDepartment] = useState([]);
    const [listDoctor, setListDoctor] = useState([]);

    const [loading, setLoading] = useState(false);

    const loadDoctorData = async () => {
        setLoading(true);
        const {result, error} = await get_doctor({all_data: true});
        if(!error) {
            setListDoctor(result.data);
        }
        setLoading(false);
    }

    useEffect( () => {
        if(dataBranch) setListBranch(dataBranch);
        if(dataDepartment) setListDepartment(dataDepartment);

        if(loadDoctor) loadDoctorData();
    }, [dataBranch, dataDepartment]);
    
    useEffect(() =>  console.log(rest), []);

    return(<>
        <BasicFormWrapper>
            {   loading ?
                <div className="text-center">
                    <Loading/>
                    Mengambil data dokter
                </div>
                :
                <Form
                    {...rest}
                >
                    { !showDoctor ? null :
                        <>
                        <Row gutter={25}>
                            <Col lg={24} xs={24}>
                                <Form.Item  name="doctor" label="Dokter" rules={[{ required: true, message: 'Pilih dokter' } ]}>
                                    <SelectDoctor searchable={true} list={listDoctor}/>
                                </Form.Item>
                            </Col>
                        </Row> <br/>
                        </>
                    }
                    {   !doctor_id ? null : (
                            <Row gutter={25} style={{ display: 'none' }}>
                                <Col lg={24} xs={24}>
                                    <Form.Item  name="doctor" label="Dokter" initialValue={doctor_id}>
                                        <Input placeholder="..."/>
                                    </Form.Item>
                                </Col>
                            </Row>
                        )
                    }
                    <Row gutter={25}>
                        <Col lg={12} xs={24}>
                            <Form.Item name="branch" label="Cabang" rules={[ { required: true, message: 'Pilih cabang praktek' } ]} >
                                <SelectBranch searchable={true} list={listBranch}/>
                            </Form.Item>
                        </Col>
                        <Col lg={12} xs={24}>
                            <Form.Item name="department" label="Departemen" rules={[ { required: true, message: 'Pilih cabang praktek' } ]} >
                                <SelectDepartment searchable={true} list={listDepartment}/>
                            </Form.Item>
                        </Col>
                    </Row> <br/>
                    <Row gutter={25}>
                        <Col lg={24} xs={24}>
                            <Form.Item name="weekday" label="Hari" rules={[ { required: true, message: 'Pilih hari' } ]} >
                                <RadioWeekDay/>
                            </Form.Item>
                        </Col>
                        <Col lg={12} xs={24}>
                        </Col>
                    </Row> <br/>
                    <Row gutter={25}>
                        <Col lg={12} xs={24}>
                                <Form.Item name="fee" label="Tarif Konsultasi" rules={[{ required: true, message: 'Masukan tarif konsultasi'}]} >
                                    <Input placeholder="..." min={1} />
                                </Form.Item>
                        </Col>
                        <Col lg={12} xs={24}>
                            <Form.Item label={<>Durasi &nbsp;<span className="color-error">(menit)</span></>} name="duration" rules={[{ required: true, message: 'Masukan durasi'}]}>
                                <Input placeholder="..." min={1} />
                            </Form.Item>
                        </Col>
                    </Row> <br/>

                    <Row gutter={25}>
                        <Col lg={12} xs={24}>
                            <Form.Item label="Jam Mulai" name="start_hour" rules={[{ required: true, message: 'Masukan jam mulai'}]}>
                                <TimePicker initialValue={moment('00:00', 'HH:mm')} format={'HH:mm'} />
                            </Form.Item>
                        </Col>
                        <Col lg={12} xs={24}>
                            <Form.Item label="Jam Selesai" name="end_hour" rules={[{ required: true, message: 'Masukan jam selesai'}]}>
                                <TimePicker initialValue={moment('00:00', 'HH:mm')} format={'HH:mm'} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item style={{display: 'none'}} >
                        <button type='submit'>
                        Submit
                        </button>
                    </Form.Item>
                </Form>  
            }
        </BasicFormWrapper> 
    </>);
}