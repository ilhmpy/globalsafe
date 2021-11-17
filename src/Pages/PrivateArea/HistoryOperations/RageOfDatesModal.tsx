import { Modal } from "../../../components/Modal/Modal";
import { FC, useState } from "react";
import { H3 } from "../../../components/UI/Heading";
import { CustomSelect as Select } from "../../../components/UI/CustomSelect";
import styled from "styled-components/macro";
import moment from "moment";
import { Button } from '../../../components/Button/V2/Button';

type RageOfDatesModalProps = {
    onClose: () => void;
    open: boolean;
};

export const RageOfDatesModal: FC<RageOfDatesModalProps> = ({ onClose, open }: RageOfDatesModalProps) => {
    const [selectType, setSelectType] = useState<string>("Последний месяц");
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
    return ( 
        <>
          {open && 
            <Modal onClose={onClose}>
                <H3 center modalTitle>Период операций</H3>
                <Select onSwitch={onSwitch} data={["Последний месяц", "Диапазон"]} />
                {selectType === "Последний месяц" && 
                  <Data>{months[moment().month()]} {new Date().getFullYear()}</Data>}
                {selectType === "Диапазон" && 
                    <Rages>
                       <Select onSwitch={() => false} data={[]} />
                       <Select onSwitch={() => false} data={[]} />
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