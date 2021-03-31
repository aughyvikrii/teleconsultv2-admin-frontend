import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Row, Col, Skeleton, Menu } from 'antd';
import { Main, SettingWrapper } from '../styled';
import { NavLink, useRouteMatch, Switch, Route, useHistory, useParams } from 'react-router-dom';

// Component
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import Loading from '../../components/loadings';
import { Cards } from '../../components/cards/frame/cards-frame';

// API
import { detail_doctor } from '../../api';

import UserCards from '../pages/overview/UserCard';
import UserBio from '../pages/overview/UserBio';

import PersonDetail from '../pages/overview/PersonDetail';
import PatientAppointment from '../pages/overview/PatientAppointment';
import DoctorSchedule from '../pages/overview/DoctorSchedule';

const Detail = (props) => {
    const history = useHistory();
    let { id, uriPage } = useParams();
    const [loading, setLoading] = useState();
    const [loadingStatus, setLoadingStatus] = useState();
    const [loadingMessage, setLoadingMessage] = useState();
    const [person, setPerson] = useState({});
    const [family, setFamily] = useState([]);
    const [page, setPage] = useState(uriPage);

    useEffect( () => {
        if(!page) setPage('information');
        getData();
    }, []);

    const getData = async () => {
        setLoading(true);
        setLoadingMessage('Proses mengambil data...');
        const {
            result,
            error,
            forceStop
        } = await detail_doctor(id);

        if(error) {
            setLoading(false);
            setLoadingMessage(error);
        } else {
            setPerson(result.data.person);
            setFamily(result.data.family);
            setLoading(false);
        }
    }

    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }

    const onClickNav = (e) => {
        setPage(e.key);
    }

    return(
        <div key="DoctorDetail">
            <PageHeader
                ghost
                title="Detail Dokter"
                buttons={[
                    <div key="6" className="page-header-actions">
                        <Button size="small" key="DoctorDetailBackBtn" type="warning">
                            <NavLink to={`/admin/doctor/${id}/update`}>
                                <i aria-hidden="true" className="fa fa-pencil"></i> Update Informasi
                            </NavLink>
                        </Button>
                        <Button size="small" key="DoctorDetailUpdateData" type="primary" onClick={() => history.push('/admin/doctor')}>
                            <i aria-hidden="true" className="fa fa-arrow-circle-left"></i> Kembali
                        </Button>
                    </div>,
                    ]}
            />
            <Main>
                <Row gutter={25}>
                    <Col xxl={6} lg={8} md={10} xs={24}>
                        {   loading ?
                            <Cards headless>
                                <Skeleton avatar active paragraph={{ rows: 3 }} />
                            </Cards>
                        :
                            <>
                                <UserCards
                                    user={{
                                        name: (person?.full_name ? person.full_name : person.display_name),
                                        designation: (person?.alt_name ? person.alt_name : 'Pasien'),
                                        img: person.profile_pic
                                    }}
                                />
                                <UserBio person={person} family={family} personType="doctor" />
                            </>
                        }
                    </Col>
                    <Col xxl={18} lg={16} md={14} xs={24}>
                        <SettingWrapper>
                            <Menu onClick={onClickNav} selectedKeys={page} mode="horizontal">
                                <Menu.Item key="information">
                                    <NavLink to={`/admin/doctor/${id}/information`}>
                                        Informasi Pribadi
                                    </NavLink>
                                </Menu.Item>
                                <Menu.Item key="appointment">
                                    <NavLink to={`/admin/doctor/${id}/appointment`}>
                                        Daftar Perjanjian
                                    </NavLink>
                                </Menu.Item>
                                <Menu.Item key="schedule">
                                    <NavLink to={`/admin/doctor/${id}/schedules`}>
                                        Jadwal Praktek
                                    </NavLink>
                                </Menu.Item>
                            </Menu> <br/>
                            <Switch>
                                    <Route exact key="DoctorDetailInformation" path={`/admin/doctor/:id/information`} component={() => <PersonDetail person_id={id} person={person} is_doctor={true} loading={loading} />} />
                                    <Route key="DoctorDetailAppointment" path={`/admin/doctor/:id/appointment`} component={PatientAppointment} />
                                    <Route key="DoctorDetailSchedule" path={`/admin/doctor/:id/schedules`} component={DoctorSchedule} />
                            </Switch>
                        </SettingWrapper>
                    </Col>
                </Row>
            </Main>
        </div>
    );
}

export default Detail;