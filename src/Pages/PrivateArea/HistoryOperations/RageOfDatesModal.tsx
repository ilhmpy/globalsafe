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
};

export const RageOfDatesModal: FC<RageOfDatesModalProps> = ({ onClose, open }: RageOfDatesModalProps) => {
    const [selectType, setSelectType] = useState<string>("Последний месяц");
    const [datesForSelect, setDatesForSelect] = useState<Date[]>([]);
    const { account } = useContext(AppContext);
    function onSwitch(val: string) {
        setSelectType(val);
    };
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
    function onAccept() {
        return;
    };
    useEffect(() => {
        const creationDate = new Date(account.creationDate);
        const now = new Date();
        let months: any[] = [];
        for (let i = creationDate.getFullYear(); i <= now.getFullYear(); i++) {
            for (let s = creationDate.getMonth(); s <= (i === now.getFullYear() ? now.getMonth() : 12); s++) {
                const date = new Date(i, s, 1);
                months = [...months, date];
            };
        };
        console.log(months);
        setDatesForSelect(months);
    }, [account]);

    const [listSelectType, setListSelectType] = useState<boolean>(false);   
    const [listSelectDateStart, setListSelectDateStart] = useState<boolean>(false);
    const [listSelectDateEnd, setListSelectDateEnd] = useState<boolean>(false);
    
    const [listItemDateStart, setListItemDateStart] = useState<Date>();
    const [listItemDateEnd, setListItemDateEnd] = useState<Date>();

    const [typeSelect, setTypeSelect] = useState<any[]>(["Последний месяц", "Диапазон"]);

    function getMonth(date: Date) {
        const data = new Date(date);
        return `${months[data.getMonth()]} ${data.getFullYear()}`;
    };

    return ( 
        <>
          {open && 
            <Modal onClose={onClose}>
                <H3 center modalTitle>Период операций</H3>
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
                                 getMonth(listItemDateStart) : getMonth(datesForSelect[0])}
                            hideList={() => setListSelectDateStart(!listSelectDateStart)}
                        >
                           {datesForSelect.map((i, idx) => (
                               <FieldListItem key={idx} onClick={() => setListItemDateStart(i)}>
                                   {getMonth(i)}
                                </FieldListItem>
                            ))}
                       </Select>
                       <Select
                          listOpen={listSelectDateEnd}
                          defaultDesc={
                              listItemDateEnd ?
                              getMonth(listItemDateEnd) : getMonth(datesForSelect[datesForSelect.length - 1])
                          }
                          hideList={() => setListSelectDateEnd(!listSelectDateEnd)}
                        >
                            {datesForSelect.map((i, idx) => (
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