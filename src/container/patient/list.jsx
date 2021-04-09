import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Input, Form, Select } from 'antd';
import { Main, TableWrapper } from '../styled';
import { useRouteMatch, useHistory, Link } from 'react-router-dom';

// Component
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { AlertError } from '../../components/alerts/alerts';
import Heading from '../../components/heading/heading';
import { Popover } from '../../components/popup/popup';

// Api Function
import  { get_patient, createParams, rootUrl } from '../../api';

const { Search } = Input;

const List = () => {

    const { path } = useRouteMatch();
    const history = useHistory();
    const [form] = Form.useForm();

    const [alert, setAlert] = useState('');

    // START: Table event & config
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [showFilter, setShowFilter] = useState(false);
    const [source, setSource] = useState([]);
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
        page: 1,
    });

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id', },
        { title: 'Nama', dataIndex: 'name', key: 'name', },
        { title: 'Email', dataIndex: 'email', key: 'email', },
        { title: 'Nomor Telepon', dataIndex: 'phone_number', key: 'phone_number' },
        { title: 'Tanggal Daftar', dataIndex: 'created_at', key: 'created_at' },
        { title: '#', dataIndex: 'action', key: 'action', width: '150px',
        },
    ];

    useEffect(() => {
        getData();
    }, [filter]);
    // END: Table event & config

    const getData = async () => {
        setLoading(true);

        const {result, error, message} = await get_patient(filter);

        if(error) {
            setAlert(<AlertError message={message}/>);
        } else {
            setData(result.data);
        }

        setLoading(false);
    }

    const processData = () => {
        let result = [];
        let _data = data?.data?.length > 0 ? data.data : [];

        _data.map(row => {
            return result.push({
                key: row.pid,
                id: row.pid,
                name: (
                    <div className="user-info">
                    <figure>
                        <img style={{ width: '40px' }} src={row.profile_pic} alt="" />
                    </figure>
                    <figcaption>
                        <Heading className="user-name" as="h6">
                        {row.full_name}
                        </Heading>
                        <span className="user-designation">{row.province}</span>
                    </figcaption>
                    </div>
                ),
                email: (row.email ? row.email : '-'),
                phone_number: row.phone_number,
                created_at: row.created_at,
                action: (
                        <>
                            <Link to={`${path}/detail/${row.pid}/information`}>
                                <Button className="btn-icon" size="default" shape="round" type="primary" title="Detail" onClick={() =>  history.push(`${path}/detail/${row.pid}`) }>
                                    <i aria-hidden="true" className="fa fa-folder-open-o color-white"></i>
                                </Button>
                            </Link>
                        </>
                )
            });
        });
        setSource(result);
    }

    useEffect(processData, [data]);

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
        const url = rootUrl + '/report/patient?' + params;
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
                title="Daftar Pasien"
                buttons={[
                    <div key="6" className="page-header-actions">
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
                                <Form.Item name="name" label="Nama" >
                                    <Input placeholder="..."/>
                                </Form.Item>
                            </Col>
                            <Col xl={4} xs={24}>
                                <Form.Item name="email" label="Email" >
                                    <Input placeholder="..."/>
                                </Form.Item>
                            </Col>
                            <Col xl={4} xs={24}>
                                <Form.Item name="phone_number" label="Nomor Telepon" >
                                    <Input placeholder="..."/>
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


                <Row gutter={25}>
                    <Col lg={24} xs={24}>
                    {alert}
                        <Cards headless={true} >
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
            </>
    );
}

export default List;