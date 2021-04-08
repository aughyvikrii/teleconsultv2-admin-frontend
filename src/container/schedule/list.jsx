// Package
import React, { useEffect, useState, Suspense } from 'react';
import { Row, Col, Table, Skeleton, Avatar, Popconfirm, Form, Input, Select } from 'antd';
import { Link } from 'react-router-dom';
// Component
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import { Popover } from '../../components/popup/popup';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main, TableWrapper, PopoverFormWrapper, BtnWithIcon, PopoverButtonGroup } from '../styled';
import Heading from '../../components/heading/heading';
import { FormAddScheduleNew } from '../../components/form';
import { ModalCreateUpdateSchedule } from '../../components/modals';

//Api
import { createParams } from '../../utility/utility';
import {
    SelectDoctor,
    SelectBranch,
    SelectSpecialist,
    SelectDepartment,
    SelectWeekday,

} from '../../components/form';

import {
    get_schedule,
    get_branch,
    get_department,
    get_specialist,
    rootUrl,
    get_doctor
} from '../../api';

const List = () => {

    const [listType, setListType] = useState('default');
    const [cardTitle, setCardTitle] = useState('Data Perhari');
    const [originalSource, setOriginalSource] = useState({
        data: []
    });
    const [source, setSource] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter]  = useState({
        star_date: null,
        end_date:null,
        branch_id: null,
        department_id: null,
        specialist_id: null,
        doctor_id: null,
        patient_id: null,
        status: null,
        paginate: true,
        data_per_page: 50,
        page: 1
    });
    const [columns, setColumns] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);

    
    const [showFilter, setShowFilter] = useState(false);

    const [doctor, setDoctor] = useState([]);
    const [specialist, setSpecialist] = useState([]);
    const [branch, setBranch] = useState([]);
    const [department, setDepartment] = useState([]);
    const [scheduleData, setScheduleData] = useState({});

    const [modal, setModal] = useState({
        visible: false,
        title: 'Tambah Jadwal',
        action: 'add',
        loading: true,
        message: '',
        disableButton: false,
        loadingStatus: ''
    });

    const [form] = Form.useForm();

    const columnDataDefault = [
        { title: 'ID', dataIndex: 'schedule_id', key: 'schedule_id' },
        { title: 'Dokter', dataIndex: 'doctor', key: 'doctor' },
        { title: 'Cabang', dataIndex: 'branch', key: 'branch' },
        { title: 'Departemen', dataIndex: 'department', key: 'department' },
        { title: 'Hari', dataIndex: 'weekday', key: 'weekday' },
        { title: 'Jam Praktek', dataIndex: 'practice_hours', key: 'practice_hours' },
        { title: 'Durasi', dataIndex: 'duration', key: 'duration' },
        { title: '#', dataIndex: 'action',  key: 'action' }
    ];

    const columnDataPerday = [
        { title: 'ID', dataIndex: 'schedule_id', key: 'schedule_id' },
        { title: 'Dokter', dataIndex: 'doctor', key: 'doctor' },
        { title: 'Cabang', dataIndex: 'branch', key: 'branch' },
        { title: 'Departemen', dataIndex: 'department', key: 'department' },
        { title: 'Hari', dataIndex: 'weekday', key: 'weekday' },
        { title: 'Jam Praktek', dataIndex: 'practice_hours', key: 'practice_hours' },
        { title: 'Durasi', dataIndex: 'duration', key: 'duration' },
        { title: '#', dataIndex: 'action',  key: 'action' }
    ];

    const columnDataPerbranch = [
        { title: 'ID', dataIndex: 'schedule_id', key: 'schedule_id' },
        { title: 'Dokter', dataIndex: 'doctor', key: 'doctor' },
        { title: 'Cabang', dataIndex: 'branch', key: 'branch' },
        { title: 'Departemen', dataIndex: 'department', key: 'department' },
        { title: 'Hari', dataIndex: 'weekday', key: 'weekday' },
        { title: 'Jam Praktek', dataIndex: 'practice_hours', key: 'practice_hours' },
        { title: 'Durasi', dataIndex: 'duration', key: 'duration' },
        { title: '#', dataIndex: 'action',  key: 'action' }
    ];

    const columnDataPerdepartment = [
        { title: 'ID', dataIndex: 'schedule_id', key: 'schedule_id' },
        { title: 'Dokter', dataIndex: 'doctor', key: 'doctor' },
        { title: 'Cabang', dataIndex: 'branch', key: 'branch' },
        { title: 'Departemen', dataIndex: 'department', key: 'department' },
        { title: 'Hari', dataIndex: 'weekday', key: 'weekday' },
        { title: 'Jam Praktek', dataIndex: 'practice_hours', key: 'practice_hours' },
        { title: 'Durasi', dataIndex: 'duration', key: 'duration' },
        { title: '#', dataIndex: 'action',  key: 'action' }
    ];

    const dataConfig = {
        default: {
            name: 'Default',
            layout: columnDataDefault,
        },
        perday: {
            name: 'Perhari',
            layout: columnDataPerday,
        },
        perbranch: {
            name: 'Percabang',
            layout:  columnDataPerbranch,
        },
        perdepartment: {
            name: 'Perdepartemen',
            layout: columnDataPerdepartment,
        }
    };

    const getData = async() => {
        setLoading(true);
        const {result, error}  = await get_schedule(filter);
        if(error) {
            if(error === 'Token is Invalid') return;
        } else {
            setOriginalSource(result.data);
            setLoading(false);
        }
        setDataLoaded(true);
        setLoading(false);
    }

    useEffect(()  => {
        getData();
    }, [filter]);

    const modalEdit = (row) => {
        setScheduleData(row);
        console.log(row);
        let title = 'Edit Jadwal #' + row.schedule_id + ' [' + row.doctor_name + ']';
        setModal({...modal, visible: true, title: title});
    }

    const processData = () => {
        let data = {};
        originalSource.data.map(row => {
            row.originRow = row;
            row.key = row.schedule_id;

            row.practice_hours = (
                row.start_hour + ' - ' + row.end_hour
            );
            row.doctor_name = row.doctor;
            row.doctor = (
                <div className="user-info">
                    <figure>
                        <Suspense
                            fallback={
                                <Skeleton avatar active/>
                            }
                        >
                            <Avatar size={{ xs: 40, sm: 40, md: 40, lg: 40, xl: 40, xxl: 40 }} src={row.profile_pic} />
                        </Suspense>
                    </figure>
                    <figcaption>
                        <Heading className="user-name" as="h6">
                        {row.doctor}
                        </Heading>
                        <span className="user-designation color-error">{row.specialist}</span>
                    </figcaption>
                </div>
            );

            row.action = (
                <div className="table-actions">
                    <Button className="btn-icon" size="default" shape="round" type="primary" title="Detail" onClick={() => modalEdit(row)}>
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
                </div>
            );

            return data[row.schedule_id] = row;
        });
        setSource(data);
    }

    useEffect(() => {
        processData();
    }, [originalSource]);

    useEffect(() => {
        const data = dataConfig[listType]
        setCardTitle('Data ' + data.name);
        setColumns(data['layout'])
    }, [listType, source]);

    const _get_branch = async() => {
        let {result} = await get_branch({paginate: false});

        result = result?.data ? result.data : []
        setBranch(result);
    }

    const _get_department = async() => {
        let {result} = await get_department({paginate: false});
        result = result?.data ? result.data : []
        setDepartment(result);
    }

    const _get_specialist = async() => {
        let {result} = await get_specialist({paginate: false});
        result = result?.data ? result.data : []
        setSpecialist(result);
    }

    const _get_doctor = async()=> {
        let {result} = await get_doctor({paginate: false});
        result = result?.data ? result.data : []
        setDoctor(result);
    }

    useEffect( () => {
        _get_branch();
        _get_department();
        _get_specialist();
        _get_doctor();
    }, []);

    const applyFilter = (fields) => {
        setDataLoaded(false);
        setLoading(true);
        setFilter({
            ...filter,
            filter: fields
        });
    }

    const showModal = () => {
        setScheduleData({});
        setModal({...modal, visible: true, title: 'Tambah Jadwal'});
    }

    const onFinish = (fields) => {
        setFilter({
            ...filter,
            paginate: true,
            ...fields
        });
    }

    const onTableChange = (e) => {
        setFilter({
            ...filter,
            page: e.current,
            data_per_page: e.pageSize,
        });
    }

    const print = async (type, page) => {
        if(page === 'all_page') filter['paginate'] = false;

        filter['print_type'] = type;

        const params = await createParams(filter);
        const url = rootUrl + '/report/doctor?' + params;
        window.open(url ,'__target=blank');
    }

    const printOption = (<>
        <Link to="#" onClick={() => print('pdf', 'this_page')}>
            <i className="fa fa-file-pdf-o color-error"></i>
            <span>Cetak PDF Halaman Ini</span>
        </Link>
        <Link to="#" onClick={() => print('xls', 'this_page')}>
            <i className="fa fa-file-pdf-o color-success"></i>
            <span>Cetak Excel Halaman Ini</span>
        </Link>
        <Link to="#" onClick={() => print('pdf', 'all_page')}>
            <i className="fa fa-file-pdf-o color-error"></i>
            <span>Cetak PDF Seluruh Halaman</span>
        </Link>
        <Link to="#" onClick={() => print('xls', 'all_page')}>
            <i className="fa fa-file-pdf-o color-success"></i>
            <span>Cetak Excel Seluruh Halaman</span>
        </Link>
    </>);

    return(
        <>
            <PageHeader
                ghost
                title="Jadwal Dokter"
                buttons={[
                <div key="6" className="page-header-actions">
                    <Button size="small" key="4" type="primary" onClick={() => showModal(true)}>
                        <i aria-hidden="true" className="fa fa-plus"></i>
                        Tambah Baru
                    </Button>
                    <Button type="warning" size="small" onClick={() => setShowFilter(!showFilter)}>
                        <i className="fa fa-search-plus"></i>
                        Filter Data
                    </Button>
                    <Popover
                        action="click"
                        placement="bottom"
                        content={printOption}
                    >
                        <Button type="primary">
                            <i className="fa fa-print"></i> Cetak
                        </Button>
                    </Popover>
                    <Button size="small" key="4" type="primary" onClick={() => history.goBack()}>
                        <i aria-hidden="true" className="fa fa-arrow-circle-left"></i> Kembali
                    </Button>
                </div>,
                ]}
            />
            <Main>

            <Cards
                    title="Filter Data"
                    
                    style={{
                        display: showFilter ? '' : 'none'
                    }}
                >
                    <Form
                        form={form}
                        onFinish={onFinish}
                        name="modal"
                        layout="vertical"
                    >
                        <Row gutter={[8, 8]}>
                            <Col xl={4} xs={24}>
                                <Form.Item name="doctor_id" label="Dokter" >
                                    <SelectDoctor mode="multiple" list={doctor}/>
                                </Form.Item>
                            </Col>
                            <Col xl={4} xs={24}>
                                <Form.Item name="branch_id" label="Cabang" >
                                    <SelectBranch mode="multiple" list={branch}/>
                                </Form.Item>
                            </Col>
                            <Col xl={4} xs={24}>
                                <Form.Item name="department_id" label="Departemen" >
                                    <SelectDepartment mode="multiple" list={department}/>
                                </Form.Item>
                            </Col>
                            <Col xl={4} xs={24}>
                                <Form.Item name="specialist_id" label="Spesialis" >
                                    <SelectSpecialist mode="multiple" list={specialist} />
                                </Form.Item>
                            </Col>
                            <Col xl={4} xs={24}>
                                <Form.Item name="weekday_id" label="Hari" >
                                    <SelectWeekday mode="multiple" />
                                </Form.Item>
                            </Col>
                            <Col xl={4} xs={24}>
                                <Form.Item name="data_per_page" label="Data Per Halaman" >
                                    <Select defaultValue={filter.data_per_page}>
                                        <Select.Option key={10} value={10}>10</Select.Option>
                                        <Select.Option key={25} value={25}>25</Select.Option>
                                        <Select.Option key={50} value={50}>50</Select.Option>
                                        <Select.Option key={100} value={100}>100</Select.Option>
                                        <Select.Option key={250} value={250}>250</Select.Option>
                                        <Select.Option key={500} value={500}>500</Select.Option>
                                        <Select.Option key={1000} value={1000}>1000</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={24} className="text-right">
                                <Form.Item>
                                    <Button type="primary" size="default" htmlType="submit" className="login-form-button">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Cards>


                <Row gutter={[25, 25]}>
                    <Col lg={24} xs={24}>
                        <Cards headless>
                            <TableWrapper>
                                <Table
                                    loading={loading}
                                    bordered={false}
                                    columns={columns}
                                    pagination={false}
                                    dataSource={ Object.values(source) }
                                    pagination={{
                                        defaultPageSize: filter.data_per_page,
                                        total: originalSource.total,
                                        showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} data`,
                                        showQuickJumper: true,
                                    }}
                                    onChange={onTableChange}
                                />
                            </TableWrapper>
                        </Cards>
                    </Col>
                </Row>
            </Main>
            <ModalCreateUpdateSchedule
                forceRender={true}
                visible={modal.visible}
                title={modal.title}
                callback={getData}
                mState={[modal, setModal]}
                departments={department}
                branches={branch}
                doctors={doctor}
                scheduleData={scheduleData}
            />
        </>
    );
}

export default List;