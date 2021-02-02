import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Row, Col, Form, Radio, TimePicker, Input, Popconfirm, Message, Table } from 'antd';
import moment from 'moment';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { ButtonHeading } from '../../../components/cards/style';
import { Modal } from '../../../components/modals/antd-modals';
import { SelectBranch, SelectDepartment, RadioWeekDay } from '../../../components/form';
import { useParams } from 'react-router-dom';
import { BasicFormWrapper } from '../../styled';
import Loading from '../../../components/loadings';

import { AlertError } from '../../../components/alerts/alerts';
import { createFormError, get_doctor_schedule, create_doctor_schedule, update_doctor_schedule, get_branch, get_department } from '../../../api';

const DoctorSchedule = () => {

    const [listType, setListType]  = useState('perday');

    const [isLoading, setLoading] = useState('');
    const [loadingStatus, setLoadingStatus] = useState('');
    const [alert, setAlert] =  useState();

    const [schedules, setSchedules] = useState([]);
    const [perDay, setPerDay] = useState({});
    const [perBranch, setPerBranch] = useState({});
    const [perDepartment, setPerDepartment] = useState({});

    const [listBranch, setListBranch] = useState([]);
    const [listDepartment, setListDepartment] = useState([]);

    const [form] = Form.useForm();

    const [modal, setModal] = useState({
        visible: false,
        title: 'Tambah Jadwal',
        action: 'add'
    });

    const {id} = useParams();

    const getData = async () => {
        const [result, error] = await get_doctor_schedule(id);
        if(error) {
            setSchedules([]);
        } else {
            setSchedules(result.data);
        }
    }

    const _get_branch = async () => {
        const [result, error] = await get_branch({all_data: true});
        console.log('branch: ', result, 'error:', error);
        if(!error) {
            setListBranch(result.data);
        }
    }

    const _get_department = async () => {
        const [result, error] = await get_department({all_data: true});
        console.log('department: ', result, 'error:', error);
        if(!error) {
            setListDepartment(result.data);
        }
    }

    useEffect( () => {
        _get_branch();
        _get_department();
    }, []);

    useEffect( () => {
        getData();
        // eslint-disable-next-line
    }, [id]);

    useEffect( () =>{
        let day = {};
        let branch = {};
        let department = {};

        let struct = {
            name: '',
            data: []
        };

        schedules.map(row => {

            if(typeof day[row.weekday] === 'undefined') day[row.weekday] = _.cloneDeep(struct);

            row.key = row.schedule_id;
            row.id = row.schedule_id;

            row.action = (
                <div className="table-actions">
                    <>
                        <Button className="btn-icon" size="default" shape="round" type="primary" title="Update" onClick={() => modalEdit(row)}>
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
            );

            day[row.weekday]['name'] = row.weekday_alt;
            day[row.weekday]['data'].push(row);

            if(typeof branch[row.branch_id] === 'undefined') branch[row.branch_id] = _.cloneDeep(struct);

            branch[row.branch_id]['name'] = row.branch;
            branch[row.branch_id]['data'].push(row);

            if(typeof department[row.department_id] === 'undefined') department[row.department_id] = _.cloneDeep(struct);
            department[row.department_id]['name'] = row.department;
            department[row.department_id]['data'].push(row);
        });

        setPerDay(day);
        setPerBranch(branch);
        setPerDepartment(department);
        console.log(day);

    }, [schedules]);

    const PerDayTable = () => {

        const columns = [
            { title: 'ID', dataIndex: 'id', key: 'id'},
            { title: 'Cabang', dataIndex: 'branch', key: 'branch' },
            { title: 'Departemen', dataIndex: 'department', key: 'department' },
            { title: 'Mulai', dataIndex: 'start_hour', key: 'start_hour' },
            { title: 'Selesai', dataIndex: 'end_hour', key: 'end_hour' },
            { title: 'Durasi', dataIndex: 'duration', key: 'duration' },
            { title: 'Tarif', dataIndex: 'fee', key: 'fee' },
            { title: 'Dibuat oleh', dataIndex: 'creator', key: 'creator' },
            { title: '#', dataIndex: 'action', key: 'action'},
        ]

        return(
            <>
                <h1 className="text-center">Data Perhari</h1>
                {   Object.keys(perDay).map(id => {
                        let source = perDay[id];
                        return (
                            <Table key={id}
                                columns={columns}
                                dataSource={source.data}
                            />
                        );
                    })
                }
            </>
        );
    }

    const PerBranchTable = () => {
        const columns = [
            { title: 'ID', dataIndex: 'id', key: 'id'},
            { title: 'Departemen', dataIndex: 'department', key: 'department' },
            { title: 'Hari', dataIndex: 'weekday_alt', key: 'weekday_alt' },
            { title: 'Mulai', dataIndex: 'start_hour', key: 'start_hour' },
            { title: 'Selesai', dataIndex: 'end_hour', key: 'end_hour' },
            { title: 'Durasi', dataIndex: 'duration', key: 'duration' },
            { title: 'Tarif', dataIndex: 'fee', key: 'fee' },
            { title: 'Dibuat oleh', dataIndex: 'creator', key: 'creator' },
            { title: '#', dataIndex: 'action', key: 'action'},
        ]

        return(
            <>
                <h1 className="text-center">Data Perhari</h1>
                {   Object.keys(perBranch).map(id => {
                        let source = perBranch[id];
                        return (
                            <Table key={id}
                                columns={columns}
                                dataSource={source.data}
                            />
                        );
                    })
                }
            </>
        );
    }

    const PerDepartment = () => {
        const columns = [
            { title: 'ID', dataIndex: 'id', key: 'id'},
            { title: 'Cabang', dataIndex: 'branch', key: 'branch' },
            { title: 'Hari', dataIndex: 'weekday_alt', key: 'weekday_alt' },
            { title: 'Mulai', dataIndex: 'start_hour', key: 'start_hour' },
            { title: 'Selesai', dataIndex: 'end_hour', key: 'end_hour' },
            { title: 'Durasi', dataIndex: 'duration', key: 'duration' },
            { title: 'Tarif', dataIndex: 'fee', key: 'fee' },
            { title: 'Dibuat oleh', dataIndex: 'creator', key: 'creator' },
            { title: '#', dataIndex: 'action', key: 'action'},
        ]

        return(
            <>
                <h1 className="text-center">Data Perhari</h1>
                {   Object.keys(perDepartment).map(id => {
                        let source = perDepartment[id];
                        return (
                            <Table key={id}
                                columns={columns}
                                dataSource={source.data}
                            />
                        );
                    })
                }
            </>
        );
    }

    const modalFunc = (type, data={}) => {
        setModal({ ...modal, visible: true });
    }

    const closeModal = () => {
        setModal({ ...modal, visible: false });
    }

    const submitForm = async (fields) => {
        fields['start_hour'] = fields['start_hour'].format('HH:mm');
        fields['end_hour'] = fields['end_hour'].format('HH:mm');

        if(modal.action === 'add') return createSchedule(fields);
        else return updateSchedule(fields);
    }

    const createSchedule = async (fields) => {
        setLoading(true);
        setAlert('');
        const [result, error] = await create_doctor_schedule(id, fields);

        if(error) {
            let error_fields = createFormError(result?.errors);
            setAlert(
                AlertError(error)
            );
            setLoading(false);
            form.setFields(error_fields);
        } else {
            setLoadingStatus('ok');
            setAlert('Berhasil menambah data');
            form.resetFields();
            getData();
            setTimeout(() => {
                setLoading(false);
                closeModal();
            }, 2000);
        }
    }

    const updateSchedule  = async (fields) => {
        setLoading(true);
        setAlert('');
        
        let [result, error] = await update_doctor_schedule(modal.schedule_id, fields);

        if(error) {
            setAlert(
                AlertError(result)
            );
            setLoading(false);
        } else {
            setLoadingStatus('ok');
            setAlert('Berhasil update data');
            form.resetFields();
            getData();
            setTimeout(() => {
                setLoading(false);
                closeModal();
            }, 2000);
        }
    }

    return(
        <>
        <Row gutter={25}>
            <Col lg={24} xs={24}>
                <Cards
                    title="Jadwal Praktek"
                    extra
                    isbutton={
                        <div className="card-radio">
                            <ButtonHeading>
                                <Radio.Group size='small' defaultValue={listType} onChange={(e) => setListType(e.target.value)} >
                                    <Radio.Button value="perday">Hari</Radio.Button>
                                    <Radio.Button value="perbranch">Cabang</Radio.Button>
                                    <Radio.Button value="perdepartment">Departemen</Radio.Button>
                                </Radio.Group>
                            </ButtonHeading>
                            &nbsp;&nbsp;
                            <BtnGroup>
                                <Button size="small" type="danger" onClick={() => modalFunc('add')}>
                                    Tambah Jadwal
                                </Button>
                            </BtnGroup>
                        </div>
                    }
                >
                {   listType === 'perday' ? <PerDayTable/> :
                    listType === 'perbranch' ? <PerBranchTable/> : <PerDepartment/>
                }
                </Cards>
            </Col>
        </Row>
        <Modal
            forceRender={true}
            visible={modal.visible}
            title={modal.title}
            onCancel={closeModal}
            onConfirm={() => form.submit()}
            disableButton={isLoading}
        >
            { isLoading ?
                <>
                <div className="text-center">
                    <Loading status={loadingStatus} />
                    { alert ? alert : 'Memproses permintaan...'  }
                </div>
                </>
            :
            
            <BasicFormWrapper>
                <Form
                    form={form}
                    onFinish={submitForm}
                    layout="vertical"
                >
                    {alert}
                    <Row gutter={25}>
                        <Col lg={12} xs={24}>
                            <Form.Item name="branch" label="Cabang" rules={[ { required: true, message: 'Pilih cabang praktek' } ]} >
                                <SelectBranch list={listBranch}/>
                            </Form.Item>
                        </Col>
                        <Col lg={12} xs={24}>
                            <Form.Item name="department" label="Departemen" rules={[ { required: true, message: 'Pilih cabang praktek' } ]} >
                                <SelectDepartment list={listDepartment}/>
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
            </BasicFormWrapper> 
        
            }
        </Modal>
        </>
    );
}

export default DoctorSchedule;