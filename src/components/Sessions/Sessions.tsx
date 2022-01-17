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
  const [allDates, setAllDates] = useState<Array<string>>([]);
  const [mySessions, setMySessions] = useState<MySession[]>([]);
  const [getAllValues, setGetAllValues] = useState<boolean>(false);

  const getNiceDates = (sessionsData) => {
    let niceDate: Array<string> = [];
    sessionsData.map((session) => {
      niceDate.includes(session.nice_date) ? '' : niceDate.push(session.nice_date);
    });
    setAllDates(niceDate);
  };

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
      getNiceDates(sessions.data);
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
      let basicUrlChanged = false;
      if (selectedRegion && selectedRegion > 0) {
        basicUrl += `/?region=${selectedRegion}`;
        basicUrlChanged = true;
      }
      if (selectedDate !== undefined && selectedDate !== '0') {
        basicUrlChanged
          ? (basicUrl += `&date=${selectedDate}`)
          : (basicUrl += `/?date=${selectedDate}`);
      }
      console.log(basicUrl);
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
      getNiceDates(sessions.data);
      setAllRegions(regions.data);
      setAllDepartments(departments.data);
      setAllSurfstyle(surfstyles.data);
      if (allSessions && allRegions && allDepartments && allSurfstyle) {
        setGetAllValues(!getAllValues);
      }
    });
  }, [selectedRegion, selectedDate]);

  useEffect(() => {
    getNiceDates(allSessions);
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

  console.log(selectedDate);

  return (
    <div className="sessions">
      <h1 className="sessions__h1">Trouver une session</h1>
      {/* Select Region */}
      <div className="sessions__selectors">
        <select
          className="sessions__selectors__region"
          name="region"
          id="region"
          onClick={(e) => {
            setSelectedRegion(Number(e.currentTarget.value));
          }}>
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
          onClick={(e) => setSelectedDate(String(e.currentTarget.value))}>
          <option value="0">Dates</option>
          {allDates &&
            allDates.map((date, index) => {
              return (
                <option value={date} key={index}>
                  {date}
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
