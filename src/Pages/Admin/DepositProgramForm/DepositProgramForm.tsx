import { HubConnectionState } from '@microsoft/signalr';
import { FC, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ReactComponent as CircleOk } from '../../../assets/svg/circleOk.svg';
import { ReactComponent as Stroke } from '../../../assets/svg/leftStroke.svg';
import { Button } from '../../../components/Button/Button';
import { Modal } from '../../../components/Modal/Modal';
import { Select } from '../../../components/Select/Select3';
import { Switcher } from '../../../components/Switcher';
import { AppContext } from '../../../context/HubContext';
import { BalanceKind } from '../../../enums/balanceKind';
import { defaultFormState } from './helpers';
import { AddDepositModel, DepositProgramFormPropsType } from './types';

// eslint-disable-next-line react/prop-types
export const DepositProgramForm: FC<DepositProgramFormPropsType> = ({setOpenNewProgram,chosen,
}) => {
  console.log('chosen', chosen);
  const [checkList, setCheckList] = useState<any>([]);
  const { t } = useTranslation();
  const langList: string[] = ['English', 'Russian'];
  const [language, setLanguage] = useState<string>('');
  const [delayedDepositChecked, setDelayedDepositChecked] = useState(false);
  const [programIsActiveChecked, setProgramIsActiveChecked] = useState(true);
  const [publishingProgramChecked, setPublishingProgramChecked] = useState(false);
  const [startColumn, setStartColumn] = useState(false);
  const [expertColumn, setExpertColumn] = useState(false);
  const [infinityColumn, setInfinityColumn] = useState(false);
  const [isOpenSaveConfirm, setIsOpenSaveConfirm] = useState(false);
  const [isOpenCancelConfirm, setIsOpenCancelConfirm] = useState(false);
  const [isSavingSuccess, setIsSavingSuccess] = useState(false);
  const [isSavingCanceled, setIsSavingCanceled] = useState(false);
  const [isModalError, setIsModalError] = useState(false);

  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const [programList, setProgramList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const depositKindList: string[] = ['Рассчетная', 'Фиксированная'];

  const [storage, setStorage] = useState<AddDepositModel>(chosen ? chosen : defaultFormState);
  const [program, setProgram] = useState<any>(chosen ? chosen : defaultFormState);

  const updateProgram = async () => {
    if (hubConnection) {
      try {
        console.log('updating............');
        const response = await hubConnection.invoke('PatchDeposit', program.id, {
            ...program,
            affiliateRatio: getArr(tableState),
          });
        console.log('updateProgram ~ response', response);
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  async function createProgram() {
    console.log('1111111111~~~~~~~~~~~~~~~~~~start');
    console.log(program);

    if (!hubConnection || hubConnection.state != HubConnectionState.Connected) {
      return;
    }

    setProgramList([]);
    setLoading(true);

    try {
      const res = await hubConnection.invoke<any>('CreateDeposit', {
        ...program,
        affiliateRatio: getArr(tableState),
      });

      console.log('createProgram ~ res', res);
    } catch (err) {
      setIsModalError(true);
      console.log(err);
    }
  }
  type ColumnObjectType = {
    '0': string;
    '1': string;
    '2': string;
    '3': string;
    '4': string;
    '5': string;
    '6': string;
    '7': string;
  };

  type ColumnsObjType = {
    start: ColumnObjectType;
    expert: ColumnObjectType;
    infinity: ColumnObjectType;
  };
  const getObj = (arr: any) => {
    const columnsObj: any = {
      start: { '0': '', '1': '', '2': '', '3': '', '4': '', '5': '', '6': '', '7': '' },
      expert: { '0': '', '1': '', '2': '', '3': '', '4': '', '5': '', '6': '', '7': '' },
      infinity: { '0': '', '1': '', '2': '', '3': '', '4': '', '5': '', '6': '', '7': '' },
    };
console.log(arr);
    arr.length &&
      arr?.forEach((it: any, i: number) => {
        it.forEach((items: number[]) => {
          if (items[0] === 1) columnsObj.start[i] = items[1];
          if (items[0] === 2) columnsObj.expert[i] = items[1];
          if (items[0] === 4) columnsObj.infinity[i] = items[1];
        });
      });

    return columnsObj;
  };

  const getArr = (obj: any) => {
    const affilateArray = [];
    const startArr = Object.values(obj.start);
    const expertArr = Object.values(obj.expert);
    const infinityArr = Object.values(obj.infinity);

    for (let i = 0; i < 8; i++) {
      affilateArray.push([
        [1, startArr[i]],
        [2, expertArr[i]],
        [4, infinityArr[i]],
      ]);
    }

    return affilateArray;
  };

  const [tableState, setTableState] = useState(getObj(program?.affiliateRatio));
  const [tableStateCopy, setTableStateCopy] = useState(getObj(program?.affiliateRatio));
  console.log(chosen);
  return (
    <Container>
      <Header>
        <Stroke onClick={() => setOpenNewProgram(false)} />
        <Title>
          {t(`depositsPrograms.${chosen ? 'editingDepositProgram' : 'creationDepositProgram'}`)}
        </Title>
      </Header>
      <ContentWrapper>
        <Row>
          <InputGroup>
            <Label>{t('depositsPrograms.programName')}</Label>
            <Input
              placeholder="-"
              name="name"
              value={program.name}
              onChange={({ target: { name, value } }) => setProgram({ ...program, [name]: value })}
              onBlur={() => program.name !== storage.name ? setIsOpenCancelConfirm(true) : null}
            />
            <Circle hide={program.name === storage.name} onClick={updateProgram} />
          </InputGroup>
          <InputGroup>
            <Label>{t('depositsPrograms.language')}</Label>
            <Select
              options={langList}
              selectedOption={langList[program.Language]}
              setSelectedOption={(val: string) => {
                setProgram({ ...program, Language: langList.indexOf(val) });
              }}
            />
            <Circle hide={program.Language === storage.Language} onClick={undefined} />
          </InputGroup>
        </Row>

        <Row>
          <InputGroup>
            <Label>{t('depositsPrograms.description')}</Label>
            <Text
              placeholder="-"
              name="description"
              value={program.description}
              onChange={(e) => {
                setProgram({ ...program, description: e.target.value });
              }}
            />
            <Circle hide={program.description === storage.description} txt onClick={undefined} />
          </InputGroup>
        </Row>

        <Row hr>
          <InputGroup>
            <Label>{t('depositsPrograms.currencyDeposit')}</Label>
            <Select
              options={
                Object.keys(BalanceKind)
                  .map((key: any) => BalanceKind[key])
                  .filter((value) => typeof value === 'string') as string[]
              }
              selectedOption={BalanceKind[program.balanceKind]}
              setSelectedOption={(value: any) => {
                console.log(typeof value);
                setProgram({
                  ...program,
                  balanceKind: +BalanceKind[value],
                });
              }}
            />
            <Circle hide={program.balanceKind === storage.balanceKind} onClick={undefined} />
          </InputGroup>

          <Hr />
          <InputGroup disabled={BalanceKind[program.balanceKind] === 'CWD'}>
            <Label>{t('depositsPrograms.exchangeRate')}</Label>
            {program.exchanges.length ? console.log(program.exchanges[0]) : ''}
            <Input
              placeholder="&mdash;"
              CWD
              disabled={BalanceKind[program.balanceKind] === 'CWD'}
              name="exchanges"
              value={program.exchanges.length ? program.exchanges[0].Rate : ''}
              onChange={({ target: { name, value } }) => {
                setProgram({
                  ...program,
                  [name]: [{ assetId: String(program.balanceKind), Rate: +value }],
                });
              }}
            />
            <Circle hide={program.exchanges === storage.exchanges} onClick={undefined} />
          </InputGroup>
        </Row>

        <Row>
          <InputGroup>
            <Label>{t('depositsPrograms.minAmount')}</Label>
            <Input
              placeholder="-"
              name="minAmount"
              value={program.minAmount}
              onChange={({ target: { name, value } }) => {
                setProgram({ ...program, [name]: +value });
              }}
            />
            <Circle hide={program.minAmount === storage.minAmount} onClick={undefined} />
          </InputGroup>
          <InputGroup>
            <Label>{t('depositsPrograms.maxAmount')}</Label>
            <Input
              placeholder="-"
              name="maxAmount"
              value={program.maxAmount}
              onChange={({ target: { name, value } }) => {
                setProgram({ ...program, [name]: +value });
              }}
            />
            <Circle hide={program.maxAmount === storage.maxAmount} onClick={undefined} />
          </InputGroup>
        </Row>

        <Row>
          <InputGroup>
            <Label>{t('depositsPrograms.depositTerm')}</Label>
            <Input
              placeholder="-"
              name="duration"
              value={program.duration}
              onChange={({ target: { name, value } }) => {
                setProgram({ ...program, [name]: +value });
              }}
            />
            <Circle hide={program.duration === storage.duration} onClick={undefined} />
          </InputGroup>
        </Row>

        <Row>
          <InputGroup>
            <Label>{t('depositsPrograms.startPayments')}</Label>
            <Input
              placeholder="-"
              name="paymentsOffset"
              value={program.paymentsOffset}
              onChange={({ target: { name, value } }) => {
                setProgram({ ...program, [name]: +value });
              }}
            />
            <Circle hide={program.paymentsOffset === storage.paymentsOffset} onClick={undefined} />
          </InputGroup>
        </Row>

        <Row>
          <InputGroup>
            <Label>{t('depositsPrograms.paymentInterval')}</Label>
            <Input
              placeholder="-"
              name="paymentsInterval"
              value={program.paymentsInterval}
              onChange={({ target: { name, value } }) => {
                setProgram({ ...program, [name]: +value });
              }}
            />
            <Circle
              hide={program.paymentsInterval === storage.paymentsInterval}
              onClick={undefined}
            />
          </InputGroup>
        </Row>

        <Row>
          <InputGroup>
            <Label>{t('depositsPrograms.paymentsDays')}</Label>
            <Input
              placeholder="-"
              name="paymentsDays"
              value={program.paymentsDays as string}
              onChange={({ target: { name, value } }) => {
                setProgram({ ...program, [name]: value });
              }}
            />
            <Circle hide={program.paymentsDays === storage.paymentsDays} onClick={undefined} />
          </InputGroup>
        </Row>

        <Row hr>
          <InputGroup>
            <Label>{t('depositsPrograms.payment')}</Label>
            <Select
              options={depositKindList}
              selectedOption={depositKindList[program.depositKind]}
              setSelectedOption={(value: string) => {
                console.log(value);
                setProgram({
                  ...program,
                  depositKind: +depositKindList.indexOf(value),
                });
              }}
            />
            <Circle hide={program.depositKind === storage.depositKind} onClick={undefined} />
          </InputGroup>
          <Hr />
          <InputGroup>
            <Label>{t('depositsPrograms.clientYield')}</Label>
            <Input
              placeholder="-"
              name="ratio"
              value={program.ratio}
              onChange={({ target: { name, value } }) => {
                setProgram({ ...program, [name]: +value });
              }}
            />
            <Circle hide={program.ratio === storage.ratio} onClick={undefined} />
          </InputGroup>
        </Row>

        <Row>
          <InputGroup>
            <Label>{t('depositsPrograms.delayedDeposit')}</Label>
            <StatusGroup>
              <Switcher
                checked={program.isInstant}
                onChange={() => {
                  setProgram({ ...program, isInstant: !program.isInstant });
                }}
              />
              <Status checked={program.isInstant}>
                {t(program.isInstant ? 'depositsPrograms.yes' : 'depositsPrograms.no')}
              </Status>
            </StatusGroup>
          </InputGroup>
        </Row>

        <Table>
          <Label>{t('depositsPrograms.affiliateRatio')}</Label>
          <TableBody>
            <ColumnGroup hide={startColumn}>
              <ColumnHead onClick={() => setStartColumn(!startColumn)}>
                <Label>Start</Label>
              </ColumnHead>
              <Row>
                <InputGroup>
                  <Label>1 {t('depositsPrograms.line')}</Label>
                  <Input
                    placeholder="-"
                    value={tableState.start[0]}
                    onChange={({ target: { value } }) =>
                      setTableState({
                        ...tableState,
                        start: {
                          ...tableState.start,
                          '0': +value,
                        },
                      })
                    }
                  />
                  <Circle
                    hide={tableState.start[0] === tableStateCopy.start[0]}
                    tb
                    onClick={undefined}
                  />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <Label>2 {t('depositsPrograms.line')}</Label>
                  <Input
                    placeholder="-"
                    value={tableState.start[1]}
                    onChange={({ target: { value } }) =>
                      setTableState({
                        ...tableState,
                        start: {
                          ...tableState.start,
                          '1': +value,
                        },
                      })
                    }
                  />
                  <Circle
                    hide={tableState.start[1] === tableStateCopy.start[1]}
                    tb
                    onClick={undefined}
                  />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <Label>3 {t('depositsPrograms.line')}</Label>
                  <Input
                    placeholder="-"
                    value={tableState.start[2]}
                    onChange={({ target: { value } }) =>
                      setTableState({
                        ...tableState,
                        start: {
                          ...tableState.start,
                          '2': +value,
                        },
                      })
                    }
                  />
                  <Circle
                    hide={tableState.start[2] === tableStateCopy.start[2]}
                    tb
                    onClick={undefined}
                  />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <Label>4 {t('depositsPrograms.line')}</Label>
                  <Input
                    placeholder="-"
                    value={tableState.start[3]}
                    onChange={({ target: { value } }) =>
                      setTableState({
                        ...tableState,
                        start: {
                          ...tableState.start,
                          '3': +value,
                        },
                      })
                    }
                  />
                  <Circle
                    hide={tableState.start[3] === tableStateCopy.start[3]}
                    tb
                    onClick={undefined}
                  />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <Label>5 {t('depositsPrograms.line')}</Label>
                  <Input
                    placeholder="-"
                    value={tableState.start[4]}
                    onChange={({ target: { value } }) =>
                      setTableState({
                        ...tableState,
                        start: {
                          ...tableState.start,
                          '4': +value,
                        },
                      })
                    }
                  />
                  <Circle
                    hide={tableState.start[4] === tableStateCopy.start[4]}
                    tb
                    onClick={undefined}
                  />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <Label>6 {t('depositsPrograms.line')}</Label>
                  <Input
                    placeholder="-"
                    value={tableState.start[5]}
                    onChange={({ target: { value } }) =>
                      setTableState({
                        ...tableState,
                        start: {
                          ...tableState.start,
                          '5': +value,
                        },
                      })
                    }
                  />
                  <Circle
                    hide={tableState.start[5] === tableStateCopy.start[5]}
                    tb
                    onClick={undefined}
                  />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <Label>7 {t('depositsPrograms.line')}</Label>
                  <Input
                    placeholder="-"
                    value={tableState.start[6]}
                    onChange={({ target: { value } }) =>
                      setTableState({
                        ...tableState,
                        start: {
                          ...tableState.start,
                          '6': +value,
                        },
                      })
                    }
                  />
                  <Circle
                    hide={tableState.start[6] === tableStateCopy.start[6]}
                    tb
                    onClick={undefined}
                  />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <Label>8 {t('depositsPrograms.line')}</Label>
                  <Input
                    placeholder="-"
                    value={tableState.start[7]}
                    onChange={({ target: { value } }) =>
                      setTableState({
                        ...tableState,
                        start: {
                          ...tableState.start,
                          '7': +value,
                        },
                      })
                    }
                  />
                  <Circle
                    hide={tableState.start[7] === tableStateCopy.start[7]}
                    tb
                    onClick={undefined}
                  />
                </InputGroup>
              </Row>
            </ColumnGroup>
            <ColumnGroup labelHide hide={expertColumn}>
              <ColumnHead onClick={() => setExpertColumn(!expertColumn)}>
                <Label>Expert</Label>
              </ColumnHead>

              <Row>
                <InputGroup>
                  <Label>1 {t('depositsPrograms.line')}</Label>
                  <Input
                    placeholder="-"
                    value={tableState.expert[0]}
                    onChange={({ target: { value } }) =>
                      setTableState({
                        ...tableState,
                        expert: {
                          ...tableState.expert,
                          '0': +value,
                        },
                      })
                    }
                  />
                  <Circle
                    hide={tableState.expert[0] === tableStateCopy.expert[0]}
                    tb
                    onClick={undefined}
                  />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <Label>2 {t('depositsPrograms.line')}</Label>
                  <Input
                    placeholder="-"
                    value={tableState.expert[1]}
                    onChange={({ target: { value } }) =>
                      setTableState({
                        ...tableState,
                        expert: {
                          ...tableState.expert,
                          '1': +value,
                        },
                      })
                    }
                  />
                  <Circle
                    hide={tableState.expert[1] === tableStateCopy.expert[1]}
                    tb
                    onClick={undefined}
                  />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <Label>3 {t('depositsPrograms.line')}</Label>
                  <Input
                    placeholder="-"
                    value={tableState.expert[2]}
                    onChange={({ target: { value } }) =>
                      setTableState({
                        ...tableState,
                        expert: {
                          ...tableState.expert,
                          '2': +value,
                        },
                      })
                    }
                  />
                  <Circle
                    hide={tableState.expert[2] === tableStateCopy.expert[2]}
                    tb
                    onClick={undefined}
                  />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <Label>4 {t('depositsPrograms.line')}</Label>
                  <Input
                    placeholder="-"
                    value={tableState.expert[3]}
                    onChange={({ target: { value } }) =>
                      setTableState({
                        ...tableState,
                        expert: {
                          ...tableState.expert,
                          '3': +value,
                        },
                      })
                    }
                  />
                  <Circle
                    hide={tableState.expert[3] === tableStateCopy.expert[3]}
                    tb
                    onClick={undefined}
                  />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <Label>5 {t('depositsPrograms.line')}</Label>
                  <Input
                    placeholder="-"
                    value={tableState.expert[4]}
                    onChange={({ target: { value } }) =>
                      setTableState({
                        ...tableState,
                        expert: {
                          ...tableState.expert,
                          '4': +value,
                        },
                      })
                    }
                  />
                  <Circle
                    hide={tableState.expert[4] === tableStateCopy.expert[4]}
                    tb
                    onClick={undefined}
                  />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <Label>6 {t('depositsPrograms.line')}</Label>
                  <Input
                    placeholder="-"
                    value={tableState.expert[5]}
                    onChange={({ target: { value } }) =>
                      setTableState({
                        ...tableState,
                        expert: {
                          ...tableState.expert,
                          '5': +value,
                        },
                      })
                    }
                  />
                  <Circle
                    hide={tableState.expert[5] === tableStateCopy.expert[5]}
                    tb
                    onClick={undefined}
                  />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <Label>7 {t('depositsPrograms.line')}</Label>
                  <Input
                    placeholder="-"
                    value={tableState.expert[6]}
                    onChange={({ target: { value } }) =>
                      setTableState({
                        ...tableState,
                        expert: {
                          ...tableState.expert,
                          '6': +value,
                        },
                      })
                    }
                  />
                  <Circle
                    hide={tableState.expert[6] === tableStateCopy.expert[6]}
                    tb
                    onClick={undefined}
                  />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <Label>8 {t('depositsPrograms.line')}</Label>
                  <Input
                    placeholder="-"
                    value={tableState.expert[7]}
                    onChange={({ target: { value } }) =>
                      setTableState({
                        ...tableState,
                        expert: {
                          ...tableState.expert,
                          '7': +value,
                        },
                      })
                    }
                  />
                  <Circle
                    hide={tableState.expert[7] === tableStateCopy.expert[7]}
                    tb
                    onClick={undefined}
                  />
                </InputGroup>
              </Row>
            </ColumnGroup>
            <ColumnGroup labelHide hide={infinityColumn}>
              <ColumnHead onClick={() => setInfinityColumn(!infinityColumn)}>
                <Label>Infinity</Label>
              </ColumnHead>

              <Row>
                <InputGroup>
                  <Label>1 {t('depositsPrograms.line')}</Label>
                  <Input
                    placeholder="-"
                    value={tableState.infinity[0]}
                    onChange={({ target: { value } }) =>
                      setTableState({
                        ...tableState,
                        infinity: {
                          ...tableState.infinity,
                          '0': +value,
                        },
                      })
                    }
                  />
                  <Circle
                    hide={tableState.infinity[0] === tableStateCopy.infinity[0]}
                    tb
                    onClick={undefined}
                  />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <Label>2 {t('depositsPrograms.line')}</Label>
                  <Input
                    placeholder="-"
                    value={tableState.infinity[1]}
                    onChange={({ target: { value } }) =>
                      setTableState({
                        ...tableState,
                        infinity: {
                          ...tableState.infinity,
                          '1': +value,
                        },
                      })
                    }
                  />
                  <Circle
                    hide={tableState.infinity[1] === tableStateCopy.infinity[1]}
                    tb
                    onClick={undefined}
                  />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <Label>3 {t('depositsPrograms.line')}</Label>
                  <Input
                    placeholder="-"
                    value={tableState.infinity[2]}
                    onChange={({ target: { value } }) =>
                      setTableState({
                        ...tableState,
                        infinity: {
                          ...tableState.infinity,
                          '2': +value,
                        },
                      })
                    }
                  />
                  <Circle
                    hide={tableState.infinity[2] === tableStateCopy.infinity[2]}
                    tb
                    onClick={undefined}
                  />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <Label>4 {t('depositsPrograms.line')}</Label>
                  <Input
                    placeholder="-"
                    value={tableState.infinity[3]}
                    onChange={({ target: { value } }) =>
                      setTableState({
                        ...tableState,
                        infinity: {
                          ...tableState.infinity,
                          '3': +value,
                        },
                      })
                    }
                  />
                  <Circle
                    hide={tableState.infinity[3] === tableStateCopy.infinity[3]}
                    tb
                    onClick={undefined}
                  />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <Label>5 {t('depositsPrograms.line')}</Label>
                  <Input
                    placeholder="-"
                    value={tableState.infinity[4]}
                    onChange={({ target: { value } }) =>
                      setTableState({
                        ...tableState,
                        infinity: {
                          ...tableState.infinity,
                          '4': +value,
                        },
                      })
                    }
                  />
                  <Circle
                    hide={tableState.infinity[4] === tableStateCopy.infinity[4]}
                    tb
                    onClick={undefined}
                  />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <Label>6 {t('depositsPrograms.line')}</Label>
                  <Input
                    placeholder="-"
                    value={tableState.infinity[5]}
                    onChange={({ target: { value } }) =>
                      setTableState({
                        ...tableState,
                        infinity: {
                          ...tableState.infinity,
                          '5': +value,
                        },
                      })
                    }
                  />
                  <Circle
                    hide={tableState.infinity[5] === tableStateCopy.infinity[5]}
                    tb
                    onClick={undefined}
                  />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <Label>7 {t('depositsPrograms.line')}</Label>
                  <Input
                    placeholder="-"
                    value={tableState.infinity[6]}
                    onChange={({ target: { value } }) =>
                      setTableState({
                        ...tableState,
                        infinity: {
                          ...tableState.infinity,
                          '6': +value,
                        },
                      })
                    }
                  />
                  <Circle
                    hide={tableState.infinity[6] === tableStateCopy.infinity[6]}
                    tb
                    onClick={undefined}
                  />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <Label>8 {t('depositsPrograms.line')}</Label>
                  <Input
                    placeholder="-"
                    value={tableState.infinity[7]}
                    onChange={({ target: { value } }) =>
                      setTableState({
                        ...tableState,
                        infinity: {
                          ...tableState.infinity,
                          '7': +value,
                        },
                      })
                    }
                  />
                  <Circle
                    hide={tableState.infinity[7] === tableStateCopy.infinity[7]}
                    tb
                    onClick={undefined}
                  />
                </InputGroup>
              </Row>
            </ColumnGroup>
          </TableBody>
        </Table>

        <Row>
          <InputGroup>
            <Label>{t('depositsPrograms.depositAccount')}</Label>
            <Input
              placeholder="-"
              name="referenceAccount"
              value={program.referenceAccount}
              onChange={({ target: { name, value } }) => {
                setProgram({ ...program, [name]: value });
              }}
            />
            <Circle
              hide={program.referenceAccount === storage.referenceAccount}
              bld
              onClick={undefined}
            />
          </InputGroup>
        </Row>
        <Row>
          <InputGroup>
            <Label>{t('depositsPrograms.transferCode')}</Label>
            <Input
              placeholder="-"
              name="referenceCode"
              value={program.referenceCode as string}
              onChange={({ target: { name, value } }) => {
                setProgram({ ...program, [name]: value });
              }}
            />
            <Circle hide={program.referenceCode === storage.referenceCode} onClick={undefined} />
          </InputGroup>
        </Row>
        <Row>
          <InputGroup lg>
            <Label>{t('depositsPrograms.activeKey')}</Label>
            <Input
              placeholder="-"
              name="activeWif"
              value={program.activeWif}
              onChange={({ target: { name, value } }) => {
                setProgram({ ...program, [name]: value });
              }}
            />
            <Circle hide={program.activeWif === storage.activeWif} onClick={undefined} />
          </InputGroup>
        </Row>
        <Row>
          <InputGroup lg>
            <Label>{t('depositsPrograms.keyNotes')}</Label>
            <Input
              placeholder="-"
              name="memoWif"
              value={program.memoWif}
              onChange={({ target: { name, value } }) => {
                setProgram({ ...program, [name]: value });
              }}
            />
            <Circle hide={program.memoWif === storage.memoWif} onClick={undefined} />
          </InputGroup>
        </Row>

        <Row hr>
          <InputGroup>
            <Label>{t('depositsPrograms.depositActivationCost')}</Label>
            <Select
              options={
                Object.keys(BalanceKind)
                  .map((key: any) => BalanceKind[key])
                  .filter((value) => typeof value === 'string') as string[]
              }
              selectedOption={program.priceKind ? BalanceKind[program.priceKind] : ''}
              setSelectedOption={(value: any) => {
                setProgram({
                  ...program,
                  priceKind: +BalanceKind[value],
                });
              }}
            />
            <Circle hide={program.priceKind === storage.priceKind} onClick={undefined} />
          </InputGroup>
          <Hr />
          <InputGroup>
            <Label>{t('depositsPrograms.value')}</Label>
            <Input
              placeholder="-"
              name="price"
              value={program.price ? program.price : ''}
              onChange={({ target: { name, value } }) => {
                setProgram({ ...program, [name]: +value });
              }}
            />
            <Circle hide={program.price === storage.price} onClick={undefined} />
          </InputGroup>
        </Row>

        <Row>
          <InputGroup>
            <Label>{t('depositsPrograms.programIsActive')}</Label>
            <StatusGroup>
              <Switcher
                checked={program.isActive}
                onChange={() => {
                  setProgram({ ...program, isActive: !program.isActive });
                }}
              />
              <Status checked={program.isActive}>
                {t(program.isActive ? 'depositsPrograms.yes' : 'depositsPrograms.no')}
              </Status>
            </StatusGroup>
          </InputGroup>
        </Row>

        <Row>
          <InputGroup lg>
            <Label>{t('depositsPrograms.publishingProgram')}</Label>
            <StatusGroup>
              <Switcher
                checked={program.isPublic}
                onChange={() => {
                  setProgram({ ...program, isPublic: !program.isPublic });
                }}
              />
              <Status checked={program.isPublic}>
                {t(program.isPublic ? 'depositsPrograms.yes' : 'depositsPrograms.no')}
              </Status>
            </StatusGroup>
          </InputGroup>
        </Row>
        <ButtonGroup>
          <Button
            danger
            maxWidth={130}
            onClick={async () => {
              setIsOpenSaveConfirm(true);
            }}
          >
            {t('depositsPrograms.save')}
          </Button>
          <Button dangerOutline maxWidth={130} onClick={() => setIsOpenCancelConfirm(true)}>
            {t('depositsPrograms.cancel')}
          </Button>
        </ButtonGroup>
        {isOpenSaveConfirm && (
          <Modal onClose={() => setIsOpenSaveConfirm(false)}>
            <ModalBlock>
              <ModalTitle>{t('depositsPrograms.preservation')}</ModalTitle>
              <ModalContent>{t('depositsPrograms.areYouSure')}</ModalContent>
              <ModalButtons>
                <Button
                  danger
                  maxWidth={200}
                  onClick={() => {
                    setIsOpenSaveConfirm(false);
                    setIsSavingSuccess(true);
                    createProgram();
                  }}
                >
                  {t('depositsPrograms.save')}
                </Button>
                <Button dangerOutline maxWidth={200} onClick={() => setIsOpenSaveConfirm(false)}>
                  {t('depositsPrograms.return')}
                </Button>
              </ModalButtons>
            </ModalBlock>
          </Modal>
        )}

        {isOpenCancelConfirm && (
          <Modal onClose={() => setIsOpenCancelConfirm(false)}>
            <ModalBlock>
              <ModalTitle>{t('depositsPrograms.cancel')}</ModalTitle>
              <ModalContent>{t('depositsPrograms.areYouSureNot')}</ModalContent>
              <ModalButtons>
                <Button
                  danger
                  maxWidth={200}
                  onClick={() => {
                    setIsOpenCancelConfirm(false);
                    setIsSavingCanceled(true);
                    setProgram(defaultFormState);
                  }}
                >
                  {t('depositsPrograms.dontSave')}
                </Button>
                <Button
                  dangerOutline
                  maxWidth={200}
                  onClick={() => {
                    setIsOpenCancelConfirm(false);
                  }}
                >
                  {t('depositsPrograms.return')}
                </Button>
              </ModalButtons>
            </ModalBlock>
          </Modal>
        )}

        {isSavingSuccess && (
          <Modal
            onClose={() => {
              setIsSavingSuccess(false);
              setOpenNewProgram(false);
            }}
          >
            <ModalBlock sm>
              <ModalTitle>{t('alert.success')} !</ModalTitle>
              <ModalContent>{t('depositsPrograms.depositProgramSuccessfullySaved')}</ModalContent>
            </ModalBlock>
          </Modal>
        )}
        {isSavingCanceled && (
          <Modal
            onClose={() => {
              setIsSavingCanceled(false);
              setOpenNewProgram(false);
            }}
          >
            <ModalBlock sm>
              <ModalTitle>{t('depositsPrograms.changesCanceled')}</ModalTitle>
              <ModalContent>{t('depositsPrograms.changesCanceledSuccessfully')}</ModalContent>
            </ModalBlock>
          </Modal>
        )}
        {isModalError && (
          <Modal onClose={() => setIsModalError(false)}>
            <ModalBlock sm>
              <ModalTitle>{t('alert.error')} !</ModalTitle>
              <ModalContent>{t('alert.error')}.</ModalContent>
            </ModalBlock>
          </Modal>
        )}
      </ContentWrapper>
    </Container>
  );
};
const ModalBlock = styled.div<{ sm?: boolean }>`
  display: flex;
  flex-direction: column;
  padding: ${(props) => (props.sm ? '30px 0px 35px' : '50px 50px 30px')};
  align-items: center;
  justify-content: center;
  gap: 30px;
  @media (max-width: 576px) {
    padding: ${(props) => (props.sm ? '30px 5px 35px' : '50px 5px 30px')};
  }
`;
const ModalTitle = styled.h1`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  color: ${(props) => props.theme.text};
`;
const ModalContent = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.1px;

  color: ${(props) => props.theme.text2};
`;

const ModalButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  justify-content: center;
  align-items: center;
  & > a {
    @media (max-width: 576px) {
      min-width: 100%;
    }
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    text-align: center;
    &:first-child {
      line-height: 16px;
      display: flex;
      align-items: center;
    }
    &:last-child {
      line-height: 20px;
      letter-spacing: 0.1px;
      color: ${(props) => props.theme.text2};
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  & > a {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    text-align: center;
    &:first-child {
      line-height: 16px;
      display: flex;
      align-items: center;
    }
    &:last-child {
      line-height: 20px;
      letter-spacing: 0.1px;
      color: ${(props) => props.theme.text2};
    }
  }
  @media (max-width: 576px) {
    flex-direction: column;
    & > a {
      min-width: 100%;
    }
  }
`;

const ColumnHead = styled.p`
  padding-bottom: 5px;
  & > span {
    color: ${(props) => props.theme.text2};
    line-height: 20px;
  }
  @media (max-width: 576px) {
    background: rgba(86, 101, 127, 0.3);
    border-radius: 2px;
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 10px;

    & > span {
      background: transparent;
    }
  }
`;

const Circle = styled(CircleOk)<{ tb?: boolean; txt?: boolean; bld?: boolean; hide?: boolean }>`
  position: absolute;
  display: ${(props) => (props.hide ? 'none' : 'block')};
  left: ${(props) => (props.txt ? '231%' : '101%')};
  top: ${(props) => (props.bld ? '55px' : '35px')};
  @media (max-width: 768px) {
    left: ${(props) => (props.txt ? '172%' : '101%')};
  }
  @media (max-width: 576px) {
    left: 101%;
  }
`;

const Table = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const TableBody = styled.div`
  display: flex;
  gap: 80px;
  justify-content: space-between;
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const ColumnGroup = styled.div<{ labelHide?: boolean; hide?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (max-width: 576px) {
    & > div {
      display: ${(props) => (props.hide ? 'none' : 'block')};
    }
  }
  & > div > div > span {
    opacity: ${(props) => (props.labelHide ? '0' : '1')};
    @media (max-width: 576px) {
      opacity: 1;
    }
  }
`;

const StatusGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 0;
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.depositHead};
  background: ${(props) => props.theme.card.background};
`;

const Status = styled.span<{ checked: boolean }>`
  color: ${(props) => (props.checked ? '#FF416E' : props.theme.text2)};
`;

const Hr = styled.hr`
  position: relative;
  top: 47px;
  left: 0;
  max-width: 63px;
  height: 2px;
  width: 63px;
  opacity: 0.3;
  color: #56657f;
  @media (max-width: 768px) {
    flex-direction: column;
    transform: rotate(90deg);
    max-width: 10px;
    top: 3px;
    left: 115px;
  }
`;
const ContentWrapper = styled.div`
  width: 100%;
  padding: 0px 30px 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Row = styled.div<{ hr?: boolean }>`
  position: relative;
  display: flex;
  gap: ${(props) => (props.hr ? '10px' : '85px')};
  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${(props) => (props.hr ? '15px' : '20px')};
  }
`;

const InputGroup = styled.div<{ lg?: boolean; disabled?: boolean }>`
  position: relative;
  max-width: ${(props) => (props.lg ? '650px' : '280px')};
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: space-between;
  & > * {
    opacity: ${(props) => (props.disabled ? '0.6' : '')};
  }
`;
const Label = styled.span`
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.depositHead};
  background: ${(props) => props.theme.card.background};
  @media (max-width: 768px) {
  }
`;

const Input = styled.input<{ CWD?: boolean }>`
  width: 100%;
  border: 1px solid rgba(86, 101, 127, 0.3);
  box-sizing: border-box;
  border-radius: 2px;
  min-height: 40px;
  padding: ${(props) => (props.CWD ? '8px 45px 8px 8px' : '8px')};
  font-weight: normal;
  background: transparent;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.text2};
  &:focus {
    outline: none;
  }
  ::placeholder,
  ::-webkit-input-placeholder {
    font-size: 12px;
    color: ${(props) => props.theme.text2};
  }
  background-image: ${(props) =>
    props.CWD
      ? `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='50px' width='120px'><text x='0' y='15' fill='${props.theme.thHead}' font-family='Roboto, Helvetica, sans-serif' font-size='14'>CWD</text></svg>")`
      : ''};
  background-position: ${(props) => (props.CWD ? 'top 8px right -50%' : '')};
  background-repeat: ${(props) => (props.CWD ? 'no-repeat' : '')};
`;

const Text = styled.textarea`
  resize: none;
  width: 100%;
  border: 1px solid rgba(86, 101, 127, 0.3);
  box-sizing: border-box;
  border-radius: 2px;
  min-height: 80px;
  min-width: 645px;
  padding: 8px;
  font-family: 'Roboto', sans-serif;
  font-weight: normal;
  background: transparent;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.text2};
  &:focus {
    outline: none;
  }
  @media (max-width: 768px) {
    min-width: 480px;
  }
  @media (max-width: 576px) {
    min-width: auto;
    min-height: 180px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  display: flex;
  padding: 40px 30px;
  align-items: center;
  gap: 20px;
  & > svg {
    cursor: pointer;
    :hover {
      opacity: 0.7;
      transform: scale(1.1);
    }
  }
  @media (max-width: 576px) {
    gap: 10px;
    padding: 20px 30px;
    & > svg {
      transform: scale(0.7);
    }
  }
`;
const Title = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: ${(props) => props.theme.text};
  @media (max-width: 576px) {
    font-size: 14px;
  }
`;
