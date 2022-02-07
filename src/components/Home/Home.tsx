import axios from 'axios';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { BsBoxArrowInUpRight } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

import { error } from '../../errors';
import IDepartment from '../../interfaces/IDepartment';
import IRegion from '../../interfaces/IRegion';
import ISession from '../../interfaces/ISession';
import ISurfStyle from '../../interfaces/ISurfStyle';
import IUser from '../../interfaces/IUser';
import CurrentUserContext from '../contexts/CurrentUser';
import NextSession from '../NextSession';
import Wahine from '../Wahine';
import BecomeWahine from './BecomeWahine';
import Region from './Region';

type Props = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

type MySession = ISession & IDepartment & IRegion;

const Home: FC<Props> = ({ setActiveModal }) => {
  const [allRegions, setAllRegions] = useState<IRegion[]>([]);
  const [mySessions, setMySessions] = useState<MySession[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const { id, wahine } = useContext(CurrentUserContext);
  //const for wahine's number
  const first: number = 0;
  const second: number = 5;

  //GET Sessions, regions, departments, surfstyles
  useEffect(() => {
    const getAllSessions = async () => {
      const sessions = await axios.get<ISession[]>(
        'http://localhost:3000/api/sessions/?limit=3',
      );
      return sessions.data;
    };
    const getAllRegions = async () => {
      const regions = await axios.get<IRegion[]>('http://localhost:3000/api/regions');
      return regions.data;
    };
    const getAllDepartments = async () => {
      const departments = await axios.get<IDepartment[]>(
        'http://localhost:3000/api/departments',
      );
      return departments.data;
    };
    const getAllSurfstyles = async () => {
      const surfStyles = await axios.get<ISurfStyle[]>(
        'http://localhost:3000/api/surfstyles',
      );
      return surfStyles.data;
    };

    Promise.all([
      getAllSessions(),
      getAllRegions(),
      getAllDepartments(),
      getAllSurfstyles(),
    ])
      .then(([sessions, regions, departments, surfStyles]) => {
        setAllRegions(regions);

        // Construction of the array of object sessionList

        const sessionsList: MySession[] = [];
        let mySession: MySession;

        sessions.map((session) => {
          const id_region =
            departments.find(
              (departement) => departement.id_department == session.id_department,
            )?.id_region || 0;
          mySession = {
            id_session: session.id_session,
            name: session.name,
            nice_date: session.nice_date,
            nice_time: session.nice_time,
            spot_name: session.spot_name,
            address: session.address,
            nb_hiki_max: session.nb_hiki_max,
            carpool: session.carpool,
            date: session.date,
            id_surf_style: session.id_surf_style,
            id_department: session.id_department,
            id_user: session.id_user,
            id_region: id_region,
            name_session: surfStyles.find(
              (surfstyle) => surfstyle.id_surf_style == session.id_surf_style,
            )?.name_session,
            region_name:
              regions.find((region) => region.id_region == id_region)?.region_name || '',
          };
          sessionsList.push(mySession);
        });
        setMySessions(sessionsList);
      })
      .catch(() => {
        error();
      });

    axios
      .get<IUser[]>('http://localhost:3000/api/users')
      .then((result) => result.data)
      .then((data) => setUsers(data))
      .catch(() => {
        error();
      });
  }, []);

  return (
    <div className="home">
      {/*Section : Présentation*/}

      <div className="home__presentation">
        <h1 className="home__presentation__h1">
          {' '}
          Trouve des filles avec qui surfer <br />
          Des sessions entre surfeuses partout en France
        </h1>

        <h4 className="home__presentation__h4">
          Pour tous les niveaux et organisés par des filles du coin qui maitrisent leur
          spot
        </h4>
      </div>
      <div className="home__presentation-responsive">
        <h1 className="home__presentation__h1"> Bonjour,</h1>
      </div>
      {/*Section : Les sessions de ta région*/}
      <div className="home__region">
        <h3 className="home__region__h3">Les sessions de ta région</h3>
        <div className="home__region__component">
          {allRegions &&
            allRegions.map((region) => {
              return <Region {...region} key={region.id_region} />;
            })}
        </div>
      </div>

      {/*Section : Next sessions*/}
      <div className="home__sessions">
        <h3 className="home__sessions__h3">Les prochaines sessions</h3>
        <div className="home__sessions__component">
          {mySessions &&
            mySessions.map((session) => {
              return <NextSession {...session} key={session.id_session} />;
            })}
        </div>
        <NavLink to="/sessions" className="home__sessions__h5">
          Toutes les sessions <BsBoxArrowInUpRight />
        </NavLink>
      </div>

      {/* Section : Nos wahines */}
      <div className="home__wahines">
        <h3 className="home__wahines__h3">Nos Wahines</h3>
        <div className="home__wahines__component">
          {users &&
            users
              .filter((user) => user.wahine)
              .slice(first, second)
              .map((user) => {
                return (
                  <Wahine {...user} setActiveModal={setActiveModal} key={user.id_user} />
                );
              })}
        </div>
      </div>
      {/* Section : Devenir wahine */}
      {id && wahine === 1 ? '' : <BecomeWahine setActiveModal={setActiveModal} />}
    </div>
  );
};

export default Home;
