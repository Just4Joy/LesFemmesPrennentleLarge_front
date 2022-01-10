import '../../style/_ModalProfile.scss';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { BsPencilSquare } from 'react-icons/bs';
import IUser from '../../../interfaces/IUser';
import wahine from '../img/wahine.svg';

const ModalProfile = () => {
  let { id } = useParams();
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/users/${id}`)
      .then((result: any) => result.data)
      .then((data: any) => setUser(data));
  }, [id]);
  console.log(user);
  return (
    <div className="modalwahine">
      {user && (
        <div className="modalProfile">
          <div className="modalProfile__row">
            <p>{user.wahine ? 'Wahine' : 'Hiki'}</p>
          </div>
          <div className="modalProfile__column">
            <div className="modalProfile__column__column1">
              <img src={wahine} alt="hiki" />
              <div className="modalProfile__column__column1__info">
                <h2>
                  {user.firstname} {user.lastname}
                </h2>
                <h6>{user.city}</h6>
                <h6>{user.favorite_spot}</h6>
              </div>
            </div>

            <div className="modalProfile__column__column2">
              <div className="modalProfile__column__column2__row1">
                <div>
                  <p>
                    {user.department} {/*Should be the region and not the department*/}
                  </p>
                  <p>{user.surf_style}</p>
                </div>
                <BsPencilSquare />
              </div>
              <div className="modalProfile__column__column2__row2">
                <h2>Skills</h2>
                <div className="modalProfile__column__column2__row2__wrap">
                  <p>{user.surf_skill}</p>
                </div>
              </div>
              <div className="modalProfile__column__column2__row3">
                <div className="modalProfile__column__column2__row3__describe">
                  <h2>3 mots pour me décrire</h2>
                  <h6>{!user.desc ? 'Description...' : user.desc}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalProfile;
