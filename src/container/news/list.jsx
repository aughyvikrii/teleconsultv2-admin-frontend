import React from 'react';

import { Table, Row, Col, Popconfirm, message } from 'antd';
import { Main, TableWrapper } from '../styled';
import { useRouteMatch, useHistory } from 'react-router-dom';

import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { AlertError } from '../../components/alerts/alerts';

import {
    get_news, delete_news
} from '../../api';

const List = (props) => {
    const { path } = useRouteMatch();
    const history = useHistory();

    const [loading, setLoading] = React.useState(true);
    const [alert, setAlert] = React.useState(null);
    const [data, setData] = React.useState({});
    const [source, setSource] = React.useState([]);
    const [filter, setFilter] = React.useState({
        paginate:  true
    });

    React.useEffect(() => {
        getData();
    }, []);

    const getData = async() => {
        setLoading(true);
        setAlert(null);

        const {
            result, error, message
        } = await get_news(filter);

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
                key: row.news_id,
                news_id: row.news_id,

                mobile_data: (<>
                    <Cards border={true} headless={true} className="text-left">
                        <b>ID</b> #{row.news_id} <br/>

                        <b>Judul</b> <br/>
                        {row.title} <br/>

                        <b>Ditambah</b> <br/>
                        {row.creator} <br/>

                        <b>Tanggal</b> <br/>
                        {row.date} <br/> <br/>

                            <Button className="btn-icon" size="default" block={true} type="primary" title="Detail" onClick={() =>  history.push(`${path}/${row.news_id}`) }>
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
                title: row.title,
                creator: row.creator,
                created_at: row.date,
                action: (
                    <div className="table-actions">
                        <>
                            <Button className="btn-icon" size="default" shape="round" type="primary" title="Detail" onClick={() =>  history.push(`${path}/${row.news_id}`) }>
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

    React.useEffect(processData, [data]);

    const deleteData = async (data) => {
        const hide = message.loading('Proses menghapus data..', 0);
        const result = await delete_news(data.news_id);

        if(result.error) {
            hide();
            message.error(result.message);
        } else {
            hide();
            message.success('Berhasil menghapus data');
            getData();
        }
    }

    const columns = [
        { title: 'Data', dataIndex: 'mobile_data', key: 'mobile_data', responsive: ['xs'] },
        { title: 'ID', dataIndex: 'news_id', key: 'news_id', responsive: ['sm'] },
        { title: 'Judul', dataIndex: 'title', key: 'title', responsive: ['sm'] },
        { title: 'Ditambah', dataIndex: 'creator', key: 'creator', responsive: ['sm'] },
        { title: 'Tanggal', dataIndex: 'created_at', key: 'created_at', responsive: ['sm'] },
        { title: '#', dataIndex: 'action', key: 'action', width: '150px', responsive: ['sm'] },
    ];

    const onTableChange = (data) => {
        console.log('onTableChange:', data);
    }

    return(<>
        <PageHeader
            ghost
            title="Halaman Cabang"
            buttons={[
            <div key="6" className="page-header-actions">
                <Button size="small" key="4" type="primary" onClick={() => history.push(`${path}/create`)}>
                <i aria-hidden="true" className="fa fa-plus"></i>
                Tambah Baru
                </Button>
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
                                    total: data?.total,
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
        </>);
}

export default List;