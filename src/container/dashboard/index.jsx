import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Skeleton, Form } from 'antd';
import { useHistory } from 'react-router-dom';

import { Main } from '../styled';
import { PageHeader } from '../../components/page-headers/page-headers';
import { AlertError } from '../../components/alerts/alerts';
import { PatientCard } from '../../components/cards';
import { GoogleMaterialBarChart } from '../../components/charts/google-chart';
import { get_dashboard } from '../../api';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';

import {
    SelectMonth,
    SelectYear,
    yearNow,
    monthNow,
    GetMonth
} from '../../components/input';

const Index = (props) => {

    const history = useHistory();
    const [form] = Form.useForm();
    const [listAppointment, setListAppointment] = useState([]);
    const [chart, setChart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState(null);
    const [showFilter, setShowFilter] = useState(true);
    const [filter, setFilter] = useState({
        start_year: yearNow(),
        start_month: monthNow(),
        end_year: yearNow(),
        end_month: monthNow(),
    });

    const getData = async() => {
        setAlert(null);
        setLoading(true);

        const {
            result, error, message
        } = await get_dashboard(filter);

        setLoading(false);

        if(error) {
            setAlert(<AlertError message={message}/>);
        } else {
            setListAppointment(result.data.appointments);
            setChart(result.data.chart);
        }

    }

    useEffect(() => {
        getData();
    }, [filter]);

    const onFinish = (fields) => {
        console.log(fields);
        setFilter(fields);
    }

    return(
    <>
        <PageHeader
            ghost
            title={"Dashboard Dokter | " + (GetMonth(filter.start_month) + ' ' + filter.start_year + ' s/d ' + GetMonth(filter.end_month) + ' ' + filter.end_year  )}
            buttons={[
            <div key="6" className="page-header-actions">
                {/* <Popover
                    action="click"
                    placement="bottom"
                    content={printOption}
                >
                    <Button type="primary">
                        <i className="fa fa-print"></i> Cetak
                    </Button>
                </Popover> */}
                <Button type="warning" size="small" onClick={() => setShowFilter(!showFilter)}>
                    <i className="fa fa-search-plus"></i>
                    Filter Data
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
                        <Form.Item name="start_year" label="Tahun Awal" initialValue={filter.start_year}>
                            <SelectYear start={2021}/>
                        </Form.Item>
                    </Col>
                    <Col xl={4} xs={24}>
                        <Form.Item name="start_month" label="Bulan Awal" initialValue={filter.start_month}>
                            <SelectMonth/>
                        </Form.Item>
                    </Col>
                    <Col xl={4} xs={24}>
                        <Form.Item name="end_year" label="Tahun Akhir" initialValue={filter.start_year}>
                            <SelectYear start={2021}/>
                        </Form.Item>
                    </Col>
                    <Col xl={4} xs={24}>
                        <Form.Item name="end_month" label="Bulan Akhir" initialValue={filter.end_month}>
                            <SelectMonth/>
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
                { alert && (<Col span={24}>{alert}</Col>) }
                <Col
                    lg={14}
                    xs={24}
                >
                    <Card>
                        { loading ? <Skeleton /> : (
                            <GoogleMaterialBarChart
                                data={chart?.data ? chart.data : []}
                                width="100%"
                                height="300px"
                                title={chart?.title ? chart?.title : 'Title'}
                                subtitle={chart?.subtitle ? chart?.subtitle : 'Subtitle'}
                                chartArea="50%"
                            />
                        ) }
                    </Card>
                </Col>
                <Col
                    lg={10}
                    xs={24}
                >
                    { loading ? <Card><Skeleton /></Card> :
                        listAppointment.length === 0 ? <Card><h2 className="text-center">Tidak ada perjanjian</h2></Card> :
                        listAppointment.map(appointment => {
                            return <PatientCard key={appointment.appointment_id} patient={appointment} from="dashboard" />
                        })
                    }
                </Col>
            </Row>
        </Main>
    </>
    );
}

export default Index;