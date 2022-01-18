import axios from 'axios';
import React, { useEffect, useState } from 'react';

import IRegion from '../../interfaces/IRegion';
import IDepartment from '../../interfaces/IDepartment';
import ISession from '../../interfaces/ISession';
import ISurfStyle from '../../interfaces/ISurfStyle';
import NextSession from '../NextSession';

type MySession = ISession & IDepartment & IRegion;

const Sessions = () => {
  const [allRegions, setAllRegions] = useState<IRegion[]>([]);
  const [allDepartments, setAllDepartments] = useState<IDepartment[]>([]);
  const [allSurfstyle, setAllSurfstyle] = useState<ISurfStyle[]>([]);
  const [allSessions, setAllSessions] = useState<ISession[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('0');
  const [selectedDate, setSelectedDate] = useState<string>('0');
  const [allDates, setAllDates] = useState<ISession[]>([]);
  const [mySessions, setMySessions] = useState<MySession[]>([]);

  // Construit le tableau d'objet niceDates
  const getNiceDates = (sessionsData: ISession[]) => {
    let compareDate: ISession[] = [];
    let niceDates: ISession[] = [];
    console.log(sessionsData);
    if (sessionsData.length === 1) {
      niceDates.push({
        nice_date: sessionsData[0].nice_date,
        date: sessionsData[0].date,
      });
      console.log(niceDates);
    } else if (sessionsData.length > 1) {
      sessionsData.map((session) => {
        if (compareDate.length === 0) {
          compareDate.push(session.nice_date);
          niceDates.push({ nice_date: session.nice_date, date: session.date });
        }
        compareDate.includes(session.nice_date)
          ? ''
          : niceDates.push({ nice_date: session.nice_date, date: session.date });
      });
    }
    setAllDates(niceDates);
  };

  const getAllSessions = async () => {
    let basicUrl = `http://localhost:3000/api/sessions`;
    let basicUrlChanged = false;
    if (selectedRegion !== '0') {
      basicUrl += `?region=${selectedRegion}`;
      basicUrlChanged = true;
    }
    if (selectedDate !== '0') {
      basicUrlChanged
        ? (basicUrl += `&date=${selectedDate}`)
        : (basicUrl += `?date=${selectedDate}`);
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

  useEffect(() => {
    console.log('UseEffect regions');
    Promise.all([
      getAllSessions(),
      getAllRegions(),
      getAllDepartments(),
      getAllSurfstyles(),
    ]).then(([sessions, regions, departments, surfstyles]) => {
      setAllSessions(sessions);
      setAllRegions(regions);
      setAllDepartments(departments);
      setAllSurfstyle(surfstyles);

      getNiceDates(sessions);

      // Construit le tableau d'objet mesSessions
      let mesSessions: MySession[] = [];
      let maSession: MySession;
      sessions.map((session) => {
        let id_region = departments.find(
          (departement) => departement.id_department == session.id_department,
        )?.id_region;
        maSession = {
          id_session: session.id_session,
          name: session.name,
          nice_date: session.nice_date,
          nice_time: session.nice_time,
          spot_name: session.spot_name,
          address: session.address,
          nb_hiki_max: session.nb_hiki_max,
          carpool: session.carpool,
          name_session: surfstyles.find(
            (surfstyle) => surfstyle.id_surf_style == session.id_surf_style,
          )?.name_session,
          region_name: regions.find((region) => region.id_region == id_region)
            ?.region_name,
        };
        mesSessions.push(maSession);
      });
      setMySessions(mesSessions);
    });
  }, [selectedRegion]);

  useEffect(() => {
    console.log('UseEffect date');
    allRegions &&
      getAllSessions().then((sessions) => {
        setAllSessions(sessions);

        // Construit le tableau d'objet mesSessions

        let mesSessions: MySession[] = [];
        let maSession: MySession;
        sessions.map((session) => {
          let id_region = allDepartments.find(
            (departement) => departement.id_department == session.id_department,
          )?.id_region;
          maSession = {
            id_session: session.id_session,
            name: session.name,
            nice_date: session.nice_date,
            nice_time: session.nice_time,
            spot_name: session.spot_name,
            address: session.address,
            nb_hiki_max: session.nb_hiki_max,
            carpool: session.carpool,
            name_session: allSurfstyle.find(
              (surfstyle) => surfstyle.id_surf_style == session.id_surf_style,
            )?.name_session,
            region_name: allRegions.find((region) => region.id_region == id_region)
              ?.region_name,
          };
          mesSessions.push(maSession);
        });
        setMySessions(mesSessions);
      });
  }, [selectedDate]);

  console.log(mySessions);
  // console.log(selectedDate);

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
            setSelectedRegion(String(e.currentTarget.value));
            setSelectedDate(String('0'));
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
                <option value={date.date} key={index}>
                  {date.nice_date}
                </option>
              );
            })}
        </select>
      </div>

      {/* Composants NextSession */}
      <div className="sessions__nextsession">
        {mySessions && allSessions.length === 0 ? (
          <h1 className="sessions__nextsession__not-sessions">
            Aucunes sessions disponible.
          </h1>
        ) : (
          mySessions.map((session) => {
            return <NextSession {...session} key={session.id_session} />;
          })
        )}
      </div>
      {allSessions.length === 0 ? (
        ''
      ) : (
        <div className="sessions__button">
          <button className="sessions__button__more">voir plus</button>
        </div>
      )}
    </div>
  );
};

export default Sessions;
