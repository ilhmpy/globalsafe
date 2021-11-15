import {  FC } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components/macro';
import { enGB, ru } from 'date-fns/locale';

type Props = {
  label: string;
  startDate: Date | null;
  setStartDate: (startDate: Date | null) => void;
  readOnly?: boolean;
  placeholderText?: string;
};

export const DateInput: FC<Props> = ({
  label,
  startDate,
  setStartDate,
  readOnly = false,
  placeholderText,
}: Props) => {
  const lang = localStorage.getItem('i18nextLng') || 'ru';
  const el = lang === 'ru' ? ru : enGB;
  registerLocale('el', el);
  return (
    <DateContainer>
      <Label>{label}</Label>
      <DatePicker
        locale="el"
        wrapperClassName="datePicker"
        selected={startDate}
        onChange={(date: any) => setStartDate(date)}
        showTimeSelect
        dateFormat="d MMMM yyyy, HH:mm "
        timeFormat="HH:mm"
        timeIntervals={1}
        placeholderText={placeholderText}
        readOnly={readOnly}
      />
    </DateContainer>
  );
};

const Label = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.1px;
  position: absolute;
  left: 14px;
  padding: 0 10px;
  top: -11px;
  z-index: 9;
  user-select: none;
  background: ${(props) => props.theme.card.background};
  color: ${(props) => props.theme.depositHead};
`;

const DateContainer = styled.div`
  position: relative;
  .react-datepicker {
    width: 320px;
    @media (max-width: 576px) {
      width: 243px;
    }
  }
  .react-datepicker__time-container {
    width: 77px;
    @media (max-width: 576px) {
      float: left;
      width: 100%;
    }
  }
  .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box {
    width: 75px;
  }
  .react-datepicker__input-container {
    position: relative;
    border: 1px solid rgba(86, 101, 127, 0.3);
    box-sizing: border-box;
    border-radius: 2px;
    padding: 8px;
    width: 100%;
    height: 40px;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    display: flex;
    align-items: center;
    letter-spacing: 0.1px;
    @media (max-width: 768px) {
      width: 100%;
    }
    input {
      border: none;
      outline: none;
      color: ${(props) => props.theme.text};
      background: transparent;
    }
  }
  .react-datepicker__close-icon::after {
    background-color: transparent;
    color: #000;
  }
  .react-datepicker-popper {
    z-index: 999;
  }
  .react-datepicker-wrapper {
    width: 100%;
  }
  .react-datepicker__time-box {
    @media (max-width: 576px) {
      height: 80px;
    }
  }
`;
