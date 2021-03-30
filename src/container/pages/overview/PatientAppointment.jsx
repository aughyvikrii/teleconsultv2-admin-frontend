import React, { Suspense } from 'react';
import { useParams, useRouteMatch, Link } from 'react-router-dom';
import { Skeleton, Card, Table, Input, Avatar } from 'antd';
import { TableWrapper } from '../../styled';

import { AlertError } from '../../../components/alerts/alerts';
import Heading from '../../../components/heading/heading';
import {Countdown} from '../../../components/countdown';
import { label_apstatus } from '../../../utility/utility';
import { Button } from '../../../components/buttons/buttons';

import { get_doctor_appointment } from '../../../api';

const PatientAppointment = () => {

    const { id } = useParams();
    const [data, setData] = React.useState({});
    const [alert, setAlert] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [source, setSource] = React.useState([]);
    const [filter, setFilter] = React.useState({
        paginate: true,
        query: null,
        data_per_page: 10
    });

    const getData = async () => {
        setLoading(true);

        const { result, error, message } = await get_doctor_appointment(id, filter);

        if(error) {
            setAlert(<AlertError message={message}/>);
            setLoading(false);
        } else {
            setLoading(false);
            setData(result.data);
        }
    }

    React.useEffect(() => {
        getData();
    }, []);

    React.useEffect(() => {
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
                            {row.patient}
                            </Heading>
                            <span className="user-designation">{row.age}</span>
                        </figcaption>
                    </div>
                ),
                consul_date: (
                    <>
                        {row.id_consul_date} {row.consul_time}
                        <Countdown date={row.consul_date} time={row.consul_time}/>
                    </>
                ),
                status: label_apstatus(row.status),
                action: (
                        <>
                            <Link to={`/admin/appointment/${row.aid}`}>
                                <Button className="btn-icon" size="default" shape="round" type="primary" title="Detail" onClick={() =>  history.push(`/admin/appointment/${row.aid}`) }>
                                    <i aria-hidden="true" className="fa fa-folder-open-o color-white"></i>
                                </Button>
                            </Link>
                        </>
                )
            });
        });

        setSource(_source);
    }, [data]);

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id', },
        { title: 'Pasien', dataIndex: 'patient', key: 'patient', },
        { title: 'Tanggal Konsultasi', dataIndex: 'consul_date', key: 'consul_date', },
        { title: 'Status', dataIndex: 'status', key: 'status', },
        { title: '#', dataIndex: 'action', key: 'action', width: '150px', },
    ];

    return(
        <div key="PatientAppointment">
            <Card
                title="Daftar Perjanjian"
            >
                {alert}
                {loading&&<Skeleton active/>}
                <Input.Search style={{display: loading ? 'none' : ''}} placeholder="input search text" onSearch={(value) => setFilter({...filter, query: value })}/> <br/> <br/>
                <TableWrapper style={{
                    display: loading ? 'none' : ''
                }}>
                    <Table
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
                    />
                </TableWrapper>
            </Card>
        </div>
    );
}

export default PatientAppointment;