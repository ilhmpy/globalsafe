import React, { FC, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { ReactComponent as Close } from '../../assets/svg/close.svg';
import { ReactComponent as FromTo } from '../../assets/svg/fromTo.svg';
import { Button } from '../../components/Button/V2/Button';
import { Modal } from '../../components/Modal/Modal';
import { Select } from '../../components/Select/Select5';
import { AppContext } from '../../context/HubContext';

interface Props {
  open: boolean;
  converting?: boolean;
  setOpen: (open: boolean) => void;
  setIsSuccessConverting: (status: boolean) => void;
  setIsFailConverting: (status: boolean) => void;
}

export const ConvertingModal: FC<Props> = ({
  open,
  setOpen,
  converting,
  setIsSuccessConverting,
  setIsFailConverting,
}: Props) => {
  const { t } = useTranslation();
  const [fromSum, setFromSum] = useState('');
  const [toSum, setToSum] = useState('');
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;

  return (
    <CSSTransition in={open} timeout={300} unmountOnExit>
      <Modal onClose={() => setOpen(false)} width={420}>
        <Container>
          <ModalTitle>{t('privateArea.converting')}</ModalTitle>
          <CloseButton onClick={() => setOpen(false)} />

          <ContentWrapper>
            <InnerBlock>
              <Select
                placeholder="Исходная валюта не выбрана"
                options={['One', 'Two', 'Three']}
                selectedOption={fromCurrency}
                setSelectedOption={(val: string) => setFromCurrency(val)}
              />
              <Input
                placeholder="Сумма"
                name="fromSum"
                value={fromSum}
                onChange={(e) => setFromSum(e.target.value)}
              />
            </InnerBlock>
            <FromToArrow />
            <InnerBlock>
              <Select
                placeholder="Валюта к получению не выбрана"
                options={['One', 'Two', 'Three']}
                selectedOption={toCurrency}
                setSelectedOption={(val: string) => setToCurrency(val)}
              />
              <Input
                placeholder="Сумма"
                name="toSum"
                value={toSum}
                onChange={(e) => setToSum(e.target.value)}
              />
              <RateRow>
                <Rate>Курс:</Rate>
                <Rate>0</Rate>
              </RateRow>
              <Button
                primary
                onClick={() => {
                  setOpen(false);
                  setTimeout(() => setIsSuccessConverting(true), 500);
                }}
              >
                {converting ? t('privateArea.convert2') : t('privateArea.topUpBalance')}
              </Button>
            </InnerBlock>
          </ContentWrapper>
        </Container>
      </Modal>
    </CSSTransition>
  );
};

const FromToArrow = styled(FromTo)`
  position: absolute;
  left: 49%;
  top: 32%;
`;

const Rate = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #000000;
`;

const RateRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 40px;
`;

export const Input = styled.input`
  width: 100%;
  border: 1px solid #edf0f7;
  box-sizing: border-box;
  border-radius: 2px;
  min-height: 40px;
  padding: 8px;
  font-weight: normal;
  background: #f9fafb;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.text2};

  &:focus {
    outline: none;
  }
  ::placeholder,
  ::-webkit-input-placeholder {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    opacity: 0.4;
    color: ${(props) => props.theme.text};
  }
`;

const InnerBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  position: relative;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CloseButton = styled(Close)`
  position: absolute;
  right: 19px;
  top: 19px;
`;

const ModalTitle = styled.h2`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  margin-bottom: 20px;

  color: #3f3e4e;
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

// export const DIV = styled.div`
//   width: 100%;
//   max-width: 200px;
//   margin: 0 auto;

//   & > input {
//     max-width: 200px;
//     margin: 0 auto;
//     margin-bottom: 20px;
//     color: ${({ theme }) => theme.toToken.color};

//     &::placeholder {
//       color: ${({ theme }) => theme.toToken.color};
//     }
//   }
// `;

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
