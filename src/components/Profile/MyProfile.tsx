import axios from 'axios';
// @ts-ignore: Unreachable code error
import { IKContext, IKUpload } from 'imagekitio-react';
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { FiUpload } from 'react-icons/fi';

import IDepartment from '../../interfaces/IDepartment';
import ISurfSkill from '../../interfaces/ISurfskills';
import ISurfStyle from '../../interfaces/ISurfStyle';
import IUser from '../../interfaces/IUser';
import CurrentUserContext from '../contexts/CurrentUser';
import SurfSkillProfile from '../Profile/SurfSkillProfile';

const MyProfile = () =>
  // {
  //   /*   firstname,
  //   lastname,
  //   city,
  //   favorite_spot,
  //   wahine,
  //   desc,
  //   profile_pic,
  //   id_department,
  //   id_surf_style,
  //   id_user, */
  // },
  {
    const { id } = useContext(CurrentUserContext);
    const [users, setUsers] = useState<IUser>();
    const [update, setUpdate] = useState<boolean>(false);

    useEffect(() => {
      axios
        .get<IUser>(`http://localhost:3000/api/users/${id}`)
        .then((result) => result.data)
        .then((data) => setUsers(data));
    }, [id, update]);

    const [editProfil, setEditProfil] = useState<boolean>(false);
    const [editSkills, setEditSkills] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState<FileList | null | undefined>();

    const [revokeUrl, setRevokeUrl] = useState<boolean>(false);
    const [departments, setDepartments] = useState<IDepartment>();
    const [surfStyles, setSurfStyles] = useState<ISurfStyle>();
    const [surfSkills, setSurfSkills] = useState<ISurfSkill[]>([]);
    console.log(setPreviewImage);
    const [firstname, setFirstname] = useState<IUser['firstname']>('');
    const [lastname, setLastname] = useState<IUser['lastname']>('');
    const [desc, setDesc] = useState<IUser['desc']>('');
    const [city, setCity] = useState<IUser['city']>('');
    const [favorite_spot, setSpot] = useState<IUser['favorite_spot']>('');

    useEffect(() => {
      //Get Departments
      users &&
        axios
          .get<IDepartment>(
            `http://localhost:3000/api/departments/${users.id_department}`,
          )
          .then((result) => result.data)
          .then((data) => setDepartments(data));
      console.log(departments);
      //Get Surf Styles
      users &&
        axios
          .get<ISurfStyle>(`http://localhost:3000/api/surfstyle/${users.id_surf_style}`)
          .then((result) => result.data)
          .then((data) => setSurfStyles(data));
      //Get Surf SKills id
      users &&
        axios
          .get<ISurfSkill[]>(
            `http://localhost:3000/api/users/${users.id_user}/surfskills`,
          )
          .then((result) => result.data)
          .then((data) => setSurfSkills(data));
    }, []);

    const previewProfilImage = () => {
      let imageUrl: string = '';

      if (revokeUrl) {
        URL.revokeObjectURL(imageUrl);
        imageUrl = '';
        setRevokeUrl(false);
      }
      if (previewImage) {
        imageUrl = URL.createObjectURL(previewImage[0]);
        return imageUrl;
      }
      return imageUrl;
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
        fistname: firstname,
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

      console.log(data);

      axios
        .put(
          `http://localhost:3000/api/users/${id}`,
          { ...data },
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          },
        )
        .then((response) => console.log(response));
    };

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
                {!previewImage ? (
                  <FiUpload size="10rem" color="#fedb9b" />
                ) : (
                  <img
                    className="myProfile__column__column1__form__previewImage"
                    src={previewProfilImage()}
                    alt=""
                  />
                )}
                {/*               <label
                htmlFor="file-upload"
                className="myProfile__column__column1__form__label">
                Téléverser
              </label> */}
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
              <div className="myProfile__column__column2__row2__wrap">
                {surfSkills &&
                  surfSkills.map((surfSkill) => {
                    return (
                      <SurfSkillProfile key={surfSkill.id_surf_skill} {...surfSkill} />
                    );
                  })}
              </div>
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
              editProfil ? setUpdate(!update) : setUpdate(!update);
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
