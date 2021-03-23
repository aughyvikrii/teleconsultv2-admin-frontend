import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { Avatar, Form, Input, Button, Row,  Col } from 'antd';
import Heading from '../../components/heading/heading';
import LoginIcon from '../../static/img/password.png';
import Loading from '../../components/loadings';
import { AlertError } from '../../components/alerts/alerts';
import { loginModal, loginSuccess } from '../../redux/authentication/actionCreator';
import { _login }  from '../../api';

const LoginForm = (props) => {

    const [alert, setAlert] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const logUser = JSON.parse(localStorage.getItem('user'));

    const formSize = props.compact ? 24 : {span: 12, offset: 6};

    const loginAction = async (fields) => {
        setStatus('');
        setAlert('');
        setLoading(true);

        const [result, error] = await _login(fields);

        if(error) {
            setLoading(false);
            setAlert(
                AlertError(error)
            );
        } else {
            Cookies.set('token', result.token);
            localStorage.setItem('user', JSON.stringify(result.user));
            setStatus('ok');
            setAlert('Login Berhasil! Anda akan dialihkan..');
            dispatch(loginSuccess(result.token));
            dispatch(loginModal(false));
            // setTimeout(() => {
            //     window.location.reload()
            // }, 2000);
        }
    }

    const loadingComponent = () => {
        return(
        <>
            <Loading status={status}/>
            { alert ? alert : 'Memproses permintaan...' }
        </>
        );
    }

    const formComponent = () => {
        return(
        <>
            <div>
                <Avatar size={{ xs: 80, sm: 80, md: 80, lg: 80, xl: 80, xxl: 100 }} src={LoginIcon} />
            </div> <br/>
            <Row  gutter={25} className="text-left">
                <Col lg={formSize} xs={24}>
                    {alert}
                    <Form layout="vertical" form={form} onFinish={loginAction}>
                        <Form.Item name="contact" initialValue={logUser?.email} label="Alamat Email/Nomor Telepon"
                            rules={[{required: true, message: 'Masukan alamat email/nomor telepon'}]}
                        >
                            <Input placeholder="Enter Email" autoFocus />
                        </Form.Item>
                        <Form.Item name="password" label="Password"
                            rules={[{required: true, message: 'Masukan password'}]}
                        >
                            <Input.Password placeholder="Enter Password" autoComplete="false"/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" block={true}>
                                Autentikasi
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
        );
    }

    return(
        <>
        <div className="text-center">
            <Heading as="h3">
            Autentikasi <span className="color-primary">diperlukan</span>
            </Heading>
            <span>Silahkan login untuk melanjutkan</span> <br/> <br/>
            {   loading ? loadingComponent() : formComponent() }
        </div>
        </>
    );
}

LoginForm.defaultProps = {
    compact: false,
}

LoginForm.propTypes = {
    compact: PropTypes.bool,
};

export default LoginForm;