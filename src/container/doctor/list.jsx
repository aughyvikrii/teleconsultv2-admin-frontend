import React, { useEffect, useState, Suspense } from 'react';
import { Table, Row, Col, Input, Skeleton, Avatar } from 'antd';
import { Main, TableWrapper } from '../styled';
import { useRouteMatch, useHistory, Link } from 'react-router-dom';

// Component
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { AlertError } from '../../components/alerts/alerts';
import Heading from '../../components/heading/heading';

// Api Function
import  { get_doctor } from '../../api';

const { Search } = Input;

const List = () => {
    const { path } = useRouteMatch();
    const history = useHistory();

    const [alert, setAlert] = useState('');
    // START: Table event & config
    const [tableLoading, setTableLoading] = useState(true);
    const [source, setSource] = useState([]);
    const [dataCount, setDataCount] = useState(0);
    const [filter, setFilter] = useState({ query: null, page: 0, data_per_page: 10,  paginate: true });

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Nama',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Nomor Telepon',
            dataIndex: 'phone_number',
            key: 'phone_number'
        },
        {
            title: 'Tanggal Daftar',
            dataIndex: 'created_at',
            key: 'created_at'
        },
        {
            title: '#',
            dataIndex: 'action',
            key: 'action',
            width: '150px',
        },
    ];

    useEffect(() => {
        getData();
        // eslint-disable-next-line
    }, [filter]);

    const onTableChange = (e) => {
        setFilter({
            ...filter,
            page: e.current,
            data_per_page: e.pageSize,
        });
    }
    // END: Table event & config

    const getData = async () => {
        setTableLoading(true);

        const [result, error] = await get_doctor(filter);
        console.log(result, error)
        if(error) {
            setAlert(
                AlertError(error)
            );
        } else {
            processData(result.data);
        }

        setTableLoading(false);
    }

    const processData = (data) => {
        let result = [];
        data.data.map(row => {
            return result.push({
                key: row.pid,
                id: row.pid,
                name: (
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
                        {row.display_name}
                        </Heading>
                        <span className="user-designation">{row.alt_name}</span>
                    </figcaption>
                    </div>
                ),
                email: row.email,
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
        setDataCount(data.total);
        setSource(result);
    }

    return(
            <>
            <PageHeader
                ghost
                title="Daftar Dokter"
                buttons={[
                    <div key="6" className="page-header-actions">
                        <Link to={`${path}/create`}>
                            <Button size="small" key="4" type="primary">
                            <i aria-hidden="true" className="fa fa-plus"></i>
                            Tambah Dokter
                            </Button>
                        </Link>
                    </div>,
                    ]}
            />
            <Main>
                <Row gutter={25}>
                    <Col lg={24} xs={24}>
                    {alert}
                        <Cards headless={true} >
                            <Search placeholder="input search text" onSearch={(value) => setFilter({...filter, query: value })}/> <br/> <br/>
                            <TableWrapper>
                                <Table
                                    loading={tableLoading}
                                    bordered={false}
                                    columns={columns}
                                    dataSource={source}
                                    pagination={{
                                        defaultPageSize: filter.data_per_page,
                                        total: dataCount,
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