import React from 'react';
import { useHistory, useParams } from 'react-router';
import { Row, Col, Descriptions, Skeleton } from 'antd';
import { Link } from 'react-router-dom';

import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { AlertError } from '../../components/alerts/alerts';
import { Main } from '../styled';

import { get_invoice_detail } from '../../api';
import { format_rupiah, label_apstatus, payment_label } from '../../utility/utility'

const BillDetail = (props) => {

    const { invoice_id } = useParams();
    const history = useHistory();
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState({});
    const [alert, setAlert] = React.useState(null);
    let i=1;

    const getData = async() => {
        setLoading(true);

        const {
            result, error, message
        } = await get_invoice_detail(invoice_id);

        if(error) {
            setAlert(<AlertError message={message}/>);
        }  else {
            setData(result.data);
            setAlert(null);
        }
        setLoading(false);
    }

    React.useEffect(() => {
        getData();
    }, []);

    return(
        <div key="BillDetail">
            <PageHeader
                ghost
                title={"Detail Invoice: " + invoice_id}
                buttons={[
                    <div key="6" className="page-header-actions">
                        <Button size="small" key="DoctorDetailUpdateData" type="primary" onClick={() => history.goBack()}>
                            <i aria-hidden="true" className="fa fa-arrow-circle-left"></i> Kembali
                        </Button>
                    </div>,
                ]}
            />
            <Main>
                <Row gutter={[25, 25]}>
                    <Col xl={12} xs={24}>
                        <Cards headless={true}>
                            { loading ? <Skeleton active /> : (
                                <Descriptions title="Informasi Tagihan" column={1} bordered labelStyle={{
                                    width: '250px'
                                }}>
                                    <Descriptions.Item  label="ID Invoice">{data.uniq}</Descriptions.Item>
                                    <Descriptions.Item label="ID Perjanjian">
                                        <Link to={`/admin/appointment/${data.aid}`}>#{data.aid}</Link>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Nama Pasien">
                                        <Link to={`/admin/patient/detail/${data.patient_id}/information`}>{data.patient}</Link>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Nama Dokter">
                                        <Link to={`/admin/doctor/${data.doctor_id}/information`}>{data.doctor}</Link>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Poliklinik">{data.department}</Descriptions.Item>
                                    <Descriptions.Item label="Cabang">{data.branch}</Descriptions.Item>
                                    <Descriptions.Item label="Tanggal Konsultasi">{data.id_consul_date} {data.consul_time}</Descriptions.Item>
                                    <Descriptions.Item label="Status Konsultasi">{label_apstatus(data.appointment_status)}</Descriptions.Item>
                                    <Descriptions.Item label="Nominal">Rp {format_rupiah(data.amount)}</Descriptions.Item>
                                    <Descriptions.Item label="Status Pembayaran">{payment_label(data.bill_status)}</Descriptions.Item>
                                    <Descriptions.Item label="Tanggal Pembayaran">{data.id_paid_on}</Descriptions.Item>
                                </Descriptions>
                            )}
                        </Cards>
                    </Col>

                    <Col xl={12} xs={24}>
                        <Cards title="Log Pembayaran">
                            { loading ? <Skeleton active/> : (
                                data.bill_status === 'paid' ? (
                                    <pre>
                                        { data.midtrans_paid_log !== '' ? JSON.stringify(data.midtrans_paid_log, null, 2) : '' }
                                    </pre>
                                ) : 'Belum ada pembayaran'
                            )}
                        </Cards>
                    </Col>

                    <Col span={24}>
                        <Cards title="Semua Log Midtrans">
                            <pre>
                                { (data?.midtrans_log?.length > 0 ? data.midtrans_log : []).map(row => {
                                    return (<>
                                        <h2>Log {i++}</h2>
                                        {JSON.stringify(JSON.parse(row), null, 2)}
                                        <hr/>
                                    </>);
                                }) }
                            </pre>
                        </Cards>
                    </Col>
                </Row>
            </Main>
        </div>
    );
}

export default BillDetail;