import React from 'react';
import { Row, Col, Skeleton, Form, Input } from 'antd';
import { useHistory } from 'react-router-dom';
import { Main } from '../styled';

import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { AlertError } from '../../components/alerts/alerts';

import {
    SelectBranch,
    SelectDepartment,
    SelectSpecialist
} from '../../components/form/select';

const Finance = (props) => {

    const history = useHistory();
    const [form] = Form.useForm();

    const onFinish = (fields) => {
        console.log('onFinish:', fields);
    }

    return(
        <>
            <PageHeader
                ghost
                title="Laporan Keuangan"
                buttons={[
                <div key="6" className="page-header-actions">
                    <Button size="small" key="4" type="primary" onClick={() => history.goBack()}>
                        <i aria-hidden="true" className="fa fa-arrow-circle-left"></i> Kembali
                    </Button>
                </div>,
                ]}
            />
            <Main>
                <Cards
                    title="Filter Data"
                >
                    <Form
                        form={form}
                        onFinish={onFinish}
                        name="modal"
                        layout="vertical"
                    >
                        <Row gutter={[8, 8]}>
                            <Col xl={4} xs={24}>
                                <Form.Item name="start_date" label="Tanggal awal" >
                                    <Input placeholder="..."/>
                                </Form.Item>
                            </Col>
                            <Col xl={4} xs={24}>
                                <Form.Item name="end_date" label="Tanggal akhir" >
                                    <Input placeholder="..."/>
                                </Form.Item>
                            </Col>
                            <Col xl={8} xs={24}>
                                <Form.Item name="branch_id" label="Cabang" >
                                    <SelectBranch/>
                                </Form.Item>
                            </Col>
                            <Col xl={8} xs={24}>
                                <Form.Item name="department_id" label="Departemen" >
                                    <SelectDepartment/>
                                </Form.Item>
                            </Col>
                            <Col xl={8} xs={24}>
                                <Form.Item name="specialist_id" label="Spesialis" >
                                    <SelectSpecialist/>
                                </Form.Item>
                            </Col>
                            <Col xl={8} xs={24}>
                                <Form.Item name="doctor" label="Dokter" >
                                    <Input placeholder="..."/>
                                </Form.Item>
                            </Col>
                            <Col xl={8} xs={24}>
                                <Form.Item name="patient" label="Pasien" >
                                    <Input placeholder="..."/>
                                </Form.Item>
                            </Col>
                            <Col span={24} className="text-right">
                                <Form.Item>
                                    <Button type="danger" size="default" onClick={() => form.resetFields()}>
                                        Reset
                                    </Button> &nbsp;&nbsp;
                                    <Button type="primary" size="default" htmlType="submit" className="login-form-button">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Cards>
            </Main>
        </>
    );
}

export default Finance;