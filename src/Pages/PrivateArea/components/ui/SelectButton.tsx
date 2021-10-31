import { FC, useState } from "react";
import styled from "styled-components/macro";
import { ReactComponent as Arrow } from '../../../../assets/v2/svg/whiteArrow.svg';

interface ViewSelectButtonsModel {
    text: string;
    onClick: () => void;
};

type SelectButtonProps = {
    buttons: ViewSelectButtonsModel[];
};

export const SelectButton: FC<SelectButtonProps> = ({ buttons }) => {
    const [anim, setAnim] = useState<boolean>(false);
    return (
        <SelectContainer>
            <Select onClick={() => setAnim(!anim)}>
                Действия с балансами <Arrow />
            </Select>
            <SelectList when={anim}>
                {buttons.map((button, idx) => (
                    <SelectBtn key={idx} onClick={button.onClick}>
                        {button.text}
                    </SelectBtn>
                ))}
            </SelectList>
        </SelectContainer>
    );
};

const Select = styled.div`
    height: 38px;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    position: relative;
    & > svg {
        position: absolute;
        right: 18px;
    }
`;

const SelectContainer = styled.div`
    width: 80%;
    max-width: 214px;
    position: relative;
    & > div {
        background: #515172;
        border-radius: 4px;
    }
`;

const SelectList = styled.div<{ when: boolean; }>`
    width: 100%;
    margin-top: 1px;
    position: absolute;
    transition: 0.5s;
    height: ${({ when }) => when ? "114px" : "0px"};
    background: #515172;
    z-index: 999;
    padding: 0px 20px;
    overflow-y: hidden; 
`;

const SelectBtn = styled.div`
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    height: 38px;
    padding: 11px 0px;
    line-height: 16px;
    border-bottom: 1px solid #757595;
    &:last-child {
        border-bottom: 0px;
    }
`;