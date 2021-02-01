import React from 'react';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import { UserBioBox } from '../style';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';

const UserBio = (props) => {
  const { person, family } = props;
  return (
    <UserBioBox>
      <Cards headless>
        <address className="user-info">
          <h5 className="user-info__title">Informasi Kontak</h5>
          <ul className="user-info__contact">
            <li>
              <FeatherIcon icon="mail" size={14} /> <span>{person.email}</span>
            </li>
            <li>
              <FeatherIcon icon="phone" size={14} /> <span>{person.phone_number}</span>
            </li>
            <li>
              <FeatherIcon icon="globe" size={14} /> <span>www.example.com</span>
            </li>
          </ul>
        </address>
        <div className="user-info">
          <h5 className="user-info__title">Anggota Keluarga</h5>
          <div className="user-info__skills">
            { Object.keys(family).map(index => {
                let data = family[index];
                return(
                  <Link to={"/admin/patient/detail/"+data.pid+"/information"} key={index} >
                    <Button block={true} outlined={true} size="small" key="4" type="primary">
                        {data.full_name}
                    </Button>
                  </Link>
                );
              })
            }
          </div>
        </div>
      </Cards>
    </UserBioBox>
  );
};

export default UserBio;
