import React, { FC } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { BsCheckCircle } from 'react-icons/bs';

type Props = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

const SessionPublished: FC<Props> = () => {
  return (
    <div className="published">
      <div>
        <h3>Session publiée</h3>
      </div>
      <div className="published__logo">
        <BsCheckCircle className="published__logo__style" />
      </div>
    </div>
  );
};

export default SessionPublished;
