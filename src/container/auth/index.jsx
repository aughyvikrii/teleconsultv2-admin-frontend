import React from 'react';
import { Row, Col } from 'antd';
import { Aside, Content } from './style';
import Heading from '../../components/heading/heading';
import GlobalLayout from '../../layout/GlobalLayout';

const AuthLayout = WraperContent => {
  return () => {
    return (
      // <GlobalLayout>
        <Row>
          <Col xxl={8} xl={9} lg={12} md={8} xs={24}>
            <WraperContent />
          </Col>
        </Row>
      // </GlobalLayout>
    );
  };
};

export default AuthLayout;
