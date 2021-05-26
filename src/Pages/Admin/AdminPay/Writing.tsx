import React, { useState, FC, useContext, useEffect } from "react";
import * as Styled from "../Styled.elements";
import { DateInput } from "../../../components/UI/DatePicker";
import { SliderComponent } from "../../../components/Slider/Slider";
import { FakeInput } from "../../../components/UI/FakeInput";
import { Button } from "../../../components/Button/Button";
import { AppContext } from "../../../context/HubContext";
import { CollectionGetDraw } from "../../../types/lottery";
import { useTranslation } from "react-i18next";
import moment from "moment";

type Props = {
  data: CollectionGetDraw;
  drawListEdited: (item: CollectionGetDraw) => void;
};

export const Writing: FC<Props> = ({ data, drawListEdited }) => {
  const [sliderValue, setSliderValue] = useState(data.delay || 0);
  const [startDate, setStartDate] = useState<Date | null>(
    data.startDate ? new Date(data.startDate + "Z") : null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    data.nextDraw ? new Date(data.nextDraw + "Z") : null
  );
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const { t } = useTranslation();
  const modyfyDrawState = (
    value: number | null,
    endDate: string | Date | null,
    state: number | null
  ) => {
    if (hubConnection) {
      hubConnection
        .invoke(
          "ModyfyDrawAsync",
          data.safeId,
          state ? state : data.state,
          value ? value : sliderValue,
          endDate ? moment.utc(endDate) : endDate
        )
        .then((res) => {
          console.log("ModyfyDrawAsync", res);
          drawListEdited(res);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const onAfterChange = (value: number) => {
    setSliderValue(value);
    const time: any = moment(startDate).add(sliderValue, "hours");
    setEndDate(time._d);
    modyfyDrawState(value, null, null);
  };

  const changeDate = (next: Date | null) => {
    setEndDate(next);
    modyfyDrawState(null, next, null);
  };

  const cancelLottery = () => {
    modyfyDrawState(null, null, 2);
  };

  return (
    <>
      {data.state !== 2 ? (
        <Styled.SelectContainerLottery>
          {/* <Styled.SliderContainerInner> */}
          <Styled.InputLottery>
            <DateInput
              startDate={startDate}
              setStartDate={setStartDate}
              label={t("writting.startDate")}
              readOnly
            />
          </Styled.InputLottery>
          <Styled.InputLottery>
            <FakeInput hours={sliderValue} label={t("writting.repeat")} />
          </Styled.InputLottery>
          <Styled.SliderWrap>
            <SliderComponent
              value={sliderValue}
              onAfterChange={onAfterChange}
            />
          </Styled.SliderWrap>
          <Styled.InputLottery>
            <DateInput
              startDate={endDate}
              setStartDate={changeDate}
              label={t("writting.next")}
            />
          </Styled.InputLottery>
          {/* </Styled.SliderContainerInner> */}
          <Styled.InputLottery mrn>
            <Button dangerOutline onClick={cancelLottery}>
              {t("writting.cancel")}
            </Button>
          </Styled.InputLottery>
        </Styled.SelectContainerLottery>
      ) : (
        ""
      )}
    </>
  );
};
