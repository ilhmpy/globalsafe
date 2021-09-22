import React, { FC, useState, useContext } from 'react';
import * as Styled from './Styles.elements';
import { CSSTransition } from 'react-transition-group';
import { Modal } from '../../components/Modal/Modal';
import { Input } from "../../components/UI/Input";
import { DepositsCollection } from '../../types/info';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/Button/Button';
import styled from 'styled-components/macro';
import { AppContext } from '../../context/HubContext';

type Props = {
  depositListModal: boolean;
  setDepositListModal: (depositListModal: boolean) => void;
  handleBackModal: () => void;
  depositsList: DepositsCollection[] | null;
  selectDeposit: (item: DepositsCollection) => void;
};

export const DepositListModal: FC<Props> = ({
  depositListModal,
  setDepositListModal,
  handleBackModal,
  depositsList,
  selectDeposit,
}: Props) => {
  const { t } = useTranslation();
  return (
    <CSSTransition in={depositListModal} timeout={3} classNames="modal" unmountOnExit>
      <Modal onClose={() => setDepositListModal(false)}>
        <ModalBackDiv>
          <Styled.ModalBack onClick={handleBackModal} />
        </ModalBackDiv>
        <Styled.ModalTitle>{t('privateArea.addDeposit')}</Styled.ModalTitle>
        <Styled.ModalList>
          <Styled.ModalListItem>
            <Styled.ModalListText head>{t('privateArea.name')}</Styled.ModalListText>
            <Styled.ModalListText head>{t('privateArea.minPay')}</Styled.ModalListText>
            <Styled.ModalListText head>{t('privateArea.depositTerm')}</Styled.ModalListText>
          </Styled.ModalListItem>
          {depositsList
            ? depositsList.map((item) => (
                <Styled.ModalListItem key={item.id} onClick={() => selectDeposit(item)}>
                  <Styled.ModalListText>{item.name}</Styled.ModalListText>
                  <Styled.ModalListText>
                    {(item.minAmount / 100000).toLocaleString()}
                  </Styled.ModalListText>
                  <Styled.ModalListText>
                    {item.duration} {t('privateArea.day')}
                  </Styled.ModalListText>
                </Styled.ModalListItem>
              ))
            : ''}
        </Styled.ModalList>
        <Styled.ModalListButton onClick={() => setDepositListModal(false)} danger>
          {t("privateArea.undr")}
        </Styled.ModalListButton>
      </Modal>
    </CSSTransition>
  );
};

type DividendsProps = {
  onClose: () => void;
  data: any;
  open: boolean;
};

export const ModalDividends: FC<DividendsProps> = ({ onClose, data, open }: DividendsProps) => {
  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };
  const { t } = useTranslation();
  return (
    <Modal onClose={onClose} width={280}>
      <Styled.ModalDividends onClick={handleContainerClick}>
        {data.userDeposit ? (
          <>
            <Styled.PayCardBlock>
              <Styled.PayText wbold>{t('privateArea.dividents')}</Styled.PayText>
              <Styled.PayText>{moment(data.date).format('DD MMMM YYYY')}г.</Styled.PayText>
              <Styled.Hr />
            </Styled.PayCardBlock>
            <Styled.PayCardBlock>
              <Styled.PayText small>{t('privateArea.name')}</Styled.PayText>
              <Styled.PayText>{data.userDeposit.deposit.name}</Styled.PayText>
            </Styled.PayCardBlock>
            <Styled.PayCardBlock>
              <Styled.PayText small>{t('privateArea.dateOpen')}</Styled.PayText>
              <Styled.PayText>
                {moment(data.userDeposit.creationDate).format('DD/MM/YYYY')}
              </Styled.PayText>
            </Styled.PayCardBlock>
            <Styled.PayCardBlock>
              <Styled.PayText small>{t('privateArea.sumDeposit')}</Styled.PayText>
              <Styled.PayText>{data.userDeposit.baseAmountView}</Styled.PayText>
            </Styled.PayCardBlock>
            <Styled.PayCardBlock>
              <Styled.PayText small>{t('privateArea.nextDate')}</Styled.PayText>
              <Styled.PayText>
                {moment(data.userDeposit.paymentDate).format('DD/MM/YYYY')}
              </Styled.PayText>
            </Styled.PayCardBlock>
            <Styled.PayCardBlock>
              <Styled.PayText small>{t('privateArea.amountPay')}</Styled.PayText>
              <Styled.PayText>
                {(data.balance / 100000).toLocaleString('ru-RU', {
                  maximumFractionDigits: 5,
                })}
              </Styled.PayText>
            </Styled.PayCardBlock>
            <Styled.PayCardBlock>
              <Styled.PayText small>{t('privateArea.procent')}</Styled.PayText>
              <Styled.PayText>
                {((data.balance / data.userDeposit.baseAmount) * 100).toLocaleString('ru-RU', {
                  maximumFractionDigits: 2,
                })}
                %
              </Styled.PayText>
            </Styled.PayCardBlock>
          </>
        ) : (
          <>
            <Styled.PayCardBlock>
              <Styled.PayText>{t('privateArea.notData')}</Styled.PayText>
            </Styled.PayCardBlock>
          </>
        )}
      </Styled.ModalDividends>
    </Modal>
  );
};

export const TokenModal = ({ block, setBlock, setToTranslate, onButton }: any) => {
  const { t } = useTranslation(); 
  const [value, setValue] = useState("");
  const [mscValue, setMscValue] = useState<any[] | null>(null);
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;

  return (
    <CSSTransition in={block} timeout={300} unmountOnExit>
      <Modal onClose={() => setBlock(false)}>
        <Styled.ModalTitle style={{ marginTop: "30px" }}>{t("privateArea.toToken")}</Styled.ModalTitle>
        <ModalCurrencyDiv>
          <Input maxLength={6} 
            onKeyUp={(e) => {
              if (e.keyCode == 8) {
                console.log('backspace')
                setMscValue([0, 0, 0]);
              };
            }}
            onChange={(e) => {
              const arr = e.target.value.split('-');
              const fromSplitted = arr[0].split('.');
              const toSplitted = arr.length === 2 ? arr[1].split('.') : '';
              const validValue = e.target.value.replace(/[^0-9]/gi, '');
              setMscValue([0, 0, 0]);

              if (hubConnection && validValue.length > 0) { 
                hubConnection.invoke("CalculateBalanceExchange", (Number(validValue) * 100000).toString(), 59)
                  .then(res => {
                    console.log(res);
                    setMscValue(res);
                  }) 
                  .catch((e) => console.error(e));
              }

              setValue(validValue);
              setToTranslate(validValue);
            }}
            value={value}
          />
          <span>CWD</span> 
        </ModalCurrencyDiv>
        <H3>{t("privateArea.convert")} - <H3 red>{mscValue ? (mscValue[1] / 100000).toLocaleString("ru-RU", { maximumFractionDigits: 2 }) : 0} CWD</H3></H3>
        <H3>{t("privateArea.rate")} - <H3 red>{mscValue && mscValue[1] > 0 ? ((+mscValue[1] / +mscValue[2]) / 1000.0).toLocaleString("ru-RU", { maximumFractionDigits: 2 }) : 0}</H3></H3> 
        <H3 bold>{t("privateArea.sumIn")} - <H3 red>{mscValue ? mscValue[2] / 100 : 0} MULTICS</H3></H3>
        <Button 
          style={{ margin: "0 auto", width: "200px", maxWidth: "200px", marginBottom: "30px" }} 
          danger
          onClick={() => {
            async function req() {
              if (hubConnection) { 
                hubConnection.invoke("BalanceExchange", (Number(value) * 100000).toString(), 59)
                  .then(res => {
                    console.log(res);
                    setBlock(false);
                  }) 
                  .catch((e) => console.error(e));
              }
            }
            req();
          }}
        >{t("privateArea.translate")}</Button>
      </Modal>
    </CSSTransition>
  );
};

const ModalBackDiv = styled.div`
  width: 100%;
`;

const ModalCurrencyDiv = styled.div`
  width: 100%;
  max-width: 200px;
  margin: 0 auto;
  position: relative;
  display: block;

  & > input {
    max-width: 200px;
    margin: 0 auto;
    margin-bottom: 20px;
    color: ${({ theme }) => theme.toToken.color};
    padding-right: 103px;
    text-align: right;
  }

  & > span {
    position: absolute;

    color: ${({ theme }) => theme.toToken.color};
    font-size: 14px;
    top: 13px;
    right: 70px;
  }
`;


export const DIV = styled.div`
  width: 100%;
  max-width: 200px;
  margin: 0 auto;

  & > input {
    max-Width: 200px; 
    margin: 0 auto;
    margin-bottom: 20px; 
    color: ${({ theme }) => theme.toToken.color};
    
    &::placeholder {
      color: ${({ theme }) => theme.toToken.color};
    }
  }
`;

export const H3 = styled.div<{ red?: boolean; bold?: boolean; }>`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: ${({ theme }) => theme.toToken.convertColor};
  margin-bottom: 8px;

  ${({ red, bold }) => {
      if (red) {
        return `
          font-weight: 500;
          color: #FF416E;
        `;
      };
      if (bold) {
        return `
          font-weight: 500;
        `;
      };
    }}
`;