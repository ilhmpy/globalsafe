import React, { FC } from 'react';
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
  onAccept: () => void;
  onResetFilters: () => void;

  selectedPaymentMethods: number[];
  setSelectedPaymentMethods: (val: any[]) => void;
  methodsList: any[];
};

export const MobileFiltersModal: FC<Props> = ({
  onClose,
  open,
  onAccept,
  onResetFilters,

  selectedPaymentMethods,
  setSelectedPaymentMethods,
  methodsList,
}: Props) => {
  const handleCheckboxChange = (value: number) => {
    if (selectedPaymentMethods.includes(value)) {
      setSelectedPaymentMethods([...selectedPaymentMethods].filter((ind) => ind !== value));
    } else {
      setSelectedPaymentMethods([...selectedPaymentMethods, value]);
    }
  };

  const handleAccept = () => {
    onAccept();
    onClose();
  };

  return (
    <>
      {open && (
        <Modal open={open} onClose={onClose}>
          <MobileWrapper>
            <MobileHeader>
              <Back text="Назад" onGoBackClick={onClose} />
              <Title mB={0} mbMobile={0} heading2>
                Фильтрация по типу
              </Title>
            </MobileHeader>
            <MobileContent>
              {/* Payment Methods */}
              <Container wFull>
                <Text textInMobileFilter style={{ marginBottom: '20px' }}>
                  Методы оплаты:
                </Text>
                <>
                  {[...methodsList].reverse().map((method, i) =>
                    i !== 2 ? (
                      <DropdonwConatainer big key={`payment-item-${i}`}>
                        <Checkbox
                          dis={false}
                          checked={selectedPaymentMethods.includes(method.value)}
                          onChange={() => handleCheckboxChange(method.value)}
                        >
                          <Label active={selectedPaymentMethods.includes(method.value)} dis={false}>
                            {method.label}
                          </Label>
                        </Checkbox>
                      </DropdonwConatainer>
                    ) : (
                      <>
                        <DropdonwConatainer big key={`payment-item-${i}`}>
                          <Checkbox
                            dis={false}
                            checked={selectedPaymentMethods.includes(method.value)}
                            onChange={() => handleCheckboxChange(method.value)}
                          >
                            <Label
                              active={selectedPaymentMethods.includes(method.value)}
                              dis={false}
                            >
                              {method.label}
                            </Label>
                          </Checkbox>
                        </DropdonwConatainer>

                        <DropdonwConatainer big key={`payment-item-${i}`}>
                          <Hr />
                        </DropdonwConatainer>
                      </>
                    )
                  )}
                </>
              </Container>

              <Space column gap={20}>
                <Button bigSize fullWidth primary onClick={handleAccept}>
                  Применить
                </Button>

                <Button bigSize fullWidth outlinePrimary onClick={onResetFilters}>
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
