import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Row, Col, Form, Radio, Popconfirm, Table, Skeleton } from 'antd';
import moment from 'moment';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { ButtonHeading } from '../../../components/cards/style';
import { Modal } from '../../../components/modals/antd-modals';
import { FormAddSchedule, FormAddScheduleNew } from '../../../components/form';
import { useParams } from 'react-router-dom';
import { BtnWithIcon } from '../../styled';
import Heading from '../../../components/heading/heading';
import { Tag } from '../../../components/tags/tags';

import { ModalAddSchedule } from '../../../components/modals';
// import { AlertError, AlertSuccess } from '../../../components/alerts/alerts';
import { get_doctor_schedule, create_doctor_schedule, update_doctor_schedule, get_branch, get_department } from '../../../api';


import {
    loadingStart,
    loadingContent,
    loadingClose,
    loadingSuccess,
    loadingError
} from '../../../redux/loadingmodal/actionCreator';
import { useDispatch } from 'react-redux';

const DoctorSchedule = () => {
    const dispatch = useDispatch();

    const [listType, setListType]  = useState('perday');

    const [loading, setLoading] = useState(true);
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

        setLoading(true);

        const {
            result, error
        } = await get_doctor_schedule(id);

        setLoading(false);

        if(error) {
            setSchedules([]);
        } else {
            setSchedules(result.data);
        }
    }

    const _get_branch = async () => {
        const {
            result, error, forceStop
        } = await get_branch({all_data: true});
        if(!error) {
            setListBranch(result.data);
        }
    }

    const _get_department = async () => {
        const {
            result, error, forceStop
        } = await get_department({all_data: true});
        if(!error) {
            setListDepartment(result.data);
        }
    }

    useEffect( () => {
        // _get_branch();
        // _get_department();
    }, []);

    useEffect( () => {
        getData();
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
                        <Button className="btn-icon" size="default" shape="round" type="primary" title="Update" onClick={() => modalFunc('edit',row)}>
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

            row.status = (
                !row.is_active ?  <Tag color="#f50">Nonaktif</Tag> :  <Tag color="#87d068">Aktif</Tag>
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

    }, [schedules]);

    const modalEdit = (row) => {
        console.log(row);
    }

    const PerDayTable = () => {

        let columns = [
            {
                title: 'Senin',
                children: [
                    { title: 'ID', dataIndex: 'id', key: 'id'},
                    { title: 'Cabang', dataIndex: 'branch', key: 'branch' },
                    { title: 'Departemen', dataIndex: 'department', key: 'department' },
                    { title: 'Mulai', dataIndex: 'start_hour', key: 'start_hour' },
                    { title: 'Selesai', dataIndex: 'end_hour', key: 'end_hour' },
                    { title: 'Durasi', dataIndex: 'duration', key: 'duration' },
                    { title: 'Tarif', dataIndex: 'fee', key: 'fee' },
                    { title: 'Status', dataIndex: 'status', key: 'status' },
                    { title: 'Dibuat oleh', dataIndex: 'creator', key: 'creator' },
                    { title: '#', dataIndex: 'action', key: 'action'},
                ]
            },
        ]
        return(
            <>
                <Heading className="text-center">
                    Data Perhari
                </Heading> <br/>
                {   Object.keys(perDay).map(id => {
                        let source = perDay[id];
                        let column = _.cloneDeep(columns);
                            column[0].title = 'Hari ' + source.name;
                        return (
                            <div key={id}>
                                <Table
                                    columns={column}
                                    dataSource={source.data}
                                    pagination={false}
                                />
                                <br/>
                            </div>
                        );
                    })
                }
            </>
        );
    }

    const PerBranchTable = () => {
        const columns = [
            {
                title: 'Cabang',
                children: [
                    { title: 'ID', dataIndex: 'id', key: 'id'},
                    { title: 'Departemen', dataIndex: 'department', key: 'department' },
                    { title: 'Hari', dataIndex: 'weekday_alt', key: 'weekday_alt' },
                    { title: 'Mulai', dataIndex: 'start_hour', key: 'start_hour' },
                    { title: 'Selesai', dataIndex: 'end_hour', key: 'end_hour' },
                    { title: 'Durasi', dataIndex: 'duration', key: 'duration' },
                    { title: 'Tarif', dataIndex: 'fee', key: 'fee' },
                    { title: 'Status', dataIndex: 'status', key: 'status' },
                    { title: 'Dibuat oleh', dataIndex: 'creator', key: 'creator' },
                    { title: '#', dataIndex: 'action', key: 'action'},
                ]
            }
        ]

        return(
            <>
                <Heading className="text-center">
                    Data Percabang
                </Heading> <br/>
                {   Object.keys(perBranch).map(id => {
                        let source = perBranch[id];
                        let column = _.cloneDeep(columns);
                            column[0].title = 'Cabang ' + source.name
                        return (
                            <div key={id}>
                                <Table
                                    columns={column}
                                    dataSource={source.data}
                                    pagination={false}
                                />
                                <br/>
                            </div>
                        );
                    })
                }
            </>
        );
    }

    const PerDepartment = () => {
        const columns = [
            {
                title: 'Departemen',
                children: [
                    { title: 'ID', dataIndex: 'id', key: 'id'},
                    { title: 'Cabang', dataIndex: 'branch', key: 'branch' },
                    { title: 'Hari', dataIndex: 'weekday_alt', key: 'weekday_alt' },
                    { title: 'Mulai', dataIndex: 'start_hour', key: 'start_hour' },
                    { title: 'Selesai', dataIndex: 'end_hour', key: 'end_hour' },
                    { title: 'Durasi', dataIndex: 'duration', key: 'duration' },
                    { title: 'Tarif', dataIndex: 'fee', key: 'fee' },
                    { title: 'Status', dataIndex: 'status', key: 'status' },
                    { title: 'Dibuat oleh', dataIndex: 'creator', key: 'creator' },
                    { title: '#', dataIndex: 'action', key: 'action'},
                ]
            }
        ]

        return(
            <>
                <Heading className="text-center">
                    Data Perdepartemen
                </Heading> <br/>
                {   Object.keys(perDepartment).map(id => {
                        let source = perDepartment[id];
                        let column = _.cloneDeep(columns);
                            column[0].title = 'Departemen ' + source.name;
                        return (
                            <div key={id}>
                                <Table
                                    columns={column}
                                    dataSource={source.data}
                                    pagination={false}
                                />
                                <br/>
                            </div>
                        );
                    })
                }
            </>
        );
    }

    const modalFunc = (type, data={}) => {
        data = _.cloneDeep(data)
        let schedule_id = 0;
        if(type === 'edit') {
            data['start_hour'] = moment(data['start_hour'], 'HH:mm');
            data['end_hour'] = moment(data['end_hour'], 'HH:mm');
            data['branch'] = data['branch_id'];
            data['department'] = data['department_id'];
            schedule_id = data.schedule_id;
            form.setFieldsValue(data);
        }else{
            form.resetFields();
            data = {};
            type = 'add';
        }
        setModal({ ...modal, visible: true, action: type, data: data, schedule_id: schedule_id });
    }

    const closeModal = () => {
        setAlert('');
        setModal({ ...modal, visible: false, action: 'add', data: {} });
    }

    const submitForm = async (fields) => {
        setAlert('');

        fields['start_hour'] = fields['start_hour'].format('HH:mm');
        fields['end_hour'] = fields['end_hour'].format('HH:mm');

        let response = [];
        if(modal.action === 'add') response = await create_doctor_schedule(id, fields);
        else response = await update_doctor_schedule(modal.schedule_id, fields);

        const [result, error] = response;

        if(error) {
            let error_fields = createFormError(result?.errors);

            setAlert(
                AlertError(error)
            );


            form.setFields(error_fields);
        } else {
            setLoadingStatus('ok');

            setAlert(
                AlertSuccess(result?.message ? result.message : 'Berhasil '+(modal.action == 'add' ? 'menambah' : 'update') + 'data')
            );

            form.resetFields();
            getData();

            setTimeout(() => {
                closeModal();
            }, 2000);
        }
    }

    return(
        <>
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
                    <BtnWithIcon>
                        <BtnGroup>
                            <Button size="small" type="danger" onClick={() => modalFunc('add')}>
                                <PlusCircleOutlined/>
                            </Button>
                            <Button size="small" type="danger" onClick={() => modalFunc('add')}>
                                Tambah Jadwal
                            </Button>
                        </BtnGroup>
                    </BtnWithIcon>
                </div>
            }
        >
        {   loading ? <Skeleton/> :
            listType === 'perday' ? <PerDayTable/> :
            listType === 'perbranch' ? <PerBranchTable/> : <PerDepartment/>
        }
        </Cards>
        <ModalAddSchedule
            forceRender={true}
            visible={modal.visible}
            title={modal.title}
            doctor_id={id}
            callback={getData}
            mState={[modal, setModal]}
        />
        </>
    );
}

export default DoctorSchedule;