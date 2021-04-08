import React from 'react';
import { Row, Col, Table, Form, Input, Select } from 'antd';
import { useHistory, Link } from 'react-router-dom';
import { Main, TableWrapper } from '../styled';

import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { AlertError } from '../../components/alerts/alerts';
import { Popover } from '../../components/popup/popup';

import {
    payment_label,
    format_rupiah
} from '../../utility/utility';

import {
    SelectBranch,
    SelectDepartment,
    SelectSpecialist,
    SelectDoctor,
    SelectPatient
} from '../../components/form/select';

import { InputDate } from '../../components/input';

import { rootUrl, createParams, get_report_finance } from '../../api';

const Finance = (props) => {

    const history = useHistory();
    const [form] = Form.useForm();
    const [loading, setLoading] = React.useState(true);
    const [alert, setAlert] = React.useState(null);
    const [data, setData] = React.useState({});
    const [source, setSource] = React.useState([]);
    const [showFilter, setShowFilter] = React.useState(false);
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

    const getData = async() => {
        setLoading(true);

        const {
            result, error, message
        } = await get_report_finance(filter);

        setLoading(false);

        if(error) {
            setAlert(<AlertError message={message}/>);
        } else {
            setData(result.data);
        }
    }

    React.useEffect(() => {
            getData();
    }, [filter]);

    const processData = () => {
        let result = [];
        let _data = data?.data?.length > 0 ? data.data : [];

        _data.map(row => {
            return result.push({
                key: row.appointment_id,
                invoice_id: ('#'+row.bill_uniq),
                appointment_id: (
                    <Link to={`/admin/appointment/${row.appointment_id}`}>#{row.appointment_id}</Link>
                ),
                payment_date: row.id_paid_on ? row.id_paid_on : '-',
                patient: (
                    <Link to={`/admin/patient/detail/${row.patient_id}/information`}>{row.patient_name}</Link>
                ),
                consul_datetime: (
                    <>{row.consul_date} {row.consul_time}</>
                ),
                doctor: (
                    <Link to={`/admin/doctor/${row.doctor_id}/information`}>{row.doctor_name}</Link>
                ),
                department: row.department,
                branch: row.branch,
                status: payment_label(row.status),
                amount: (
                    <>Rp. {format_rupiah(row.amount)}</>
                )
            });
        });

        setSource(result);
    }

    React.useEffect(processData, [data]);

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

    const columns = [
        { title: 'Invoice', dataIndex: 'invoice_id', key: 'invoice_id', },
        { title: 'Perjanjian', dataIndex: 'appointment_id', key: 'appointment_id', },
        { title: 'Tanggal Bayar', dataIndex: 'payment_date', key: 'payment_date', },
        { title: 'Pasien', dataIndex: 'patient', key: 'patient', },
        { title: 'Tanggal Konsultasi', dataIndex: 'consul_datetime', key: 'consul_datetime' },
        { title: 'Dokter', dataIndex: 'doctor', key: 'doctor' },
        { title: 'Poliklinik', dataIndex: 'department', key: 'department' },
        { title: 'Cabang', dataIndex: 'branch', key: 'branch' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        { title: 'Nominal', dataIndex: 'amount', key: 'amount' },
    ];

    const print = async (type, page) => {
        if(page === 'all_page') filter['paginate'] = false;

        filter['print_type'] = type;

        const params = await createParams(filter);
        const url = rootUrl + '/report/finance?' + params;
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
                title="Laporan Keuangan"
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
                                <Form.Item name="start_date" label="Tanggal bayar awal" >
                                    <InputDate placeholder="2000-12-31"/>
                                </Form.Item>
                            </Col>
                            <Col xl={4} xs={24}>
                                <Form.Item name="end_date" label="Tanggal bayar akhir" >
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
                                        <Select.Option key="paid" value='paid'>Lunas</Select.Option>
                                        <Select.Option key="cancel" value='cancel'>Dibatalkan</Select.Option>
                                        <Select.Option key="expire" value='expire'>Kedaluwarsa</Select.Option>
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
            </Main>
        </>
    );
}

export default Finance;