import React, { useEffect, useState } from 'react';
import { Row, Col, Form, TimePicker, Input } from 'antd';
import moment from 'moment';
import { BasicFormWrapper } from '../style';
import { SelectBranch, SelectDepartment, SelectDoctor, RadioWeekDay } from './index';
import Loading from '../../components/loadings';
import { create_doctor_schedule, update_doctor_schedule, get_branch, get_department, get_doctor } from '../../api';

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
        const [result, error] = await get_doctor({all_data: true});
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
                </Form>  
            }
        </BasicFormWrapper> 
    </>);
}