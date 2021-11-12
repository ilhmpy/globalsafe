import React, { FC, useState } from 'react';
import styled, { css } from 'styled-components/macro';
import { Button } from '../../../components/Button/V2/Button';
import { Modal } from '../../../components/ModalAnimated';
import { Back } from '../components/Back';
import { Checkbox } from '../components/Checkbox';
import { Space, Text, Title } from '../components/ui';
import { Device } from '../consts';

type Props = {
  onClose: () => void;
  open: boolean;
  methodsList: any[];
  allCurrency: boolean;
  setAllCurrency: (val: boolean) => void;
  nowMonth: boolean;
  setNowMonth: (val: boolean) => void;
};

export const MobileFiltersModal: FC<Props> = ({
  onClose,
  open,
  methodsList,
  allCurrency,
  setAllCurrency,
  nowMonth,
  setNowMonth,
}: Props) => {
  const [allCurrencyLocal, setAllCurrencyLocal] = useState<boolean>(allCurrency);
  const [nowMonthLocal, setNowMonthLocal] = useState<boolean>(nowMonth);

  const handleAccept = () => {
    setAllCurrency(allCurrencyLocal);
    setNowMonth(nowMonthLocal);
    onClose();
  };

  const resetFilters = () => {
    setNowMonth(false);
    setAllCurrency(false);
  };

  return (
    <>
      {open && (
        <Modal open={open} onClose={onClose}>
          <MobileWrapper>
            <MobileHeader>
              <Back text="Назад" onGoBackClick={onClose} />
              <Title mB={0} mbMobile={0} heading2>
                Фильтрация
              </Title>
            </MobileHeader>
            <MobileContent>
              <Container wFull>
                <Text textInMobileFilter style={{ marginBottom: '20px' }}>
                  Параметры:
                </Text>
                <>
                  <DropdonwConatainer big>
                    <Checkbox
                      dis={false}
                      checked={nowMonthLocal}
                      onChange={() => setNowMonthLocal(!nowMonthLocal)}
                    >
                      <Label active={nowMonthLocal} dis={false}>
                        {methodsList[0].label}
                      </Label>
                    </Checkbox>
                  </DropdonwConatainer>

                  <DropdonwConatainer big>
                    <Checkbox
                      dis={false}
                      checked={allCurrencyLocal}
                      onChange={() => setAllCurrencyLocal(!allCurrencyLocal)}
                    >
                      <Label active={allCurrencyLocal} dis={false}>
                        {methodsList[1].label}
                      </Label>
                    </Checkbox>
                  </DropdonwConatainer>
                </>
              </Container>

              <Space column gap={20}>
                <Button bigSize fullWidth primary onClick={handleAccept}>
                  Применить
                </Button>

                <Button bigSize fullWidth outlinePrimary onClick={resetFilters}>
                  Очистить фильтр
                </Button>
              </Space>
            </MobileContent>
          </MobileWrapper>
        </Modal>
      )}
    </>
  );
};

export const Container = styled.div<{ wFull?: boolean; mobileWFull?: boolean }>`
  width: ${(props) => (props.wFull ? '100%' : '338px')};
  background: #fff;

  @media ${Device.mobile} {
    ${(props) =>
      props.mobileWFull !== undefined &&
      css`
        width: 100%;
      `};
  } ;
`;

export const DropdonwConatainer = styled.div<{ big?: boolean }>`
  margin-bottom: ${(props) => (props.big ? 20 : 10)}px;
`;

export const Label = styled.div<{ active?: boolean; dis?: boolean }>`
  font-size: 14px;
  line-height: 20px;
  margin-left: 10px;
  color: ${(props) => (props.active ? '#0094FF' : props.dis ? 'rgba(0, 0, 0, 0.2)' : '#000')};
`;

export const Hr = styled.hr`
  background: #ebebf2;
  width: 100%;
  height: 1px;
`;

export const MobileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const MobileHeader = styled.div`
  padding: 20px;
`;

export const MobileContent = styled.div`
  display: flex;
  flex-direction: column;
  @media ${Device.mobile} {
    background: #ffffff;
    box-shadow: 0px 40px 40px -40px rgba(220, 220, 232, 0.5);
    padding: 20px;
  }
`;
