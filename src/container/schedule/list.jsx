// Package
import React, { useEffect, useState, Suspense } from 'react';
import { Row, Col, Table, Radio, Skeleton, Avatar, Popconfirm, Form, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

// Component
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button, BtnGroup } from '../../components/buttons/buttons';
import { Popover } from '../../components/popup/popup';
import { Cards } from '../../components/cards/frame/cards-frame';
import { ButtonHeading } from '../../components/cards/style';
import { Main, TableWrapper, PopoverFormWrapper, BtnWithIcon, PopoverButtonGroup } from '../styled';
import Heading from '../../components/heading/heading';
import { SelectDepartment, SelectBranch, SelectSpecialist, SelectWeekday, FormAddSchedule } from '../../components/form';
import Loading from '../../components/loadings';
import { Modal } from '../../components/modals/antd-modals';

//Api
import { get_schedule, get_branch, get_department, get_specialist, create_doctor_schedule, update_doctor_schedule } from '../../api';

const List = () => {

    const [listType, setListType] = useState('default');
    const [cardTitle, setCardTitle] = useState('Data Perhari');
    const [originalSource, setOriginalSource] = useState({
        data: []
    });
    const [source, setSource] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({paginate: true, data_per_page: 5});
    const [columns, setColumns] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [bucketData, setBucketData] = useState({ branch:[], department: [], specialist: [] });
    const [loadingFilter, setLoadingFilter] = useState(true);
    const [messageFilter, setMessageFilter] = useState('Loading...');

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
    const [modalForm] = Form.useForm();

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
        const [result, error]  = await get_schedule(filters);
        if(error) {

        } else {
            console.log(result);
            setOriginalSource(result.data);
            setLoading(false);
        }
        setDataLoaded(true);
        setLoading(false);
    }

    useEffect(()  => {
        if(!dataLoaded) {
            getData()
        }
    }, [filters]);

    const processData = () => {
        let data = {};
        originalSource.data.map(row => {
            row.originRow = row;
            row.key = row.schedule_id;

            row.practice_hours = (
                row.start_hour + ' - ' + row.end_hour
            );

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

    const fillBucket = async () => {
        setModal({
            ...modal,
            disableButton: true,
            loading: true,
            message: 'Memproses data...'
        });

        setMessageFilter('Mengambil data cabang...');
        const [branch, berror] = await get_branch({all_data: true});
        setMessageFilter('Mengambil data departemen...');
        const [department, derror] = await get_department({all_data: true});
        setMessageFilter('Mengambil data spesialis...');
        const [specialist, serror] = await get_specialist({all_data: true});
        
        setBucketData({
            ...bucketData,
            branch: berror ? [] : branch.data,
            department: derror ? [] : department.data,
            specialist: serror ? [] : specialist.data
        });

        setLoadingFilter(false);
        setModal({
            ...modal,
            disableButton: false,
            loading: false,
            message: ''
        });
    }

    useEffect( () => {
        fillBucket();
    }, []);

    const applyFilter = (fields) => {
        setDataLoaded(false);
        setLoading(true);
        setFilters({
            ...filters,
            filters: fields
        });
    }

    const formFilter = (
        <PopoverFormWrapper>
                {   loadingFilter ? (<>
                    <Loading/>
                    {messageFilter}
                </>) : (<>
                    <Form
                    form={form}
                    onFinish={applyFilter}
                    layout="vertical"
                    size="small"
                >
                    <Row gutter={25}>
                        <Col lg={8} xs={24}>
                            <Form.Item label="Nama Dokter" name="doctor">
                                <Input placeholder="..."/>
                            </Form.Item>
                        </Col>
                        <Col lg={8} xs={24}>
                            <Form.Item label="Spesialis" name="specialist">
                                <SelectSpecialist list={bucketData.specialist} mode="multiple" searchable="true" dropdownClassName="ant-select-popover" />
                            </Form.Item>
                        </Col>
                        <Col lg={8} xs={24}>
                            <Form.Item label="Hari" name="weekday">
                                <SelectWeekday mode="multiple" searchable="true" dropdownClassName="ant-select-popover" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={25}>
                        <Col lg={8} xs={24}>
                            <Form.Item label="Cabang" name="branch">
                                <SelectBranch list={bucketData.branch} mode="multiple" searchable="true" dropdownClassName="ant-select-popover" />
                            </Form.Item>
                        </Col>
                        <Col lg={8} xs={24}>
                            <Form.Item label="Departemen" name="department">
                                <SelectDepartment list={bucketData.department} mode="multiple" searchable="true" dropdownClassName="ant-select-popover" />
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    <Form.Item style={{display:'none'}}>
                        <Button type="primary" htmlType="submit">
                        Submit
                        </Button>
                    </Form.Item>
                </Form>
                <PopoverButtonGroup>
                    <Button size="small" type="danger" outlined onClick={() => {
                        form.resetFields();
                        form.submit();
                    }}>
                        Cancel
                    </Button>
                    <Button size="small" type="primary" onClick={() => form.submit()}>
                        Terapkan Pencarian
                    </Button>
                </PopoverButtonGroup>
                </>)}
        </PopoverFormWrapper>
    );

    const showModal = () => {
        setModal({...modal, visible: true});
    }

    const modalClose = () => {
        setModal({...modal, visible: false});
    }

    const modalConfirm = async (fields) =>  {
        fields.start_hour = fields.start_hour.format('HH:mm');
        fields.end_hour = fields.end_hour.format('HH:mm');
        
        setModal({
            ...modal,
            disableButton: true,
            loading: true,
            message: 'Memproses data...'
        });

        let response = [];

        if(modal.action === 'add') {
            response = await create_doctor_schedule(fields.doctor, fields);
        }  else {
            response = await update_doctor_schedule(fields.schedule_id, fields);
        }

        const [result, error] = response;

        if(error) {
            setModal({
                ...modal,
                disableButton: false,
                loading: false,
                message: error
            });
        } else {
            setModal({
                ...modal,
                message: result?.message,
                loadingStatus: 'ok'
            });
        }
    }

    const onTableChange = (e) => {
        setDataLoaded(false);
        setFilters({
            ...filters,
            page: e.current,
            data_per_page: e.pageSize,
        });
    }

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
                </div>,
                ]}
            />
            <Main>
                <Row gutter={25}>
                    <Col lg={24} xs={24}>
                        <Cards
                            title={cardTitle}
                            extra
                            isbutton={
                                <div className="card-radio">
                                    <ButtonHeading>
                                        <Radio.Group size='small' defaultValue={listType} onChange={(e) => setListType(e.target.value)} >
                                            <Radio.Button value="default">Default</Radio.Button>
                                            <Radio.Button value="perday">Hari</Radio.Button>
                                            <Radio.Button value="perbranch">Cabang</Radio.Button>
                                            <Radio.Button value="perdepartment">Departemen</Radio.Button>
                                        </Radio.Group>
                                    </ButtonHeading>  &nbsp;&nbsp;
                                    <Popover placement="bottomLeft" title="Filter Pencarian" content={formFilter} action="click">
                                        <BtnWithIcon>
                                            <BtnGroup>
                                                <Button size="small" type="danger" className="active">
                                                    <SearchOutlined/>
                                                </Button>
                                                <Button size="small" type="danger" className="active">
                                                    Filter Pencarian
                                                </Button>
                                            </BtnGroup>
                                        </BtnWithIcon>
                                    </Popover>
                                </div>
                            }
                        >
                            <TableWrapper>
                                <Table
                                    loading={loading}
                                    bordered={false}
                                    columns={columns}
                                    pagination={false}
                                    dataSource={ Object.values(source) }
                                    pagination={{
                                        defaultPageSize: filters.data_per_page,
                                        total: originalSource.total,
                                        showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} data`,
                                        showQuickJumper: true,
                                        showSizeChanger: true
                                    }}
                                    onChange={onTableChange}
                                />
                            </TableWrapper>
                        </Cards>
                    </Col>
                </Row>
            </Main>
            <Modal
                visible={modal.visible}
                title={modal.title}
                onCancel={modalClose}
                onConfirm={() => modalForm.submit()}
                forceRender='true'
                disableButton={modal.disableButton}
            >
                {   modal.loading ? 
                    <div className="text-center">
                        <Loading status={modal.loadingStatus} /> {modal.message}
                    </div>
                    : 
                    <>
                    <FormAddSchedule
                        form={modalForm}
                        onFinish={modalConfirm}
                        showDoctor={true}
                        loadDoctor='true'
                        dataBranch={bucketData.branch}
                        dataDepartment={bucketData.department}
                    />
                    </>
                }
            </Modal>
        </>
    );
}

export default List;