import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components/macro";

export const DateInput = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DateContainer>
      <DatePicker
        wrapperClassName="datePicker"
        selected={startDate}
        onChange={(date: any) => setStartDate(date)}
        showTimeSelect
        dateFormat="MMMM d, yyyy HH:mm "
        timeFormat="HH:mm"
        timeIntervals={30}
      />
    </DateContainer>
  );
};

const DateContainer = styled.div`
  .react-datepicker {
    width: 320px;
  }
  .react-datepicker__time-container {
    width: 77px;
  }
  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box {
    width: 75px;
  }
`;
