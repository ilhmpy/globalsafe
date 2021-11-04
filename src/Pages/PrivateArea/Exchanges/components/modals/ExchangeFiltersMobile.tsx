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
import { AnyNaptrRecord } from 'dns';
import { setSourceMapRange } from 'typescript';

type ExchangeFiltersMobileProps = {
    open: boolean;
    onClose: () => void;

    selectedBalanceKind: any; 
    setSelectedBalanceKind: (val: any) => void;

    selectedFiatKind: any;
    setSelectedFiatKind: (val: any) => void;

    selectedStatus: any[];
    setSelectedStatus: (val: any[]) => void;

    selectedPaymentMethods: any[];
    setSelectedPaymentMethods: (val: any[]) => void;

    statuts: Object[];
    methodsList: Object[];

    handleAccept: () => void;
    resetFilters: () => void;
};
   
export const ExchangeFiltersMobile: FC<ExchangeFiltersMobileProps> = ({ 
    open, onClose,
    
    selectedBalanceKind, setSelectedBalanceKind,
    selectedFiatKind, setSelectedFiatKind,
    
    selectedStatus, setSelectedStatus,
    
    statuts, methodsList,
    selectedPaymentMethods, setSelectedPaymentMethods,
    
    handleAccept, resetFilters
}: ExchangeFiltersMobileProps) => {
    const bl: any[] = [
        "Na", "FUTURE4", "FUTURE5", "FUTURE6", "MGCWD", "GCWD", "DIAMOND", "CROWD_BTC", "CWDBONUS", 
        "CARBONE", "BRONZE", "MCENT", "PRIDE", "CROWD", "SILVER", "ALTER", "SILVER_I3700820", "SILVER_I61900820",
        "SILVER_I3100INF", "SILVER_I12150820", "CARBON", "PLATINUM", "MG621P600", "D621P6000", "G621P25000",
        "CWDPOLIS", "CWDHOME", "INDEX", "INDEX_SHARE", "INDEX_CWD", "MG721P7500", "FF15", "FF14", "FF13",
        "FF12", "FF11", "FF10", "FF9", "FF8", "FF7", "FF5", "GF6", "GF5", "UGLTEST", "GARANT", "MG921P18000",
        "D721P25000", "D921P60000", "G721P42000", "G921P64000", "MG821P15000", "INDEX_MSHARE", "D821P50000", "FF6"
      ];

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


    const handleCheckboxChange = (value: number) => {
        if(selectedStatus.includes(value)) {
          setSelectedStatus([...selectedStatus].filter(ind => ind !== value));
        } else {
          setSelectedStatus([...selectedStatus, value]);
        };
      };

    function handleCheckboxPaymentMethods(value: number) {
        if(selectedPaymentMethods.includes(value)) {
            setSelectedPaymentMethods([...selectedPaymentMethods].filter(ind => ind !== value));
          } else {
            setSelectedPaymentMethods([...selectedPaymentMethods, value]);
          };
    };

    function onResetFilters() {
        resetFilters();
        onClose();
    };

    return (
        <>
            <Modal open={open} onClose={onClose}>
                <S.MobileWrapper>
                    <S.MobileHeader>
                        <Back text="Назад" onGoBackClick={onClose} />
                        <Title mB={0} mbMobile={0} heading2> 
                            Фильтрация моих обменов
                        </Title>
                    </S.MobileHeader>
                    <S.MobileContent>
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

                        <S.Container wFull>
                  <Text textInMobileFilter style={{ marginBottom: "20px" }}>
                    Методы оплаты:
                  </Text>
                  <>
                    {
                      [...methodsList].reverse().map((method: any, i) => (
                        i !== 2
                        ?
                          <S.DropdonwConatainer big key={`payment-item-${i}`}>
                            <Checkbox 
                              dis={false}
                              checked={selectedPaymentMethods.includes(method.kind)}
                              onChange={() => handleCheckboxPaymentMethods(method.kind)}
                            >
                              <S.Label active={selectedPaymentMethods.includes(method.kind)} dis={false}>
                                {method.methodName}
                              </S.Label>
                            </Checkbox>
                          </S.DropdonwConatainer>
                        :
                          <>
                            <S.DropdonwConatainer big key={`payment-item-${i}`}>
                              <Checkbox 
                                dis={false}
                                checked={selectedPaymentMethods.includes(method.kind)}
                                onChange={() => handleCheckboxPaymentMethods(method.kind)}
                              >
                                <S.Label active={selectedPaymentMethods.includes(method.kind)} dis={false}>
                                  {method.methodName}
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
              <S.Container wFull>
                <Text textInMobileFilter style={{ marginBottom: "20px" }}>
                    Статусы обменов:
                </Text>
                <>
                   {
                    [...statuts].reverse().map((method: any, i) => (
                        i !== 2
                        ?
                            <S.DropdonwConatainer big key={`payment-item-${i}`}>
                                <Checkbox 
                                    dis={false}
                                    checked={selectedStatus.includes(method.kind)}
                                    onChange={() => handleCheckboxChange(method.kind)}
                                >
                                    <S.Label active={selectedStatus.includes(method.kind)} dis={false}>
                                        {method.methodName}
                                    </S.Label>
                                </Checkbox>
                                </S.DropdonwConatainer>
                                    :
                                    <>
                                        <S.DropdonwConatainer big key={`payment-item-${i}`}>
                                        <Checkbox 
                                            dis={false}
                                            checked={selectedStatus.includes(method.kind)}
                                            onChange={() => handleCheckboxChange(method.kind)}
                                        >
                                            <S.Label active={selectedStatus.includes(method.kind)} dis={false}>
                                                {method.methodName}
                                            </S.Label>
                                        </Checkbox>
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
        </>
    );
};