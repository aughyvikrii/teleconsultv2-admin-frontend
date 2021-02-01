import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Row, Col, Skeleton } from 'antd';
import { Main, SettingWrapper } from '../styled';
import { NavLink, Switch, Route, useRouteMatch, useHistory, useParams } from 'react-router-dom';

// Component
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import Loading from '../../components/loadings';
import { Cards } from '../../components/cards/frame/cards-frame';

// API
import { detail_person } from '../../api';


const UserCards = lazy(() => import('../pages/overview/UserCard'));
const UserBio = lazy(() => import('../pages/overview/UserBio'));

const PersonDetail = lazy(() => import('../pages/overview/PersonDetail'));
const PatientAppointment = lazy(() => import('../pages/overview/PatientAppointment'));

const Detail = () => {
    const { path, url } = useRouteMatch();
    const history = useHistory();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [loadingStatus, setLoadingStatus] = useState();
    const [loadingMessage, setLoadingMessage] = useState();
    const [person, setPerson] = useState({});
    const [family, setFamily] = useState([]);

    useEffect( () => {
        getData();
        // eslint-disable-next-line
    }, [id]);

    const getData = async () => {
        setLoading(true);
        setLoadingMessage('Proses mengambil data...');
        const [result, error] = await detail_person(id);

        if(error) {
            setLoadingMessage(error);
            setLoadingStatus('error');
        } else {
            setLoadingStatus('ok');
            setLoading(false);
            setPerson(result.data.person);
            setFamily(result.data.family);
        }
    }

    return(
        <>
            <PageHeader
                ghost
                title="Detail Pasien"
                buttons={[
                    <div key="6" className="page-header-actions">
                        <Button size="small" key="4" type="primary" onClick={() => history.push('/admin/doctor')}>
                        <i aria-hidden="true" className="fa fa-arrow-circle-left"></i>
                            Kembali
                        </Button>
                    </div>,
                    ]}
            />
            <Main>
                <Row gutter={25}>
                    {   loading ?
                        <Col xs={24}>
                            <Cards headless>
                                <div className="text-center">
                                    <Loading status={loadingStatus} /> <br/>
                                    {loadingMessage}
                                </div>
                            </Cards>
                        </Col>
                    :
                        <>
                            <Col xxl={6} lg={8} md={10} xs={24}>
                                <Suspense
                                fallback={
                                    <Cards headless>
                                    <Skeleton avatar active paragraph={{ rows: 3 }} />
                                    </Cards>
                                }
                                >
                                <UserCards
                                    user={{ name: person.full_name, designation: 'Pasien', img: person.profile_pic }}
                                />
                                </Suspense>
                                <Suspense
                                fallback={
                                    <Cards headless>
                                    <Skeleton active paragraph={{ rows: 10 }} />
                                    </Cards>
                                }
                                >
                                <UserBio person={person} family={family} />
                                </Suspense>
                            </Col>
                            <Col xxl={18} lg={16} md={14} xs={24}>
                            <SettingWrapper>
                                <Suspense
                                    fallback={
                                    <Cards headless>
                                        <Skeleton active />
                                    </Cards>
                                    }
                                >
                                    <div className="coverWrapper">
                                        <nav className="profileTab-menu">
                                            <ul>
                                                <li>
                                                    <NavLink to={`${url}/information`}>Informasi</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={`${url}/appointment`}>Daftar Perjanjian</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={`${url}/appointment`}>Jadwal</NavLink>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </Suspense>
                                <Switch>
                                    <Suspense
                                    fallback={
                                        <Cards headless>
                                        <Skeleton active paragraph={{ rows: 10 }} />
                                        </Cards>
                                    }
                                    >
                                    <Route exact path={`${path}/information`} component={() => <PersonDetail person={person} />} />
                                    <Route path={`${path}/appointment`} component={PatientAppointment} />
                                    </Suspense>
                                </Switch>
                            </SettingWrapper>
                        </Col>
                        </>
                    }
                </Row>
            </Main>
        </>
    );
}

export default Detail;