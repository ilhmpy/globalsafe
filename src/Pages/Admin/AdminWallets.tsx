import moment from 'moment';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { ReactComponent as Exit } from '../../assets/svg/exit.svg';
import { Button } from '../../components/Button/Button';
import { UpTitle } from '../../components/UI/UpTitle';
import { AppContext } from '../../context/HubContext';
import { OpenDate } from '../../types/dates';
import { CollectionUsers } from '../../types/users';
import { Pagination } from './Pagination';
import * as Styled from './Styled.elements';

export const AdminWallets = () => {
  const [name, setName] = useState('');
  const [openDate, setOpenDate] = useState<OpenDate>({
    from: undefined,
    to: undefined,
  });
  const [listDeposits, setListDeposits] = useState<CollectionUsers[]>([]);
  const [count, setCount] = useState(true);
  const [num, setNum] = useState(20);
  const [loading, setLoading] = useState(true);
  const [totalUsers, seTotalUsers] = useState(0);
  const [open, setOpen] = useState(false);
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const logOut = appContext.logOut;
  const user = appContext.user;
  const { t } = useTranslation();
  const backDays: any = moment().subtract(30, 'days');
  const [pageLength, setPageLength] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [sortingWindowOpen, setSortingWindowOpen] = useState(false);
  const [cardsList, setCardsList] = useState<any[]>([
    {
      name: 'Wallet 1',
      balanceText: 'Баланс, CWD',
      count: '110 500 000',
      plusNumber: '+11',
    },
  ]);

  const list = new Array(24).fill(cardsList[0]);

  return (
    <>
      <Styled.HeadBlock style={{ justifyContent: 'space-between' }}>
        <ButtonGroup>
          <Button danger maxWidth={158} onClick={() => undefined}>
            {t('wallets.newWallet')}
          </Button>
          <Button dangerOutline maxWidth={158} onClick={() => undefined}>
            {t('wallets.refreshAll')}
          </Button>
        </ButtonGroup>
        <UpTitle small>{t('adminUsers.uptitle')}</UpTitle>
        <Styled.UserName>
          <span>{user}</span>
          <Exit onClick={logOut} />
        </Styled.UserName>
      </Styled.HeadBlock>

      <WalletTable>
        {list.map((card, index) => {
          return (
            <Wallet key={index}>
              <Name>{card.name}</Name>
              <BalanceText>{card.balanceText}</BalanceText>
              <AmountGroup>
                <Count>{card.count}</Count>
                <PlusNumber>{card.plusNumber}</PlusNumber>
              </AmountGroup>
            </Wallet>
          );
        })}
      </WalletTable>

      <Pagination
        pageLength={pageLength}
        setPageLength={setPageLength}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalLottery={totalUsers}
      />
    </>
  );
};

const Wallet = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 20px 22px;

  background: ${(props) => props.theme.card.background};
  width: 100%;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border: ${(props) => props.theme.card.border};

  opacity: 0.8;
  color: ${(props) => props.theme.text2};
  font-style: normal;
`;
const Name = styled.h3`
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.1px;
  padding-bottom: 5px;
`;
const BalanceText = styled.p`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  opacity: 0.6;
`;
const AmountGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Count = styled.span`
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: ${(props) => props.theme.pink};
`;
const PlusNumber = styled.span`
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
`;

const WalletTable = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 20px 0 37px;
  gap: 22px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
`;

const InputsWrapItem = styled.div`
  margin-right: 10px;
  width: 100%;
  @media (max-width: 576px) {
    margin-right: 0px;
  }
`;

const NotFound = styled.div`
  font-weight: normal;
  font-size: 12px;
  line-height: 21px;
  padding: 30px;
  letter-spacing: 0.1px;
  min-height: 250px;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid rgba(86, 101, 127, 0.3);
  box-sizing: border-box;
  border-radius: 2px;
  min-height: 40px;
  padding: 8px;
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.1px;
  background: transparent;
  color: ${(props) => props.theme.text2};
  &:focus {
    outline: none;
  }
`;

const PaymentsTable = styled.div`
  padding: 30px;
`;

const TableHead = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(81, 81, 114, 0.2);
`;

const TableHeadItem = styled.li`
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.thHead};
  width: 100%;
  &:nth-child(1) {
    max-width: 97px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &:nth-child(2) {
    max-width: 110px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    @media (max-width: 992px) {
      display: none;
    }
  }
  &:nth-child(3) {
    max-width: 110px;
    @media (max-width: 768px) {
      max-width: 80px;
    }
    @media (max-width: 576px) {
      display: none;
    }
  }
  &:nth-child(4) {
    max-width: 100px;
  }
  &:nth-child(5) {
    max-width: 90px;
    @media (max-width: 992px) {
      max-width: 80px;
    }
    @media (max-width: 768px) {
      display: none;
    }
  }
  &:nth-child(6) {
    max-width: 100px;
    @media (max-width: 992px) {
      max-width: 40px;
      display: none;
    }
  }
  &:nth-child(7) {
    max-width: 130px;
    text-align: right;
    @media (max-width: 992px) {
      max-width: 80px;
    }
  }
  &:last-child {
    position: relative;
    @media only screen and (max-device-width: 992px) {
      text-align: center;
    }
  }
`;
