import 'react-datepicker/dist/react-datepicker.css';

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

function DatetimePicker() {
  const [selectedDate, setSelectedDate] = useState(null);
  console.log(selectedDate);
  return (
    <div className="datepicker">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="dd/MM/yyyy HH:mm"
        minDate={new Date()}
        showTimeSelect
      />
    </div>
  );
}

export default DatetimePicker;
