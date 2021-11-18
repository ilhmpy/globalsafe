import { Modal } from "../../../components/Modal/Modal";
import { FC, useState, useContext, useEffect } from "react";
import { H3 } from "../../../components/UI/Heading";
import { CustomSelect as Select, FieldListItem } from "../../../components/UI/CustomSelect";
import styled from "styled-components/macro";
import moment from "moment";
import { Button } from '../../../components/Button/V2/Button';
import { AppContext } from '../../../context/HubContext';

type RageOfDatesModalProps = {
    onClose: () => void;
    open: boolean;
    setStart: (val: Date) => void;
    setEnd: (val: Date) => void;
};

export const RageOfDatesModal: FC<RageOfDatesModalProps> = ({ onClose, open, setEnd, setStart }: RageOfDatesModalProps) => {
    const [selectType, setSelectType] = useState<string>("Последний месяц");
    const [datesForSelect, setDatesForSelect] = useState<Date[]>([]);
    const [listSelectType, setListSelectType] = useState<boolean>(false);   
    const [listSelectDateStart, setListSelectDateStart] = useState<boolean>(false);
    const [listSelectDateEnd, setListSelectDateEnd] = useState<boolean>(false);
    
    const [listItemDateStart, setListItemDateStart] = useState<Date>();
    const [listItemDateEnd, setListItemDateEnd] = useState<Date>();

    const [typeSelect, setTypeSelect] = useState<any[]>(["Последний месяц", "Диапазон"]);
    const { account } = useContext(AppContext);
    const [startMonths, setStartMonths] = useState<Date[]>([]);
    const [endMonths, setEndMonths] = useState<Date[]>([]);
    
    function onSwitch(val: string) {
        setSelectType(val);
    };

    /* 
        Январь - 31 день
        Февраль - 28 дней (29 в високосном)
        Март - 31 день
        Апрель - 30 дней
        Май - 31 день
        Июнь - 30 дней
        Июль - 31 день
        Август - 31 день
        Сентябрь - 30 дней
        Октябрь - 31 день
        Ноябрь - 30 дней
        Декабрь - 31 день
    */

    const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    const months = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
    ];

    function createDatesArray(setDates: (val: Date[]) => void, start = true) {
        const creationDate = new Date(account.creationDate);
        const now = new Date();
        let months: any[] = [];
        for (let i = creationDate.getFullYear(); i <= now.getFullYear(); i++) {
            console.log(i);
            for (let s = creationDate.getMonth(); s <= (i === now.getFullYear() ? now.getMonth() : 12); s++) {
                const date = new Date(i, s, start ? 1 : days[s]);
                months = [...months, date];
            };
        };
        setDates(months);
    };
    
    useEffect(() => {
        createDatesArray(setStartMonths);
        createDatesArray(setEndMonths, false);
    }, [account, listItemDateEnd, listItemDateStart]);

    function getMonth(date: Date) {
        const data = new Date(date);
        return `${months[data.getMonth()]} ${data.getFullYear()}`;
    };

    function onAccept() {
        onClose();
        setStart(listItemDateStart ? listItemDateStart : startMonths[0]);
        setEnd(listItemDateEnd ? listItemDateEnd : endMonths[endMonths.length - 1]);
        setSelectType("Последний месяц");
    };

    /* 
        ИСПРАВИТЬ ДВА БАГА:
        Можно выбрать диапозон - с марта до февраля одного и того же года(и другие подобные)
    */

    return ( 
        <>
          {open && 
            <Modal onClose={onClose}>
                <H3 center modalTitle style={{ marginTop: "0px" }}>Период операций</H3>
                <Select 
                    listOpen={listSelectType} 
                    defaultDesc={selectType ? selectType : typeSelect[0]} 
                    hideList={() => setListSelectType(!listSelectType)}
                >
                 {typeSelect.map((item, idx) => (
                        <FieldListItem key={idx} onClick={() => onSwitch(item)}>
                            {item}      
                        </FieldListItem>
                    ))}
                </Select>
                {selectType === "Последний месяц" && 
                  <Data>{months[moment().month()]} {new Date().getFullYear()}</Data>}
                {selectType === "Диапазон" &&  
                    <Rages>
                        <Select 
                            listOpen={listSelectDateStart} 
                            defaultDesc={
                                 listItemDateStart ?
                                 getMonth(listItemDateStart) : getMonth(startMonths[0])}
                            hideList={() => setListSelectDateStart(!listSelectDateStart)}
                        >
                           {startMonths.map((i, idx) => (
                               <FieldListItem key={idx} onClick={() => setListItemDateStart(i)}>
                                   {getMonth(i)}
                                </FieldListItem>
                            ))}
                       </Select>
                       <Select
                          listOpen={listSelectDateEnd}
                          defaultDesc={
                              listItemDateEnd ?
                              getMonth(listItemDateEnd) : getMonth(endMonths[endMonths.length - 1])
                          }
                          hideList={() => setListSelectDateEnd(!listSelectDateEnd)}
                        >
                            {endMonths.map((i, idx) => (
                               <FieldListItem key={idx} onClick={() => setListItemDateEnd(i)}>
                                   {getMonth(i)}
                                </FieldListItem>
                            ))}
                       </Select>
                    </Rages>}
                <Button primary onClick={onAccept}>Применить</Button>
            </Modal>}
        </>
    );
};

export const Data = styled.div`
  width: 100%;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #EDF0F6;
  background: #F9FAFB;
  margin: 0 auto;
  color: #000;
  font-weight: 400;
  font-size: 14px;
  padding: 12px;
  margin-bottom: 20px;
`;

export const Rages = styled.div`
    width: 100%;
    display: flex;
    margin-bottom: 20px;
    & > div {
        width: 50%;
        margin-right: 20px;
        &:last-child {
            margin-right: 0px;
        }
    }
`;