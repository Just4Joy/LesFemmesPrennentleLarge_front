import 'react-datepicker/src/stylesheets/datepicker.scss';

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

function DatetimePicker({selectedDate, setSelectedDate}: any) {
  //const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  //console.log(selectedDate);
  return (
    <div className="datepicker">
      <DatePicker
        placeholderText="Date de la session"
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="yyyy-MM-dd hh:mm"
        minDate={new Date()}
        showTimeSelect
        className="datepicker__input"
      />
    </div>
  );
}

export default DatetimePicker;
