import { FC, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Button } from '../../components/Button/V2/Button';
import { Modal } from '../../components/Modal/Modal';
import { AppContext } from '../../context/HubContext';
import { Checkbox } from './components/Checkbox';
import { CloseButton, IBalanceExchange } from './ConvertingModal';

interface Iprops {
  open: boolean;
  setOpen: (open: boolean) => void;
  convertedData: IBalanceExchange;
  setIsConfirmConverting: (isConfirm: boolean) => void;
  setIsSuccessConverting: (isSuccess: boolean) => void;
  setIsFailConverting: (isFail: boolean) => void;
  setConvertedData: (open: IBalanceExchange) => void;
}
export const ConvertingModalCorrection: FC<Iprops> = ({
  open,
  setOpen,
  convertedData,
  setIsConfirmConverting,
  setConvertedData,
  setIsSuccessConverting,
  setIsFailConverting,
}: Iprops) => {
  const { t } = useTranslation();
  const { hubConnection } = useContext(AppContext);
  const [isNoShow, setIsNoShow] = useState<boolean>(false);

  const convert = async () => {
    (async () => {
      if (hubConnection) {
        try {
          const response = await hubConnection.invoke<IBalanceExchange>(
            'BalanceExchange',
            convertedData.userAmount.toString(),
            59
          );
          console.log('response', response);
          if (response.calculatedAmount && response.targetAmount) {
            setOpen(false);
            setConvertedData(response);
            setIsSuccessConverting(true);
            // setTimeout(() => resetStateValues(), 1000);
          }
        } catch (error) {
          setIsFailConverting(true);
          console.error(error);
        }
      }
    })();
  };

  return (
    <>
      {open && (
        <Modal onClose={() => setOpen(false)} width={420}>
          <ModalBlock>
            <ModalTitle>Коррекция суммы списания</ModalTitle>
            <ModalContent>
              <ContentTitle>
                Токен MULTICS не имеет дробных значений, в связи с этим указанная вами сумма была
                скорректирована:
              </ContentTitle>
              <CloseButton onClick={() => setOpen(false)} />
              <ContentBody>
                <p>
                  <KeySpan>Указано к списанию (CWD)</KeySpan>
                  <Dots />
                  <strong>
                    {(convertedData.userAmount / 100000)
                      .toString()
                      .replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}
                  </strong>
                </p>
                <p>
                  <KeySpan>Рассчетная сумма к списанию (CWD)</KeySpan>
                  <Dots />
                  <strong>
                    {(convertedData.userAmount / 100000)
                      .toString()
                      .replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}
                  </strong>
                </p>
                <p>
                  <KeySpan>Курс:</KeySpan>
                  <Dots />
                  <strong>
                    {(
                      convertedData.calculatedAmount /
                      convertedData.targetAmount /
                      1000
                    ).toLocaleString('ru-RU', {
                      maximumFractionDigits: 2,
                    })}
                  </strong>
                </p>
                <p>
                  <KeySpan>Скидка (%):</KeySpan>
                  <Dots />
                  <strong>{convertedData.discountPercent}</strong>
                </p>
                <p>
                  <KeySpan>К получению (MULTICS):</KeySpan>
                  <Dots />
                  <strong>
                    {(convertedData.targetAmount / 100)
                      .toString()
                      .replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}
                  </strong>
                </p>
                <CheckboxGroup>
                  <Checkbox checked={isNoShow} onChange={() => setIsNoShow(!isNoShow)} />
                  <KeySpan style={{ width: '100%' }}>Больше не показывать это окно</KeySpan>
                </CheckboxGroup>
                <ButtonsWrapper>
                  <Button
                    bigSize
                    primary
                    fullWidth
                    onClick={() => {
                      convert();
                      setIsConfirmConverting(true);
                      setOpen(false);
                    }}
                  >
                    Ok
                  </Button>
                </ButtonsWrapper>
              </ContentBody>
            </ModalContent>
          </ModalBlock>
        </Modal>
      )}
    </>
  );
};

const CheckboxGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  & > label {
    max-width: 25px;
  }
`;

const Dots = styled.div`
  flex: 1;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.2);
  position: relative;
  bottom: 4px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  gap: 20px;
`;

const KeySpan = styled.div`
  /* width: 100%; */
`;

const ContentTitle = styled.div`
  text-align: start;
  color: #000000;
  margin-bottom: 10px;
`;

const ContentBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: start;
  color: #000000;
  gap: 10px;

  & > p {
    display: flex;
    justify-content: space-between;

    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
  }
`;

const ModalBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;

  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;

  color: #000000;

  @media (max-width: 576px) {
    /* padding: 40px; */
  }
`;
const ModalTitle = styled.h1`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  color: ${(props) => props.theme.text};
  color: #000000;
`;
const ModalContent = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.1px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  color: ${(props) => props.theme.text};
`;
