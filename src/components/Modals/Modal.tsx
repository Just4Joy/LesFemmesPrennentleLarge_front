import React, { FC, useEffect, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';

import arrowLeft from '../../../img/arrowLeft.svg';

type Props = {
  activeModal: string;
  setActiveModal: Dispatch<SetStateAction<string>>;
  children: React.ReactElement;
};

const Modal: FC<Props> = ({ activeModal, setActiveModal, children }: Props) => {
  const [modalClass, setModalClass] = useState<string>('__hiddenModal');
  const [overlayClass, setOverlayClass] = useState<string | ''>('');

  useEffect(() => {
    if (activeModal) {
      setModalClass('__showModal');
      setOverlayClass('__showOverlay');
    } else {
      setModalClass('__hiddenModal');
      setOverlayClass('');
    }
  }, [activeModal]);
  return (
    <>
      <div className={`App${overlayClass}`}></div>
      <div className={`App${modalClass}`}>
        <div className="connect__divlogo">
          <img
            role="presentation"
            className="connect__divlogo__logo"
            src={arrowLeft}
            alt=""
            onClick={() => setActiveModal('')}
            style={{ cursor: 'pointer' }}
          />
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
