import React, { Suspense } from 'react';
import { Row, Col, Table, Skeleton, Avatar, Form, Select } from 'antd';
import { useRouteMatch, useHistory, Link } from 'react-router-dom';

import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { AlertError } from '../../components/alerts/alerts';
import Heading from '../../components/heading/heading';

import { Main, TableWrapper } from '../styled';
import { label_apstatus, createParams } from '../../utility/utility';
import { Popover } from '../../components/popup/popup';

import {
    SelectBranch,
    SelectDepartment,
    SelectSpecialist,
    SelectDoctor,
    SelectPatient
} from '../../components/form/select';

import { InputDate } from '../../components/input';

import { get_list_appointment, rootUrl } from '../../api';

const List = (props) => {

    const { path } = useRouteMatch();
    const history = useHistory();
    const [form] = Form.useForm();

    const [filter, setFilter]  = React.useState({
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

    const [loading, setLoading] = React.useState(true);
    const [alert, setAlert] = React.useState(null);
    const [data, setData] = React.useState({});
    const [source, setSource] = React.useState([]);
    const [showFilter, setShowFilter] = React.useState(false);

    const getData = async() => {
        setLoading(true);

        const {
            result, error, message
        } = await get_list_appointment(filter);

        setLoading(false);

        if(error) {
            setAlert(<AlertError message={message}/>)
        } else {
            setData(result.data);
        }

    }

    
    const processData = () => {
        let _data = data?.data ? data.data : [];
        let _source = [];

        _data.map(row => {
            return _source.push({
                key: row.aid,
                id: row.aid,
                patient: (
                    <div className="user-info">
                        <figure>
                            <Suspense
                                fallback={
                                    <Skeleton avatar active/>
                                }
                            >
                                <Avatar size={{ xs: 40, sm: 40, md: 40, lg: 40, xl: 40, xxl: 40 }} src={row.patient_pic} />
                            </Suspense>
                        </figure>
                        <figcaption>
                            <Heading className="user-name" as="h6">
                            {row.patient_name}
                            </Heading>
                            <span className="user-designation">{row.age}</span>
                        </figcaption>
                    </div>
                ),
                doctor: (
                    <div className="user-info">
                        <figure>
                            <Suspense
                                fallback={
                                    <Skeleton avatar active/>
                                }
                            >
                                <Avatar size={{ xs: 40, sm: 40, md: 40, lg: 40, xl: 40, xxl: 40 }} src={row.doctor_pic} />
                            </Suspense>
                        </figure>
                        <figcaption>
                            <Heading className="user-name" as="h6">
                            {row.doctor_name}
                            </Heading>
                            <span className="user-designation">{row.branch}</span>
                        </figcaption>
                    </div>
                ),
                appointment_date: (
                    <>{row.consul_date} {row.consul_time}</>
                ),
                status: label_apstatus(row.status),
                created_at: row.created_at,
                action: (
                        <>
                            <Link to={`/admin/appointment/${row.aid}`}>
                                <Button className="btn-icon" size="default" shape="round" type="primary" title="Detail" onClick={() =>  history.push(`${path}/${row.doctor_id}`) }>
                                    <i aria-hidden="true" className="fa fa-folder-open-o color-white"></i>
                                </Button>
                            </Link>
                        </>
                )
            });
        });
        setSource(_source);
    }
    
    React.useEffect(() => {
        getData();
}, [filter]);

    React.useEffect(processData, [data]);

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id', },
        { title: 'Pasien', dataIndex: 'patient', key: 'patient', },
        { title: 'doctor', dataIndex: 'doctor', key: 'doctor', },
        { title: 'Tanggal Perjanjian', dataIndex: 'appointment_date', key: 'appointment_date' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        { title: 'Tanggal Daftar', dataIndex: 'created_at', key: 'created_at' },
        { title: '#', dataIndex: 'action', key: 'action', width: '150px', },
    ];

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
        const url = rootUrl + '/report/appointment?' + params;
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
        <div key="AppointmentList">
            <PageHeader
                ghost
                title="Daftar Perjanjian"
                buttons={[
                    <div key="6" className="page-header-actions">
                        <Button type="warning" onClick={() => setShowFilter(!showFilter)}>
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
                                <Form.Item name="start_date" label="Tanggal perjanjian awal" >
                                    <InputDate placeholder="2000-12-31"/>
                                </Form.Item>
                            </Col>
                            <Col xl={4} xs={24}>
                                <Form.Item name="end_date" label="Tanggal perjanjian akhir" >
                                    <InputDate placeholder="2000-12-31"/>
                                </Form.Item>
                            </Col>
                            <Col xl={8} xs={24}>
                                <Form.Item name="branch_id" label="Cabang" >
                                    <SelectBranch mode="multiple"/>
                                </Form.Item>
                            </Col>
                            <Col xl={8} xs={24}>
                                <Form.Item name="department_id" label="Departemen" >
                                    <SelectDepartment mode="multiple"/>
                                </Form.Item>
                            </Col>
                            <Col xl={8} xs={24}>
                                <Form.Item name="specialist_id" label="Spesialis" >
                                    <SelectSpecialist mode="multiple"/>
                                </Form.Item>
                            </Col>
                            <Col xl={8} xs={24}>
                                <Form.Item name="doctor_id" label="Dokter" >
                                    <SelectDoctor mode="multiple"/>
                                </Form.Item>
                            </Col>
                            <Col xl={8} xs={24}>
                                <Form.Item name="patient_id" label="Pasien" >
                                    <SelectPatient mode="multiple"/>
                                </Form.Item>
                            </Col>
                            <Col xl={4} xs={24}>
                                <Form.Item name="appointment_id" label="ID Perjanjian" >
                                    <Select defaultValue={null} mode="tags">
                                        <Select.Option value={null}>Semua</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xl={4} xs={24}>
                                <Form.Item name="status" label="Status" >
                                    <Select defaultValue={filter.status} mode="multiple">
                                        <Select.Option value={null}>Semua</Select.Option>
                                        <Select.Option key="waiting_payment" value='waiting_payment'>Menunggu Pembayaran</Select.Option>
                                        <Select.Option key="waiting_consul" value='waiting_consul'>Menunggu Konsultasi</Select.Option>
                                        <Select.Option key="done" value='done'>Selesai Konsultasi</Select.Option>
                                        <Select.Option key="payment_cancel" value='payment_cancel'>Pembayaran Dibatalkan</Select.Option>
                                        <Select.Option key="payment_expire" value='payment_expire'>Pembayaran Kedaluwarsa</Select.Option>
                                    </Select>
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
                    <Col span={24}>
                        {alert}
                        <Cards headless>
                            <TableWrapper>
                                <Table
                                    loading={loading}
                                    bordered={false}
                                    columns={columns}
                                    dataSource={source}
                                    pagination={{
                                        defaultPageSize: filter.data_per_page,
                                        total: data.total,
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
        </div>
    );
}

export default List;