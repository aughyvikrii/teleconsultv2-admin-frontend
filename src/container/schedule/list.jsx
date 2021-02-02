// Package
import React, { useEffect, useState, Suspense } from 'react';
import { Row, Col, Table, Radio, Skeleton, Avatar, Popconfirm, message } from 'antd';

// Component
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { ButtonHeading } from '../../components/cards/style';
import { Main, TableWrapper } from '../styled';
import Heading from '../../components/heading/heading';

//Api
import { get_schedule } from '../../api';

const LayoutDefault = (props) => {

    const {
        source = [],
        loading = false,
    } = props;

    const columns = [
        { title: 'ID', dataIndex: 'schedule_id', key: 'schedule_id' },
        { title: 'Dokter', dataIndex: 'doctor', key: 'doctor' },
        { title: 'Cabang', dataIndex: 'branch', key: 'branch' },
        { title: 'Departemen', dataIndex: 'department', key: 'department' },
        { title: 'Hari', dataIndex: 'weekday', key: 'weekday' },
        { title: 'Jam Praktek', dataIndex: 'practice_hours', key: 'practice_hours' },
        { title: 'Durasi', dataIndex: 'duration', key: 'duration' },
        { title: '#', dataIndex: 'action',  key: 'action' }
    ];

    return(
        <Table
            loading={loading}
            bordered={false}
            columns={columns}
            pagination={false}
            dataSource={ Object.values(source) }
        />
    );
}

const LayoutPerday = () => {
    return 'LayoutPerday';
}

const LayoutPerbranch = () => {
    return 'LayoutPerbranch';
}

const LayoutPerdepartment = () => {
    return 'LayoutPerdepartment';
}

const List = (props) => {

    const [listType, setListType] = useState('default');
    const [cardTitle, setCardTitle] = useState('Data Perhari');
    const [originalSource, setOriginalSource] = useState([]);
    const [source, setSource] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({pagination: true});
    const [dataLoaded, setDataLoaded] = useState(false);
    const [renderLayout, setRenderLayout] = useState(<LayoutDefault {...props} source={source} loading={loading}/>)

    const getData = async() => {
        const [result, error]  = await get_schedule(filters);
        if(error) {

        } else {
            setOriginalSource(result.data);
            setLoading(false);
        }
    }

    useEffect(()  => {
        if(!dataLoaded) {
            getData()
        }
    }, [filters]);

    const processData = () => {
        let data = {};
        originalSource.map(row => {
            row.originRow = row;
            row.key = row.schedule_id;

            row.practice_hours = (
                row.start_hour + ' - ' + row.end_hour
            );

            row.doctor = (
                <div className="user-info">
                    <figure>
                        <Suspense
                            fallback={
                                <Skeleton avatar active/>
                            }
                        >
                            <Avatar size={{ xs: 40, sm: 40, md: 40, lg: 40, xl: 40, xxl: 40 }} src={row.profile_pic} />
                        </Suspense>
                    </figure>
                    <figcaption>
                        <Heading className="user-name" as="h6">
                        {row.doctor}
                        </Heading>
                        <span className="user-designation color-error">{row.specialist}</span>
                    </figcaption>
                </div>
            );

            row.action = (
                <div className="table-actions">
                    <Button className="btn-icon" size="default" shape="round" type="primary" title="Detail" onClick={() => modalEdit(row)}>
                        <i aria-hidden="true" className="fa fa-pencil"></i>
                    </Button> &nbsp;
                    <Popconfirm
                        title="Yakin menghapus data ini?"
                        onConfirm={() => deleteData(row)}
                        okText="Ya"
                        cancelText="Batal"
                    >
                        <Button className="btn-icon" size="default" outlined shape="round" type="danger" title="Hapus">
                        <i aria-hidden="true" className="fa fa-trash-o"></i>
                        </Button>
                    </Popconfirm>
                </div>
            );

            return data[row.schedule_id] = row;
        });
        setSource(data);
    }

    useEffect(() => {
        processData();
    }, [originalSource]);

    const title = {
        default: {
            name: 'Default',
            layout: <LayoutDefault {...props} source={source} loading={loading}/>,
        },
        perday: {
            name: 'Perhari',
            layout: <LayoutPerday {...props} source={source} loading={loading}/>,
        },
        perbranch: {
            name: 'Percabang',
            layout:  <LayoutPerbranch {...props} source={source} loading={loading}/>,
        },
        perdepartment: {
            name: 'Perdepartemen',
            layout: <LayoutPerdepartment {...props} source={source} loading={loading}/>
        }
    };

    useEffect(() => {
        const data = title[listType]
        const Layout = data['layout'];
        setCardTitle('Data ' + data.name);
        setRenderLayout(Layout);
    }, [listType, source]);

    const showModal = () => {

    }

    return(
        <>
            <PageHeader
                ghost
                title="Jadwal Dokter"
                buttons={[
                <div key="6" className="page-header-actions">
                    <Button size="small" key="4" type="primary" onClick={() => showModal(true)}>
                    <i aria-hidden="true" className="fa fa-plus"></i>
                    Tambah Baru
                    </Button>
                </div>,
                ]}
            />
            <Main>
                <Row gutter={25}>
                    <Col lg={24} xs={24}>
                        <Cards
                            title={cardTitle}
                            extra
                            isbutton={
                                <div className="card-radio">
                                    <ButtonHeading>
                                        <Radio.Group size='small' defaultValue={listType} onChange={(e) => setListType(e.target.value)} >
                                            <Radio.Button value="default">Default</Radio.Button>
                                            <Radio.Button value="perday">Hari</Radio.Button>
                                            <Radio.Button value="perbranch">Cabang</Radio.Button>
                                            <Radio.Button value="perdepartment">Departemen</Radio.Button>
                                        </Radio.Group>
                                    </ButtonHeading>
                                </div>
                            }
                        >
                            <TableWrapper>
                                {renderLayout}
                            </TableWrapper>
                        </Cards>
                    </Col>
                </Row>
            </Main>
        </>
    );
}

export default List;