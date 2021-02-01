import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UserCard } from '../style';
import Heading from '../../../components/heading/heading';
import { Cards } from '../../../components/cards/frame/cards-frame';

const UserCards = ({ user }) => {
  const { name, designation, img } = user;
  return (
    <UserCard>
      <div className="card user-card">
        <Cards headless>
          <figure>
            <img src={img} alt="" />
          </figure>
          <figcaption>
            <div className="card__content">
              <Heading className="card__name" as="h6">
                <Link to="#">{name}</Link>
              </Heading>
              <p className="card__designation">{designation}</p>
            </div>
          </figcaption>
        </Cards>
      </div>
    </UserCard>
  );
};

UserCards.propTypes = {
  user: PropTypes.object,
};

export default UserCards;
