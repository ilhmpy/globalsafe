import React, { FC, useContext, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import Switch from 'react-switch';
import styled from 'styled-components';
import { ReactComponent as Exit } from '../../assets/svg/exit.svg';
import { Button } from '../../components/Button/Button';
import { Loading } from '../../components/UI/Loading';
import { Content } from '../../components/UI/Tabs';
import { UpTitle } from '../../components/UI/UpTitle';
import { AppContext } from '../../context/HubContext';
import { Card } from '../../globalStyles';
import * as Styled from './Styled.elements';
import { SortingWindow } from './Styled.elements';

export const AdminDepositsPrograms = () => {
  const { t } = useTranslation();
  const [depositsPrograms, setDepositsPrograms] = useState([
    {
      name: 'Start',
      currency: 'CWD',
      amount: '1 000.0 - 10 000.0',
      profitability: '10 %',
      payment: 'Фиксированная',
      depositPeriod: '180 дней',
    },
    {
      name: 'Start +',
      currency: 'CWD',
      amount: '2 000.0 - 20 000.0',
      profitability: '10 %',
      payment: 'Фиксированная',
      depositPeriod: '180 дней',
    },
    {
      name: 'Classic',
      currency: 'CWD',
      amount: '5 000.0 - 50 000.0',
      profitability: '10 %',
      payment: 'Фиксированная',
      depositPeriod: '180 дней',
    },
    {
      name: 'Gold',
      currency: 'CWD',
      amount: '10 000.0 - 100 000.0',
      profitability: '10 %',
      payment: 'Фиксированная',
      depositPeriod: '180 дней',
    },
    {
      name: 'Premium',
      currency: 'CWD',
      amount: '50 000.0 - 500 000.0',
      profitability: '10 %',
      payment: 'Фиксированная',
      depositPeriod: '180 дней',
    },
    {
      name: 'VIP',
      currency: 'CWD',
      amount: '100 000.0 - 1 000 000.0',
      profitability: '10 %',
      payment: 'Фиксированная',
      depositPeriod: '180 дней',
    },
    {
      name: 'Platinum',
      currency: 'CWD',
      amount: '500 000.0 - 5 000 000.0',
      profitability: '10 %',
      payment: 'Фиксированная',
      depositPeriod: '180 дней',
    },
    {
      name: 'Start',
      currency: 'CWD',
      amount: '500 000.0 - 5 000 000.0',
      profitability: '10 %',
      payment: 'Фиксированная',
      depositPeriod: '180 дней',
    },
    {
      name: 'Start +',
      currency: 'CWD',
      amount: '500 000.0 - 5 000 000.0',
      profitability: '10 %',
      payment: 'Фиксированная',
      depositPeriod: '180 дней',
    },
    {
      name: 'Classic',
      currency: 'CWD',
      amount: '500 000.0 - 5 000 000.0',
      profitability: '10 %',
      payment: 'Фиксированная',
      depositPeriod: '180 дней',
    },
    {
      name: 'Gold',
      currency: 'CWD',
      amount: '500 000.0 - 5 000 000.0',
      profitability: '10 %',
      payment: 'Фиксированная',
      depositPeriod: '180 дней',
    },
    {
      name: 'Premium',
      currency: 'CWD',
      amount: '500 000.0 - 5 000 000.0',
      profitability: '10 %',
      payment: 'Фиксированная',
      depositPeriod: '180 дней',
    },
    {
      name: 'VIP',
      currency: 'CWD',
      amount: '500 000.0 - 5 000 000.0',
      profitability: '10 %',
      payment: 'Фиксированная',
      depositPeriod: '180 дней',
    },
    {
      name: 'Platinum',
      currency: 'CWD',
      amount: '500 000.0 - 5 000 000.0',
      profitability: '10 %',
      payment: 'Фиксированная',
      depositPeriod: '180 дней',
    },
  ]);
  const [loading, setLoading] = useState(true);

  const [programs, setPrograms] = useState([
    { name: 'START' },
    { name: 'START' },
    { name: 'START' },
    { name: 'START' },
    { name: 'START' },
    { name: 'START' },
  ]);
  const [openFilter, setOpenFilter] = useState(false);

  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const user = appContext.user;
  const logOut = appContext.logOut;
  const [list, setList] = useState(['START', 'MASTER', 'MAIN']);
  const [checkList, setCheckList] = useState([]);
  const [procents, setProcents] = useState([]);
  const [procentsList, setProcentsList] = useState(['0%', '30%', '50%']);
  const [filter, setFilter] = useState(false);

  return (
    <>
      <Styled.HeadBlock>
        <UpTitle small>{t('sideNav.depositsPrograms')}</UpTitle>
        <Styled.UserName>
          <span>{user}</span>
          <Exit onClick={logOut} />
        </Styled.UserName>
      </Styled.HeadBlock>

      {/* <Styled.FilterBlock>
        <Styled.FilterHeader>
          <Styled.FilterName>{t('adminDeposit.filter')}</Styled.FilterName>
          <Styled.ShowHide onClick={() => setOpenFilter(!openFilter)}>
            {openFilter ? t('hide') : t('show')}
          </Styled.ShowHide>
        </Styled.FilterHeader>
        <CSSTransition in={openFilter} timeout={200} classNames="filter" unmountOnExit>
          <>
            <ContentWrap>
              <Styled.SelectWrap style={{ minWidth: 280 }}>
                <Styled.Label>{t('depositsPrograms.name')}</Styled.Label>
                <Select checkList={checkList} setCheckList={setCheckList} values={list} />
              </Styled.SelectWrap>
              <Styled.SelectWrap style={{ minWidth: 280 }}>
                <Styled.Label>{t('depositsPrograms.depositSum')}</Styled.Label>
                <Input value={''} onChange={(value) => undefined} />
              </Styled.SelectWrap>
              <Styled.SelectWrap style={{ minWidth: 133 }}>
                <Styled.Label>{t('depositsPrograms.procents')}</Styled.Label>
                <Select checkList={procents} setCheckList={setProcents} values={procentsList} />
              </Styled.SelectWrap>
              <Button danger onClick={() => undefined} style={{ height: '40px' }}>
                {t('adminDeposit.btnApply')}
              </Button>
            </ContentWrap>
          </>
        </CSSTransition>
      </Styled.FilterBlock> */}

      <Content active={true}>
        <CardTable>
          <PaymentsTable>
            <TableHeader>
              <TableTitle>{t('sideNav.depositsPrograms')}</TableTitle>
              <Button danger onClick={() => undefined}>
                {t('depositsPrograms.newProgram')}
              </Button>
            </TableHeader>

            <TableHead>
              <TableHeadItem>{t('depositsPrograms.name')}</TableHeadItem>
              <TableHeadItem>{t('depositsPrograms.currency')}</TableHeadItem>
              <TableHeadItem>{t('depositsPrograms.amount')}</TableHeadItem>
              <TableHeadItem>{t('depositsPrograms.profitability')}</TableHeadItem>
              <TableHeadItem>{t('depositsPrograms.payment')}</TableHeadItem>
              <TableHeadItem>{t('depositsPrograms.depositPeriod')}</TableHeadItem>
              <TableHeadItem>{t('depositsPrograms.programActivity')}</TableHeadItem>
              {/* <TableHeadItem>
                <BurgerButton>
                  <BurgerImg src={burgerGroup} alt="burger" onClick={() => setFilter(!filter)} />
                  <Window open={filter}>
                    <WindowTitle>Сортировка</WindowTitle>
                    <WindowBody>
                      {[
                        { name: 'По убыванию даты' },
                        { name: 'По возрастанию даты' },
                        { name: 'Имя программы: От А до Я' },
                        { name: 'По убыванию суммы депозитов программы' },
                        { name: 'По возрастанию суммы депозитов программы' },
                      ].map((obj, index) => (
                        <SortingItem active={filter} key={index} onClick={() => undefined}>
                          {obj.name}
                        </SortingItem>
                      ))}
                    </WindowBody>
                  </Window>
                </BurgerButton>
              </TableHeadItem>
             */}
            </TableHead>
            {depositsPrograms.length ? (
              <Scrollbars style={{ height: '450px' }}>
                {depositsPrograms.map((program, idx) => (
                  <TableList key={depositsPrograms.indexOf(program)} data={program} />
                ))}
              </Scrollbars>
            ) : loading ? (
              <Loading />
            ) : (
              <Styled.NotFound>{t('notFound')}</Styled.NotFound>
            )}
          </PaymentsTable>
        </CardTable>
      </Content>
    </>
  );
};

const TableList: FC<{ data: any }> = ({ data }: any) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const onClose = () => {
    setOpen(false);
  };

  const modalOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(true);
  };

  const [checked, setChecked] = useState(false);

  return (
    <TableBody onClick={modalOpen}>
      <TableBodyItem>{data.name}</TableBodyItem>
      <TableBodyItem>{data.currency}</TableBodyItem>
      <TableBodyItem>{data.amount}</TableBodyItem>
      <TableBodyItem>{data.profitability}</TableBodyItem>
      <TableBodyItem>{data.payment}</TableBodyItem>
      <TableBodyItem>{data.depositPeriod}</TableBodyItem>
      <TableBodyItem checked={checked}>
        <Switcher
          uncheckedIcon={false}
          checkedIcon={false}
          onChange={() => setChecked(!checked)}
          checked={checked}
        />
        <span>{t(checked ? 'depositsPrograms.off' : 'depositsPrograms.on')}</span>
      </TableBodyItem>
    </TableBody>
  );
};

const Switcher = styled(Switch)<{ checked: boolean }>`
  > div.react-switch-bg {
    background: ${(props) => (props.checked ? '#DBE7F1 !important' : '#ff416e !important')};
    height: 18px !important;
    width: 28px !important;
  }
  > div.react-switch-handle {
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.15), 0px 3px 1px rgba(0, 0, 0, 0.06) !important;
    height: 16px !important;
    width: 16px !important;
    top: 1px !important;
    left: 1px !important;
    transform: ${(props) =>
      props.checked ? 'translateX(0px) !important' : 'translateX(10px) !important'};
  }
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid rgba(86, 101, 127, 0.3);
  box-sizing: border-box;
  border-radius: 2px;
  min-height: 40px;
  padding: 8px;
  font-weight: normal;
  background: transparent;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.text2};
  &:focus {
    outline: none;
  }
`;

const ContentWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  @media only screen and (max-device-width: 992px) {
    display: block;
    padding-top: 5px;

    & > * {
      margin-bottom: 20px;
    }
  }
`;

const CardTable = styled(Card)`
  height: 600px;
`;

const PaymentsTable = styled.div`
  padding: 30px;
`;

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 35px;
  position: relative;
  > a {
    height: 40px;
    @media (max-width: 576px) {
      width: 100%;
      max-width: 100%;
    }
  }
`;
const TableTitle = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: #0e0d3d;
  @media (max-width: 576px) {
    display: none;
  }
`;

const TableHead = styled.ul`
  display: flex;
  position: relative;
  list-style: none;
  padding: 0 5px 6px;
  border-bottom: 1px solid rgba(81, 81, 114, 0.2);

  list-style: none;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(81, 81, 114, 0.2);

  @media (max-width: 992px) {
    justify-content: space-between;
  }
  @media (max-width: 576px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const TableHeadItem = styled.li`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  max-width: 105px;
  margin-bottom: 6px;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.thHead};
  width: 100%;

  &:nth-child(1) {
    max-width: 85px;
  }
  &:nth-child(2) {
    max-width: 90px;
    @media (max-width: 576px) {
      display: none;
    }
  }
  &:nth-child(3) {
    max-width: 155px;
    @media (max-width: 992px) {
      max-width: 110px;
    }
    @media (max-width: 768px) {
      display: none;
    }
  }
  &:nth-child(4) {
    max-width: 100px;
    @media (max-width: 480px) {
      display: none;
    }
  }
  &:nth-child(5) {
    max-width: 140px;
    @media (max-width: 768px) {
      display: none;
    }
  }
  &:nth-child(6) {
    max-width: 120px;
    @media (max-width: 576px) {
      display: none;
    }
  }
  &:nth-child(7) {
    max-width: 155px;
  }
`;

const Window = styled(SortingWindow)`
  right: 0px;
  top: 24px;
`;

const TableBody = styled(TableHead)`
  padding: 25px 5px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: rgba(66, 139, 202, 0.109);
  }
`;
const TableBodyItem = styled(TableHeadItem)<{ checked?: boolean }>`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.text2};
  width: 100%;
  > span {
    color: ${(props) => (props.checked ? '' : '#FF416E')};
  }
`;
