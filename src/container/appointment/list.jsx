import React, { Suspense } from 'react';
import { Row, Col, Table, Skeleton, Avatar } from 'antd';
import { useRouteMatch, useHistory, Link } from 'react-router-dom';

import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { AlertError } from '../../components/alerts/alerts';
import Heading from '../../components/heading/heading';

import { Main, TableWrapper } from '../styled';
import { label_apstatus } from '../../utility/utility';

import { get_list_appointment } from '../../api';

const List = (props) => {

    const { path } = useRouteMatch();
    const history = useHistory();

    const [filter, setFilter] = React.useState({
        data_per_page: 25,
        paginate: true,
        query: null
    });

    const [loading, setLoading] = React.useState(true);
    const [alert, setAlert] = React.useState(null);
    const [data, setData] = React.useState({});
    const [source, setSource] = React.useState([]);

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

        return () => null
    }, []);
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

    const onTableChange = (e) => {

    }

    return(
        <div key="AppointmentList">
            <PageHeader
                ghost
                title="Daftar Perjanjian"
            />
            <Main>
                <Row gutter={[25, 25]}>
                    <Col span={24}>
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
        </div>
    );
}

export default List;