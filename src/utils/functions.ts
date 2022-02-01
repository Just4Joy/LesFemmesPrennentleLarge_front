const convertDateToISO = (dateToConvert: Date): string => {
  const dateConverted: string =
    dateToConvert.getUTCFullYear() +
    '-' +
    ('0' + (dateToConvert.getUTCMonth() + 1)).slice(-2) +
    '-' +
    ('0' + dateToConvert.getUTCDate()).slice(-2) +
    'T00:00';

  return dateConverted;
};

const convertDateTimeToString = (dateToConvert: Date): string => {
  const dateConverted: string =
    dateToConvert.getUTCFullYear() +
    '-' +
    ('0' + (dateToConvert.getUTCMonth() + 1)).slice(-2) +
    '-' +
    ('0' + dateToConvert.getUTCDate()).slice(-2);
  return dateConverted;
};

const convertDateTimeToDDMMYYY = (dateToConvert: Date): string => {
  const dateConverted: string =
    ('0' + (dateToConvert.getUTCDate() + 1)).slice(-2) +
    '-' +
    ('0' + (dateToConvert.getUTCMonth() + 1)).slice(-2) +
    '-' +
    dateToConvert.getUTCFullYear();
  return dateConverted;
};

export { convertDateTimeToDDMMYYY, convertDateTimeToString, convertDateToISO };
