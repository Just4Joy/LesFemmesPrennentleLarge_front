import axios from 'axios';
// @ts-ignore: Unreachable code error
import { IKContext, IKUpload } from 'imagekitio-react';
import React, { useContext, useState, } from 'react';
import { useEffect } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { FiUpload } from 'react-icons/fi';

import IDepartment from '../../interfaces/IDepartment';
import ISurfSkill from '../../interfaces/ISurfskills';
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
  const [surfStyles, setSurfStyles] = useState<ISurfStyle>();
  const [surfSkillToAdd, setSurfSkillToAdd] = useState<ISurfSkill[]>([])
  const [surfSkills, setSurfSkills] = useState<ISurfSkill[]>([]);

  const [firstname, setFirstname] = useState<IUser['firstname']>('')
  const [lastname, setLastname] = useState<IUser['lastname']>('')
  const [desc, setDesc] = useState<IUser['desc']>('')
  const [city, setCity] = useState<IUser['city']>('')
  const [favorite_spot, setSpot] = useState<IUser['favorite_spot']>('')

  const [activeSurfSkill, setActiveSurfSkill] = useState<ISurfSkill['id_surf_skill'][]>(
    [],
  );

  useEffect(() => {

    axios
      .get<IUser>(`http://localhost:3000/api/users/${id}`)
      .then((result) => result.data)
      .then((data) => {
        setUsers(data)

         axios
          .get<IDepartment>(`http://localhost:3000/api/departments/${data.id_department}`)
          .then((result) => result.data)
          .then((data) => setDepartments(data))
        axios
          .get<ISurfStyle>(`http://localhost:3000/api/surfstyle/${data.id_surf_style}`)
          .then((result) => result.data)
          .then((data) => setSurfStyles(data))

        axios
          .get<ISurfSkill[]>(`http://localhost:3000/api/users/${data.id_user}/surfskills`)
          .then((result) => result.data)
          .then((data) => setSurfSkills(data))

      })

    axios
      .get<ISurfSkill[]>('http://localhost:3000/api/surfskill')
      .then((result) => result.data)
      .then((data) => setSurfSkillToAdd(data));

    return () => {
      // @ts-ignore: Unreachable code error
      setUsers()

      // @ts-ignore: Unreachable code error
      setDepartments()
      // @ts-ignore: Unreachable code error
      setSurfStyles()
      // @ts-ignore: Unreachable code error
      setSurfSkills([])
      // @ts-ignore: Unreachable code error
      setSurfSkillToAdd([])
    }
  }, [update]);

  const add = (id: ISurfSkill['id_surf_skill']) => {
    const arr = activeSurfSkill;
    if (arr.find((el) => el === id)) {
      arr.splice(arr.indexOf(id), 1);
    } else arr.push(id);

    setActiveSurfSkill(arr);
  };

  const onSuccess = (res: any) => {
    console.log(res.url);
    users &&
      axios.put(
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
  };

  const updateDataUser = () => {
    const data: any = {
      firstname: firstname,
      lastname: lastname,
      city: city,
      desc: desc,
      favorite_spot: favorite_spot,
    };
    for (let key in data) {
      if (data[key] === '') {
        delete data[key];
      }
    }

    axios.put(`http://localhost:3000/api/users/${id}`, { ...data }, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })

    Promise.all([
      activeSurfSkill && surfSkills && surfSkills.map(async (el) => {
        axios.delete(
          `http://localhost:3000/api/users/${id}/surfskills/${el.id_surf_skill}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          },
        );
      }), activeSurfSkill.map(async (el) => {
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
      })
    ])

  }

  return (
    <div className="myProfile">
      <div className="myProfile__row">
        <p>{users && users.wahine ? 'Wahine' : 'Hiki'}</p>
        {editSkills ? (
          <BsPencilSquare size="2rem" color="black" />
        ) : !editProfil ? (
          <BsPencilSquare
            size="2rem"
            color="black"
            onClick={() => setEditProfil(true)}
          />
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
                  onError={console.log('ERROR')}
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
          <div className="myProfile__column__column2__row1">
            <div>
              <p>
                {departments && departments.department_name} {/*Should be regions*/}
              </p>
              <p>{surfStyles && surfStyles.name_user}</p>
            </div>
            {editProfil ? (
              <BsPencilSquare color="grey" />
            ) : !editSkills ? (
              <BsPencilSquare color="grey" onClick={() => setEditSkills(true)} />
            ) : (
              <BsPencilSquare color="#fedb9b" />
            )}
          </div>
          <div className="myProfile__column__column2__row2">
            <h2>Skills</h2>
            {!editProfil ? (<div className="myProfile__column__column2__row2__wrap">
              {surfSkills &&
                surfSkills.map((surfSkill) => {
                  return (

                    <SurfSkillProfile key={surfSkill.id_surf_skill} {...surfSkill} />
                  );
                })}
            </div>) : (<div className="createProfil2__skills__tags">{surfSkillToAdd &&
              surfSkillToAdd.map((surfSkillToAdd) => {
                return (
                  <SurfSkill
                    {...surfSkillToAdd}
                    key={surfSkillToAdd.id_surf_skill}
                    id_surf_skill={surfSkillToAdd.id_surf_skill}
                    add={add}
                  />
                );
              })}</div>)}

          </div>
          <div className="myProfile__column__column2__row3">
            {!editProfil ? (
              <div className="myProfile__column__column2__row3__describe">
                <h2>3 mots pour me décrire</h2>
                <h6>{users && users.desc}</h6>
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
            setUpdate(!update)
            /*  editProfil ? setUpdate(!update) : setUpdate(!update); */
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
