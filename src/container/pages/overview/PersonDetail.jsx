import React, { useState } from 'react';
import PropTypes from 'prop-types'
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Row, Col, Descriptions } from 'antd';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { useEffect } from 'react';
import { DescriptionWrapper } from '../style';

import { detail_person } from '../../../api';


const PersonDetail = (props) => {
    let {person, person_id} = props;
    const [data, setData]= useState(person ? person : {});
    const {id} = useParams();
    
    if(Object.keys(person).length === 0){
        if(!person_id) person_id = id;
    }
    
    useEffect( () => {
        let isSubscribed = true
        
        const getData = async () => {
            if(typeof person_id !== 'undefined') {
                const [result, error] = await detail_person(person_id);
                if(result && isSubscribed) setData(result.data.person);
            }
        }
        getData();
        return () => isSubscribed = false;
    }, []);
    
    const PatientDescription = () => {
        return(
            <Descriptions title="Informasi Pribadi" size="small" bordered column={{ xs: 1, sm: 1, lg: 2}} >
                <Descriptions.Item label="Titel" span={2}>{data.title_short} <span className="text-bold">[{data.title}]</span> </Descriptions.Item>
                <Descriptions.Item label="Nama Depan">{data.first_name}</Descriptions.Item>
                <Descriptions.Item label="Nama Belakang">{data.last_name ? data.last_name : '-'}</Descriptions.Item>
                <Descriptions.Item label="Alamat Email">{data.email}</Descriptions.Item>
                <Descriptions.Item label="Nomor Telepon">{data.phone_number}</Descriptions.Item>
                <Descriptions.Item label="Jenis Kelamin">{data.gender}</Descriptions.Item>
                <Descriptions.Item label="Tanggal Lahir">{data.birth_date}</Descriptions.Item>
                <Descriptions.Item label="Tempat Lahir">{data.birth_place}</Descriptions.Item>
                <Descriptions.Item label="Agama">{data.religion}</Descriptions.Item>
                <Descriptions.Item label="Status">{data.married_status}</Descriptions.Item>
                <Descriptions.Item label="Nomor Identitas">{ data.identity_number ? <>{data.identity_number} [{data.identity_type}]</> : '-'}</Descriptions.Item>
                <Descriptions.Item label="Alamat">{data.address}</Descriptions.Item>
            </Descriptions>
        );
    }
    
    const DoctorDescription = () => {
        return(
            <Descriptions title="Informasi Pribadi" size="small" bordered column={{ xs: 1, sm: 1, lg: 1}} >
                <Descriptions.Item label="Alamat Email">{data.email}</Descriptions.Item>
                <Descriptions.Item label="Nama Tampilan">{data.display_name}</Descriptions.Item>
                <Descriptions.Item label="Spesialis">{data.alt_name} [{data.title}]</Descriptions.Item>
                <Descriptions.Item label="Nomor Telepon">{data.phone_number}</Descriptions.Item>
                <Descriptions.Item label="Jenis Kelamin">{data.gender}</Descriptions.Item>
                <Descriptions.Item label="Tanggal Lahir">{data.birth_date_alt} <span className="color-error">({data.age})</span> </Descriptions.Item>
                <Descriptions.Item label="Tempat Lahir">{data.birth_place}</Descriptions.Item>
            </Descriptions>
        );
    }

    return(
        <Row gutter={24}>
            <Col xs={24}>
                <Cards headless>
                    <DescriptionWrapper>
                        { props.is_doctor ? <DoctorDescription/> : <PatientDescription/> }
                    </DescriptionWrapper>
                </Cards>
            </Col>
        </Row>
    );
}

PersonDetail.defaultProps = {
    person: {},
    person_id: 0,
    is_doctor: false,
    is_admin: false,
    is_patient: true
}

PersonDetail.propTypes = {
    person: PropTypes.object,
    person_id: PropTypes.any,
    is_doctor: PropTypes.bool,
    is_admin: PropTypes.bool,
    is_patient:  PropTypes.bool,
};

export default PersonDetail;