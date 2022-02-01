import React, { FC, useState } from 'react';

import ISurfStyle from '../interfaces/ISurfStyle';

type Props = ISurfStyle;

const SurfStyle: FC<Props> = (name_user) => {
  const [active, setActive] = useState(false);
  return (
    <div className="surfstyle">
      <button
        className={active ? 'surfstyle__button__active' : 'surfstyle__button'}
        type="button"
        onClick={() => {
          setActive(!active);
        }}>
        {name_user}
      </button>
    </div>
  );
};

export default SurfStyle;
