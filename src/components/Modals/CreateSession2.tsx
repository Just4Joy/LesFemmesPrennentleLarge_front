import axios from 'axios';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';

import { error } from '../../errors';
import IWeather from '../../interfaces/IWeather';
import CurrentSessionContext from '../contexts/CurrentSession';

type Props = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

const CreateSession2: FC<Props> = ({ setActiveModal }) => {
  const { idSessionCreated } = useContext(CurrentSessionContext);

  const [weather, setWeather] = useState<IWeather[]>([]);
  const [wave, setWave] = useState<string>('');
  const [flow, setFlow] = useState<string>('');
  const [power, setPower] = useState<string>('');
  const [temperature, setTemperature] = useState<string>('');

  const getAllWeathers = async () => {
    const allWeathers = await axios.get<IWeather[]>('http://localhost:3000/api/weather');
    setWeather(allWeathers.data);
  };

  //GET Weather
  useEffect(() => {
    try {
      getAllWeathers();
    } catch (err) {
      error();
    }
  }, []);

  async function addWeather() {
    const dataToSend = [wave, flow, power, temperature];
    try {
      await Promise.all(
        dataToSend.map((el) => {
          return axios.post(
            `http://localhost:3000/api/sessions/${idSessionCreated}/weather`,
            {
              idWeather: el,
            },
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            },
          );
        }),
      );
      setActiveModal('recap');
    } catch (err) {
      error();
    }
  }

  return (
    <div className="create-session2">
      <div className="create-session2__title">
        <h1>Condition météos (optionnel)</h1>
        <h1>2/2</h1>
      </div>
      <div className="create-session2__paragraph">
        <p>Tu sais analyser les conditions météos via des sites?</p>
        <p>Donne des indications aux participantes de la session</p>
      </div>
      <div className="create-session2__selects">
        <select onBlur={(e) => setWave(e.target.value)}>
          <option value="">type de vagues</option>
          {weather &&
            weather
              .filter((waves) => waves.type === 'wave')
              .map((waves) => {
                return (
                  <option key={waves.id_weather} value={waves.id_weather}>
                    {waves.name}
                  </option>
                );
              })}
        </select>
        <select onBlur={(e) => setFlow(e.target.value)}>
          <option value="">courants</option>
          {weather &&
            weather
              .filter((flows) => flows.type === 'flow')
              .map((flows) => {
                return (
                  <option key={flows.id_weather} value={flows.id_weather}>
                    {flows.name}
                  </option>
                );
              })}
        </select>
        <select onBlur={(e) => setPower(e.target.value)}>
          <option value="">puissance des vagues</option>
          {weather &&
            weather
              .filter((powers) => powers.type === 'power')
              .map((powers) => {
                return (
                  <option key={powers.id_weather} value={powers.id_weather}>
                    {powers.name}
                  </option>
                );
              })}
        </select>
        <select onBlur={(e) => setTemperature(e.target.value)}>
          <option value="">temps</option>
          {weather &&
            weather
              .filter((temperatures) => temperatures.type === 'temperature')
              .map((temperatures) => {
                return (
                  <option key={temperatures.id_weather} value={temperatures.id_weather}>
                    {temperatures.name}
                  </option>
                );
              })}
        </select>
      </div>
      <div className="create-session2__buttons">
        <button className="create-session2__buttons__next" onClick={() => addWeather()}>
          <h4>valider</h4>
        </button>
        <button
          className="create-session2__buttons__skip"
          onClick={() => {
            setActiveModal('recap');
          }}>
          <h3>skip</h3>
        </button>
      </div>
    </div>
  );
};

export default CreateSession2;
