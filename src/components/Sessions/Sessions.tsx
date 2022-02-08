import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';

import { error } from '../../errors';
import IDepartment from '../../interfaces/IDepartment';
import IRegion from '../../interfaces/IRegion';
import ISession from '../../interfaces/ISession';
import ISurfStyle from '../../interfaces/ISurfStyle';
import NextSession from '../NextSession';

type MySession = ISession & IDepartment & IRegion;

const Sessions = () => {
  const { idRegion } = useParams<{ idRegion: string | undefined }>();
  const [allRegions, setAllRegions] = useState<IRegion[]>([]);
  const [allDepartments, setAllDepartments] = useState<IDepartment[]>([]);
  const [allDepartmentsSelected, setAllDepartmentsSelected] = useState<number[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<number>(Number(idRegion) || 0);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [mySessions, setMySessions] = useState<MySession[]>([]);
  const [pagination, setPagination] = useState<number>(0);
  const [sessions, setSessions] = useState<ISession[]>([]);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  const getAllSessionsStart = async () => {
    const allSessions = await axios.get<ISession[]>(`http://localhost:3000/api/sessions`);
    setSessions(allSessions.data);
  };

  useEffect(() => {
    try {
      getAllSessionsStart();
    } catch (err) {
      error();
    }
  }, []);

  // Axios functions
  const getAllSessions = async () => {
    let basicUrl = `http://localhost:3000/api/sessions`;
    let basicUrlChanged = false;

    if (selectedRegion > 0) {
      basicUrl += `?region=${selectedRegion}`;
      basicUrlChanged = true;
    }
    if (selectedDate !== undefined && selectedDate !== '0') {
      basicUrl += basicUrlChanged ? `&date=${selectedDate}` : `?date=${selectedDate}`;
      basicUrlChanged = true;
    }
    if (pagination >= 0) {
      basicUrl += basicUrlChanged ? `&pages=${pagination}` : `?pages=${pagination}`;
    }

    return await axios.get<ISession[]>(basicUrl);
  };
  const getAllRegions = async () => {
    return await axios.get<IRegion[]>('http://localhost:3000/api/regions');
  };
  const getAllDepartments = async () => {
    return await axios.get<IDepartment[]>('http://localhost:3000/api/departments');
  };
  const getAllSurfstyles = async () => {
    return await axios.get<ISurfStyle[]>('http://localhost:3000/api/surfstyles');
  };

  // Constructing hte array of object mySession
  const mySessionsObjectConstructor = (
    sessionsList: ISession[],
    departmentsList: IDepartment[],
    surfStylesList: ISurfStyle[],
    regionsList: IRegion[],
  ) => {
    const mesSessions: MySession[] = [];
    let maSession: MySession;

    if (departmentsList.length && surfStylesList.length && regionsList.length) {
      sessionsList.map((session) => {
        const id_region: number =
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
          id_user: session.id_user,
          id_region: id_region,
          name_session: surfStylesList.find(
            (surfstyle) => surfstyle.id_surf_style == session.id_surf_style,
          )?.name_session,
          region_name:
            regionsList.find((region) => region.id_region == id_region)?.region_name ||
            '',
        };
        mesSessions.push(maSession);
      });
    }
    setMySessions(mesSessions);
  };

  // First useEffect
  useEffect(() => {
    (async () => {
      try {
        const sessions = await getAllSessions();
        const regions = await getAllRegions();
        const departments = await getAllDepartments();
        const surfStyles = await getAllSurfstyles();
        mySessionsObjectConstructor(
          sessions.data,
          departments.data,
          surfStyles.data,
          regions.data,
        );
        setAllRegions(regions.data);
        setAllDepartments(departments.data);
      } catch (err) {
        error();
      }
    })();
  }, []);

  // Second useEffect
  useEffect(() => {
    (async () => {
      try {
        const sessions = await getAllSessions();
        const regions = await getAllRegions();
        const departments = await getAllDepartments();
        const surfStyles = await getAllSurfstyles();
        mySessionsObjectConstructor(
          sessions.data,
          departments.data,
          surfStyles.data,
          regions.data,
        );
        setAllRegions(regions.data);

        setAllDepartments(departments.data);
      } catch (err) {
        error();
      }
    })();
  }, [selectedRegion, pagination, selectedDate]);

  useEffect(() => {
    const tempArray: number[] = [];
    allDepartments
      .filter((department) => department.id_region === selectedRegion)
      .map((department) => tempArray.push(department.id_department));
    setAllDepartmentsSelected(tempArray);
  }, [selectedRegion]);

  return (
    <div className="sessions">
      <h1 className="sessions__h1">Trouver une session</h1>
      {/* Select Region */}
      <div className="sessions__selectors">
        <select
          className="sessions__selectors__region"
          name="region"
          id="region"
          value={selectedRegion}
          onChange={(e) => {
            setSelectedRegion(Number(e.currentTarget.value));
            // setSelectedDate(new Date().toLocaleDateString());
            setPagination(0);
          }}
          onBlur={(e) => {
            setSelectedRegion(Number(e.currentTarget.value));
            // setSelectedDate(new Date().toLocaleDateString());
            setPagination(0);
          }}>
          <option value={0}>Régions</option>
          {allRegions.map((region) => {
            return (
              <option value={region.id_region} key={region.id_region}>
                {region.region_name}
              </option>
            );
          })}
        </select>
        <div className="session__selectors__date">
          <input
            className="sessions__selectors__date__input"
            value={
              selectedDate ? moment(selectedDate).format('DD/MM/YYYY') : 'dd/mm/yyyy'
            }
            onFocus={() => setShowCalendar(true)}
            readOnly
          />
          <Calendar
            className={showCalendar ? '' : 'hide'}
            onChange={(date: Date) => {
              setSelectedDate(moment(date).format('YYYY-MM-DD'));
              setShowCalendar(false);
            }}
            tileClassName={({ date }) => {
              let className = '';
              if (
                sessions
                  .filter(
                    (session) =>
                      selectedRegion === 0 ||
                      allDepartmentsSelected.includes(session.id_department),
                  )
                  .find(
                    (session) => session.nice_date === moment(date).format('DD/MM/YYYY'),
                  )
              ) {
                className = 'highlight';
              }
              return className;
            }}
          />
        </div>
      </div>

      {/* Componant NextSession */}
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
          {pagination && pagination >= 5 ? (
            <BsArrowLeftSquareFill
              onClick={() => setPagination(pagination - 9)}
              className="sessions__button__more"
            />
          ) : (
            ''
          )}

          {mySessions.length === 9 ? (
            <BsArrowRightSquareFill
              onClick={() => {
                setPagination(pagination + 10);
              }}
              className="sessions__button__more"
            />
          ) : (
            ''
          )}
        </div>
      )}
    </div>
  );
};

export default Sessions;
