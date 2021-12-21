import axios from 'axios';
import React, { useEffect, useState } from 'react';

import NextSession from '../NextSession';

const Sessions = () => {
  interface regionTypes {
    id_region: number;
    name: string;
    color: string;
  }

  const [regions, setRegions] = useState<regionTypes[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/regions')
      .then((result: any) => result.data)
      .then((data: any) => setRegions(data));
  }, []);

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
        <NextSession />
        <NextSession />
        <NextSession />
        <NextSession />
        <NextSession />
        <NextSession />
        <NextSession />
        <NextSession />
      </div>
      <div className="sessions__button">
        <button className="sessions__button__more">voir plus</button>
      </div>
    </div>
  );
};

export default Sessions;
