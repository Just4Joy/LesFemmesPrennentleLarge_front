import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import IRegion from '../../interfaces/IRegion';
import IDepartment from '../../interfaces/IDepartment';
import ISession from '../../interfaces/ISession';
import ISurfStyle from '../../interfaces/ISurfStyle';
import NextSession from '../NextSession';

type MySession = ISession & IDepartment & IRegion;

type NiceDate = {
  date: string;
  nice_date: string;
};

const Sessions = () => {
  let { id_region } = useParams<{ id_region: string | undefined }>();
  const [allRegions, setAllRegions] = useState<IRegion[]>([]);
  const [allDepartments, setAllDepartments] = useState<IDepartment[]>([]);
  const [allSurfstyle, setAllSurfstyle] = useState<ISurfStyle[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<number | undefined | string>();
  const [selectedDate, setSelectedDate] = useState<string>();
  const [allDates, setAllDates] = useState<NiceDate[]>([]);
  const [mySessions, setMySessions] = useState<MySession[]>([]);

  console.log('id_region ' + id_region);
  console.log('selectedRegion ' + selectedRegion);

  // Construit le tableau d'objet niceDates
  const getNiceDates = (sessionsData: ISession[]) => {
    let compareDate: string[] = [];
    let niceDates: NiceDate[] = [];

    if (sessionsData.length === 1) {
      niceDates.push({
        nice_date: sessionsData[0].nice_date,
        date: sessionsData[0].date,
      });
    } else if (sessionsData.length > 1) {
      sessionsData.map((session) => {
        if (!compareDate.includes(session.nice_date)) {
          compareDate.push(session.nice_date);
          niceDates.push({ nice_date: session.nice_date, date: session.date });
        }
      });
    }
    setAllDates(niceDates);
  };

  // Les fonctions axios
  const getAllSessions = async () => {
    let basicUrl = `http://localhost:3000/api/sessions`;
    let basicUrlChanged = false;

    if (selectedRegion !== undefined && selectedRegion !== 0) {
      basicUrl += `?region=${selectedRegion}`;
      basicUrlChanged = true;
    }

    if (selectedDate !== undefined && selectedDate !== '0') {
      basicUrl += basicUrlChanged ? `&date=${selectedDate}` : `?date=${selectedDate}`;
    }
    const sessions = await axios.get<ISession[]>(basicUrl);
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
    const surfstyles = await axios.get<ISurfStyle[]>(
      'http://localhost:3000/api/surfstyle',
    );
    return surfstyles.data;
  };

  // Construit le tableau d'objet mySessions
  const mySessionsObjectConstructor = (
    sessionsList: ISession[],
    departmentsList: IDepartment[],
    surfstyleList: ISurfStyle[],
    regionsList: IRegion[],
  ) => {
    let mesSessions: MySession[] = [];
    let maSession: MySession;
    sessionsList.map((session) => {
      let id_region: number =
        departmentsList.find(
          (departement) => departement.id_department == session.id_department,
        )?.id_region || 0;
      maSession = {
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
        id_region: id_region,
        name_session: surfstyleList.find(
          (surfstyle) => surfstyle.id_surf_style == session.id_surf_style,
        )?.name_session,
        region_name:
          regionsList.find((region) => region.id_region == id_region)?.region_name || '',
      };
      mesSessions.push(maSession);
    });
    setMySessions(mesSessions);
  };

  // Premier useEffect
  useEffect(() => {
    console.log('UseEffect');
    Promise.all([
      getAllSessions(),
      getAllRegions(),
      getAllDepartments(),
      getAllSurfstyles(),
    ]).then(([sessions, regions, departments, surfstyles]) => {
      setAllRegions(regions);
      setAllDepartments(departments);
      setAllSurfstyle(surfstyles);

      mySessionsObjectConstructor(sessions, departments, surfstyles, regions);
      getNiceDates(sessions);
    });

    if (id_region !== undefined) {
      setTimeout(() => {
        setSelectedRegion(id_region);
      }, 1000);
    }
  }, []);

  useEffect(() => {
    if (selectedRegion !== undefined) {
      console.log('UseEffect regions' + selectedRegion);
      getAllSessions().then((sessions) => {
        mySessionsObjectConstructor(sessions, allDepartments, allSurfstyle, allRegions);
        getNiceDates(sessions);
      });
    }
  }, [selectedRegion]);
  console.log(mySessions);
  // Second useEffect
  useEffect(() => {
    if (selectedRegion !== undefined) {
      console.log('UseEffect date' + selectedDate);
      allRegions &&
        getAllSessions().then((sessions) => {
          mySessionsObjectConstructor(sessions, allDepartments, allSurfstyle, allRegions);
        });
    }
  }, [selectedDate]);

  //console.log(mySessions);
  //console.log(selectedDate);
  // console.log(selectedRegion);

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
            setSelectedDate(String('0'));
          }}>
          <option value={parseInt('0')}>Régions</option>
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
                <option value={date.date} key={index}>
                  {date.nice_date}
                </option>
              );
            })}
        </select>
      </div>

      {/* Composants NextSession */}
      <div className="sessions__nextsession">
        {mySessions && mySessions.length === 0 ? (
          <h1 className="sessions__nextsession__not-sessions">
            Aucune session disponible.
          </h1>
        ) : (
          mySessions.map((session) => {
            return <NextSession {...session} key={session.id_session} />;
          })
        )}
      </div>
      {mySessions.length > 0 && (
        <div className="sessions__button">
          <button className="sessions__button__more">voir plus</button>
        </div>
      )}
    </div>
  );
};

export default Sessions;
