import React from 'react';
import { ErrorWrapper } from './style';
import { Main } from '../styled';
import Heading from '../../components/heading/heading';
import { Button } from '../../components/buttons/buttons';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
  const history = useHistory();
  return (
    <Main>
      <ErrorWrapper>
        <img src={require(`../../static/img/pages/404.svg`)} alt="404" />
        <Heading className="error-text" as="h3">
          404
        </Heading>
        <p>Halaman yang anda cari tidak tersedia.</p>
          <Button size="small" key="4" type="danger" onClick={history.goBack}>
            <i aria-hidden="true" className="fa fa-arrow-circle-o-left"></i>
            Kembali
          </Button>
      </ErrorWrapper>
    </Main>
  );
};

export default NotFound;
