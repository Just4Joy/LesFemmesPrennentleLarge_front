import axios, { AxiosError } from 'axios';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { NavLink } from 'react-router-dom';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import { error, errorValidation, unauthorized, userNotFound } from '../../errors';
import ISurfSkill from '../../interfaces/ISurfSkill';
import ISurfStyle from '../../interfaces/ISurfStyle';
import IUser from '../../interfaces/IUser';
import CurrentUserContext from '../contexts/CurrentUser';
import SurfSkill from '../SurfSkill';

type Props = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

const CreateProfile2: FC<Props> = ({ setActiveModal }) => {
  const { id } = useContext(CurrentUserContext);
  const [surfSkills, setSurfSkills] = useState<ISurfSkill[]>([]);
  const [activeSurfSkills, setActiveSurfSkills] = useState<ISurfSkill['id_surf_skill'][]>(
    [],
  );
  const [surfStyles, setSurfStyles] = useState<ISurfStyle[]>([]);
  const [idSurfStyle, setIdSurfStyle] = useState<IUser['id_surf_style']>();
  const navigate: NavigateFunction = useNavigate();

  const getAllSurfSkills = async () => {
    const allSurfSkills = await axios.get<ISurfSkill[]>(
      'http://localhost:3000/api/surfskills',
    );
    setSurfSkills(allSurfSkills.data);
  };

  const getAllSurfStyles = async () => {
    const allSurfStyles = await axios.get<ISurfStyle[]>(
      'http://localhost:3000/api/surfstyles',
    );
    setSurfStyles(allSurfStyles.data);
  };

  useEffect(() => {
    try {
      getAllSurfSkills();
      getAllSurfStyles();
    } catch (err) {
      error();
    }
  }, []);

  //Avoids having two surfskills selected during the PUT
  const addSurfSkills = (id: ISurfSkill['id_surf_skill']) => {
    const surfSkills = activeSurfSkills;
    if (surfSkills.find((idSurfSkill) => idSurfSkill === id)) {
      surfSkills.splice(surfSkills.indexOf(id), 1);
    } else surfSkills.push(id);

    setActiveSurfSkills(surfSkills);
  };

  //PUT Profile
  const updateSurfStyleProfile = async () => {
    try {
      const updatedUser = await axios.put(
        `http://localhost:3000/api/users/${id}`,
        {
          id_surf_style: idSurfStyle,
        },
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      if (updatedUser.status !== 200) {
        throw new Error();
      } else {
        updateProfile();
        setActiveModal('');
        navigate('/profile');
      }
    } catch (err) {
      const er = err as AxiosError;
      if (er.response?.status === 401) {
        unauthorized();
      } else if (er.response?.status === 422) {
        errorValidation();
      } else if (er.response?.status === 404) {
        userNotFound();
      } else {
        error();
      }
    }
  };

  //POST Surfskills
  const updateProfile = async () => {
    try {
      await Promise.all(
        activeSurfSkills.map(async (index) => {
          axios.post(
            `http://localhost:3000/api/users/${id}/surfskills`,
            { idSurfSkill: index },
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            },
          );
        }),
      );
    } catch (err) {
      error();
    }
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
            onChange={(e: React.FormEvent<HTMLSelectElement>) => {
              setIdSurfStyle(parseInt(e.currentTarget.value, 10));
            }}
            onBlur={(e: React.FormEvent<HTMLSelectElement>) => {
              setIdSurfStyle(parseInt(e.currentTarget.value, 10));
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
                    add={addSurfSkills}
                  />
                );
              })}
          </div>
          <div className="createProfil2__button">
            <button
              className="createProfil2__button__validate"
              // to="/profile"
              onClick={() => {
                updateSurfStyleProfile();
              }}>
              Valider mon profil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile2;
