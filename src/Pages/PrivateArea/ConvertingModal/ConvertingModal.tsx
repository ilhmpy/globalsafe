import React, { FC, useState, useContext } from 'react';
import styled from 'styled-components';

import * as Styled from '../Styles.elements';
import { CSSTransition } from 'react-transition-group';
import { Modal } from '../../../components/Modal/Modal';
import { Input } from '../../../components/UI/Input';
import { DepositsCollection } from '../../../types/info';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/Button/Button';
import { AppContext } from '../../../context/HubContext';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const ConvertingModal: FC<Props> = ({ open, setOpen }: Props) => {
  const { t } = useTranslation();
  const [value, setValue] = useState('');
  const [mscValue, setMscValue] = useState<any[] | null>(null);
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;

  //   const [open, setOpen] = useState(false);

  return (
    <CSSTransition in={open} timeout={300} unmountOnExit>
      <Modal onClose={() => setOpen(false)}>
        <Styled.ModalTitle style={{ marginTop: '30px' }}>
          {t('privateArea.toToken')}
        </Styled.ModalTitle>
        <ModalCurrencyDiv>
          <Input
            maxLength={6}
            onKeyUp={(e) => {
              if (e.keyCode == 8) {
                console.log('backspace');
                setMscValue([0, 0, 0]);
              }
            }}
            onChange={(e) => {
              const arr = e.target.value.split('-');
              const fromSplitted = arr[0].split('.');
              const toSplitted = arr.length === 2 ? arr[1].split('.') : '';
              const validValue = e.target.value.replace(/[^0-9]/gi, '');
              setMscValue([0, 0, 0]);

              if (hubConnection && validValue.length > 0) {
                hubConnection
                  .invoke('CalculateBalanceExchange', (Number(validValue) * 100000).toString(), 59)
                  .then((res) => {
                    console.log(res);
                    setMscValue(res);
                  })
                  .catch((e) => console.error(e));
              }

              setValue(validValue);
            }}
            value={value}
          />
          <span>CWD</span>
        </ModalCurrencyDiv>
        <H3>
          {t('privateArea.convert')} -{' '}
          <H3 red>
            {mscValue
              ? (mscValue[1] / 100000).toLocaleString('ru-RU', { maximumFractionDigits: 2 })
              : 0}{' '}
            CWD
          </H3>
        </H3>
        <H3>
          {t('privateArea.rate')} -{' '}
          <H3 red>
            {mscValue && mscValue[1] > 0
              ? (+mscValue[1] / +mscValue[2] / 1000.0).toLocaleString('ru-RU', {
                  maximumFractionDigits: 2,
                })
              : 0}
          </H3>
        </H3>
        <H3 bold>
          {t('privateArea.sumIn')} - <H3 red>{mscValue ? mscValue[2] / 100 : 0} MULTICS</H3>
        </H3>
        <Button
          style={{ margin: '0 auto', width: '200px', maxWidth: '200px', marginBottom: '30px' }}
          danger
          onClick={() => {
            if (hubConnection) {
              hubConnection
                .invoke('BalanceExchange', (Number(value) * 100000).toString(), 59)
                .then((res) => {
                  setOpen(false);
                })
                .catch((e) => console.error(e));
            }
          }}
        >
          {t('privateArea.translate')}
        </Button>
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
    max-width: 200px;
    margin: 0 auto;
    margin-bottom: 20px;
    color: ${({ theme }) => theme.toToken.color};

    &::placeholder {
      color: ${({ theme }) => theme.toToken.color};
    }
  }
`;

export const H3 = styled.div<{ red?: boolean; bold?: boolean }>`
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
    }
    if (bold) {
      return `
          font-weight: 500;
        `;
    }
  }}
`;
