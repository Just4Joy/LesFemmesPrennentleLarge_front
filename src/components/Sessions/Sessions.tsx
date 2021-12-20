import React from 'react';

import NextSession from '../NextSession';

const Sessions = () => {
  return (
    <div className="sessions">
      <h1 className="sessions__h1">Trouver une session</h1>
      {/* Select Region */}
      <div className="sessions__selectors">
        <select className="sessions__selectors__region" name="région" id="région">
          <option value="">région</option>
          <option value="occitanie">Occitanie</option>
          <option value="nouvelle-acquitaine">Nouvelle Acquitaine</option>
          <option value="pays-de-la-loire">Pays de la Loire</option>
          <option value="bretagne">Bretagne</option>
          <option value="normandie">Normandie</option>
          <option value="paca">PACA</option>
          <option value="outre-mer">Outre Mer</option>
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
