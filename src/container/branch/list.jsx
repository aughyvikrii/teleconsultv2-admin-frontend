import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Input, Popconfirm, message } from 'antd';
import { Main } from '../styled';
import { useRouteMatch, useHistory } from 'react-router-dom';

// Component
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Tag } from '../../components/tags/tags';

// Api Function
import  { get_branch, update_branch, create_branch, delete_branch } from '../../api';

const { Search } = Input;

const List = () => {
    const { path } = useRouteMatch();
    const history = useHistory();

    const [alert, setAlert] = useState('');
    // START: Table event & config
    const [tableLoading, setTableLoading] = useState(true);
    const [source, setSource] = useState([]);
    const [dataCount, setDataCount] = useState(0);
    const [filter, setFilter] = useState({ query: null, page: 0, data_per_page: 10 });

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Kode',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Nama',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Status',
            dataIndex: 'is_active',
            key: 'is_active'
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

        const [result, error] = await get_branch(filter);

        console.log(result, error);
        if(!result) {
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
            result.push({
                key: row.bid,
                id: row.bid,
                code: row.code,
                name: row.name,
                is_active: (
                    row.is_active ? 
                    <Tag color="#87d068">Aktif</Tag> : 
                    <Tag color="#f50">Nonaktif</Tag>
                ),
                action: (
                    <div className="table-actions">
                        <>
                            <Button className="btn-icon" size="default" shape="round" type="primary" title="Detail" onClick={() =>  history.push(`${path}/detail/${row.bid}`) }>
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
        setDataCount(data.total);
        setSource(result);
    }

    const deleteData = async (data) => {
        const hide = message.loading('Proses menghapus data..', 0);
        const [result, error] = await delete_branch(data.bid);

        if(!result) {
            hide();
            message.error(error);
        } else {
            hide();
            message.success('Berhasil menghapus data');
            getData();
        }
    }

    return(
            <>
            <PageHeader
                ghost
                title="Halaman Spesialis"
                buttons={[
                <div key="6" className="page-header-actions">
                    <Button size="small" key="4" type="primary" onClick={() => history.push(`${path}/create`)}>
                    <i aria-hidden="true" className="fa fa-plus"></i>
                    Tambah Baru
                    </Button>
                </div>,
                ]}
            />
            <Main>
                <Row gutter={25}>
                    <Col lg={24} xs={24}>
                    {alert}
                        <Cards headless={true} >
                            <Search placeholder="input search text" onSearch={(value) => setFilter({...filter, query: value })}/> <br/> <br/>
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
                        </Cards>
                    </Col>
                </Row>
            </Main>
            </>
    );
}

export default List;