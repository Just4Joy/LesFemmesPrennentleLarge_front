import React from 'react';
import { BsCheckCircle } from 'react-icons/bs';

const Registered = () => {
  return (
    <div className="registered">
      <div>
        <h3>Tu es inscrite</h3>
      </div>
      <div className="registered__logo">
        <BsCheckCircle className="registered__logo__style" />
      </div>
    </div>
  );
};

export default Registered;
