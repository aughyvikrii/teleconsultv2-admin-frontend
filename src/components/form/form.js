import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Form, TimePicker, Input } from 'antd';
import moment from 'moment';
import { BasicFormWrapper } from '../style';
import { SelectBranch, SelectDepartment, SelectDoctor, RadioWeekDay } from './index';
import Loading from '../../components/loadings';
import { InputTime } from '../../components/input';
import { get_branch, get_department, get_doctor, create_doctor_schedule, update_doctor_schedule, detail_branch } from '../../api';

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
        doctors = null,
        departments = null,
        branches = null,
        defaultForm = null,
        fromModal = false,
        callback = null,
        closeModal = null,
        scheduleData = null,
    } = props;

    const form = !defaultForm ? Form.useForm()[0] : defaultForm;
    const dispatch = useDispatch();

    const [listBranch, setListBranch] = useState([]);
    const [listDepartment, setListDepartment] = useState([]);
    const [listDoctor, setListDoctor] = useState([]);

    const [loadingDoctor, setLoadingDoctor] = useState(false);
    const [loadingBranch, setLoadingBranch] = useState(false);
    const [loadingDepartment, setLoadingDepartment] = useState(false);
    const [firstLoading, setFirstLoading] = useState(true);
    
    const schedule_id = scheduleData?.schedule_id ? scheduleData.schedule_id : null;

    useEffect(() => {

        if(!loadingDoctor && firstLoading && !schedule_id) {
            if(!doctors && !doctor_id) get_data_doctor();
            else setListDoctor(doctors);
        }

        if(!loadingDepartment) {
            if(!departments) {
                if(listDepartment?.length === 0) get_data_department();
            }
            else setListDepartment(departments);
        }

        if(!loadingBranch) {
            if(!branches) {
                if(listBranch?.length === 0) get_data_branch();
            }
            else {
                setListBranch(branches);
            }
        }

        
        setFirstLoading(false);

        if(scheduleData?.schedule_id) {
            form.setFieldsValue({
                branch: scheduleData?.branch_id,
                department: scheduleData?.department_id,
                fee: scheduleData?.fee,
                duration: scheduleData?.duration,
                start_hour: scheduleData?.start_hour,
                end_hour: scheduleData?.end_hour,
                weekday: scheduleData?.weekday_id
            });
        } else {
            form.resetFields();
        }
    }, [props]);

    const get_data_doctor = async () => {
        setLoadingDoctor(true);
        const {
            result, error
        } = await get_doctor({paginate: false});

        if(!error) {
            setListDoctor(result.data);
        }
        setLoadingDoctor(false);
    }

    const get_data_department = async () => {
        setLoadingDepartment(true);
        const {
            result, error
        } = await get_department({paginate: false});

        if(!error) {
            setListDepartment(result.data);
        }
        setLoadingDepartment(false);
    }

    const get_data_branch = async () => {
        setLoadingBranch(true);
        const {
            result, error
        } = await get_branch({paginate: false});

        if(!error) {
            setListBranch(result.data);
        }
        setLoadingBranch(false);
    }

    const onFinish = async (fields) => {
        dispatch(loadingStart());
        dispatch(loadingContent(!schedule_id ? 'Menambah jadwal ...' : 'Mengupdate jadwal...'));

        let res;
        if(!schedule_id) {
            if(!doctor_id) doctor_id = fields.doctor;
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

    return(<>
        <BasicFormWrapper>
            <Form
                form={form}
                onFinish={onFinish}
                onValuesChange={onValuesChange}
            >
                { !doctor_id && !schedule_id && (<>
                        <Row gutter={25}>
                            <Col lg={24} xs={24}>
                                <Form.Item  name="doctor" label="Dokter" rules={[{ required: true, message: 'Pilih dokter' } ]}>
                                    <SelectDoctor searchable="true" list={listDoctor}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <br/>
                    </>)
                }
                <Row gutter={25}>
                    <Col lg={12} xs={24}>
                        <Form.Item name="branch" label="Cabang" rules={[ { required: true, message: 'Pilih cabang praktek' } ]} >
                            <SelectBranch list={listBranch}/>
                        </Form.Item>
                    </Col>
                    <Col lg={12} xs={24}>
                        <Form.Item name="department" label="Departemen" rules={[ { required: true, message: 'Pilih cabang praktek' } ]} >
                            <SelectDepartment list={listDepartment} />
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
                            <InputTime placeholder="23:59" />
                        </Form.Item>
                    </Col>
                    <Col lg={12} xs={24}>
                        <Form.Item label="Jam Selesai" name="end_hour" rules={[{ required: true, message: 'Masukan jam selesai'}]}>
                            <InputTime placeholder="23:59" />
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

// export const FormAddSchedule = (props) => {

//     const {
//         doctor_id = null,
//         loadDoctor = false,
//         dataBranch = null,
//         dataDepartment = null,
//         dataDoctor = null,
//         fullLoad = false,
//         showDoctor = false,
//         ...rest
//     } = props;

//     const [listBranch, setListBranch] = useState([]);
//     const [listDepartment, setListDepartment] = useState([]);
//     const [listDoctor, setListDoctor] = useState([]);

//     const [loading, setLoading] = useState(false);

//     const loadDoctorData = async () => {
//         setLoading(true);
//         const {result, error} = await get_doctor({all_data: true});
//         if(!error) {
//             setListDoctor(result.data);
//         }
//         setLoading(false);
//     }

//     useEffect( () => {
//         if(dataBranch) setListBranch(dataBranch);
//         if(dataDepartment) setListDepartment(dataDepartment);

//         if(loadDoctor) loadDoctorData();
//     }, [dataBranch, dataDepartment]);
    
//     useEffect(() =>  console.log(rest), []);

//     return(<>
//         <BasicFormWrapper>
//             {   loading ?
//                 <div className="text-center">
//                     <Loading/>
//                     Mengambil data dokter
//                 </div>
//                 :
//                 <Form
//                     {...rest}
//                 >
//                     { !showDoctor ? null :
//                         <>
//                         <Row gutter={25}>
//                             <Col lg={24} xs={24}>
//                                 <Form.Item  name="doctor" label="Dokter" rules={[{ required: true, message: 'Pilih dokter' } ]}>
//                                     <SelectDoctor searchable="true" list={listDoctor}/>
//                                 </Form.Item>
//                             </Col>
//                         </Row> <br/>
//                         </>
//                     }
//                     {   !doctor_id ? null : (
//                             <Row gutter={25} style={{ display: 'none' }}>
//                                 <Col lg={24} xs={24}>
//                                     <Form.Item  name="doctor" label="Dokter" initialValue={doctor_id}>
//                                         <Input placeholder="..."/>
//                                     </Form.Item>
//                                 </Col>
//                             </Row>
//                         )
//                     }
//                     <Row gutter={25}>
//                         <Col lg={12} xs={24}>
//                             <Form.Item name="branch" label="Cabang" rules={[ { required: true, message: 'Pilih cabang praktek' } ]} >
//                                 <SelectBranch searchable="true" list={listBranch}/>
//                             </Form.Item>
//                         </Col>
//                         <Col lg={12} xs={24}>
//                             <Form.Item name="department" label="Departemen" rules={[ { required: true, message: 'Pilih cabang praktek' } ]} >
//                                 <SelectDepartment searchable="true" list={listDepartment}/>
//                             </Form.Item>
//                         </Col>
//                     </Row> <br/>
//                     <Row gutter={25}>
//                         <Col lg={24} xs={24}>
//                             <Form.Item name="weekday" label="Hari" rules={[ { required: true, message: 'Pilih hari' } ]} >
//                                 <RadioWeekDay/>
//                             </Form.Item>
//                         </Col>
//                         <Col lg={12} xs={24}>
//                         </Col>
//                     </Row> <br/>
//                     <Row gutter={25}>
//                         <Col lg={12} xs={24}>
//                                 <Form.Item name="fee" label="Tarif Konsultasi" rules={[{ required: true, message: 'Masukan tarif konsultasi'}]} >
//                                     <Input placeholder="..." min={1} />
//                                 </Form.Item>
//                         </Col>
//                         <Col lg={12} xs={24}>
//                             <Form.Item label={<>Durasi &nbsp;<span className="color-error">(menit)</span></>} name="duration" rules={[{ required: true, message: 'Masukan durasi'}]}>
//                                 <Input placeholder="..." min={1} />
//                             </Form.Item>
//                         </Col>
//                     </Row> <br/>

//                     <Row gutter={25}>
//                         <Col lg={12} xs={24}>
//                             <Form.Item label="Jam Mulai" name="start_hour" rules={[{ required: true, message: 'Masukan jam mulai'}]}>
//                                 <TimePicker initialValue={moment('00:00', 'HH:mm')} format={'HH:mm'} />
//                             </Form.Item>
//                         </Col>
//                         <Col lg={12} xs={24}>
//                             <Form.Item label="Jam Selesai" name="end_hour" rules={[{ required: true, message: 'Masukan jam selesai'}]}>
//                                 <TimePicker initialValue={moment('00:00', 'HH:mm')} format={'HH:mm'} />
//                             </Form.Item>
//                         </Col>
//                     </Row>

//                     <Form.Item style={{display: 'none'}} >
//                         <button type='submit'>
//                         Submit
//                         </button>
//                     </Form.Item>
//                 </Form>  
//             }
//         </BasicFormWrapper> 
//     </>);
// }