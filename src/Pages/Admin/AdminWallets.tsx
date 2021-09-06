import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import moment from 'moment';
import { ReactComponent as CircleOk } from '../../assets/svg/circleOk.svg';
import { ReactComponent as Exit } from '../../assets/svg/exit.svg';
import { ReactComponent as Pen } from '../../assets/svg/pen.svg';
import { ReactComponent as UpdateCircle } from '../../assets/svg/updateCircle.svg';
import { Button } from '../../components/Button/Button';
import { Modal } from '../../components/Modal/Modal';
import { Notification } from '../../components/Notify/Notification';
import { Select } from '../../components/Select/Select3';
import { Loading } from '../../components/UI/Loading';
import { UpTitle } from '../../components/UI/UpTitle';
import { AppContext } from '../../context/HubContext';
import { Balance, Notify } from '../../types/balance';
import { AddCompanyAccountModel, BalanceModel, CompanyAccountModel, CompanyAccountModelCollectionResult } from '../../types/balanceModel';
import { SortingType } from '../../types/sorting';
import { CollectionUsers } from '../../types/users';
import { Pagination } from './Pagination';
import * as Styled from './Styled.elements';
import { Input } from './Styled.elements';

export const AdminWallets = () => {
  const [name, setName] = useState('');
  const [isActiveKeyActive, setIsActiveKeyActive] = useState(false);
  const [isKeyNotesActive, setIsKeyNotesActive] = useState(false);
  const [editActiveKeyValue, setEditActiveKeyValue] = useState('');
  const [editKeyNotesValue, setEditKeyNotesValue] = useState('');

  const [loading, setLoading] = useState(true);
  const [totalCompanyAccounts, setTotalCompanyAccounts] = useState(0);
  const [open, setOpen] = useState(false);
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const logOut = appContext.logOut;
  const user = appContext.user;
  const { t } = useTranslation();
  const backDays: any = moment().subtract(30, 'days');
  const [pageLength, setPageLength] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sorting, setSorting] = useState<SortingType[]>([]);
  const [isOpenNewForm, setIsOpenNewForm] = useState(false);
  const [isOpenShowForm, setIsOpenShowForm] = useState(false);
  const [isOpenTransferForm, setIsOpenTransferForm] = useState(false);
  const [isSavingConfirm, setIsSavingConfirm] = useState(false);
  // const [checkList, setCheckList] = useState<any>([]);
  // const selectList = [t('win.one'), t('win.two'), t('win.three')];
  const [notifications, setNotifications] = useState<Notify[]>([]);

  const [companyAccountsList, setCompanyAccountsList] = useState<CompanyAccountModel[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<CompanyAccountModel | null>(null);
  const [selectedBalance, setSelectedBalance] = useState<BalanceModel | null>(null);
  const [transferToAccount, setTransferToAccount] = useState<CompanyAccountModel | null>(null);
  const [transferAmount, setTransferAmount] = useState('');
  const [newWalletLoading, setNewWalletLoading] = useState(false);
  const [editWalletLoading, setEditWalletLoading] = useState(false);
  const [refreshAccountBalanceLoading, setRefreshAccountBalanceLoading] = useState(false);
  const [accountsTransferLoading, setAccountsTransferLoading] = useState(false);
  const [newWallet, setNewWallet] = useState({
    name: '',
    activeKey: '',
    keyNotes: ''
  });

  useEffect(() => {
    handleGetCompanyAccounts();
  }, [hubConnection, currentPage, pageLength]);


  const createNotify = (item: Notify) => {
    setNotifications([item]);
  };

  const onDelete = (id: number) => {
    setNotifications(notifications.filter((i) => i.id !== id));
  };

  // Get Company Accounts List
  const handleGetCompanyAccounts = () => {
    if (hubConnection) {
      setLoading(true);
      hubConnection
        .invoke<CompanyAccountModelCollectionResult>(
          'GetCompanyAccounts',
          (currentPage - 1) * pageLength,
          pageLength,
          sorting
        )
        .then((res) => {
          setLoading(false);
          console.log("Wallet List:::", res);
          setCompanyAccountsList(res.collection);
          setTotalCompanyAccounts(res.totalRecords);
          setLoading(false);
        })
        .catch((err: Error) => {
          setLoading(false);
          // TODO: update error message
          createNotify({
            text: err.message,
            error: true,
            timeleft: 5,
            id: notifications.length,
          });
          console.error("Wallet List ERR :::", err);
        });
    }
  };


  // Create Company Account
  const handleAddCompanyAccount = () => {
    if(hubConnection) {
      // Check if there is NO empty values
      if(!newWallet.name || !newWallet.activeKey || !newWallet.keyNotes) {
        return;
      }

      setNewWalletLoading(true);

      const newCompanyAccount: AddCompanyAccountModel = {
        name: newWallet.name,
        activeWif: newWallet.activeKey,
        memoWif: newWallet.keyNotes
      };

      hubConnection
        .invoke<CompanyAccountModel>(
          'AddCompanyAccount',
          newCompanyAccount
        )
        .then((res) => {
          setNewWalletLoading(false);
          setIsOpenNewForm(false);
          setNewWallet({
            name: '',
            activeKey: '',
            keyNotes: ''
          });

          // Fetch Company Accounts List
          handleGetCompanyAccounts();

          // TODO: update Success message
          // createNotify({
          //   text: 'Created Successfully!',
          //   error: false,
          //   timeleft: 5,
          //   id: notifications.length,
          // });
        })
        .catch((err: Error) => {
          setNewWalletLoading(false);
          console.error("Wallet Create Err", err);
          createNotify({
            text: err.message,
            error: true,
            timeleft: 5,
            id: notifications.length,
          });
        });
    }
  };

  // Handle Update Company Account Data
  const handleUpdateCompanyAccount = () => {
    if(hubConnection) {
      setEditWalletLoading(true);

      const updateData = {
        activeWif: editActiveKeyValue,
        memoWif: editKeyNotesValue,
      };

      hubConnection
        .invoke<null>(
          'AdjustCompanyAccount',
          selectedAccount?.safeId,
          updateData
        )
        .then((res) => {
          setEditWalletLoading(false);
          // Fetch List With updated Data
          handleGetCompanyAccounts();

          // Update Selected Account 
          setSelectedAccount((acc) => (
            acc ? {
              ...acc, 
              activeWif: editActiveKeyValue, 
              memoWif: editKeyNotesValue
            } 
            : 
            null
          ));

          // Set state to NON edit mode
          setIsActiveKeyActive(false);
          setIsKeyNotesActive(false);
        })
        .catch((err: Error) => {
          setEditWalletLoading(false);

          setIsActiveKeyActive(false);
          setIsKeyNotesActive(false);
        });
    }
  };

  // Refetch Selected Account Balance Data
  const handleRefreshAccountBalance = () => {
    if(hubConnection) {
      setRefreshAccountBalanceLoading(true);
      hubConnection
        .invoke<BalanceModel[]>(
          'RefreshAccountBalance',
          selectedAccount?.safeId
        )
        .then((res) => {
          setSelectedAccount((state) => state ? {...state, balances: res} : null);
          setRefreshAccountBalanceLoading(false);
        })
        .catch((err: Error) => {
          console.log(" RefreshAccountBalance:::", err.message);
          setRefreshAccountBalanceLoading(false);
        });
    }
  };


  // Transfer Between Company Accounts
  const handleAccountsTransfer = () => {
    // AccountsTransfer(string accountSafeIdFrom, string accountSafeIdTo, string volume, BalanceKind balanceKind)
    if(hubConnection) {
      console.log("accountSafeIdFrom", selectedAccount?.safeId);
      console.log("accountSafeIdTo", transferToAccount?.safeId);
      console.log("volume", transferAmount);
      console.log("BalanceKind", selectedBalance?.balanceKind);
      setAccountsTransferLoading(true);
      hubConnection
        .invoke<any>(
          'AccountsTransfer',
          selectedAccount?.safeId,
          transferToAccount?.safeId,
          transferAmount,
          selectedBalance?.balanceKind
        )
        .then((res) => {
          setAccountsTransferLoading(false);
          console.log("AccountsTransfer:::", res);
          // TODO: update Success message
          // createNotify({
          //   text: "Success",
          //   error: false,
          //   timeleft: 5,
          //   id: notifications.length,
          // });

          // Close Transfer Confirm Modal
          handleCloseConfirmTransferModal();
        })
        .catch((err: Error) => {
          setAccountsTransferLoading(false);
          console.log(" AccountsTransfer ERR:::", err.message);
          // TODO: update error message
          createNotify({
            text: err.message,
            error: true,
            timeleft: 5,
            id: notifications.length,
          });

           // Close Transfer Confirm Modal
           handleCloseConfirmTransferModal()
        });
    }
  };


  const handleShowCompanyAccount = (accountToShow: CompanyAccountModel) => {
    setSelectedAccount(accountToShow);
    setEditActiveKeyValue(accountToShow.activeWif);
    setEditKeyNotesValue(accountToShow.memoWif);
  };

  useEffect(() => {
    if(selectedAccount) {
      setIsOpenShowForm(true);
    }
  }, [selectedAccount]);

  const handleCloseShowForm = () => {
    setIsOpenShowForm(false);
    setSelectedAccount(null);
    setEditActiveKeyValue('');
    setEditKeyNotesValue('');
    setIsActiveKeyActive(false);
    setIsKeyNotesActive(false);
  };

  const handleShowTransferModal = (balance: BalanceModel) => {
    // Close Account Details Modal
    setIsOpenShowForm(false);

    setSelectedBalance(balance);
    setIsOpenTransferForm(true);
  };

  const handleGoBackFromTransferModal = () => {
     // Show Account Details Modal
     setIsOpenShowForm(true);

     setSelectedBalance(null);
     setTransferAmount('');
     setTransferToAccount(null);
     setIsOpenTransferForm(false);
  };

  const handleCloseTransferModal = () => {
    // Close Account Modal all states
    handleCloseShowForm();

    setSelectedBalance(null);
    setTransferAmount('');
    setTransferToAccount(null);
    setIsOpenTransferForm(false);
  };

  const handleShowConfirmTransferModal = () => {
    if(!transferAmount || !transferToAccount) {
      return;
    }
    // Close Transfer Modal
    setIsOpenTransferForm(false);

    setIsSavingConfirm(true);
  };

  const handleCloseConfirmTransferModal = () => {
    setIsSavingConfirm(false);

    // Break All States and Values
    handleCloseTransferModal();
  };

  return (
    <WalletsPageWrapper>
      <Styled.HeadBlock style={{ justifyContent: 'space-between' }}>
        <ButtonGroup>
          <Button danger maxWidth={158} onClick={() => setIsOpenNewForm(true)}>
            {t('wallets.newWallet')}
          </Button>
          <Button dangerOutline maxWidth={158} onClick={handleGetCompanyAccounts}>
            {t('wallets.refreshAll')}
          </Button>
        </ButtonGroup>
        <UpTitle small>{t('adminUsers.uptitle')}</UpTitle>
        <Styled.UserName>
          <span>{user}</span>
          <Exit onClick={logOut} />
        </Styled.UserName>
      </Styled.HeadBlock>

      {
        companyAccountsList.length > 0 ? 
            (
              <WalletTable>
                {companyAccountsList.map((companyAccount) => (
                  <Wallet key={companyAccount.id} onClick={() => handleShowCompanyAccount(companyAccount)}>
                    <Name>{companyAccount.name}</Name>
                    <BalanceText>Баланс, CWD</BalanceText>
                    <AmountGroup>
                      <Count>{companyAccount.balances.find(b => b.balanceKind === 1)?.safeAmount || "0"}</Count>
                      <PlusNumber>
                        {(companyAccount.balances.length - 1) > 0 ? `+${companyAccount.balances.length - 1}` : ''}
                      </PlusNumber>
                    </AmountGroup>
                  </Wallet>
                ))}
              </WalletTable>
            )
          :
            loading ? (
              <Loading />
          ) : (
            <NotFound>{t('notFound')}</NotFound>
          )
      }

      {/* {selectedAccount && (
        <Modal onClose={() => setSelectedAccount(null)}>
          <ModalBlock>
            <ModalTitle>{selectedAccount.name}</ModalTitle>
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
      )} */}

      {isOpenNewForm && (
        <Modal onClose={() => setIsOpenNewForm(false)}>
          <ModalBlock sm>
            <NewWalletTitle>{t('wallets.newWallet')}</NewWalletTitle>
            <RoundInput 
              value={newWallet.name}
              onChange={(e) => setNewWallet((state) => ({...state, 'name': e.target.value}))}
              spellCheck="false" 
              placeholder={t('wallets.name')} 
            />
            <RoundInput 
              value={newWallet.activeKey}
              onChange={(e) => setNewWallet((state) => ({...state, 'activeKey': e.target.value}))}
              spellCheck="false" 
              placeholder={t('wallets.activeKey')} 
            />
            <RoundInput 
              value={newWallet.keyNotes}
              onChange={(e) => setNewWallet((state) => ({...state, 'keyNotes': e.target.value}))}
              spellCheck="false" 
              placeholder={t('wallets.keyNotes')} 
            />
            <Button
              danger
              maxWidth={200}
              onClick={handleAddCompanyAccount}
            >
              {t('wallets.create')}
            </Button>
          </ModalBlock>
        </Modal>
      )}

      {isOpenShowForm && selectedAccount && (
        <Modal onClose={handleCloseShowForm}>
          <ModalBlock>
            <ModalTitle>{selectedAccount.name}</ModalTitle>
            <KeysBLock>
              <div>
                <Label>{t('wallets.activeKey')}</Label>
                <KeyWrapper>
                  {isActiveKeyActive ? (
                    <KeyInput
                      spellCheck="false"
                      onChange={(e) => setEditActiveKeyValue(e.target.value)}
                      value={editActiveKeyValue}
                    />
                  ) : (
                    <KeyText>{selectedAccount.activeWif}</KeyText>
                  )}
                  {isActiveKeyActive ? (
                    <CircleOk onClick={handleUpdateCompanyAccount} />
                  ) : (
                    <Pen onClick={() => {setIsActiveKeyActive(true)}} />
                  )}
                </KeyWrapper>
              </div>
              <div>
                <Label>{t('wallets.keyNotes')}</Label>
                <KeyWrapper>
                  {isKeyNotesActive ? (
                    <KeyInput
                      spellCheck="false"
                      onChange={(e) => setEditKeyNotesValue(e.target.value)}
                      value={editKeyNotesValue}
                    />
                  ) : (
                    <KeyText>{selectedAccount.memoWif}</KeyText>
                  )}
                  {isKeyNotesActive ? (
                    <CircleOk onClick={handleUpdateCompanyAccount} />
                  ) : (
                    <Pen onClick={() => {setIsKeyNotesActive(true)}} />
                  )}
                </KeyWrapper>
              </div>
            </KeysBLock>

            <ChipContent>
              {
                selectedAccount?.balances.map((balance, i) => (
                  <Chip key={`balance-item-${i}`} onClick={() => handleShowTransferModal(balance)}>
                    {`${Balance[balance.balanceKind]} - ${balance.safeAmount}`}
                  </Chip>
                ))
              }
              {/* <Chip>Na - 0</Chip>
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
              <Chip>GLOBALSAFE - 235 468</Chip> */}

              <ChipRefresh refresh={refreshAccountBalanceLoading}>
                <Label>{t('wallets.for')} {moment(new Date()).format('DD.MM.YYYY')}</Label>
                <UpdateCircle onClick={handleRefreshAccountBalance} />
              </ChipRefresh>
            </ChipContent>
          </ModalBlock>
        </Modal>
      )}


      {isOpenTransferForm && selectedBalance && (
        <Modal onClose={handleCloseTransferModal}>
          <ModalBlock>
            <ModalTitle>{`${selectedAccount?.name}, ${Balance[selectedBalance?.balanceKind]}`}</ModalTitle>
            <ContentRow>
              <Label>{t('wallets.available')}</Label>
              <p>{selectedBalance?.amount} {Balance[selectedBalance?.balanceKind]}</p>
            </ContentRow>

            <SelectGroup>
              {/* <span>{t('wallets.enrollmentAccount')}</span> */}
              {/* <Select checkList={checkList} setCheckList={setCheckList} values={selectList} /> */}
              <Select 
                label={t('wallets.enrollmentAccount')}
                selectedOption={transferToAccount?.name || null} 
                setSelectedOption={(val) => setTransferToAccount(companyAccountsList.find(acc => acc.name === val) || null)} 
                options={
                  companyAccountsList.filter(account => account.id !== selectedAccount?.id).map(account => account.name)
                } 
              />
            </SelectGroup>
            
            <TransferButtonGroup>
              <RoundInput 
                placeholder={t('depositsPrograms.amount')}
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)} 
              />
              <Button
                danger
                maxWidth={200}
                onClick={handleShowConfirmTransferModal}
              >
                {t('depositSelect.transferButton')}
              </Button>
              <Button dangerOutline maxWidth={200} onClick={handleGoBackFromTransferModal}>
                {t('depositsPrograms.return')}
              </Button>
            </TransferButtonGroup>
          </ModalBlock>
        </Modal>
      )}

      {isSavingConfirm && selectedBalance && (
        <Modal onClose={handleCloseConfirmTransferModal}>
          <ModalBlock sm confirm>
            <ConfirmTitle>{t('wallets.transferFunds')}</ConfirmTitle>
            <ConfirmContent>
              {`Вы уверены, что хотите перевести с ${selectedAccount?.name} ${transferAmount} ${Balance[selectedBalance.balanceKind]} на ${transferToAccount?.name}?`}
            </ConfirmContent>
            <Button
              danger
              maxWidth={200}
              onClick={handleAccountsTransfer}
            >
              {t('acceptAll.accept')}
            </Button>
          </ModalBlock>
        </Modal>
      )}

    <PaginationContainer>
      <Pagination
        pageLength={pageLength}
        setPageLength={setPageLength}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalLottery={totalCompanyAccounts}
      />
    </PaginationContainer>

      <Notification onDelete={onDelete} data={notifications} />
    </WalletsPageWrapper>
  );
};

const WalletsPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 92vh;
`;

const PaginationContainer = styled.div`
  margin-top: auto;
`;

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
  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
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
