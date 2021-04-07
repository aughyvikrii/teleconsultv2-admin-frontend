import React, { useEffect, useState } from 'react';
import { Row, Col, Skeleton, Menu } from 'antd';
import { Main, SettingWrapper } from '../styled';
import { NavLink, Switch, Route, useHistory, useParams } from 'react-router-dom';

// Component
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';

// API
import { detail_person } from '../../api';

import UserCards from '../pages/overview/UserCard';
import UserBio from '../pages/overview/UserBio';

import PersonDetail from '../pages/overview/PersonDetail';
import PatientAppointment from '../pages/overview/PatientAppointment';

const Detail = () => {
    const history = useHistory();
    let { id, uriPage } = useParams();
    const [loading, setLoading] = useState(true);
    const [person, setPerson] = useState({});
    const [family, setFamily] = useState([]);
    const [page, setPage] = useState(uriPage);

    useEffect( () => {
        if(!page) setPage('information');
        getData();
    }, []);

    const getData = async () => {
        setLoading(true);

        const {result, error} = await detail_person(id);

        if(error) {
            setLoading(false);
        } else {
            setPerson(result.data.person);
            setFamily(result.data.family);
        }

        setLoading(false);
    }

    const onClickNav = (e) => {
        setPage(e.key);
    }

    return(
        <>
            <PageHeader
                ghost
                title="Detail Pasien"
                buttons={[
                    <div key="6" className="page-header-actions">
                        <Button size="small" key="4" type="primary" onClick={() => history.push('/admin/patient')}>
                        <i aria-hidden="true" className="fa fa-arrow-circle-left"></i>
                            Kembali
                        </Button>
                    </div>,
                    ]}
            />
            <Main>
                <Row gutter={25}>
                    <Col xxl={6} lg={8} md={10} xs={24}>
                        { loading ?
                            <Cards headless>
                                <Skeleton avatar active paragraph={{ rows: 3 }} />
                            </Cards>
                            :
                            <>
                                <UserCards
                                    user={{ name: person.full_name, designation: 'Pasien', img: person.profile_pic }}
                                />
                                <UserBio person={person} family={family} />
                            </>
                        }
                    </Col>
                    <Col xxl={18} lg={16} md={14} xs={24}>
                        <SettingWrapper>
                            <Menu onClick={onClickNav} selectedKeys={page} mode="horizontal">
                                <Menu.Item key="information">
                                    <NavLink to={`/admin/patient/detail/${id}/information`}>
                                        Informasi Pribadi
                                    </NavLink>
                                </Menu.Item>
                                <Menu.Item key="appointment">
                                    <NavLink to={`/admin/patient/detail/${id}/appointment`}>
                                        Daftar Perjanjian
                                    </NavLink>
                                </Menu.Item>
                            </Menu> <br/>
                            <Switch>
                                    <Route exact key="PatientDetailInformation" path={`/admin/patient/detail/:id/information`} render={() => <PersonDetail person_id={id} person={person}  loading={loading} />} />
                                    <Route key="PatientDetailAppointment" path={`/admin/patient/detail/:id/appointment`} render={() => <PatientAppointment type="patient" />} />
                            </Switch>
                        </SettingWrapper>
                    </Col>
                </Row>
            </Main>
        </>
    );
}

export default Detail;