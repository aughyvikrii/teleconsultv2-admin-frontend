import React, { useEffect, useState, Suspense } from 'react';
import { Table, Row, Col, Input, Popconfirm, message, Skeleton, Avatar } from 'antd';
import { Main, TableWrapper } from '../styled';
import { useRouteMatch, useHistory, Link } from 'react-router-dom';

// Component
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Tag } from '../../components/tags/tags';
import { AlertError } from '../../components/alerts/alerts';
import Heading from '../../components/heading/heading';
import { Popover } from '../../components/popup/popup';

// Api Function
import  { get_branch, delete_branch, rootUrl, createParams } from '../../api';

const List = () => {
    const { path } = useRouteMatch();
    const history = useHistory();

    const [alert, setAlert] = useState(null);
    // START: Table event & config
    const [data, setData] = useState({});
    const [source, setSource] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFilter, setShowFilter] = useState(false);
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
        { title: 'Data', dataIndex: 'mobile_data', key: 'mobile_data', responsive: ['xs'] },
        { title: 'ID', dataIndex: 'branch_id', key: 'branch_id', responsive: ['sm'] },
        { title: 'Kode', dataIndex: 'code', key: 'code', responsive: ['sm'] },
        { title: 'Nama', dataIndex: 'name', key: 'name', responsive: ['sm'] },
        { title: 'Status', dataIndex: 'is_active', key: 'is_active', responsive: ['sm'] },
        { title: '#', dataIndex: 'action', key: 'action', width: '150px', responsive: ['sm'] },
    ];

    useEffect(() => {
        getData();
    }, [filter]);
    // END: Table event & config

    const getData = async () => {
        setLoading(true);
        const {result, error, message} = await get_branch(filter);

        if(error) {
            setAlert(<AlertError message={message}/>);
        } else {
            setData(result.data);
        }
        setLoading(false);
    }

    const processData = () => {
        let result = [];
        
        let _data = !data?.data?.length ? [] : data.data;
        _data.map(row => {
            return result.push({
                key: row.branch_id,

                mobile_data: (<>
                    <Cards border={true} headless={true} className="text-left">
                        <b>ID</b> #{row.branch_id} <br/>

                        <b>Kode</b> <br/>
                        {row.code} <br/>

                        <b>Nama</b> <br/>
                        {row.name} <br/>

                        <b>Status</b> <br/>
                        {row.is_active ? 
                        <Tag color="#87d068">Aktif</Tag> : 
                        <Tag color="#f50">Nonaktif</Tag>} <br/> <br/>

                            <Button className="btn-icon" size="default" block={true} type="primary" title="Detail" onClick={() =>  history.push(`${path}/detail/${row.branch_id}`) }>
                                <i aria-hidden="true" className="fa fa-pencil"></i> Ubah Data
                            </Button> &nbsp;
                            <Popconfirm
                                title="Yakin menghapus data ini?"
                                onConfirm={() => deleteData(row)}
                                okText="Ya"
                                cancelText="Batal"
                            >
                                <Button className="btn-icon" size="default" outlined block={true} type="danger" title="Hapus">
                                <i aria-hidden="true" className="fa fa-trash-o"></i> Hapus
                                </Button>
                            </Popconfirm>
                    </Cards>
                    </>),

                branch_id: row.branch_id,
                code: (
                    <div className="user-info">
                        <figure>
                            <Suspense
                                fallback={
                                    <Skeleton avatar active/>
                                }
                            >
                                <Avatar shape="square" size={{ xs: 40, sm: 40, md: 40, lg: 40, xl: 40, xxl: 40 }} src={row.thumbnail} />
                            </Suspense>
                        </figure>
                        <figcaption>
                            <Heading className="user-name" as="h6">
                            {row.code}
                            </Heading>
                        </figcaption>
                    </div>
                ),
                name: row.name,
                is_active: (
                    row.is_active ? 
                    <Tag color="#87d068">Aktif</Tag> : 
                    <Tag color="#f50">Nonaktif</Tag>
                ),
                action: (
                    <div className="table-actions">
                        <>
                            <Button className="btn-icon" size="default" shape="round" type="primary" title="Detail" onClick={() =>  history.push(`${path}/detail/${row.branch_id}`) }>
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
                )
            });
        });
        setSource(result);
    }

    useEffect(processData, [data]);

    const deleteData = async (data) => {
        const hide = message.loading('Proses menghapus data..', 0);
        const result = await delete_branch(data.branch_id);

        if(result.error) {
            hide();
            message.error(result.message);
        } else {
            hide();
            message.success('Berhasil menghapus data');
            getData();
        }
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
        const url = rootUrl + '/report/branch?' + params;
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
                title="Halaman Cabang"
                buttons={[
                <div key="6" className="page-header-actions">
                    <Button size="small" key="4" type="primary" onClick={() => history.push(`${path}/create`)}>
                    <i aria-hidden="true" className="fa fa-plus"></i>
                    Tambah Baru
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
                                        showSizeChanger: true
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