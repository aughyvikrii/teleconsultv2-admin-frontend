import React from 'react';
import { Row,  Col, Descriptions, Image, Skeleton } from 'antd';
import { useHistory, useParams, Link } from 'react-router-dom';

import {Countdown} from '../../components/countdown';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { AlertError } from '../../components/alerts/alerts';
import { Main } from '../styled';

import { format_rupiah, label_apstatus } from '../../utility/utility';
import { get_detail_appointment } from '../../api';

const Detail = (props) => {

    const history = useHistory();
    const { id } = useParams();
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState({});
    const [alert, setAlert] = React.useState(null);

    const getData = async() => {
        setLoading(true);

        const {
            result, error, message
        } = await get_detail_appointment(id);

        setLoading(false);

        if(error) {
            setAlert(<AlertError message={message}/>);
        } else {
            setData(result.data);
        }
    }

    React.useEffect(() => {
        getData();
        console.log(history);
        return () => null;
    }, []);

    return(
        <div key="AppointmentDetail">
            <PageHeader
                ghost
                title={"Detail Perjanjian: " + id}
                buttons={[
                    <div key="6" className="page-header-actions">
                        <Button size="small" key="DoctorDetailUpdateData" type="primary" onClick={() => console.log('history.goBack()')}>
                            <i aria-hidden="true" className="fa fa-arrow-circle-left"></i> Kembali
                        </Button>
                    </div>,
                    ]}
            />
            <Main>
            <Row gutter={[25, 25]}>
                {alert && (<Col span={24}>{alert}</Col>)}
                    <Col lg={12} xs={24}>
                        {loading ? <Cards headless><Skeleton active/></Cards> : (
                            <Cards headless>
                                <figure className="text-center">
                                    <Image
                                        width={200}
                                        preview={false}
                                        src={data?.doctor_pic}
                                    />
                                </figure>
                                <Descriptions title="Jadwal Telekonsultasi" column={1} bordered>
                                    <Descriptions.Item label="Dokter">
                                        <Link to={`/admin/doctor/${data?.doctor_id}/information`}>
                                            {data?.doctor_name}  <i aria-hidden={true} className="fa fa-link"></i>
                                        </Link>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Departemen">{data?.department}</Descriptions.Item>
                                    <Descriptions.Item label="Cabang">{data?.branch}</Descriptions.Item>
                                    <Descriptions.Item label="Tanggal">{data?.id_consul_date}</Descriptions.Item>
                                    <Descriptions.Item label="Jam">{data?.consul_time}</Descriptions.Item>
                                    <Descriptions.Item label="Durasi">{data?.duration} Menit</Descriptions.Item>
                                    <Descriptions.Item label="Tarif">
                                        <span className="color-error">Rp {format_rupiah(data?.fee)}</span>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Status">
                                        {label_apstatus(data?.status)}
                                    </Descriptions.Item>
                                    
                                    {   (data?.status === 'payment_cancel' || data?.status === 'payment_expire') && data?.can_re_register && (
                                            <>
                                            <Descriptions.Item label="Daftar Ulang">
                                                <Button type="primary" onClick={this.re_register.bind(this)}>Daftar Ulang</Button>
                                            </Descriptions.Item>
                                            </>
                                        )
                                    }
                                    { data?.status === 'done' && (
                                        <>
                                        <Descriptions.Item label="Jam Dimulai">{data?.start_consul}</Descriptions.Item>
                                        <Descriptions.Item label="Jam Selesai">{data?.end_consul}</Descriptions.Item>
                                        </>
                                    ) }
                                    {   data?.status === 'waiting_payment' && (
                                            <Descriptions.Item label="Batas Pembayaran">
                                                {data?.payment_expired_at} <br/>
                                                <Countdown date={data?.payment_expired_at}/>
                                            </Descriptions.Item>
                                        )
                                    }

                                    {   data?.status === 'waiting_consul' && (<>
                                            <Descriptions.Item label="Link Konsultasi">
                                                    <a href="https://google.com" target="blank" >Link Konsultasi Dokter  <i aria-hidden={true} className="fa fa-external-link"></i></a> <br/>
                                                    <a href="https://google.com" target="blank" >Link Konsultasi Pasien  <i aria-hidden={true} className="fa fa-external-link"></i></a>
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Konsultasi Dimulai Dalam">
                                                {data?.consul_date} {data?.consul_time} <br/>
                                                <Countdown forceInfo={true} date={data?.consul_date} time={data?.consul_time}/>
                                            </Descriptions.Item>
                                        </>)
                                    }
                                </Descriptions>
                            </Cards>
                        )}
                    </Col>
                    
                    <Col lg={12} xs={24}>
                        {loading ? <Cards headless><Skeleton active/></Cards> : (
                        <Cards headless>
                            <figure className="text-center">
                                <Image
                                    width={200}
                                    preview={false}
                                    src={data?.patient_pic}
                                />
                            </figure>
                            <Descriptions title="Informasi Pasien" column={1} bordered>
                                <Descriptions.Item label="Nama">
                                    <Link to={`/admin/patient/${data?.patient_id}/information`}>
                                        {data?.patient_name} <i aria-hidden={true} className="fa fa-link"></i>
                                    </Link>
                                </Descriptions.Item>
                                <Descriptions.Item label="Umur">{data?.age}</Descriptions.Item>
                                <Descriptions.Item label="Keluhan Utama">{data?.main_complaint}</Descriptions.Item>
                                <Descriptions.Item label="Riwayat Penyakit">{data?.disease_history ? data?.disease_history : '-'}</Descriptions.Item>
                                <Descriptions.Item label="Alergi">{data?.allergy ? data?.allergy : '-'}</Descriptions.Item>
                                <Descriptions.Item label="Suhu Badan">{data?.body_temperature ? data?.body_temperature : '-'} ℃</Descriptions.Item>
                                <Descriptions.Item label="Tekanan Darah">{data?.blood_pressure ? data?.blood_pressure : '- '} mmHg</Descriptions.Item>
                                <Descriptions.Item label="Berat Badan">{data?.weight ? data?.weight : '-'} Kg</Descriptions.Item>
                                <Descriptions.Item label="Tinggi Badan">{data?.height ? data?.height : '-'} Cm</Descriptions.Item>
                            </Descriptions>
                        </Cards>
                        )}
                    </Col>
                </Row>
            </Main>
        </div>
    );
}

export default Detail;