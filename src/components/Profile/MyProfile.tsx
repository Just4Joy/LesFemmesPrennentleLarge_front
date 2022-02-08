import axios, { AxiosError } from 'axios';
// @ts-ignore: Unreachable code error
import { IKContext, IKUpload } from 'imagekitio-react';
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { FiUpload } from 'react-icons/fi';

import { error, errorValidation, unauthorized, userNotFound } from '../../errors';
import IDepartment from '../../interfaces/IDepartment';
import ISurfSkill from '../../interfaces/ISurfSkill';
import ISurfStyle from '../../interfaces/ISurfStyle';
import IUser from '../../interfaces/IUser';
import CurrentUserContext from '../contexts/CurrentUser';
import SurfSkillProfile from '../Profile/SurfSkillProfile';
import SurfSkill from '../SurfSkill';

const MyProfile = () => {
  const { id } = useContext(CurrentUserContext);
  const [users, setUsers] = useState<IUser>();
  const [update, setUpdate] = useState<boolean>(false);

  const [editProfil, setEditProfil] = useState<boolean>(false);
  const [editSkills, setEditSkills] = useState<boolean>(false);

  const [departments, setDepartments] = useState<IDepartment>();
  const [allDepartments, setAllDepartments] = useState<IDepartment[]>();
  const [surfStyles, setSurfStyles] = useState<ISurfStyle>();
  const [allSurfStyles, setAllSurfStyles] = useState<ISurfStyle[]>();
  const [surfSkillsToAdd, setSurfSkillsToAdd] = useState<ISurfSkill[]>([]);
  const [surfSkills, setSurfSkills] = useState<ISurfSkill[]>([]);

  const [firstname, setFirstname] = useState<IUser['firstname']>('');
  const [lastname, setLastname] = useState<IUser['lastname']>('');
  const [desc, setDesc] = useState<IUser['description']>('');
  const [city, setCity] = useState<IUser['city']>('');
  const [favorite_spot, setSpot] = useState<IUser['favorite_spot']>('');
  const [newDepartment, setNewDepartment] = useState<Number>(0);
  const [newSurfStyles, setNewSurfStyles] = useState<Number>(0);

  const [activeSurfSkills, setActiveSurfSkills] = useState<ISurfSkill['id_surf_skill'][]>(
    [],
  );

  useEffect(() => {
    (async () => {
      try {
        //GET User
        const user = await axios.get<IUser>(
          `http://localhost:3000/api/users/${id}?display=all`,
        );
        setUsers(user.data);
        //GET department of the user
        const departement = await axios.get<IDepartment>(
          `http://localhost:3000/api/departments/${user.data.id_department}`,
        );
        setDepartments(departement.data);
        //GET the surfstyle of the user
        const surfStyle = await axios.get<ISurfStyle>(
          `http://localhost:3000/api/surfstyles/${user.data.id_surf_style}`,
        );
        setSurfStyles(surfStyle.data);
        //GET the surfskills of the user
        const SurfSkills = await axios.get<ISurfSkill[]>(
          `http://localhost:3000/api/users/${user.data.id_user}/surfskills`,
        );
        setSurfSkills(SurfSkills.data);

        //GET surfskills
        const SurfSkillsToAdd = await axios.get<ISurfSkill[]>(
          'http://localhost:3000/api/surfskills',
        );
        setSurfSkillsToAdd(SurfSkillsToAdd.data);

        //GET departments
        const departments = await axios.get<IDepartment[]>(
          'http://localhost:3000/api/departments',
        );
        setAllDepartments(departments.data);

        const SurfStyles = await axios.get<ISurfStyle[]>(
          'http://localhost:3000/api/surfstyles',
        );
        setAllSurfStyles(SurfStyles.data);
      } catch (err: unknown) {
        error();
      }
    })();
  }, []);
  //Avoids having a surfskills selected two times
  const add = (id: ISurfSkill['id_surf_skill']) => {
    const arr = activeSurfSkills;
    if (arr.find((el) => el === id)) {
      arr.splice(arr.indexOf(id), 1);
    } else arr.push(id);

    setActiveSurfSkills(arr);
  };

  //PUT User Profile Pic
  const onSuccess = async (res: any) => {
    try {
      if (users) {
        const response = await axios.put<IUser>(
          `http://localhost:3000/api/users/${id}`,
          {
            profile_pic: res.url,
          },
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          },
        );
        if (response.status !== 204) {
          throw new Error();
        }
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

  //PUT User details
  const updateDataUser = async () => {
    // console.log(newDepartment, newSurfStyles, 'NEW DEPARTEMENT NEW SURFSTYLE ON CLICK');
    const data: any = {
      firstname: firstname,
      lastname: lastname,
      city: city,
      description: desc,
      favorite_spot: favorite_spot,
      id_department: newDepartment,
      id_surf_style: newSurfStyles,
    };
    for (const key in data) {
      if (data[key] === '' || data[key] === 0) {
        delete data[key];
      }
    }
    if (Object.keys(data).length !== 0) {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/users/${id}`,
          { ...data },
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          },
        );

        if (response.status !== 200) {
          throw new Error();
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
      //retrieving the information of the user after the put is finished
      try {
        const user = await axios.get<IUser>(
          `http://localhost:3000/api/users/${id}?display=all`,
        );
        setUsers(user.data);
        if (user.status !== 200) {
          throw new Error();
        }
        const departement = await axios.get<IDepartment>(
          `http://localhost:3000/api/departments/${data.id_department}`,
        );
        setDepartments(departement.data);
        if (departement.status !== 200) {
          throw new Error();
        }
        const SurfStyle = await axios.get<ISurfStyle>(
          `http://localhost:3000/api/surfstyles/${data.id_surf_style}`,
        );
        setSurfStyles(SurfStyle.data);
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
    }
    //DELETE Surfskills of the user
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/users/${id}/surfskills/`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      if (response.status !== 204) {
        throw new Error();
      }

      //Replenish with new Surfskills of the user
      await Promise.all(

        activeSurfSkills.map(async (el) => {
          axios.post(
            `http://localhost:3000/api/users/${id}/surfskills`,
            { idSurfSkill: el },
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

      //retrieves the surfskills
      const surfskill = await axios.get<ISurfSkill[]>(
        `http://localhost:3000/api/users/${id}/surfskills?display=all`,
      );
      setActiveSurfSkills([]);
      setSurfSkills(surfskill.data);
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

  return (
    <div className="myProfile">
      <div className="myProfile__row">
        <p>{users && users.wahine ? 'Wahine' : 'Hiki'}</p>
        {!editProfil ? (
          <BsPencilSquare size="2rem" color="black" onClick={() => setEditProfil(true)} />
        ) : (
          <BsPencilSquare size="2rem" color="#fedb9b" />
        )}
      </div>

      <div className="myProfile__column">
        {!editProfil ? (
          <div className="myProfile__column__column1">
            <img src={users && users.profile_pic} alt="hiki" />
            <div className="myProfile__column__column1__info">
              <h2>
                {users && users.lastname} {users && users.firstname}
              </h2>
              <h6>{users && users.city}</h6>
              <h6>{users && users.favorite_spot}</h6>
            </div>
          </div>
        ) : (
          <div className="myProfile__column__column1">
            <form className="myProfile__column__column1__form" action="/" method="POST">
              {<FiUpload size="10rem" color="#fedb9b" />}

              <IKContext
                publicKey="public_peA2/wgPW2iDjq6xP9HjZRG2/Ys="
                urlEndpoint="https://ik.imagekit.io/LFPLL/"
                authenticationEndpoint="http://localhost:3000/api/login">
                <IKUpload
                  folder="/profil"
                  onSuccess={onSuccess}
                  responseFields={['url']}
                />
              </IKContext>
            </form>
            <form className="myProfile__column__column1__info">
              <input
                className="myProfile__column__column1__info__input"
                placeholder="Prénom"
                type="text"
                id="firstname"
                name="firstname"
                required
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setFirstname(e.currentTarget.value)
                }
              />
              <input
                className="myProfile__column__column1__info__input"
                placeholder="Nom"
                type="text"
                id="lastname"
                name="lastname"
                required
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setLastname(e.currentTarget.value)
                }
              />
              <input
                className="myProfile__column__column1__info__input"
                placeholder="Ville"
                type="text"
                id="city"
                name="city"
                required
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setCity(e.currentTarget.value)
                }
              />
              <input
                className="myProfile__column__column1__info__input"
                placeholder="Spot préféré"
                type="text"
                id="spot"
                name="spot"
                required
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setSpot(e.currentTarget.value)
                }
              />
            </form>
          </div>
        )}

        <div className="myProfile__column__column2">
          {!editProfil ? (
            <div className="myProfile__column__column2__row1">
              <div>
                <p>{departments && departments.department_name}</p>
                <p>{surfStyles && surfStyles.name_user}</p>
              </div>
            </div>
          ) : (
            <div className="myProfile__column__column2__row1">
              <div>
                <p>
                  {allDepartments && (
                    <select
                      id="select"
                      className="createProfil1__container__region"
                      onBlur={(e: React.FormEvent<HTMLSelectElement>) => {
                        setNewDepartment(parseInt(e.currentTarget.value, 10));
                      }}>
                      <option id="option" value="0">
                        régions où tu surfes
                      </option>
                      {allDepartments &&
                        allDepartments.map((department) => (
                          <option
                            id="option"
                            key={department.id_department}
                            value={department.id_department}>
                            {department.department_name}
                          </option>
                        ))}
                    </select>
                  )}
                </p>
                <p>
                  {
                    <select
                      id="select"
                      onBlur={(e: React.FormEvent<HTMLSelectElement>) => {
                        setNewSurfStyles(parseInt(e.currentTarget.value, 10));
                      }}>
                      <option id="option" value="0">
                        type de session
                      </option>
                      {allSurfStyles &&
                        allSurfStyles.map((surfStyle) => (
                          <option
                            id="option"
                            key={surfStyle.id_surf_style}
                            value={surfStyle.id_surf_style}>
                            {surfStyle.name_user}
                          </option>
                        ))}
                    </select>
                  }
                </p>
              </div>
            </div>
          )}

          <div className="myProfile__column__column2__row2">
            <h2>Skills</h2>
            {!editProfil ? (
              <div className="myProfile__column__column2__row2__wrap">
                {surfSkills &&
                  surfSkills.map((surfSkill) => {
                    return (
                      <SurfSkillProfile key={surfSkill.id_surf_skill} {...surfSkill} />
                    );
                  })}
              </div>
            ) : (
              <div className="createProfil2__skills__tags">
                {surfSkillsToAdd &&
                  surfSkillsToAdd.map((surfSkillToAdd) => {
                    return (
                      <SurfSkill
                        {...surfSkillToAdd}
                        key={surfSkillToAdd.id_surf_skill}
                        id_surf_skill={surfSkillToAdd.id_surf_skill}
                        add={add}
                      />
                    );
                  })}
              </div>
            )}
          </div>
          <div className="myProfile__column__column2__row3">
            {!editProfil ? (
              <div className="myProfile__column__column2__row3__describe">
                <h2>3 mots pour me décrire</h2>
                <h6>{users && users.description}</h6>
              </div>
            ) : (
              <div className="myProfile__column__column2__row3__describe">
                <h2>3 mots pour me décrire</h2>
                <input
                  className="myProfile__column__column2__row3__describe__input"
                  placeholder="Ma description"
                  type="text"
                  id="description"
                  name="description"
                  required
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    setDesc(e.currentTarget.value)
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {editProfil || editSkills ? (
        <button
          className="myProfile__button"
          onClick={() => {
            updateDataUser();
            editProfil ? setEditProfil(false) : setEditSkills(false);
            setUpdate(!update);
          }}>
          Enregistrer
        </button>
      ) : (
        ''
      )}
    </div>
  );
};

export default MyProfile;
