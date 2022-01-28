import axios from 'axios';
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

const CreateProfil1: FC<Props> = ({ setActiveModal }) => {
  const { id } = useContext(CurrentUserContext);
  const [desc, setDesc] = useState<IUser['desc']>('');
  const [city, setCity] = useState<IUser['city']>('');
  const [id_department, setId_departement] = useState<IUser['id_department']>();
  const [favorite_spot, setFavorite_spot] = useState<IUser['favorite_spot']>('');
  const [departments, setDepartments] = useState<IDepartment[]>([]);
  const [allCities, setAllCities] = useState<ICity[]>([]);
  const [searchCity, setSearchCity] = useState('');
  useEffect(() => {
    axios
      .get<IDepartment[]>('http://localhost:3000/api/departments')
      .then((result) => result.data)
      .then((data) => setDepartments(data))
      .catch(() => {
        error();
      });
  }, []);

  useEffect(() => {
    axios
      .get<ICity[]>(`https://geo.api.gouv.fr/communes?codePostal=${searchCity}`)

      .then((res) => res.data)
      .then((data) => {
        setAllCities(data);
      })
      .catch(() => {
        error();
      });
  }, [searchCity]);

  const updateProfile = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    axios
      .put(
        `http://localhost:3000/api/users/${id}`,
        {
          desc,
          city,
          id_department,
          favorite_spot,
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
        setActiveModal('complete_profil2');
      })

      .catch((err) => {
        console.log(err);
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

  const onSuccess = (res: any) => {
    console.log(res.url);
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

  return (
    <div className="createProfil1">
      <div className="createProfil1__title">
        <h2>Compléter son profil 1/2</h2>
        <h2 role="presentation" onClick={() => setActiveModal('complete_profil2')}>
          Skip
        </h2>
      </div>
      <form className="createProfil1__container">
        <img
          className="createProfil1__container__img createProfil1__container__fullRow"
          src={womansurfing}
          alt=""
        />
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

        <p className="createProfil1__container__upload  ">Upload ta photo de profil</p>

        <textarea
          className="createProfil1__container__textarea"
          id="w3review"
          name="w3review"
          rows={4}
          placeholder="3 mots pour te décrire"
          onChange={(e: React.FormEvent<HTMLTextAreaElement>) => {
            setDesc(e.currentTarget.value);
          }}
        />

        <div>
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
            <>
              <h5 className="createProfil1__container__infos__selectVille">
                Selectionne ta ville
              </h5>
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
            </>
          )}

          <select
            id="region-select"
            className="createProfil1__container__region"
            onBlur={(e: React.FormEvent<HTMLSelectElement>) => {
              setId_departement(parseInt(e.currentTarget.value, 10));
            }}>
            <option value="">régions où tu surfes</option>
            {departments &&
              departments.map((department) => (
                <option key={department.id_department} value={department.id_department}>
                  {department.department_name}
                </option>
              ))}
          </select>
        </div>
        <input
          className="createProfil1__container__spot"
          placeholder="ton spot préféré"
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            setFavorite_spot(e.currentTarget.value);
          }}></input>

        <button
          className="createProfil1__next createProfil1__container__fullRow"
          onClick={(event: React.MouseEvent<HTMLElement>) => updateProfile(event)}>
          suivant
        </button>
      </form>
    </div>
  );
};

export default CreateProfil1;
