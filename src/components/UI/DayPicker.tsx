import React, { useState, useRef, FC, useContext } from "react";
import styled, { css } from "styled-components/macro";
import { ReactComponent as Right } from "../../assets/svg/monthRight.svg";
import { ReactComponent as Left } from "../../assets/svg/monthLeft.svg";
import DayPicker, { DateUtils } from "react-day-picker";
import useOnClickOutside from "../../hooks/useOutsideHook";
import { CSSTransition } from "react-transition-group";
import { OpenDate } from "../../types/dates";
import moment from "moment";
import "react-day-picker/lib/style.css";
import { useTranslation } from "react-i18next";

function Navbar({
  nextMonth,
  previousMonth,
  onPreviousClick,
  onNextClick,
  className,
  localeUtils,
}: any) {
  const months = localeUtils.getMonths();
  const prev = months[previousMonth.getMonth()];
  const next = months[nextMonth.getMonth()];

  return (
    <div className={className}>
      <ArrowLeft onClick={() => onPreviousClick()} />
      <ArrowRight onClick={() => onNextClick()} />
    </div>
  );
}
const lang = localStorage.getItem("i18nextLng") || "ru";
const WEEKDAYS_SHORT = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
const WEEKDAYS_SHORT_ENG = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

console.log("lang", lang);

const MONTHS = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const MONTHS_ENG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAYS_LONG = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];

const CustomDatePickers = styled(DayPicker)`
  background: #ffffff;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 4px;
  margin: 30px;
  @media (max-width: 992px) {
    margin: 0 auto 20px;
    background: #fff;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    width: 100%;
  }
  .DayPicker-Caption,
  .DayPicker-Caption > div {
    text-align: center;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.1px;
    color: #0e0d3d;
    font-family: "Roboto", sans-serif;
  }
  .DayPicker-Caption {
    margin-bottom: 13px;
    margin-top: 9px;
  }
  .DayPicker-Day {
    color: #0e0d3d;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    padding: 4px 7px;
    width: 48px;
    height: 48px;
    margin: 5px;
    &:focus {
      outline: none;
    }
    @media (max-width: 576px) {
      width: 32px;
      height: 32px;
      margin: 0px;
      padding: 5px 0px;
    }
  }
  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
    background: #ff416e;
    color: #fff;
  }
  .DayPicker-Day--today {
    color: #d0021b;
    font-weight: 700;
  }
  .DayPicker-Weekday {
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    letter-spacing: 0.4px;
    color: #515172;
    padding: 0 16px;
    @media (max-width: 992px) {
      padding: 0 9px;
    }
  }
  .DayPicker-Weekdays {
    display: table-caption;
    margin-bottom: 15px;
  }
  .DayPicker-Months:focus,
  .DayPicker-Month:focus,
  .DayPicker:focus,
  .DayPicker-wrapper:focus {
    outline: none;
  }
`;

export const Calendar: FC<{
  selectedDay: Date;
  setSelectedDay: (selectedDay: Date | string) => void;
}> = ({ selectedDay, setSelectedDay }) => {
  const handleDayClick = (day: any, { selected }: any) => {
    setSelectedDay(selected ? undefined : day);
  };
  const lang = localStorage.getItem("i18nextLng") || "ru";
  return (
    <CustomDatePickers
      months={lang === "en" ? MONTHS_ENG : MONTHS}
      firstDayOfWeek={lang === "en" ? 0 : 1}
      weekdaysLong={WEEKDAYS_LONG}
      weekdaysShort={lang === "en" ? WEEKDAYS_SHORT_ENG : WEEKDAYS_SHORT}
      navbarElement={<Navbar />}
      selectedDays={selectedDay}
      onDayClick={handleDayClick}
    />
  );
};

export const ModalRangeInput: FC<{
  label?: string;
  openDate: OpenDate;
  setOpenDate: (from: Date, to: Date) => void;
  onClose: () => void;
}> = ({ openDate, setOpenDate, onClose }) => {
  const [showOpen, setShowOpen] = useState(false);
  const [selfDate, setselfDate] = useState<any>({
    from: undefined,
    to: undefined,
  });
  const ref = useRef(null);

  const handleClickOutside = () => {
    setShowOpen(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  const handleDayClick = (day: Date) => {
    const range = DateUtils.addDayToRange(day, selfDate);
    setselfDate({ from: range.from, to: range.to });
  };

  const handleChange = () => {
    if (selfDate.from && selfDate.to) {
      setOpenDate(selfDate.from, selfDate.to);
      setselfDate({
        from: undefined,
        to: undefined,
      });
      onClose();
    }
  };
  const lang = localStorage.getItem("i18nextLng") || "ru";
  const modifiers = { start: selfDate.from, end: selfDate.to };
  const { t } = useTranslation();
  return (
    <>
      <DatePickerContainer ref={ref}>
        <CalendarWrap onClick={() => setShowOpen(!showOpen)}>
          <Period>{t("period")}...</Period>
        </CalendarWrap>
        {showOpen && (
          <CustomDatePicker
            selectedDays={[selfDate.from, selfDate]}
            months={lang === "en" ? MONTHS_ENG : MONTHS}
            onDayClick={handleDayClick}
            firstDayOfWeek={1}
            todayButton={t("ready")}
            onTodayButtonClick={handleChange}
            modifiers={modifiers}
            weekdaysLong={WEEKDAYS_LONG}
            weekdaysShort={lang === "en" ? WEEKDAYS_SHORT_ENG : WEEKDAYS_SHORT}
            navbarElement={<Navbar />}
          />
        )}
      </DatePickerContainer>
    </>
  );
};

export const TestInput: FC<{
  label: string;
  openDate: OpenDate;
  setOpenDate: (openDate: OpenDate) => void;
  onClose?: () => void;
}> = ({ label, openDate, setOpenDate }) => {
  const [showOpen, setShowOpen] = useState(false);
  const [selfDate, setSelfDate] = useState<any>({
    from: undefined,
    to: undefined,
  });
  const ref = useRef(null);
  const { t } = useTranslation();
  const handleClickOutside = () => {
    setShowOpen(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  const handleDayClick = (day: Date) => {
    const range = DateUtils.addDayToRange(day, selfDate);
    setSelfDate({ from: range.from, to: range.to });
    setOpenDate({ from: range.from, to: range.to });
  };

  const handleChange = () => {
    if (selfDate.from && selfDate.to) {
      setOpenDate({ from: selfDate.from, to: selfDate.to });
    }
    setShowOpen(false);
  };

  const reset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDate({ from: undefined, to: undefined });
    setSelfDate({
      from: undefined,
      to: undefined,
    });
  };

  const lang = localStorage.getItem("i18nextLng") || "ru";
  const modifiers = { start: selfDate.from, end: selfDate.to };

  return (
    <>
      <RangeInputs ref={ref}>
        <BoxInput onClick={() => setShowOpen(!showOpen)}>
          <DateLabel>{label}</DateLabel>
          <DateInput>
            <span>
              {selfDate.from ? moment(selfDate.from).format("DD.MM.YY") : ""}
            </span>
            <span>
              {selfDate.to ? `-${moment(selfDate.to).format("DD.MM.YY")} ` : ""}
            </span>
            {selfDate.from && <Close onClick={reset}>&times;</Close>}
          </DateInput>
        </BoxInput>

        {showOpen && (
          <CustomDatePicker
            selectedDays={[selfDate.from, selfDate]}
            months={lang === "en" ? MONTHS_ENG : MONTHS}
            onDayClick={handleDayClick}
            firstDayOfWeek={1}
            onTodayButtonClick={handleChange}
            todayButton={t("ready")}
            modifiers={modifiers}
            weekdaysLong={WEEKDAYS_LONG}
            weekdaysShort={lang === "en" ? WEEKDAYS_SHORT_ENG : WEEKDAYS_SHORT}
            navbarElement={<Navbar />}
          />
        )}
      </RangeInputs>
    </>
  );
};

export const MainAdminInput: FC<{
  label: string;
  openDate: OpenDate;
  setOpenDate: (openDate: OpenDate) => void;
  onClose?: () => void;
}> = ({ openDate, setOpenDate, label }) => {
  const [showOpen, setShowOpen] = useState(false);
  const [selfDate, setSelfDate] = useState<any>({
    from: undefined,
    to: undefined,
  });

  const ref = useRef(null);

  const handleClickOutside = () => {
    setShowOpen(false);
  };
  const { t } = useTranslation();
  useOnClickOutside(ref, handleClickOutside);

  const handleDayClick = (day: Date) => {
    const range = DateUtils.addDayToRange(day, selfDate);
    setSelfDate({ from: range.from, to: range.to });
    if (range.from && range.to) {
      setOpenDate({ from: range.from, to: range.to });
    }
  };

  const handleChange = () => {
    if (selfDate.from && selfDate.to) {
      setOpenDate({ from: selfDate.from, to: selfDate.to });
    }
    setShowOpen(false);
  };
  const lang = localStorage.getItem("i18nextLng") || "ru";
  const modifiers = { start: selfDate.from, end: selfDate.to };
  return (
    <>
      <AdminInputsContainer ref={ref}>
        <BoxInput onClick={() => setShowOpen(!showOpen)}>
          <DateInput>
            {selfDate.from && selfDate.to ? (
              <>
                <span>
                  {selfDate.from
                    ? moment(selfDate.from).format("DD.MM.YY")
                    : ""}
                </span>
                <span>
                  {selfDate.to
                    ? `-${moment(selfDate.to).format("DD.MM.YY")} `
                    : ""}
                </span>
              </>
            ) : (
              <span>
                {t("privateArea.at")} {label}
              </span>
            )}
          </DateInput>
        </BoxInput>

        <CSSTransition
          in={showOpen}
          timeout={300}
          classNames="data"
          unmountOnExit
        >
          <CustomDatePicker
            selectedDays={[selfDate.from, selfDate]}
            months={lang === "en" ? MONTHS_ENG : MONTHS}
            onDayClick={handleDayClick}
            firstDayOfWeek={1}
            onTodayButtonClick={handleChange}
            todayButton={t("ready")}
            modifiers={modifiers}
            weekdaysLong={WEEKDAYS_LONG}
            weekdaysShort={lang === "en" ? WEEKDAYS_SHORT_ENG : WEEKDAYS_SHORT}
            navbarElement={<Navbar />}
          />
        </CSSTransition>
      </AdminInputsContainer>
    </>
  );
};

const Period = styled.div`
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  color: #515172;
  text-align: center;
  padding: 15px 5px 5px;
  cursor: pointer;
  @media (max-width: 992px) {
    cursor: initial;
  }
  &:hover {
    color: #ff416e;
  }
`;

const flex = css`
  display: flex;
  align-items: flex-end;
`;

const CalendarLabel = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #515172;
  padding-right: 10px;
`;

const CalendarItem = styled.div`
  ${flex}
`;

const CalendarWrap = styled.div`
  ${flex};
  width: 100%;
  justify-content: center;
`;

const MyComp = styled.label`
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  border: 1px solid #ff416e;
  box-sizing: border-box;
  border-radius: 24px;
  padding: 12px;
  color: #606063;
  white-space: nowrap;
  position: relative;
  @media (max-width: 768px) {
    min-width: 120px;
    justify-content: center;
  }
  input {
    position: absolute;
    width: 0;
    height: 0;
    border: 0;
    outline: 0;
    &:focus {
      border: 0;
      outline: 0;
    }
  }
`;

const ModalComp = styled(MyComp)`
  border: none;
  width: 130px;
  border-radius: 0;
  border-bottom: 1px solid rgba(66, 139, 202, 0.2);
  padding: 4px 0;
  @media (max-width: 768px) {
    width: 90px;
  }
`;

const InputCustom = styled.div`
  .DayPickerInput-Overlay {
    right: 0;
    left: auto;
    @media (max-width: 768px) {
      right: -15px;
    }
  }
  .DayPicker-Caption,
  .DayPicker-Caption > div {
    text-align: center;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.1px;
    color: #0e0d3d;
    font-family: "Roboto", sans-serif;
  }
  .DayPicker-Caption {
    margin-bottom: 13px;
    margin-top: 9px;
  }
  .DayPicker-Day {
    color: #0e0d3d;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    padding: 4px 7px;
    width: 48px;
    height: 48px;
    margin: 5px;
    &:focus {
      outline: none;
    }
    @media (max-width: 576px) {
      width: 32px;
      height: 32px;
      margin: 0px;
      padding: 5px 0px;
    }
  }
  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
    background: #ff416e;
    color: #fff;
  }

  .Selectable
    .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background: #f0f8ff !important;
    color: #4a90e2;
  }
  .DayPicker-Day--today {
    color: #d0021b;
    font-weight: 700;
  }
  .DayPicker-Weekday {
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    letter-spacing: 0.4px;
    color: #515172;
    padding: 0 16px;
    @media (max-width: 992px) {
      padding: 0 9px;
    }
  }
  .DayPicker-Weekdays {
    display: table-caption;
    margin-bottom: 15px;
  }
  .DayPicker-Months:focus,
  .DayPicker-Month:focus,
  .DayPicker:focus,
  .DayPicker-wrapper:focus {
    outline: none;
  }
`;

const ModalInputCustom = styled(InputCustom)<{ left?: boolean }>`
  .DayPickerInput-Overlay {
    right: ${(props) => (props.left ? "auto" : "0")};
    left: ${(props) => (props.left ? "-16px" : "auto")};
    bottom: 100%;
    z-index: 10000;
    @media (max-width: 768px) {
      right: -15px;
    }
  }
`;

const DateSelect = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  padding: 16px;
`;

const Input = styled.input`
  color: #4a4a4a;
  font-size: 16px;
  line-height: 20px;
  width: 65%;
  cursor: inherit;
  text-overflow: clip;
  white-space: nowrap;

  ::placeholder {
    color: #a0b0b9;
  }
`;

const CustomDatePicker = styled(DayPicker)`
  background: #ffffff;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 4px;
  margin: 30px;
  @media (max-width: 992px) {
    margin: 0 auto 20px;
    background: #fff;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
  .DayPicker-Caption,
  .DayPicker-Caption > div {
    text-align: center;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.1px;
    color: #0e0d3d;
    font-family: "Roboto", sans-serif;
  }
  .DayPicker-Caption {
    margin-bottom: 13px;
    margin-top: 9px;
  }
  .DayPicker-Day {
    color: #0e0d3d;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    padding: 4px 7px;
    width: 48px;
    height: 48px;
    margin: 5px;
    &:focus {
      outline: none;
    }
    @media (max-width: 576px) {
      width: 32px;
      height: 32px;
      margin: 0px;
      padding: 5px 0px;
    }
  }
  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
    background: #ff416e;
    color: #fff;
  }

  .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #f0f8ff !important;
    border-radius: 0;
    color: #4a90e2;
  }
  .DayPicker-Day--today {
    color: #d0021b;
    font-weight: 700;
  }
  .DayPicker-Weekday {
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    letter-spacing: 0.4px;
    color: #515172;
    padding: 0 16px;
    @media (max-width: 992px) {
      padding: 0 9px;
    }
  }
  .DayPicker-Weekdays {
    display: table-caption;
    margin-bottom: 15px;
  }
  .DayPicker-Months:focus,
  .DayPicker-Month:focus,
  .DayPicker:focus,
  .DayPicker-wrapper:focus {
    outline: none;
  }
  .DayPicker-TodayButton {
    width: 100%;
    text-align: center;
    padding: 10px;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    display: block;
    width: 100%;
    text-align: center;
    color: #ff416e;
    background: #fff;
    padding: 10px;
  }
`;

const DatePickerContainer = styled.div`
  .DayPicker-Footer {
    border-top: 1px solid rgba(66, 139, 202, 0.2);
  }
  position: relative;
  display: flex;
  align-items: center;
  ${CustomDatePicker} {
    position: absolute;
    margin: 0;
    bottom: -90px;
    right: 0;
    left: 0;
    z-index: 9999;
    @media (max-width: 576px) {
      bottom: -60px;
    }
    .DayPicker-Months {
      height: 395px;
      @media (max-width: 576px) {
        height: 314px;
      }
    }
  }
`;

const BoxInput = styled.div`
  position: relative;
  @media (max-width: 576px) {
    width: 100%;
    margin-right: 0;
  }
`;

const RangeInputs = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  @media (max-width: 576px) {
    flex-wrap: wrap;
    width: 100%;
  }

  ${CustomDatePicker} {
    position: absolute;
    top: 30px;
    right: 80px;
    z-index: 9999;
    @media (max-width: 992px) {
      top: 100%;
      right: 40px;
    }
    @media (max-width: 768px) {
      right: 0px;
    }
    @media (max-width: 576px) {
      top: calc(100% - 12px);
    }
    .DayPicker-Footer {
      border-top: 1px solid rgba(66, 139, 202, 0.2);
    }
    .DayPicker-TodayButton:focus {
      outline: none;
    }
  }
`;

const Close = styled.div`
  position: absolute;
  right: 5px;
  top: 50%;
  cursor: pointer;
  margin-top: -11px;
`;

const DateInput = styled.div`
  border: 1px solid rgba(86, 101, 127, 0.3);
  box-sizing: border-box;
  border-radius: 2px;
  width: 142px;
  height: 40px;
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.1px;
  color: #515172;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  @media (max-width: 576px) {
    width: 100%;
    margin-bottom: 12px;
  }
`;

const AdminInputsContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  @media (max-width: 576px) {
    flex-wrap: wrap;
    width: 100%;
  }
  ${BoxInput} {
    position: relative;
    @media (max-width: 576px) {
      margin: 0 15px;
    }
  }
  ${DateInput} {
    border: 1px solid #ff416e;
    box-sizing: border-box;
    border-radius: 24px;
  }
  ${CustomDatePicker} {
    position: absolute;
    top: 10px;
    right: 0;
    z-index: 9999;
    @media (max-width: 992px) {
      top: 40px;
      width: auto;
    }
    @media (max-width: 576px) {
      right: 0px;
      top: calc(100% - 12px);
      margin: 0 auto;
      left: 0;
      max-width: 300px;
    }
  }
  .DayPicker-Footer {
    border-top: 1px solid rgba(66, 139, 202, 0.2);
  }
  .DayPicker-TodayButton:focus {
    outline: none;
  }
`;

const DateLabel = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.1px;
  color: rgba(86, 101, 127, 0.6);
`;

const icon = css`
  position: absolute;
  top: 28px;
  cursor: pointer;
`;

const ArrowLeft = styled(Left)`
  ${icon}
  left:24px;
`;

const ArrowRight = styled(Right)`
  ${icon}
  right:24px;
`;
