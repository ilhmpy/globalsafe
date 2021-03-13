import React, { useState, useRef, FC } from "react";
import styled, { css } from "styled-components/macro";
import { ReactComponent as Right } from "../../assets/svg/monthRight.svg";
import { ReactComponent as Left } from "../../assets/svg/monthLeft.svg";
import DayPicker, { DateUtils } from "react-day-picker";
import DayPickerInput from "react-day-picker/DayPickerInput";
import useOnClickOutside from "../../hooks/useOutsideHook";
import moment from "moment";
import "moment/locale/ru";
import "react-day-picker/lib/style.css";
moment.locale("ru");

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

const WEEKDAYS_SHORT = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

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

const WEEKDAYS_LONG = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];

export const InputDay = () => {
  const [show, setShow] = useState(false);
  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      setShow(false);
    }
  };
  return (
    <div>
      <DateSelect onClick={() => setShow(true)}>
        <Input type="text" placeholder="pfdnhf" readOnly />
      </DateSelect>
      {show && (
        <div onClick={handleContainerClick}>
          <CustomDatePicker
            months={MONTHS}
            firstDayOfWeek={1}
            weekdaysLong={WEEKDAYS_LONG}
            weekdaysShort={WEEKDAYS_SHORT}
            navbarElement={<Navbar />}
          />
        </div>
      )}
    </div>
  );
};

export const Calendar = () => {
  const [selectedDay, setSelectedDay] = useState<any>(null);

  const handleDayClick = (day: any, { selected }: any) => {
    console.log("day", day.valueOf());
    console.log("selected", selected);
    setSelectedDay(selected ? undefined : day);
  };

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

  return (
    <CustomDatePicker
      months={MONTHS}
      firstDayOfWeek={1}
      weekdaysLong={WEEKDAYS_LONG}
      weekdaysShort={WEEKDAYS_SHORT}
      navbarElement={<Navbar />}
      selectedDays={selectedDay}
      onDayClick={handleDayClick}
    />
  );
};

const NewInput = (props: any) => {
  const { value, onFocus, onBlur } = props;
  return (
    <MyComp>
      {value ? moment(new Date(value)).format("DD MMMM YYYY") : "Завтра"}
      <input ref={props.ref} onClick={onFocus} onBlur={onBlur} />
    </MyComp>
  );
};

export const CalendarInput = () => {
  return (
    <InputCustom>
      <DayPickerInput
        component={React.forwardRef((props, ref) => (
          <NewInput {...props} innerRef={ref} />
        ))}
        onDayChange={(day: any) => console.log(day)}
        dayPickerProps={{
          firstDayOfWeek: 1,
          months: MONTHS,
          weekdaysShort: WEEKDAYS_SHORT,
          navbarElement: <Navbar />,
        }}
      />
    </InputCustom>
  );
};

export const ModalInput = (props: any) => {
  const { value, onFocus, onBlur } = props;
  return (
    <ModalComp>
      {value ? moment(new Date(value)).format("DD MMMM YYYY") : "sdf"}
      <input ref={props.ref} onClick={onFocus} onBlur={onBlur} />
    </ModalComp>
  );
};

export const ModalCalendarInput = () => {
  return (
    <InputCustom>
      <DayPickerInput
        component={React.forwardRef((props, ref) => (
          <ModalInput {...props} innerRef={ref} />
        ))}
        onDayChange={(day: any) => console.log(day)}
        dayPickerProps={{
          firstDayOfWeek: 1,
          months: MONTHS,
          weekdaysShort: WEEKDAYS_SHORT,
          navbarElement: <Navbar />,
        }}
      />
    </InputCustom>
  );
};

export const TestInput: FC<{ label: string }> = ({ label }) => {
  const [showOpen, setShowOpen] = useState(false);
  const [openDate, setOpenDate] = useState<any>({
    from: undefined,
    to: undefined,
  });

  const ref = useRef(null);

  const handleClickOutside = () => {
    setShowOpen(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  const handleDayClick = (day: Date) => {
    const range = DateUtils.addDayToRange(day, openDate);
    setOpenDate({ from: range.from, to: range.to });
  };

  const modifiers = { start: openDate.from, end: openDate.to };

  return (
    <>
      <RangeInputs ref={ref}>
        <BoxInput onClick={() => setShowOpen(!showOpen)}>
          <DateLabel>{label}</DateLabel>
          <DateInput>
            <span>
              {openDate.from ? moment(openDate.from).format("DD.MM.YY") : ""}
            </span>
            <span>
              {openDate.to ? `-${moment(openDate.to).format("DD.MM.YY")} ` : ""}
            </span>
          </DateInput>
        </BoxInput>

        {showOpen && (
          <CustomDatePicker
            selectedDays={[openDate.from, openDate]}
            months={MONTHS}
            onDayClick={handleDayClick}
            firstDayOfWeek={1}
            modifiers={modifiers}
            weekdaysLong={WEEKDAYS_LONG}
            weekdaysShort={WEEKDAYS_SHORT}
            navbarElement={<Navbar />}
          />
        )}
      </RangeInputs>
    </>
  );
};

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
  width: 100%;
  border-radius: 0;
  border-bottom: 1px solid rgba(66, 139, 202, 0.2);
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

const DatePickerContainer = styled.div`
  background: white;
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
    @media (max-width: 576px) {
      right: 0px;
      top: calc(100% - 12px);
    }
  }
`;

const DateInput = styled.div`
  border: 1px solid rgba(86, 101, 127, 0.3);
  box-sizing: border-box;
  border-radius: 2px;
  width: 133px;
  height: 40px;
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.1px;
  color: #515172;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 576px) {
    width: 100%;
    margin-bottom: 12px;
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
