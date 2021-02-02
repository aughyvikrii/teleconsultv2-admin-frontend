import React from 'react';
import { Row, Col, Card } from 'antd';
import Alert from '../../components/alerts/alerts';
import FeatherIcon from 'feather-icons-react';
import LoginForm from './LoginForm';

const Login = () => {
    
    const { isLoading, isError } = useSelector(state => {
        return {
            isLoading: state.auth.loading,
            isError: state.auth.error
        }
    });

    if(isError && !isLoading) {
        alert = <> <br/>
            <Alert
                showIcon
                icon={<FeatherIcon icon="layers" size={15} />}
                message="Error"
                description={isError}
                type="error"
            /> <br/>
        </>
    } else { alert = '' }

    return(
        <Row type="flex" justify="center" align="middle" style={{minHeight: "100vh"}}>
            <Col lg={8} sm={24}>
                <Card>
                    {/* <Form name="login" onFinish={onFinish} layout="vertical">
                        <Heading as="h3" className="text-center">
                            Login <span className="color-secondary">Telekonsultasi v2</span>
                        </Heading>
                        { alert }
                        <Form.Item
                            name="email"
                            rules={[
                            {
                                required: true,
                                message: 'Masukan alamat email!',
                            },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                            {
                                required: true,
                                message: 'Masukan password anda!',
                            },
                            ]}
                        >
                            <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                            />
                        </Form.Item>
                        <div className="auth-form-action">
                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>
                                <NavLink className="forgot-pass-link" to="#">
                                    Forgot password?
                                </NavLink>
                            </Form.Item>

                        </div>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" block={true}>
                            Log in
                            </Button>
                        </Form.Item>
                    </Form> */}
                    <LoginForm compact={true}/>
                </Card>
            </Col>
        </Row>
    );
}

export default Login;