import React, { Suspense } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Skeleton, Card, Table, Input, Avatar } from 'antd';
import { TableWrapper } from '../../styled';

import { AlertError } from '../../../components/alerts/alerts';
import Heading from '../../../components/heading/heading';
import {Countdown} from '../../../components/countdown';
import { label_apstatus } from '../../../utility/utility';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';

import { get_doctor_appointment, get_list_appointment } from '../../../api';

const PatientAppointment = (props) => {
    const history = useHistory();

    const { type = 'doctor' } = props;

    const { id } = useParams();
    const [data, setData] = React.useState({});
    const [alert, setAlert] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [loadingData, setLoadingData] = React.useState(false);
    const [source, setSource] = React.useState([]);
    const [filter, setFilter] = React.useState({
        paginate: true,
        query: null,
        data_per_page: 10,
        patient_id: parseInt(id)
    });

    const getData = async () => {
        setLoading(true);
        setLoadingData(true);
        setAlert(null);

        let request;

        if (type === 'doctor') {
            request = await get_doctor_appointment(id, filter);
        } else {
            request = await get_list_appointment(filter);
        }

        const { result, error, message } = request;

        if(error) {
            setAlert(<AlertError message={message}/>);
            setLoading(false);
        } else {
            setLoading(false);
            setData(result.data);
        }

        setLoadingData(false);
    }

    React.useEffect(() => {
        if(!loadingData) {
            getData();
        }
    }, [filter]);

    React.useEffect(() => {
        let _data = data?.data ? data.data : [];

        let _source = [];
        _data.map(row => {
            return _source.push({
                key: row.aid,
                id: row.aid,

                mobile_data: (<>
                    <Cards border={true} headless={true} className="text-left">
                        <b>ID</b> <br/>
                        {row.aid} <br/>

                        { type === 'doctor' ?
                            <>
                                <b>Pasien</b> <br/>
                                {row.patient} <br/>
                            </> :
                            <>
                                <b>Dokter</b>  <br/>
                                {row.doctor_name} <br/>
                            </>
                        }

                        <b>Tanggal  Konsul</b> <br/>
                        {row.id_consul_date} {row.consul_time} <br/>
                        <Countdown date={row.consul_date} time={row.consul_time}/>

                        <b>Status</b> <br/>
                        {label_apstatus(row.status)} <br/> <br/>

                        <Link to={`/admin/appointment/${row.aid}`}>
                            <Button className="btn-icon" size="small" block={true} type="primary" title="Detail" onClick={() =>  history.push(`/admin/appointment/${row.aid}`) }>
                                <i aria-hidden="true" className="fa fa-folder-open-o color-white"></i> Detail
                            </Button>
                        </Link>
                    </Cards>
                </>),

                patient: (
                    <div className="user-info">
                        <figure>
                            <Suspense
                                fallback={
                                    <Skeleton avatar active/>
                                }
                            >
                                <Avatar size={{ xs: 40, sm: 40, md: 40, lg: 40, xl: 40, xxl: 40 }} src={ type === 'doctor' ? row.patient_pic : row.doctor_pic } />
                            </Suspense>
                        </figure>
                        <figcaption>
                            <Heading className="user-name" as="h6">
                            { type === 'doctor' ? row.patient : row.doctor_name }
                            </Heading>
                            <span className="user-designation">{ type === 'doctor' ? row.age : row.branch }</span>
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

    const tableChange = (e) => {
        setFilter({
            ...filter,
            page: e.current,
            data_per_page: e.pageSize
        });
    }

    const columns = [
        { title: 'Data', dataIndex: 'mobile_data', key: 'mobile_data', responsive: ['xs'] },
        { title: 'ID', dataIndex: 'id', key: 'id', responsive: ['sm'] },
        { title: 'Pasien', dataIndex: 'patient', key: 'patient', responsive: ['sm'] },
        { title: 'Tanggal Konsultasi', dataIndex: 'consul_date', key: 'consul_date', responsive: ['sm'] },
        { title: 'Status', dataIndex: 'status', key: 'status', responsive: ['sm'] },
        { title: '#', dataIndex: 'action', key: 'action', width: '150px', responsive: ['sm'] },
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
                        onChange={tableChange}
                    />
                </TableWrapper>
            </Card>
        </div>
    );
}

export default PatientAppointment;