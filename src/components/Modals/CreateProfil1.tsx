import axios from 'axios';
import React, { FC, useEffect, useState, useContext } from 'react';
import { Dispatch, SetStateAction } from 'react';

import womansurfing from '../../../img/womansurfing.png';
import IDepartment from '../../interfaces/IDepartment';
import IUser from '../../interfaces/IUser'
import CurrentUserContext from '../contexts/CurrentUser';

type Props = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

const CreateProfil1: FC<Props> = ({ setActiveModal }) => {
  const { id } = useContext(CurrentUserContext);
  const [desc, setDesc] = useState<IUser['desc']>('')
  const [city, setCity] = useState<IUser['city']>('')
  const [id_departement, setId_departement] = useState<IUser['id_departement']>()
  const [favorite_spot, setFavorite_spot] = useState<IUser['favorite_spot']>('')
  const [departments, setDepartments] = useState<IDepartment[]>([]);
  useEffect(() => {
    axios
      .get<IDepartment[]>('http://localhost:3000/api/departments')
      .then((result) => result.data)
      .then((data) => setDepartments(data));
  }, []);
  const updateProfile = () => {

    axios.put(`http://localhost:3000/api/users/${id}`, {
        desc,
        city,
        id_departement,
        favorite_spot
    }, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }).then((response)=> console.log(response))
  }
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

        <p className="createProfil1__container__upload  ">Upload ta photo de profil</p>

        <textarea
          className="createProfil1__container__textarea"
          id="w3review"
          name="w3review"
          rows={4}
          placeholder="3 mots pour te décrire"
          onChange={(e: React.FormEvent<HTMLTextAreaElement>) => { setDesc(e.currentTarget.value) }}
        />

        <input className="createProfil1__container__ville" placeholder="ville" onChange={(e: React.FormEvent<HTMLInputElement>) => { setCity(e.currentTarget.value) }}></input>
        <select id="region-select" className="createProfil1__container__region" onChange={(e: React.FormEvent<HTMLSelectElement>) => { setId_departement(parseInt(e.currentTarget.value,10))}}>
          <option value="">régions où tu surfes</option>
          {departments &&
            departments.map((department) => (
              <option key={department.id_department} value={department.id_department}>
                {department.department_name}
              </option>
            ))}
        </select>

        <input
          className="createProfil1__container__spot"
          placeholder="ton spot préféré"
          onChange={(e: React.FormEvent<HTMLInputElement>) => { setFavorite_spot(e.currentTarget.value) }}></input>

        <button
          className="createProfil1__next createProfil1__container__fullRow"
          onClick={() => {updateProfile(); setActiveModal('complete_profil2')} }>
          suivant
        </button>
      </form>
    </div>
  );
};

export default CreateProfil1;
