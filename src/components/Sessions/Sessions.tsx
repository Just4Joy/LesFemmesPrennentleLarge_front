import axios from 'axios';
import React, { useEffect, useState } from 'react';

import NextSession from '../NextSession';

const Sessions = () => {
  interface regionTypes {
    id_region: number;
    name: string;
    color: string;
  }

  interface allSessionsTypes {
    id_session: number;
    name: string;
    date: string;
    spot_name: string;
    adress: string;
    nb_hiki_max: number;
    id_departement: number;
    id_surf_style: number;
    carpool: number;
    region_name: string;
    name_session: string;
  }

  const [regions, setRegions] = useState<regionTypes[]>([]);
  const [allSessions, setAllSessions] = useState<allSessionsTypes[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/regions')
      .then((result: any) => result.data)
      .then((data: any) => setRegions(data));
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/sessions')
      .then((result: any) => result.data)
      .then((data: any) => setAllSessions(data));
  }, []);
  console.log(allSessions);

  return (
    <div className="sessions">
      <h1 className="sessions__h1">Trouver une session</h1>
      {/* Select Region */}
      <div className="sessions__selectors">
        <select className="sessions__selectors__region" name="région" id="région">
          <option value="">région</option>
          {regions.map((region) => {
            return (
              <option value={region.name} key={region.id_region}>
                {region.name}
              </option>
            );
          })}
        </select>
        {/* Select date */}
        <select className="sessions__selectors__date" name="date" id="date">
          <option value="">date</option>
          <option value="17/12/2021">17/12/2021</option>
        </select>
      </div>

      {/* Composants NextSession */}
      <div className="sessions__nextsession">
        {allSessions &&
          allSessions.map((session) => {
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
