import React, { FC, Fragment, useMemo, useState } from 'react';
import { Modal } from '../../../../../components/ModalAnimated';
import { Button } from '../../../../../components/Button/V2/Button';
import { Dropdown } from '../../../components/Dropdown';
import * as S from './S.el';
import { Space, Text, Title } from '../../../components/ui';
import { Back } from '../../../components/Back';
import { OrderType } from '../../../../../types/orders';
import { Balance } from '../../../../../types/balance';
import { FiatKind } from '../../../../../types/fiat';
import { Checkbox } from '../../../components/Checkbox';

type Props = {
  onClose: () => void;
  open: boolean;
  onAccept: () => void; 
  onResetFilters: () => void;
  activeType: OrderType;
  setActiveType: (type: OrderType) => void;

  selectedRate: string;
  setSelectedRate: (rate: string) => void;
  rates: string[];

  selectedBalanceKind: string | null;
  setSelectedBalanceKind: (val: string | null) => void;
  selectedFiatKind: string | null;
  setSelectedFiatKind: (val: string | null) => void;

  selectedPaymentMethods: number[];
  setSelectedPaymentMethods: (val: any[]) => void;
  methodsList: any[];
};

export const AdvertFiltersMobile: FC<Props> = ({
  onClose,
  open,
  onAccept,
  onResetFilters,
  activeType,
  setActiveType,

  selectedRate,
  setSelectedRate,
  rates,

  selectedBalanceKind,
  setSelectedBalanceKind,
  selectedFiatKind,
  setSelectedFiatKind,

  selectedPaymentMethods,
  setSelectedPaymentMethods,
  methodsList,
}: Props) => {
  const [selectedType, setSelectedType] = useState<OrderType>(activeType);

  const typeOptions = useMemo(() => {
    return [
      {label: 'Покупка', value: OrderType.Buy},
      {label: 'Продажа', value: OrderType.Sell},
    ];
  }, []);

   // Get Balance Kinds List as an Array
   const balanceKinds = useMemo<string[]>(() => {
    // @ts-ignore: Unreachable code error
    const list: string[] = Object.values(Balance).filter(i => typeof i === 'string');
    return list;
  }, [Balance]);

  // Get Fiat Kinds List as an Array
  const fiatKinds = useMemo<string[]>(() => {
      // @ts-ignore: Unreachable code error
      const list: string[] = Object.values(FiatKind).filter(i => typeof i === 'string');
      return list;
  }, [Balance]);

  const bl: any[] = [
    "Na", "FUTURE4", "FUTURE5", "FUTURE6", "MGCWD", "GCWD", "DIAMOND", "CROWD_BTC", "CWDBONUS", 
    "CARBONE", "BRONZE", "MCENT", "PRIDE", "CROWD", "SILVER", "ALTER", "SILVER_I3700820", "SILVER_I61900820",
    "SILVER_I3100INF", "SILVER_I12150820", "CARBON", "PLATINUM", "MG621P600", "D621P6000", "G621P25000",
    "CWDPOLIS", "CWDHOME", "INDEX", "INDEX_SHARE", "INDEX_CWD", "MG721P7500", "FF15", "FF14", "FF13",
    "FF12", "FF11", "FF10", "FF9", "FF8", "FF7", "FF5", "GF6", "GF5", "UGLTEST", "GARANT", "MG921P18000",
    "D721P25000", "D921P60000", "G721P42000", "G921P64000", "MG821P15000", "INDEX_MSHARE", "D821P50000", "FF6"
  ];

  const handleCheckboxChange = (value: number) => {
    if(selectedPaymentMethods.includes(value)) {
      setSelectedPaymentMethods([...selectedPaymentMethods].filter(ind => ind !== value));
    } else {
      setSelectedPaymentMethods([...selectedPaymentMethods, value]);
    };
  };

  const handleAccept = () => {
    setActiveType(selectedType);
    // 
    onAccept();
    onClose();
  };
  return (
    <>
      {open && (
        <Modal open={open} onClose={onClose}>
          <S.MobileWrapper>
            <S.MobileHeader>
              <Back text="Назад" onGoBackClick={onClose} />
              <Title mB={0} mbMobile={0} heading2> 
                Фильтрация ордеров
              </Title>
            </S.MobileHeader>
            <S.MobileContent>
              {/* Type */}
              <S.Container wFull>
                  <Text textInMobileFilter>
                    Направление ордеров:
                  </Text>
                  <S.DropdonwConatainer big>
                    <Dropdown
                      selectedOption={typeOptions.find(t => t.value === selectedType)?.label || 'Покупка'}
                      setSelectedOption={(label) => setSelectedType(typeOptions.find(t => t.label === label)?.value || OrderType.Buy)}
                      options={typeOptions.map(it => it.label)}
                    />
                  </S.DropdonwConatainer>
              </S.Container>

              {/* Currency Pair */}

              <S.Container wFull>
                  <Text textInMobileFilter>
                    Валютная пара:
                  </Text>
                  <S.DropdonwConatainer>
                    <Dropdown
                      label="Все валюты предложения"
                      selectedOption={selectedBalanceKind}
                      setSelectedOption={(val) => setSelectedBalanceKind(val === 'Не выбрано' ? null : val)}
                      options={["Не выбрано", ...balanceKinds.filter(item => !bl.includes(item))]}
                    />
                  </S.DropdonwConatainer>
                  <S.DropdonwConatainer big>
                    <Dropdown
                      label="Все валюты спроса"
                      selectedOption={selectedFiatKind}
                      setSelectedOption={val => setSelectedFiatKind(val === 'Не выбрано' ? null : val)}
                      options={['Не выбрано', ...fiatKinds]}
                    />
                  </S.DropdonwConatainer>
              </S.Container>

              {/* Rate */}
              <S.Container wFull>
                  <Text textInMobileFilter>
                    Выбор рейтинга:
                  </Text>
                  <S.DropdonwConatainer big>
                    <Dropdown
                      selectedOption={selectedRate}
                      setSelectedOption={setSelectedRate}
                      options={rates}
                    />
                  </S.DropdonwConatainer>
              </S.Container>

              {/* Payment Methods */}
              <S.Container wFull>
                  <Text textInMobileFilter style={{ marginBottom: "20px" }}>
                    Методы оплаты:
                  </Text>
                  <>
                    {
                      [...methodsList].reverse().map((method, i) => (
                        i !== 2
                        ?
                          <S.DropdonwConatainer big key={`payment-item-${i}`}>
                            <Checkbox 
                              dis={false}
                              checked={selectedPaymentMethods.includes(method.value)}
                              onChange={() => handleCheckboxChange(method.value)}
                            >
                              <S.Label active={selectedPaymentMethods.includes(method.value)} dis={false}>
                                {method.label}
                              </S.Label>
                            </Checkbox>
                          </S.DropdonwConatainer>
                        :
                          <>
                            <S.DropdonwConatainer big key={`payment-item-${i}`}>
                              <Checkbox 
                                dis={false}
                                checked={selectedPaymentMethods.includes(method.value)}
                                onChange={() => handleCheckboxChange(method.value)}
                              >
                                <S.Label active={selectedPaymentMethods.includes(method.value)} dis={false}>
                                  {method.label}
                                </S.Label>
                              </Checkbox>
                            </S.DropdonwConatainer>

                            <S.DropdonwConatainer big key={`payment-item-${i}`}>
                              <S.Hr />
                            </S.DropdonwConatainer>
                        </>
                      ))
                    }
                  </>
              </S.Container>

              <Space column gap={20}>
                <Button bigSize fullWidth primary onClick={handleAccept}>
                  Применить
                </Button>

                <Button bigSize fullWidth outlinePrimary onClick={onResetFilters}>
                  Очистить фильтр
                </Button>
              </Space>
            </S.MobileContent>
          </S.MobileWrapper>
        </Modal>
      )}
    </>
  );
};
{/* <S.Container>
            <S.Title>Выбор рейтинга</S.Title>
            <S.DropdonwConatainer big>
              <Dropdown
                selectedOption={selectedRate}
                setSelectedOption={setSelectedRate}
                options={rates}
              />
            </S.DropdonwConatainer>
            <Button bigSize fullWidth primary onClick={onAccept}>
              Применить
            </Button>
          </S.Container> */}