import axios from 'axios';
import React, { useEffect, useState } from 'react';

import IRegion from '../../interfaces/IRegion';
import IDepartement from '../../interfaces/IDepartement';
import ISession from '../../interfaces/ISession';
import NextSession from '../NextSession';
import ISurfStyle from '../../interfaces/ISurfStyle';

type MySession = ISession & IDepartement & IRegion;

const Sessions = () => {
  const [allRegions, setAllRegions] = useState<IRegion[]>([]);
  const [allDepartments, setAllDepartments] = useState<IDepartement[]>([]);
  const [allSurfstyle, setAllSurfstyle] = useState<ISurfStyle[]>([]);
  const [allSessions, setAllSessions] = useState<ISession[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<string | undefined>();
  const [allDates, setAllDates] = useState<ISession[]>([]);
  const [mySessions, setMySessions] = useState<MySession[]>([]);
  const [getAllValues, setGetAllValues] = useState<boolean>(false);

  useEffect(() => {
    const getAllSessions = async () => {
      const sessions = await axios.get<ISession[]>('http://localhost:3000/api/sessions');
      return sessions;
    };
    const getAllRegions = async () => {
      const regions = await axios.get<IRegion[]>('http://localhost:3000/api/regions');
      return regions;
    };
    const getAllDepartments = async () => {
      const department = await axios.get<IDepartement[]>(
        'http://localhost:3000/api/departements',
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
    const getAllSessions = async () => {
      let basicUrl = `http://localhost:3000/api/sessions`;
      if (selectedRegion && selectedRegion > 0) {
        basicUrl += `/?region=${selectedRegion}`;
      }
      axios.get<ISession[]>(basicUrl);
      const sessions = await axios.get<ISession[]>(basicUrl);
      return sessions;
    };
    const getAllRegions = async () => {
      const regions = await axios.get<IRegion[]>('http://localhost:3000/api/regions');
      return regions;
    };
    const getAllDepartments = async () => {
      const department = await axios.get<IDepartement[]>(
        'http://localhost:3000/api/departements',
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
  }, [selectedRegion]);

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

  // const getSessionsByIdDepartment = (idDepartment: number) => {
  //   axios
  //     .get<ISession[]>('http://localhost:3000/api/sessions')
  //     .then((result) => result.data)
  //     .then((data) => setAllSessions(data));
  // };

  // useEffect(() => {
  //   getSessionsByIdDepartment(selectedRegion);
  // }, [selectedRegion]);

  // useEffect(() => {
  //   let basicUrl = `http://localhost:3000/api/sessions/dates`;

  //   if (selectedRegion && selectedRegion > 0) {
  //     basicUrl += `/?region=${selectedRegion}`;
  //   }

  //   axios
  //     .get<ISession[]>(basicUrl)
  //     .then((result) => result.data)
  //     .then((data) => setAllDates(data));
  // }, [selectedRegion]);

  return (
    <div className="sessions">
      <h1 className="sessions__h1">Trouver une session</h1>
      {/* Select Region */}
      <div className="sessions__selectors">
        <select
          className="sessions__selectors__region"
          name="region"
          id="region"
          onClick={(e) => setSelectedRegion(Number(e.currentTarget.value))}>
          <option value="0">Régions</option>
          {allRegions.map((region) => {
            return (
              <option value={region.id_region} key={region.id_region}>
                {region.region_name}
              </option>
            );
          })}
        </select>
        {/* Select date */}
        <select
          className="sessions__selectors__date"
          name="date"
          id="date"
          onClick={(e) => setSelectedRegion(Number(e.currentTarget.value))}>
          <option value="0">Dates</option>
          {mySessions &&
            mySessions.map((session, index) => {
              return (
                <option value={session.nice_date} key={index}>
                  {session.nice_date}
                </option>
              );
            })}
        </select>
      </div>

      {/* Composants NextSession */}
      <div className="sessions__nextsession">
        {mySessions &&
          mySessions.map((session) => {
            return <NextSession {...session} key={session.id_session} />;
          })}
      </div>
      <div className="sessions__button">
        <button className="sessions__button__more">voir plus</button>
      </div>
    </div>
  );
};

export default Sessions;
