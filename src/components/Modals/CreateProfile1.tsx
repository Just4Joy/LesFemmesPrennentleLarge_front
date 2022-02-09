import axios, { AxiosError } from 'axios';
// @ts-ignore: Unreachable code error
import { IKContext, IKUpload } from 'imagekitio-react';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';

import womansurfing from '../../../img/womansurfing.png';
import { error, errorValidation, unauthorized, userNotFound } from '../../errors';
import ICity from '../../interfaces/ICity';
import IDepartment from '../../interfaces/IDepartment';
import IUser from '../../interfaces/IUser';
import CurrentUserContext from '../contexts/CurrentUser';

type Props = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

const CreateProfile1: FC<Props> = ({ setActiveModal }) => {
  const { id } = useContext(CurrentUserContext);
  const [description, setDescription] = useState<IUser['description']>('');
  const [city, setCity] = useState<IUser['city']>('');
  const [idDepartment, setIdDepartement] = useState<IUser['id_department']>();
  const [favoriteSpot, setFavoriteSpot] = useState<IUser['favorite_spot']>('');
  const [departments, setDepartments] = useState<IDepartment[]>([]);
  const [allCities, setAllCities] = useState<ICity[]>([]);
  const [searchCity, setSearchCity] = useState('');

  const getAllDepartments = async () => {
    const departements = await axios.get<IDepartment[]>(
      'http://localhost:3000/api/departments',
    );
    setDepartments(departements.data);
  };

  const getAllCities = async () => {
    const citys = await axios.get<ICity[]>(
      `https://geo.api.gouv.fr/communes?codePostal=${searchCity}`,
    );
    setAllCities(citys.data);
  };

  //GET Departments
  useEffect(() => {
    try {
      getAllDepartments();
    } catch (err) {
      error();
    }
  }, []);

  //GET ZIP Code from another API
  useEffect(() => {
    try {
      getAllCities();
    } catch (err) {
      error();
    }
  }, [searchCity]);

  //PUT profil
  const updateProfile = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    try {
      const updatedUser = await axios.put(
        `http://localhost:3000/api/users/${id}`,
        {
          description,
          city,
          id_department: idDepartment,
          favorite_spot: favoriteSpot,
        },
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      setActiveModal('complete_profil2');
      if (updatedUser.status !== 200) {
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
  };

  //PUT profile picture
  const onSuccess = async (res: any) => {
    try {
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
    } catch (err) {
      error();
    }
  };

  return (
    <div className="createProfil1">
      <div className="createProfil1__title">
        <h1>Compléter son profil 1/2</h1>
        <h2
          className="createProfil1__title__skip"
          role="presentation"
          onClick={() => setActiveModal('complete_profil2')}>
          Skip
        </h2>
      </div>
      <form className="createProfil1__container">
        <div className="createProfil1__container__pic">
          <img
            className="createProfil1__container__pic__img createProfil1__container__pic__fullRow"
            src={womansurfing}
            alt=""
          />
          <div>
            <IKContext
              publicKey="public_peA2/wgPW2iDjq6xP9HjZRG2/Ys="
              urlEndpoint="https://ik.imagekit.io/LFPLL/"
              authenticationEndpoint="http://localhost:3000/api/login">
              <IKUpload folder="/profil" onSuccess={onSuccess} responseFields={['url']} />
            </IKContext>

            <h6 className="createProfil1__container__pic__upload  ">
              Upload ta photo de profil
            </h6>
          </div>
        </div>

        <textarea
          className="createProfil1__container__textarea"
          id="w3review"
          name="w3review"
          rows={4}
          placeholder="3 mots pour te décrire"
          onChange={(e: React.FormEvent<HTMLTextAreaElement>) => {
            setDescription(e.currentTarget.value);
          }}
        />

        <div className="createProfil1__container__div">
          <input
            className="createProfil1__container__infos__zipcode"
            type="text"
            list="city"
            placeholder="Entrez votre code postal"
            value={searchCity}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setSearchCity(e.currentTarget.value)
            }
          />
          {searchCity.length < 5 || searchCity.length > 5 ? (
            ''
          ) : (
            <div>
              <select
                className="createProfil1__container__infos__ville"
                name="city"
                id="selectCity"
                onBlur={(e: React.FormEvent<HTMLSelectElement>) => {
                  setCity(e.currentTarget.value);
                }}>
                {allCities.map((city, index) => {
                  return (
                    <option key={index} value={city.nom}>
                      {city.nom}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
        </div>
        <div className="createProfil1__container__row">
          <select
            id="region-select"
            className="createProfil1__container__row__region"
            onBlur={(e: React.FormEvent<HTMLSelectElement>) => {
              setIdDepartement(parseInt(e.currentTarget.value, 10));
            }}>
            <option value="">régions où tu surfes</option>
            {departments &&
              departments.map((department) => (
                <option key={department.id_department} value={department.id_department}>
                  {department.department_name}
                </option>
              ))}
          </select>
          <input
            className="createProfil1__container__row__spot"
            placeholder="ton spot préféré"
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setFavoriteSpot(e.currentTarget.value);
            }}></input>
        </div>

        <button
          className="createProfil1__next createProfil1__container__fullRow"
          onClick={(event: React.MouseEvent<HTMLElement>) => updateProfile(event)}>
          suivant
        </button>
      </form>
    </div>
  );
};

export default CreateProfile1;
