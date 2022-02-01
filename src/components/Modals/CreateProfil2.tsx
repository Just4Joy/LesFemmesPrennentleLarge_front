import axios from 'axios';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { NavLink } from 'react-router-dom';

import { error, errorValidation, unauthorized, userNotFound } from '../../errors';
import ISurfSkill from '../../interfaces/ISurfskills';
import ISurfStyle from '../../interfaces/ISurfStyle';
import IUser from '../../interfaces/IUser';
import CurrentUserContext from '../contexts/CurrentUser';
import SurfSkill from '../SurfSkill';

type Props = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

const CreateProfil2: FC<Props> = ({ setActiveModal }) => {
  const { id } = useContext(CurrentUserContext);
  const [surfSkills, setSurfSkills] = useState<ISurfSkill[]>([]);
  const [activeSurfSkill, setActiveSurfSkill] = useState<ISurfSkill['id_surf_skill'][]>(
    [],
  );
  const [surfStyles, setSurfStyles] = useState<ISurfStyle[]>([]);
  const [id_surf_style, setId_surf_style] = useState<IUser['id_surf_style']>();

  useEffect(() => {
    //GET surfskills
    axios
      .get<ISurfSkill[]>('http://lfpll-back.herokuapp.com/api/surfskill')
      .then((result) => result.data)
      .then((data) => setSurfSkills(data))
      .catch(() => {
        error();
      });
    //GET surfstyles
    axios
      .get<ISurfStyle[]>('http://localhost:3000/api/surfstyles')
      .then((result) => result.data)
      .then((data) => setSurfStyles(data))
      .catch(() => {
        error();
      });
  }, []);

  //Avoids having two surfskills selected during the PUT
  const add = (id: ISurfSkill['id_surf_skill']) => {
    const arr = activeSurfSkill;
    if (arr.find((el) => el === id)) {
      arr.splice(arr.indexOf(id), 1);
    } else arr.push(id);

    setActiveSurfSkill(arr);
  };

  //PUT Profile
  const updateSurfStyleProfile = () => {
    axios
      .put(
        `http://localhost:3000/api/users/${id}`,
        {
          id_surf_style,
        },
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      )
      .then(() => {
        setActiveModal('');
        UpdateProfile();
      })
      .catch((err) => {
        if (err.response.status === 401) {
          unauthorized();
        } else if (err.response.status === 422) {
          errorValidation();
        } else if (err.response.status === 404) {
          userNotFound();
        } else {
          error();
        }
      });
  };

  //POST Surfskills
  const UpdateProfile = () => {
    Promise.all(
      activeSurfSkill.map(async (el) => {
        axios.post(
          `http://localhost:3000/api/users/${id}/surfskills`,
          { id_surf_skill: el },
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          },
        );
      }),
    )
      .then((response) => console.log(response))
      .catch(() => {
        error();
      });
  };

  return (
    <div className="createProfil2">
      <div className="createProfil2__titles">
        <h2>Compléter son profil 2/2</h2>
        <NavLink to="/profile">
          <h2
            role="presentation"
            className="createProfil2__titles__skip"
            onClick={() => setActiveModal('')}>
            Skip
          </h2>
        </NavLink>
      </div>
      <div className="createProfil2__styles">
        <div className="createProfil2__styles__title">
          <p> Choisis ton style de surf</p>
        </div>
        <div className="createProfil2__styles__tag">
          <select
            onBlur={(e: React.FormEvent<HTMLSelectElement>) => {
              setId_surf_style(parseInt(e.currentTarget.value, 10));
            }}>
            <option value="">type de session</option>
            {surfStyles &&
              surfStyles.map((surfStyle) => (
                <option key={surfStyle.id_surf_style} value={surfStyle.id_surf_style}>
                  {surfStyle.name_user}
                </option>
              ))}
          </select>
        </div>
        <div className="createProfil2__skills">
          <div className="createProfil2__skills__title">
            <p> Choisis tes skills</p>
          </div>
          <div className="createProfil2__skills__tags">
            {surfSkills &&
              surfSkills.map((surfSkill) => {
                return (
                  <SurfSkill
                    {...surfSkill}
                    key={surfSkill.id_surf_skill}
                    id_surf_skill={surfSkill.id_surf_skill}
                    add={add}
                  />
                );
              })}
          </div>
          <div className="createProfil2__button">
            <NavLink
              className="createProfil2__button__validate"
              to="/profile"
              onClick={() => {
                updateSurfStyleProfile();
              }}>
              Valider mon profil
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProfil2;
