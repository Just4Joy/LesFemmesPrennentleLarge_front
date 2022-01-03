import React, { useEffect, useState, FC } from 'react';
import arrowLeft from './img/arrowLeft.svg';

type ModalProps = {
  activeModal: string;
  setActiveModal: (modalOpened: string) => void;
  children: React.ReactElement;
};

const Modal: FC<ModalProps> = ({ activeModal, setActiveModal, children }: ModalProps) => {
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
            className="connect__divlogo__logo"
            src={arrowLeft}
            alt=""
            onClick={() => setActiveModal('')}
          />
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
