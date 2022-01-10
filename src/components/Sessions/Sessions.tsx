import axios from 'axios';
import React, { useEffect, useState } from 'react';

import IRegion from '../../interfaces/IRegion';
import ISession from '../../interfaces/ISession';
import NextSession from '../NextSession';

const Sessions = () => {
  const [regions, setRegions] = useState<IRegion[]>([]);
  const [allSessions, setAllSessions] = useState<ISession[]>([]);

  useEffect(() => {
    axios
      .get<IRegion[]>('http://localhost:3000/api/regions')
      .then((result) => result.data)
      .then((data) => setRegions(data));
  }, []);

  useEffect(() => {
    axios
      .get<ISession[]>('http://localhost:3000/api/sessions')
      .then((result) => result.data)
      .then((data) => setAllSessions(data));
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
              <option value={region.region_name} key={region.id_region}>
                {region.region_name}
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
