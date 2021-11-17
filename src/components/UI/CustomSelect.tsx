import { FC, useState } from "react";
import 'moment/locale/ru';
import styled from "styled-components/macro";
import Scrollbars from "react-custom-scrollbars";
import { ReactComponent as Arrow } from '../../assets/svg/selArrow.svg';

type CustomSelectType = {
    data: any[];
    onSwitch: (value: string) => void;
    defaultValue?: string;
};

export const CustomSelect: FC<CustomSelectType> = ({ data, onSwitch, defaultValue }: CustomSelectType) => {
    const [value, setValue] = useState<string | undefined>();
    const [activeSwitch, setActiveSwitch] = useState<boolean>(false);
  
    const hideList = () => {
      setActiveSwitch(!activeSwitch);
    };
  
    const getSwitch = (e: any) => {
      hideList();
      onSwitch(e.target.dataset.value);
      setValue(e.target.dataset.value);
    };

    return (
      <Field onClick={hideList} rotate={activeSwitch}>
        <Arrow className="arrow" />
        {value ? value : data[0]}
        <FieldList block={activeSwitch}>
          <Scrollbars className="pagination">
            {data &&
              data.map((item, idx) => (
                <FieldListItem key={idx} data-value={item} onClick={getSwitch}>
                    {item}                  
                </FieldListItem>
              ))}
          </Scrollbars>
        </FieldList>
      </Field>
    );
};

const Field = styled.div<{ rotate?: boolean }>`
  width: 100%;
  border: 1px solid #edf0f6;
  border-radius: 4px;
  height: 40px;
  cursor: pointer;
  background: #f9fafb;
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
    right: 17px;
    transform: ${({ rotate }) => `rotate(${rotate ? '90' : '0'}deg)`};
    transition: 0.5s;
  }
`;

const FieldList = styled.div<{ block: boolean }>`
  width: 100%;
  height: 90px;
  background: #f9fafb;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  position: absolute;
  z-index: 9999;
  border: 1px solid #edf0f6;
  border-top: 0px;
  left: -1px;
  margin: 0;
  margin-top: 128px;
  overflow-y: hidden;
  display: ${({ block }) => (block ? 'block' : 'none')};
  @media (max-width: 768px) {
    min-width: auto;
  }
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
    background: #edf0f6;
  }
`;