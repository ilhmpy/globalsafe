import styled from 'styled-components/macro';
import { FC, useState } from "react";
import { ReactComponent as Arrow } from "../../assets/svg/selArrow.svg";
import { Scrollbars } from 'react-custom-scrollbars';
import { BalanceList, Balance } from "../../types/balance";
import moment from 'moment';
import 'moment/locale/ru';

type SelectType = {
  data: BalanceList[] | null;
  setSwitch: (value: string) => void;
  withoutVolume?: boolean;
};

export const Select: FC<SelectType> = ({ data, setSwitch, withoutVolume }: SelectType) => {
    const [value, setValue] = useState<string | undefined>();
    const [activeSwitch, setActiveSwitch] = useState<boolean>(false);

    const hideList = () => {
       setActiveSwitch(!activeSwitch)
    };

    const getSwitch = (e: any) => {
        hideList();
        setValue(Balance[e.target.dataset.curr]);
        setSwitch(Balance[e.target.dataset.curr]);
    };

    return (
      <Field onClick={hideList}>
          <Arrow className="arrow" />
          {value ? value : ( "Валюта не выбрана" )}
          <FieldList block={activeSwitch}>
            <Scrollbars className="pagination">
                {data && data.map((item, idx) => (
                    <FieldListItem 
                        key={idx} 
                        data-curr={item.balanceKind} 
                        onClick={getSwitch}
                    >
                        {Balance[item.balanceKind]}{!withoutVolume && ` - ${(
                                item.balanceKind === 1 ? 
                                item.volume / 100000 : 
                                item.balanceKind === 43 ?
                                item.volume / 10000 : 
                                item.balanceKind === 59 ? 
                                item.volume / 100 : item.volume).toLocaleString("ru-RU", { maximumFractionDigits: 5 })}`}
                    </FieldListItem>
                ))}
            </Scrollbars>
          </FieldList>
      </Field>
    );
};

const Field = styled.div` 
    width: 100%;
    border: 1px solid #EDF0F6;
    border-radius: 4px;
    height: 40px;
    cursor: pointer;
    background: #F9FAFB;
    display: flex;
    align-items: center;
    padding: 12px;
    position: relative;
    color: #000;
    font-size: 14px;
    line-height: 16px;
    font-weight: 400;
    user-select: none;
    margin-bottom: 10px;

    & > .arrow {
        position: absolute;
        right: 12px;
    } 
`;

const FieldList = styled.div<{ block: boolean; }>`
    width: 100%;
    height: 90px;
    background: #F9FAFB;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    position: absolute;
    z-index: 9999;
    border: 1px solid #EDF0F6;
    border-top: 0px;
    left: -1px;
    margin: 0;
    margin-top: 128px;
    min-width: 340px;
    overflow-y: hidden;
    display: ${({ block }) => block ? "block" : "none"};
`;

const FieldListItem = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 12px;
    color: #000;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    transition: 0.5s;
    user-select: none;

    &:hover {
        background: #EDF0F6;
    }
`;