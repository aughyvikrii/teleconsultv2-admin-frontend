import React from 'react';
import { Row, Col, Card } from 'antd';
// import Alert from '../../components/alerts/alerts';
// import FeatherIcon from 'feather-icons-react';
import LoginForm from './LoginForm';

const Login = () => {
    
    // const { isLoading, isError } = useSelector(state => {
    //     return {
    //         isLoading: state.auth.loading,
    //         isError: state.auth.error
    //     }
    // });

    // if(isError && !isLoading) {
    //     alert = <> <br/>
    //         <Alert
    //             showIcon
    //             icon={<FeatherIcon icon="layers" size={15} />}
    //             message="Error"
    //             description={isError}
    //             type="error"
    //         /> <br/>
    //     </>
    // } else { alert = '' }
    console.log('masuk sini');
    return(
        <Row type="flex" justify="center" align="middle" style={{minHeight: "100vh"}}>
            <Col lg={8} sm={24}>
                <Card>
                    {/* <LoginForm compact={true}/> */}
                </Card>
            </Col>
        </Row>
    );
}

export default Login;