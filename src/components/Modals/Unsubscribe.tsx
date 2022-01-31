import React from 'react';
import { BsCheckCircle } from 'react-icons/bs';

const Unsubscribe = () => {
  return (
    <div className="unsubscribe registered">
      <div>
        <h3>Tu es désinscrite</h3>
      </div>
      <div className="registered__logo">
        <BsCheckCircle style={{ fontSize: '4vw', color: '#4AAEA1' }} />
      </div>
    </div>
  );
};

export default Unsubscribe;
