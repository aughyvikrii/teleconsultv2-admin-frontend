import React, { useEffect, useState } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Form, Radio, Popconfirm, Table, Skeleton } from 'antd';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { ButtonHeading } from '../../../components/cards/style';
import { BtnWithIcon } from '../../styled';
import Heading from '../../../components/heading/heading';
import { Tag } from '../../../components/tags/tags';
import { FormAddScheduleNew } from '../../../components/form';
import { ModalCreateUpdateSchedule } from '../../../components/modals';
import { get_doctor_schedule } from '../../../api';
import { useParams } from 'react-router';

const DoctorSchedule = () => {

    const [loading, setLoading] = useState(true);
    const [listType, setListType] = useState('perday');
    const [schedules, setSchedules] = useState([]);
    const [perDay, setPerDay] = useState({});
    const [scheduleData, setScheduleData] = useState({});

    const [form] = Form.useForm();

    const [modal, setModal] = useState({
        visible: false,
        title: 'Tambah Jadwal',
        action: 'add'
    });

    const {id} = useParams();

    const getData = async () => {

        setLoading(true);

        const {
            result, error
        } = await get_doctor_schedule(id);

        setLoading(false);

        if(error) {
            setSchedules([]);
        } else {
            setSchedules(result.data);
        }
    }

    useEffect( () => {
        getData();
    }, [id]);

    useEffect( () =>{
        let day = {};

        schedules.map(row => {

            if(typeof day[row.weekday] === 'undefined') {
                day[row.weekday] = {
                    name: '',
                    data: []
                };
            }

            row.key = row.schedule_id;
            row.id = row.schedule_id;

            row.mobile_data = (<>
                <Cards border={true} headless={true} className="text-left">
                    <b>ID</b> #{row.schedule_id} <br/>

                    { listType !== 'perday' && (<>
                        <b>Hari</b> <br/>
                        {row.weekday_alt} <br/>
                    </>) }

                    { listType !== 'perbranch' && (<>
                        <b>Cabang</b> <br/>
                        {row.branch} <br/>
                    </>) }

                    { listType !== 'perdepartment' && (<>
                        <b>Departemen</b> <br/>
                        {row.department} <br/>
                    </>)}

                    <b>Jam Praktek</b>  <br/>
                    {row.start_hour} - {row.end_hour} <br/>

                    <b>Durasi</b> <br/>
                    {row.duration} Menit <br/>

                    <b>Ditambah oleh</b> <br/>
                    {row.creator} <br/>

                    <b>Status</b> <br/>
                    {!row.is_active ?  <Tag color="#f50">Nonaktif</Tag> :  <Tag color="#87d068">Aktif</Tag>} <br/> <br/>

                    <Button className="btn-icon" size="default" block={true} type="primary" title="Update" onClick={() => modalFunc('edit',row)}>
                        <i aria-hidden="true" className="fa fa-pencil"></i> Edit Data
                    </Button> &nbsp;
                    <Popconfirm
                        title="Yakin menghapus data ini?"
                        onConfirm={() => deleteData(row)}
                        okText="Ya"
                        cancelText="Batal"
                    >
                        <Button className="btn-icon" size="default" outlined block={true} type="danger" title="Hapus">
                        <i aria-hidden="true" className="fa fa-trash-o"></i> Hapus
                        </Button>
                    </Popconfirm>
                </Cards>
            </>);

            row.action = (
                <div className="table-actions">
                    <>
                        <Button className="btn-icon" size="default" shape="round" type="primary" title="Update" onClick={() => modalEdit(row)}>
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
                    </>
                </div>
            );

            row.status = (
                !row.is_active ?  <Tag color="#f50">Nonaktif</Tag> :  <Tag color="#87d068">Aktif</Tag>
            );

            day[row.weekday]['name'] = row.weekday_alt;
            day[row.weekday]['data'].push(row);
        });

        setPerDay(day);

    }, [schedules]);

    const PerDayTable = () => {

        return(
            <>
                <Heading className="text-center">
                    Data Perhari
                </Heading> <br/>
                {   Object.keys(perDay).map(id => {
                        let source = perDay[id];

                        let column = [
                            {
                                title: 'Hari ' + source.name,
                                children: [
                                    { title: 'ID', dataIndex: 'id', key: 'id', responsive: ['sm'] },
                                    { title: 'Cabang', dataIndex: 'branch', key: 'branch', responsive: ['sm'] },
                                    { title: 'Departemen', dataIndex: 'department', key: 'department', responsive: ['sm'] },
                                    { title: 'Mulai', dataIndex: 'start_hour', key: 'start_hour', responsive: ['sm'] },
                                    { title: 'Selesai', dataIndex: 'end_hour', key: 'end_hour', responsive: ['sm'] },
                                    { title: 'Durasi', dataIndex: 'duration', key: 'duration', responsive: ['sm'] },
                                    { title: 'Tarif', dataIndex: 'fee', key: 'fee', responsive: ['sm'] },
                                    { title: 'Status', dataIndex: 'status', key: 'status', responsive: ['sm'] },
                                    { title: 'Dibuat oleh', dataIndex: 'creator', key: 'creator', responsive: ['sm'] },
                                    { title: '#', dataIndex: 'action', key: 'action', responsive: ['sm'] },
                                ],
                                responsive: ['sm']
                            },
                            { title: 'Hari ' + source.name, dataIndex: 'mobile_data', key: 'mobile_data', responsive: ['xs'] },
                        ];

                        return (
                            <div key={id}>
                                <Table
                                    columns={column}
                                    dataSource={source.data}
                                    pagination={false}
                                />
                                <br/>
                            </div>
                        );
                    })
                }
            </>
        );
    }

    const modalEdit = (row) => {
        setScheduleData(row);
        console.log(row);
        let title = 'Edit Jadwal #' + row.schedule_id;
        setModal({...modal, visible: true, title: title});
    }

    const showModal = () => {
        setScheduleData({});
        setModal({...modal, visible: true, title: 'Tambah Jadwal'});
    }

    return(
        <>
        <Cards
            title="Jadwal Praktek"
            extra={
                <div className="card-radio">
                    <BtnWithIcon>
                        <BtnGroup>
                            <Button size="small" type="danger" onClick={() => showModal(true)}>
                                <PlusCircleOutlined/>
                            </Button>
                            <Button size="small" type="danger" onClick={() => showModal(true)}>
                                Tambah Jadwal
                            </Button>
                        </BtnGroup>
                    </BtnWithIcon>
                </div>
            }
        >
        { loading ? <Skeleton/> : <PerDayTable/> }
        </Cards>
        <ModalCreateUpdateSchedule
            forceRender={true}
            visible={modal.visible}
            title={modal.title}
            doctor_id={id}
            callback={getData}
            mState={[modal, setModal]}
            scheduleData={scheduleData}
        />
        </>
    );
}

export default DoctorSchedule;