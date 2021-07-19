import React, { FC, useState, useEffect, useContext } from "react";
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import * as Styled from './Styled.elements';
import { UpTitle } from '../../components/UI/UpTitle';
import { ReactComponent as Exit } from '../../assets/svg/exit.svg';
import { AppContext } from '../../context/HubContext';
import { CSSTransition } from 'react-transition-group';
import { Select } from '../../components/Select/Select';
import { Button } from '../../components/Button/Button';
import { Content, Tab } from '../../components/UI/Tabs';
import { Card } from '../../globalStyles';
import burgerGroup from '../../assets/img/burgerGroup.png';
import { Scrollbars } from 'react-custom-scrollbars';
import {
  BurgerButton,
  BurgerImg,
  SortingItem,
  SortingWindow,
  WindowBody,
  WindowTitle,
} from './Styled.elements';

export const AdminDepositsPrograms = () => {
  const { t } = useTranslation();
  const [ depositsPrograms, setDepositsPrograms ] = useState([
    { name: "Программа #1", depositsAmount: "1000.0", createDate: "12/07/2021", procents: "1", desc: "фикс. выплата 10% /мес., 70% от доходности фонда" },
    { name: "Программа #1", depositsAmount: "500.0", createDate: "12/07/2021", procents: "2", desc: "фикс. выплата 10% /мес., 70% от доходности фонда" },
    { name: "Программа #1", depositsAmount: "300.0", createDate: "13/07/2021", procents: "4", desc: "фикс. выплата 10% /мес., 70% от доходности фонда" },
    { name: "Программа #1", depositsAmount: "1200.0", createDate: "14/07/2021", procents: "2", desc: "фикс. выплата 10% /мес., 70% от доходности фонда" },
    { name: "Программа #1", depositsAmount: "200.0", createDate: "21/07/2021", procents: "8", desc: "фикс. выплата 10% /мес., 70% от доходности фонда" },
    { name: "Программа #1", depositsAmount: "300.0", createDate: "12/07/2021", procents: "2", desc: "фикс. выплата 10% /мес., 70% от доходности фонда" },
    { name: "Программа #1", depositsAmount: "600.0", createDate: "28/07/2021", procents: "5", desc: "фикс. выплата 10% /мес., 70% от доходности фонда" },
    { name: "Программа #1", depositsAmount: "800.0", createDate: "12/07/2021", procents: "2", desc: "фикс. выплата 10% /мес., 70% от доходности фонда" },
    { name: "Программа #1", depositsAmount: "0", createDate: "32/07/2021", procents: "1", desc: "фикс. выплата 10% /мес., 70% от доходности фонда" },
    { name: "Программа #1", depositsAmount: "0", createDate: "12/07/2021", procents: "2", desc: "фикс. выплата 10% /мес., 70% от доходности фонда" },
    { name: "Программа #1", depositsAmount: "0", createDate: "12/07/2021", procents: "3", desc: "фикс. выплата 10% /мес., 70% от доходности фонда" },
  ]);

  const [ programs, setPrograms ] = useState([
    { name: "START" },
    { name: "START" },
    { name: "START" },
    { name: "START" },
    { name: "START" },
    { name: "START" },
  ]);
  const [ openFilter, setOpenFilter ] = useState(false);

  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const user = appContext.user;
  const logOut = appContext.logOut;
  const [ list, setList ] = useState(["START", "MASTER", "MAIN"]);
  const [ checkList, setCheckList ] = useState([]);
  const [ procents, setProcents ] = useState([]);
  const [ procentsList, setProcentsList ] = useState(["0%", "30%", "50%"]);
  const [ filter, setFilter ] = useState(false);

  return (
    <>
      <Styled.HeadBlock>
        <UpTitle small>{t('adminMain.uptitle')}</UpTitle>
        <Styled.UserName>
          <span>{user}</span>
          <Exit onClick={logOut} />
        </Styled.UserName>
      </Styled.HeadBlock>

      <div>
        <Styled.FilterBlock>
          <Styled.FilterHeader>
            <Styled.FilterName>{t('adminDeposit.filter')}</Styled.FilterName>
            <Styled.ShowHide onClick={() => setOpenFilter(!openFilter)}>
              {openFilter ? t('hide') : t('show')}
            </Styled.ShowHide>
          </Styled.FilterHeader>
          <CSSTransition
            in={openFilter}
            timeout={200}
            classNames="filter"
            unmountOnExit>
            <>
              <ContentWrap>
                <Styled.SelectWrap style={{ minWidth: 280 }}>
                  <Styled.Label>{t('depositsPrograms.name')}</Styled.Label>
                  <Select
                    checkList={checkList}
                    setCheckList={setCheckList}
                    values={list}
                  />
                </Styled.SelectWrap>
                <Styled.SelectWrap style={{ minWidth: 280 }}>
                  <Styled.Label>{t('depositsPrograms.depositSum')}</Styled.Label>
                  <Input
                    value={""}
                    onChange={(value) => {}}
                  />
                </Styled.SelectWrap>
                <Styled.SelectWrap style={{ minWidth: 133 }}>
                  <Styled.Label>{t('depositsPrograms.procents')}</Styled.Label>
                  <Select
                    checkList={procents}
                    setCheckList={setProcents}
                    values={procentsList}
                  />
                </Styled.SelectWrap>
                <Button danger onClick={() => {}} style={{ height: "40px" }}>
                  {t('adminDeposit.btnApply')}
                </Button>
              </ContentWrap>
            </>
          </CSSTransition>
        </Styled.FilterBlock>
      </div>

      <Content active={true}>
        <CardTable>
          <PaymentsTable>
            <TableHead>
              <TableHeadItem>{t('depositsPrograms.name')}</TableHeadItem>
              <TableHeadItem>{t('depositsPrograms.depositSum')}</TableHeadItem>
              <TableHeadItem>{t('depositsPrograms.createDate')}</TableHeadItem>
              <TableHeadItem>{t('depositsPrograms.procents')}</TableHeadItem>
              <TableHeadItem>{t('depositsPrograms.desc')}</TableHeadItem>
              <TableHeadItem>
                <BurgerButton>
                  <BurgerImg
                    src={burgerGroup}
                    alt="burger"
                    onClick={() => setFilter(!filter)}
                  />
                  <Window open={filter}>
                    <WindowTitle>Сортировка</WindowTitle>
                    <WindowBody>
                      {[
                        { name: "По убыванию даты" },
                        { name: "По возрастанию даты" },
                        { name: "Имя программы: От А до Я" },
                        { name: "По убыванию суммы депозитов программы" },
                        { name: "По возрастанию суммы депозитов программы" },
                      ].map((obj, index) => (
                        <SortingItem
                          active={filter}
                          key={index}
                          onClick={() => {}}>
                          {obj.name}
                        </SortingItem>
                      ))}
                    </WindowBody>
                  </Window>
                </BurgerButton>
              </TableHeadItem>
            </TableHead>
            {depositsPrograms.length ? (
              <Scrollbars style={{ height: '500px' }}>
                {depositsPrograms.map((program, idx) => (
                   <TableList key={depositsPrograms.indexOf(program)} data={program} />
                ))}
              </Scrollbars>
            ) : (
              <Styled.NotFound>{t('notFound')}</Styled.NotFound>
            )}
          </PaymentsTable>
        </CardTable>
      </Content>
    </>
  )
};

const TableList: FC<{ data: any }> = ({ data }) => {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const modalOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(true);
  };

  return (
    <div>
      <TableBody onClick={modalOpen}>
        <TableBodyItem>{data.name}</TableBodyItem>
        <TableBodyItem>{data.depositsAmount}</TableBodyItem>
        <TableBodyItem>{data.createDate}</TableBodyItem>
        <TableBodyItem>{data.procents}</TableBodyItem>
        <TableBodyItem>{data.desc}</TableBodyItem>
      </TableBody>
    </div>
  );
};


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

const TableBodyItem = styled.li`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: ${(props) => props.theme.text2};

  @media (max-width: 992px) {
    display: none;
    &:nth-child(1) {
      display: block;
    }

    &:nth-child(2) {
      display: block;
    }

    &:nth-child(6) {
      display: block;
    }
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

const TableHead = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 0.15fr);
  position: relative;
  list-style: none;
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
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  max-width: 105px;
  margin-bottom: 6px;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.thHead};
  width: 100%;

  @media (max-width: 992px) {
    display: none;
    &:nth-child(1) {
      display: block;
    }

    &:nth-child(2) {
      display: block;
    }

    &:nth-child(6) {
      display: block;
    }
  }

  &:nth-child(1) {
    max-width: 230px;
    @media (max-width: 576px) {
      max-width: 80px;
    }
  }

  &:nth-child(6) {
    position: absolute;
    right: 0;
    max-width: 23px;
  }
`;

const Window = styled(SortingWindow)`
  right: 0px;
  top: 24px;
`;

const TableBody = styled(TableHead)`
  padding: 10px 0;
  cursor: pointer;
  align-items: center;
  transition: 0.3s;
  &:hover {
    background: rgba(66, 139, 202, 0.109);
  }
`;
