import moment from 'moment';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { ReactComponent as CircleOk } from '../../assets/svg/circleOk.svg';
import { ReactComponent as Exit } from '../../assets/svg/exit.svg';
import { ReactComponent as Pen } from '../../assets/svg/pen.svg';
import { ReactComponent as UpdateCircle } from '../../assets/svg/updateCircle.svg';
import { Button } from '../../components/Button/Button';
import { Modal } from '../../components/Modal/Modal';
import { Select } from '../../components/Select/Select';
import { UpTitle } from '../../components/UI/UpTitle';
import { AppContext } from '../../context/HubContext';
import { CollectionUsers } from '../../types/users';
import { Pagination } from './Pagination';
import * as Styled from './Styled.elements';
import { Input } from './Styled.elements';

export const AdminWallets = () => {
  const [name, setName] = useState('');
  const [isActiveActiveKey, setIsActiveActiveKey] = useState<boolean>(true);
  const [isActiveKeyNotes, setIsActiveKeyNotes] = useState<boolean>(false);
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
  const [isOpenEditForm, setIsOpenEditForm] = useState(false);
  const [isOpenNewForm, setIsOpenNewForm] = useState(false);
  const [isOpenShowForm, setIsOpenShowForm] = useState(false);
  const [isOpenTransferForm, setIsOpenTransferForm] = useState(false);
  const [isSavingConfirm, setIsSavingConfirm] = useState(false);
  const [checkList, setCheckList] = useState<any>([]);
  const selectList = [t('win.one'), t('win.two'), t('win.three')];

  const [refresh, setRefresh] = useState(false);
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
          <Button danger maxWidth={158} onClick={() => setIsOpenNewForm(true)}>
            {t('wallets.newWallet')}
          </Button>
          <Button dangerOutline maxWidth={158} onClick={() => setIsOpenShowForm(true)}>
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
            <Wallet key={index} onClick={() => setIsOpenEditForm(true)}>
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

      {isOpenEditForm && (
        <Modal onClose={() => setIsOpenEditForm(false)}>
          <ModalBlock>
            <ModalTitle>Wallet 1</ModalTitle>
            <KeysBLock>
              <div>
                <Label>{t('wallets.activeKey')}</Label>
                <KeyWrapper>
                  {isActiveActiveKey ? (
                    <KeyText>5Kjn6u5wTyHA5jJAJs9b77fzU5mgRdeqTvjhZFcppk7geUvxijH</KeyText>
                  ) : (
                    <KeyInput
                      spellCheck="false"
                      onChange={(e) => alert(e.target.value)}
                      value={'5Kjn6u5wTyHA5jJAJs9b77fzU5mgRdeqTvjhZFcppk7geUvxijH'}
                    />
                  )}
                  {isActiveActiveKey ? (
                    <Pen
                      onClick={() => {
                        setIsActiveActiveKey(!isActiveActiveKey);
                      }}
                    />
                  ) : (
                    <CircleOk
                      onClick={() => {
                        setIsActiveActiveKey(!isActiveActiveKey);
                      }}
                    />
                  )}
                </KeyWrapper>
              </div>
              <div>
                <Label>{t('wallets.keyNotes')}</Label>
                <KeyWrapper>
                  {isActiveKeyNotes ? (
                    <KeyText>5Kjn6u5wTyHA5jJAJs9b77fzU5mgRdeqTvjhZFcppk7geUvxijH</KeyText>
                  ) : (
                    <KeyInput
                      spellCheck="false"
                      onChange={(e) => alert(e.target.value)}
                      value={'5Kjn6u5wTyHA5jJAJs9b77fzU5mgRdeqTvjhZFcppk7geUvxijH'}
                    />
                  )}
                  {isActiveKeyNotes ? (
                    <Pen
                      onClick={() => {
                        setIsActiveKeyNotes(!isActiveKeyNotes);
                      }}
                    />
                  ) : (
                    <CircleOk
                      onClick={() => {
                        setIsActiveKeyNotes(!isActiveKeyNotes);
                      }}
                    />
                  )}
                </KeyWrapper>
              </div>
            </KeysBLock>

            <InputsBLock>
              <InputsRow>
                <SelectGroup>
                  <span>{t('wallets.from')}</span>
                  <Select checkList={checkList} setCheckList={setCheckList} values={selectList} />
                </SelectGroup>
                <SelectGroup>
                  <span>{t('wallets.where')}</span>
                  <Select checkList={checkList} setCheckList={setCheckList} values={selectList} />
                </SelectGroup>
              </InputsRow>
              <InputsRow>
                <SelectGroup>
                  <span>{t('depositsPrograms.amount')}</span>
                  <Input />
                </SelectGroup>
                <SelectGroup>
                  <span>{t('depositsPrograms.currency')}</span>
                  <Select checkList={checkList} setCheckList={setCheckList} values={selectList} />
                </SelectGroup>
              </InputsRow>
              <ModalButtons>
                <Button
                  danger
                  maxWidth={200}
                  onClick={() => {
                    setIsOpenEditForm(false);
                    setIsOpenTransferForm(true);
                  }}
                >
                  {t('wallets.transferFunds')}
                </Button>
              </ModalButtons>
            </InputsBLock>
            <ModalContent>
              <ContentRow>
                <Label>NA coin, Na</Label>
                <p>-</p>
              </ContentRow>
              <ContentRow>
                <Label>Crowdwiz coin, CWD</Label>
                <p>102 000</p>
              </ContentRow>
              <ContentRow>
                <Label>Crowdwiz Milli gold, MGCWD</Label>
                <p>102 000</p>
              </ContentRow>
              <ContentRow>
                <Label>Crowdwiz gold asset, GCWD</Label>
                <p>102 000</p>
              </ContentRow>
              <ContentRow>
                <Label>Crowdwiz diamond asset, DIAMOND</Label>
                <p>102 000</p>
              </ContentRow>
              <ContentRow>
                <Label>Crowdwiz diamond asset, DIAMOND</Label>
                <p>102 000</p>
              </ContentRow>
              <ContentRow>
                <Label>Bonus CWD balance, CWDBONUS</Label>
                <p>102 000</p>
              </ContentRow>
              <ContentRow>
                <Label>Carbone asset for autobonus, CARBONE</Label>
                <p>102 000</p>
              </ContentRow>
              <ContentRow>
                <Label>Bronze asset for option deposits, BRONZE</Label>
                <p>102 000</p>
              </ContentRow>
              <ContentRow>
                <Label>Option 4 asset, FUTURE4</Label>
                <p>102 000</p>
              </ContentRow>
              <ContentRow>
                <Label>Option 5 asset, FUTURE5</Label>
                <p>102 000</p>
              </ContentRow>
              <ContentRow>
                <Label>Option 6 asset, FUTURE6</Label>
                <p>102 000</p>
              </ContentRow>
              <ContentRow>
                <Label>Globalsafe asset, GLOBALSAFE</Label>
                <p>
                  102 000
                  <Refresh refresh={refresh}>
                    <Label>{t('wallets.for')} 16.04.2021</Label>
                    <UpdateCircle onClick={() => setRefresh(!refresh)} />
                  </Refresh>
                </p>
              </ContentRow>
            </ModalContent>
          </ModalBlock>
        </Modal>
      )}

      {isOpenNewForm && (
        <Modal onClose={() => setIsOpenNewForm(false)}>
          <ModalBlock sm>
            <NewWalletTitle>{t('wallets.newWallet')}</NewWalletTitle>
            <RoundInput spellCheck="false" placeholder={t('wallets.name')} />
            <RoundInput spellCheck="false" placeholder={t('wallets.activeKey')} />
            <RoundInput spellCheck="false" placeholder={t('wallets.keyNotes')} />
            <Button
              danger
              maxWidth={200}
              onClick={() => {
                setIsOpenNewForm(false);
              }}
            >
              {t('wallets.create')}
            </Button>
          </ModalBlock>
        </Modal>
      )}

      {isOpenShowForm && (
        <Modal onClose={() => setIsOpenShowForm(false)}>
          <ModalBlock>
            <ModalTitle>Wallet 1</ModalTitle>
            <KeysBLock>
              <div>
                <Label>{t('wallets.activeKey')}</Label>
                <KeyWrapper>
                  {isActiveActiveKey ? (
                    <KeyText>5Kjn6u5wTyHA5jJAJs9b77fzU5mgRdeqTvjhZFcppk7geUvxijH</KeyText>
                  ) : (
                    <KeyInput
                      spellCheck="false"
                      onChange={(e) => alert(e.target.value)}
                      value={'5Kjn6u5wTyHA5jJAJs9b77fzU5mgRdeqTvjhZFcppk7geUvxijH'}
                    />
                  )}
                  {isActiveActiveKey ? (
                    <Pen
                      onClick={() => {
                        setIsActiveActiveKey(!isActiveActiveKey);
                      }}
                    />
                  ) : (
                    <CircleOk
                      onClick={() => {
                        setIsActiveActiveKey(!isActiveActiveKey);
                      }}
                    />
                  )}
                </KeyWrapper>
              </div>
              <div>
                <Label>{t('wallets.keyNotes')}</Label>
                <KeyWrapper>
                  {isActiveKeyNotes ? (
                    <KeyText>5Kjn6u5wTyHA5jJAJs9b77fzU5mgRdeqTvjhZFcppk7geUvxijH</KeyText>
                  ) : (
                    <KeyInput
                      spellCheck="false"
                      onChange={(e) => alert(e.target.value)}
                      value={'5Kjn6u5wTyHA5jJAJs9b77fzU5mgRdeqTvjhZFcppk7geUvxijH'}
                    />
                  )}
                  {isActiveKeyNotes ? (
                    <Pen
                      onClick={() => {
                        setIsActiveKeyNotes(!isActiveKeyNotes);
                      }}
                    />
                  ) : (
                    <CircleOk
                      onClick={() => {
                        setIsActiveKeyNotes(!isActiveKeyNotes);
                      }}
                    />
                  )}
                </KeyWrapper>
              </div>
            </KeysBLock>

            <ChipContent>
              <Chip>Na - 0</Chip>
              <Chip>CWD - 235 468</Chip>
              <Chip>MGCWD - 235 468</Chip>
              <Chip>GCWD - 235 468</Chip>
              <Chip>DIAMOND - 235 468</Chip>
              <Chip>CROWDBTC - 235 468</Chip>
              <Chip>CWDBONUS - 235 468</Chip>
              <Chip>CARBONE - 235 468</Chip>
              <Chip>BRONZE - 235 468</Chip>
              <Chip>FUTURE4 - 235 468</Chip>
              <Chip>FUTURE5 - 235 468</Chip>
              <Chip>FUTURE6 - 235 468</Chip>
              <Chip>GLOBALSAFE - 235 468</Chip>
              <ChipRefresh refresh={refresh}>
                <Label>{t('wallets.for')} 16.04.2021</Label>
                <UpdateCircle onClick={() => setRefresh(!refresh)} />
              </ChipRefresh>
            </ChipContent>
          </ModalBlock>
        </Modal>
      )}

      {isOpenTransferForm && (
        <Modal onClose={() => setIsOpenTransferForm(false)}>
          <ModalBlock>
            <ModalTitle>Crowdwiz diamond asset, DIAMOND</ModalTitle>
            <ContentRow>
              <Label>{t('wallets.available')}</Label>
              <p>102 000 DIAMOND</p>
            </ContentRow>
            <SelectGroup>
              <span>{t('wallets.enrollmentAccount')}</span>
              <Select checkList={checkList} setCheckList={setCheckList} values={selectList} />
            </SelectGroup>
            <TransferButtonGroup>
              <RoundInput placeholder={t('depositsPrograms.amount')} />
              <Button
                danger
                maxWidth={200}
                onClick={() => {
                  setIsSavingConfirm(true);
                  setIsOpenTransferForm(false);
                }}
              >
                {t('depositSelect.transferButton')}
              </Button>
              <Button dangerOutline maxWidth={200} onClick={() => setIsOpenShowForm(true)}>
                {t('depositSelect.transferButton')}
              </Button>
            </TransferButtonGroup>
          </ModalBlock>
        </Modal>
      )}

      {isSavingConfirm && (
        <Modal onClose={() => setIsSavingConfirm(false)}>
          <ModalBlock sm confirm>
            <ConfirmTitle>{t('wallets.transferFunds')}</ConfirmTitle>
            <ConfirmContent>
              Вы уверены, что хотите перевести с Wallet 1 20 000 000 CWD на Wallet 2?
            </ConfirmContent>
            <Button
              danger
              maxWidth={200}
              onClick={() => {
                setIsSavingConfirm(false);
              }}
            >
              {t('acceptAll.accept')}
            </Button>
          </ModalBlock>
        </Modal>
      )}
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
const ConfirmTitle = styled.h1`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  color: ${(props) => props.theme.text};
`;
const ConfirmContent = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.1px;

  color: ${(props) => props.theme.text2};
`;
const TransferButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  padding: 0 0 30px;
`;
const Refresh = styled.div<{ refresh?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  & > span {
    font-size: 14px;
    line-height: 16px;
  }
  & > svg {
    transform: ${(props) => (props.refresh ? 'rotate(180deg)' : 'rotate(0deg)')};
    transition: 1s;
  }
`;

const ChipRefresh = styled(Refresh)`
  justify-content: flex-end;
`;
const ChipContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  justify-content: start;
  border-top: 2px solid rgba(81, 81, 114, 0.1);
  padding-top: 15px;
`;
const Chip = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 12px;
  height: 18px;
  text-align: center;
  color: #ffffff;
  border-radius: 24px;
  padding: 3px 5px;
  width: fit-content;
  &:nth-child(1n) {
    background: #ff416e;
  }
  &:nth-child(2n) {
    background: #6db9ff;
  }
  &:nth-child(3n) {
    background: #bcd476;
  }
  &:nth-child(4n) {
    background: #f28ce8;
  }
  &:nth-child(5n) {
    background: #a78cf2;
  }
  &:nth-child(6n) {
    background: #ffb23e;
  }
  &:nth-child(7n) {
    background: #84ddf9;
  }
  &:nth-child(8n) {
    background: #78ebd6;
  }
`;

const RoundInput = styled.input`
  max-width: 200px;
  width: 100%;
  border: 1px solid rgba(86, 101, 127, 0.3);
  box-sizing: border-box;
  border-radius: 24px;

  min-height: 40px;
  padding: 8px 20px;
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  background: transparent;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.text2};
  border: 1px solid #ff416e;
  text-align: center;
  &::-webkit-input-placeholder {
    color: ${(props) => props.theme.text};
  }
  &:focus {
    outline: none;
  }
`;

const NewWalletTitle = styled.h3`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;

  color: #0e0d3d;
  color: ${(props) => props.theme.text2};
`;

const ContentRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 7px;
  & > p {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 14px;
    letter-spacing: 0.1px;
    color: #56657f;
    color: ${(props) => props.theme.acceptAll.desc};

    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;
const SelectGroup = styled.div`
  width: 100%;
  position: relative;
  & > span {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.1px;
    color: ${(props) => props.theme.depositHead};
    position: absolute;
    top: -10px;
    left: 10px;
    background: #fff;

    position: absolute;
    padding: 0 10px;
    z-index: 9;
    background: ${(props) => props.theme.card.background};
  }
`;

const InputsRow = styled.div`
  display: flex;
  gap: 15px;
  justify-content: space-between;
`;

const KeyWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 25px;
  gap: 10px;
`;
const KeyInput = styled.textarea`
  resize: none;
  outline: none;
  width: 100%;
  position: relative;
  &:disabled {
  }
  &::placeholder {
  }
  &:focus {
    background: ${(props) => props.theme.inputBg};
    background: #fff0f0;
  }
  font-family: 'Roboto', sans-serif;
  background: ${(props) => props.theme.rounIputBackground};
  border: 1px solid #56657f;
  box-sizing: border-box;
  border-radius: 9px;
  padding: 8px;

  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: center;
  letter-spacing: 0.1px;
  color: #515172;
`;

const Label = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.depositHead};
`;
const KeyText = styled.p`
  max-width: 100%;
  word-break: break-all;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: center;
  letter-spacing: 0.1px;
  padding: 9px 0;
  color: ${(props) => props.theme.text2};
`;
const KeysBLock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const InputsBLock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 10px 0;
  border-top: 2px solid rgba(81, 81, 114, 0.1);
  border-bottom: 2px solid rgba(81, 81, 114, 0.1);
`;

const ModalContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
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
    line-height: 16px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #ffffff;
  }
`;

const ModalTitle = styled.h1`
  width: 100%;

  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  letter-spacing: 0.1px;

  color: ${(props) => props.theme.text2};
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(81, 81, 114, 0.2);
`;

const ModalBlock = styled.div<{ sm?: boolean; confirm?: boolean }>`
  display: flex;
  flex-direction: column;
  max-width: 345px;
  width: 100%;
  padding: ${(props) => (props.sm ? '50px 0' : '')};
  padding: ${(props) => (props.confirm ? '35px 30px' : '')};
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  gap: 25px;
  @media (max-width: 576px) {
  }
`;

const Wallet = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 20px 22px;
  cursor: pointer;

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

// const Input = styled.input`
//   width: 100%;
//   border: 1px solid rgba(86, 101, 127, 0.3);
//   box-sizing: border-box;
//   border-radius: 2px;
//   min-height: 40px;
//   padding: 8px;
//   font-weight: normal;
//   font-size: 14px;
//   line-height: 21px;
//   letter-spacing: 0.1px;
//   background: transparent;
//   color: ${(props) => props.theme.text2};
//   &:focus {
//     outline: none;
//   }
// `;

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
