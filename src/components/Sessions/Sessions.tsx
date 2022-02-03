import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
  const { id_region } = useParams<{ id_region: string | undefined }>();
  const [allRegions, setAllRegions] = useState<IRegion[]>([]);
  const [allDepartments, setAllDepartments] = useState<IDepartment[]>([]);
  const [allSurfstyles, setAllSurfstyles] = useState<ISurfStyle[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<number | undefined | string>();
  const [selectedDate, setSelectedDate] = useState<Date | string>('');
  const [mySessions, setMySessions] = useState<MySession[]>([]);
  const [pagination, setPagination] = useState<number>(0);
  const [paginationActive, setPaginationActive] = useState<boolean>(false);

  // Axios functions
  const getAllSessions = async () => {
    let basicUrl = `http://localhost:3000/api/sessions`;
    let basicUrlChanged = false;

    if (selectedRegion !== undefined && selectedRegion !== 0) {
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
      'http://localhost:3000/api/surfstyles',
    );
    return surfstyles.data;
  };

  // Constructing hte array of object mySession
  const mySessionsObjectConstructor = (
    sessionsList: ISession[],
    departmentsList: IDepartment[],
    surfstyleList: ISurfStyle[],
    regionsList: IRegion[],
  ) => {
    let mesSessions: MySession[] = [];
    let maSession: MySession;

    if (departmentsList.length && surfstyleList.length && regionsList.length) {
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
          id_user: session.id_user,
          id_region: id_region,
          name_session: surfstyleList.find(
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
    if (id_region !== undefined) {
      setSelectedRegion(id_region);
    }
    Promise.all([
      getAllSessions(),
      getAllRegions(),
      getAllDepartments(),
      getAllSurfstyles(),
    ])
      .then(([sessions, regions, departments, surfstyles]) => {
        setAllRegions(regions);
        setAllDepartments(departments);
        setAllSurfstyles(surfstyles);

        mySessionsObjectConstructor(sessions, departments, surfstyles, regions);
      })
      .catch(() => {
        error();
      });
  }, []);

  // First useEffect
  useEffect(() => {
    Promise.all([
      getAllSessions(),
      getAllRegions(),
      getAllDepartments(),
      getAllSurfstyles(),
    ])
      .then(([sessions, regions, departments, surfstyles]) => {
        setAllRegions(regions);
        setAllDepartments(departments);
        setAllSurfstyles(surfstyles);

        mySessionsObjectConstructor(sessions, departments, surfstyles, regions);
      })
      .catch(() => {
        error();
      });
  }, [selectedRegion, pagination, selectedDate]);

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
            setSelectedDate('');
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
        {/* Select date */}
        <input
          className="sessions__selectors__date"
          name="date"
          type="date"
          list="dateList"
          id="date"
          onChange={(e) => {
            setSelectedDate(e.currentTarget.value);
            setPagination(0);
          }}
        />
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
                setPaginationActive(true);
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
