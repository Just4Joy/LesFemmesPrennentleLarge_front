import React, { FC } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { BsClock } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

type Props = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

const RegisteredWahine: FC<Props> = ({ setActiveModal }) => {
  return (
    <div className="container">
      <BsClock className="container__logo" />
      <p className="container__text">
        Votre demande pour devenir Wahine à bien été prise en compte.
      </p>
      <NavLink className="container__button" to="/" onClick={() => setActiveModal('')}>
        Revenir à l&apos;acceuil
      </NavLink>
    </div>
  );
};

export default RegisteredWahine;
