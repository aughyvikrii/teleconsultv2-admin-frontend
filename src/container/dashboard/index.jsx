import React, { useEffect, useState } from 'react';
import { Row, Col, Skeleton, Form } from 'antd';
import { useHistory } from 'react-router-dom';

import { Main } from '../styled';
import { CardBarChart2, OverviewSalesCard } from './style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { AlertError } from '../../components/alerts/alerts';
import { GoogleMaterialBarChart, GoogleBasicPieChart } from '../../components/charts/google-chart';
import { get_dashboard } from '../../api';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';

import IMGNewCustomer from '../../static/img/icon/New Customer.svg';
import IMGSalesRevenue from '../../static/img/icon/SalesRevenue.svg';
import IMGProvit from '../../static/img/icon/Profit.svg';

import {
    SelectMonth,
    SelectYear,
    yearNow,
    monthNow,
    GetMonth
} from '../../components/input';

import {
    format_rupiah
} from '../../utility/utility';


const Index = (props) => {

    const [form] = Form.useForm();
    const [chart, setChart] = useState([]);
    const [cardData, setCardData] = useState({});
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState(null);
    const [showFilter, setShowFilter] = useState(false);
    const [dateRange, setDateRange] = useState(null);
    const [filter, setFilter] = useState({
        start_year: yearNow(),
        start_month: monthNow() - 1,
        end_year: yearNow(),
        end_month: monthNow() + 1,
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
            setChart(result.data.charts);
            setCardData(result.data.cards);
        }

    }

    useEffect(() => {
        getData();
        setDateRange(GetMonth(filter.start_month) + ' ' + filter.start_year + ' s/d ' + GetMonth(filter.end_month) + ' ' + filter.end_year  );
    }, [filter]);

    const onFinish = (fields) => {
        console.log(fields);
        setFilter(fields);
    }

    return(
    <>
        <PageHeader
            ghost
            className="header-boxed"
            title={"Dashboard Dokter | " + dateRange}
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
        <Main className="grid-boxed">

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
                <Col lg={8} xs={24}>
                    <Cards headless>
                        <OverviewSalesCard>
                        <div className="icon-box box-secondary">
                            <img src={IMGNewCustomer} alt="" />
                        </div>
                        <div className="card-chunk">
                            <CardBarChart2>
                            <h2>{cardData?.user}</h2>
                            <span>Jumlah Pengguna</span>
                            </CardBarChart2>
                        </div>
                        </OverviewSalesCard>
                    </Cards>

                    <Cards headless>
                        <OverviewSalesCard>
                        <div className="icon-box box-primary">
                            <img src={IMGSalesRevenue} alt="" />
                        </div>
                        <div className="card-chunk">
                            <CardBarChart2>
                            <h2>{cardData?.appointment}</h2>
                            <span>Jumlah Pendaftar</span>
                            </CardBarChart2>
                        </div>
                        </OverviewSalesCard>
                    </Cards>

                    <Cards headless>
                        <OverviewSalesCard>
                        <div className="icon-box box-success">
                            <img src={IMGProvit} alt="" />
                        </div>
                        <div className="card-chunk">
                            <CardBarChart2>
                            <h2>Rp {format_rupiah(cardData?.income)}</h2>
                            <span>Uang Masuk</span>
                            </CardBarChart2>
                        </div>
                        </OverviewSalesCard>
                    </Cards>
                </Col>

                <Col lg={16} xs={24}>
                    <Cards headless>
                        { loading ? <Skeleton/> :
                            <GoogleMaterialBarChart
                                title={chart?.appointment?.title ? chart?.appointment?.title : 'Title'}
                                subtitle={dateRange}
                                data={chart?.appointment?.data ? chart?.appointment?.data : []}
                                width="100%"
                                height="300px"
                            />
                        }
                    </Cards>
                </Col>

                <Col lg={12} xs={24}>
                    <Cards headless>
                        { loading ? <Skeleton /> : (
                            <GoogleBasicPieChart
                                title="Chart Dokter"
                                subtitle={dateRange}
                                data={chart?.doctor?.data ? chart?.doctor?.data : []}
                                width="100%"
                                height="300px"
                            />
                        ) }
                    </Cards>
                </Col>

                <Col lg={12} xs={24}>
                    <Cards headless>
                        { loading ? <Skeleton /> : (
                            <GoogleBasicPieChart
                                title="Chart Departemen"
                                subtitle={dateRange}
                                data={chart?.department?.data ? chart?.department?.data : []}
                                width="100%"
                                height="300px"
                            />
                        ) }
                    </Cards>
                </Col>

                <Col lg={12} xs={24}>
                    <Cards headless>
                        { loading ? <Skeleton /> : (
                            <GoogleBasicPieChart
                                title="Chart Spesialis"
                                subtitle={dateRange}
                                data={chart?.specialist?.data ? chart?.specialist?.data : []}
                                width="100%"
                                height="300px"
                            />
                        ) }
                    </Cards>
                </Col>

                <Col lg={12} xs={24}>
                    <Cards headless>
                        { loading ? <Skeleton /> : (
                            <GoogleBasicPieChart
                                title="Chart Cabang"
                                subtitle={dateRange}
                                data={chart?.branch?.data ? chart?.branch?.data : []}
                                width="100%"
                                height="300px"
                            />
                        ) }
                    </Cards>
                </Col>
                
            </Row>
        </Main>
    </>
    );
}

export default Index;