import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { BsBoxArrowInUpRight } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

import IRegion from '../../interfaces/IRegion';
import ISession from '../../interfaces/ISession';
import IUser from '../../interfaces/IUser';
import IDepartement from '../../interfaces/IDepartement';
import ISurfStyle from '../../interfaces/ISurfStyle';
import NextSession from '../NextSession';
import Wahine from '../Wahine';
import BecomeWahine from './BecomeWahine';
import Region from './Region';

type Props = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

type MySession = ISession & IDepartement & IRegion;

const Home: FC<Props> = ({ setActiveModal }) => {
  const [allRegions, setAllRegions] = useState<IRegion[]>([]);
  const [allDepartments, setAllDepartments] = useState<IDepartement[]>([]);
  const [allSurfstyle, setAllSurfstyle] = useState<ISurfStyle[]>([]);
  const [allSessions, setAllSessions] = useState<ISession[]>([]);
  const [mySessions, setMySessions] = useState<MySession[]>([]);
  const [getAllValues, setGetAllValues] = useState<boolean>(false);

  const [allWahine, setAllWahine] = useState<IUser[]>([]);

  const first: number = 0;
  const second: number = 5;

  useEffect(() => {
    const getAllSessions = async () => {
      const sessions = await axios.get<ISession[]>(
        'http://localhost:3000/api/sessions/?limit=3',
      );
      return sessions;
    };
    const getAllRegions = async () => {
      const regions = await axios.get<IRegion[]>('http://localhost:3000/api/regions');
      return regions;
    };
    const getAllDepartments = async () => {
      const department = await axios.get<IDepartement[]>(
        'http://localhost:3000/api/departments',
      );
      return department;
    };
    const getAllSurfstyles = async () => {
      const surfstyles = await axios.get<ISurfStyle[]>(
        'http://localhost:3000/api/surfstyle',
      );
      return surfstyles;
    };

    Promise.all([
      getAllSessions(),
      getAllRegions(),
      getAllDepartments(),
      getAllSurfstyles(),
    ]).then(([sessions, regions, departments, surfstyles]) => {
      setAllSessions(sessions.data);
      setAllRegions(regions.data);
      setAllDepartments(departments.data);
      setAllSurfstyle(surfstyles.data);
      if (allSessions && allRegions && allDepartments && allSurfstyle) {
        setGetAllValues(!getAllValues);
      }
    });
  }, []);

  useEffect(() => {
    // Construit l'objet MySessions
    let mesSessions: MySession[] = [];

    if (allSessions && allRegions && allDepartments && allSurfstyle) {
      for (let i: number = 0; i < allSessions.length; i++) {
        let maSession: MySession = {};
        maSession.name = allSessions[i].name;
        maSession.nice_date = allSessions[i].nice_date;
        maSession.nice_time = allSessions[i].nice_time;
        maSession.spot_name = allSessions[i].spot_name;
        maSession.adress = allSessions[i].adress;
        maSession.nb_hiki_max = allSessions[i].nb_hiki_max;
        maSession.carpool = allSessions[i].carpool;
        maSession.name_session = allSurfstyle.find(
          (surfstyle) => surfstyle.id_surf_style == allSessions[i].id_surf_style,
        )?.name_session;
        let id_region = allDepartments.find(
          (departement) => departement.id_department == allSessions[i].id_departement,
        )?.id_region;
        maSession.region_name = allRegions.find(
          (region) => region.id_region == id_region,
        )?.region_name;

        mesSessions.push(maSession);
      }
    }
    setMySessions(mesSessions);
  }, [getAllValues]);

  useEffect(() => {
    axios
      .get<IUser[]>('http://localhost:3000/api/users')
      .then((result) => result.data)
      .then((data) => setAllWahine(data));
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

      {/*Section : Les prochaines sessions*/}
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
          {allWahine &&
            allWahine
              .filter((aWahine) => aWahine.wahine)
              .slice(first, second)
              .map((oneWahine) => {
                return (
                  <Wahine
                    {...oneWahine}
                    setActiveModal={setActiveModal}
                    key={oneWahine.id_user}
                  />
                );
              })}
        </div>
        <h5 className="home__wahines__link">
          Toutes les wahines <BsBoxArrowInUpRight />
        </h5>
      </div>

      {/* Section : Devenir wahine */}
      <BecomeWahine />
    </div>
  );
};

export default Home;
