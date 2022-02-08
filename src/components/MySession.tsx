import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { BsBoxArrowInUpRight } from 'react-icons/bs';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

import { error } from '../errors';
import IDepartment from '../interfaces/IDepartment';
import ISession from '../interfaces/ISession';
import ISurfStyle from '../interfaces/ISurfStyle';

type Props = ISession;

const MySession: FC<Props> = ({
  address,
  name,
  spot_name,
  id_surf_style,
  carpool,
  nice_date,
  nice_time,
  id_session,
  id_department,
}) => {
  const [department, setDepartment] = useState<IDepartment>();
  const [surfStyle, setSurfStyle] = useState<ISurfStyle>();

  const getAllDepartments = async (idDepartment: number) => {
    const departments = await axios.get<IDepartment>(
      `http://localhost:3000/api/departments/${idDepartment}`,
    );
    setDepartment(departments.data);
  };

  const getAllSurfStyles = async (idSurfStyle: number) => {
    const surfStyles = await axios.get<ISurfStyle>(
      `http://localhost:3000/api/surfstyles/${idSurfStyle}`,
    );
    setSurfStyle(surfStyles.data);
  };

  useEffect(() => {
    try {
      getAllDepartments(id_department);
      getAllSurfStyles(id_surf_style);
    } catch (err) {
      error();
    }
  }, []);

  return (
    <div className="mysession">
      <div className="mysession__button">
        <h6 className="mysession__button__region">
          {department && department.department_name}
        </h6>
        <h6 className="mysession__button__surfstyle">
          {surfStyle && surfStyle.name_session}
        </h6>
      </div>
      <div className="mysession__infos">
        <div className="mysession__infos__spot">
          <h4 className="mysession__infos__spot__h4">{name}</h4>
          <h6 className="mysession__infos__spot__h6"> {spot_name} </h6>
          <h6 className="mysession__infos__spot__adress"> {address} </h6>
        </div>

        <div className="mysession__infos__rdv">
          <div className="mysession__infos__rdv__date">
            <p className="mysession__infos__rdv__date__p">{nice_date}</p>
            <p>{nice_time}</p>
          </div>
          <div className="mysession__infos__rdv__covoit">
            {carpool === 1 ? (
              <p>
                Covoiturage <BsFillPatchCheckFill color="#1f8387" />
              </p>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <hr className="mysession__hr" />
      <NavLink to={`/session/${id_session}`}>
        <h5 className="mysession__details">
          Details <BsBoxArrowInUpRight />
        </h5>
      </NavLink>
    </div>
  );
};

export default MySession;
