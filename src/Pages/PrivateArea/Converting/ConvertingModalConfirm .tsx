import { FC, useContext } from 'react';
import { Button } from '../../../components/Button/V2/Button';
import { Modal } from '../../../components/Modal/Modal';
import { AppContext } from '../../../context/HubContext';
import { IBalanceExchange } from './ConvertingModal';
import {
  ButtonsWrapper,
  CloseButton,
  ContentBody,
  ContentTitle,
  Dots,
  KeySpan,
  ModalBlock,
  ModalContent,
  ModalTitle,
} from './styled';

interface Iprops {
  open: boolean;
  setOpen: (open: boolean) => void;
  convertedData: IBalanceExchange;
  setIsConfirmConverting: (isConfirm: boolean) => void;
  setIsSuccessConverting: (isSuccess: boolean) => void;
  setIsFailConverting: (isFail: boolean) => void;
  setConvertedData: (open: IBalanceExchange) => void;
  closeWithReset: () => void;
}
export const ConvertingModalConfirm: FC<Iprops> = ({
  open,
  setOpen,
  convertedData,
  setIsConfirmConverting,
  setConvertedData,
  setIsSuccessConverting,
  setIsFailConverting,
  closeWithReset,
}: Iprops) => {
  const { hubConnection } = useContext(AppContext);
  const { userAmount, calculatedAmount, targetAmount, discountPercent } = convertedData;

  const convert = async () => {
    (async () => {
      if (hubConnection) {
        try {
          const response = await hubConnection.invoke<IBalanceExchange>(
            'BalanceExchange',
            (userAmount + 1).toString(),
            59
          );
          if (response.calculatedAmount && response.targetAmount) {
            setOpen(false);
            setConvertedData(response);
            setIsSuccessConverting(true);
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
        <Modal onClose={closeWithReset} width={420}>
          <ModalBlock>
            <ModalTitle>Подтверждение конвертации</ModalTitle>
            <ModalContent>
              <ContentTitle mb10>Вы собираетесь сконвертировать средства:</ContentTitle>
              <CloseButton onClick={closeWithReset} />
              <ContentBody>
                <p>
                  <KeySpan>К списанию (CWD)</KeySpan>
                  <Dots />
                  <strong>
                    {(userAmount / 100000).toString().split('.').length > 1
                      ? `${(userAmount / 100000)
                          .toString()
                          .split('.')[0]
                          .replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}.${
                          (userAmount / 100000).toFixed(5).toString().split('.')[1]
                        }`.replace(/(\.0+|0+)$/, '')
                      : (userAmount / 100000).toFixed(5).replace(/(\.0+|0+)$/, '')}
                  </strong>
                </p>
                <p>
                  <KeySpan>Курс:</KeySpan>
                  <Dots />

                  <strong>
                    {(calculatedAmount / targetAmount / 1000).toString().split('.').length > 1
                      ? `${(calculatedAmount / targetAmount / 1000)
                          .toString()
                          .split('.')[0]
                          .replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}.${
                          (calculatedAmount / targetAmount / 1000)
                            .toFixed(5)
                            .toString()
                            .split('.')[1]
                        }`.replace(/(\.0+|0+)$/, '')
                      : (calculatedAmount / targetAmount / 1000)
                          .toFixed(5)
                          .replace(/(\.0+|0+)$/, '')}
                  </strong>
                </p>
                <p>
                  <KeySpan>Скидка (%):</KeySpan>
                  <Dots />

                  <strong>{discountPercent}</strong>
                </p>
                <p>
                  <KeySpan>К получению (MULTICS):</KeySpan>
                  <Dots />

                  <strong>
                    {(targetAmount / 100)
                      .toString()
                      .replace(/(\d)(?=(\d{3})+$)/g, '$1 ')
                      .replace(/(\.0+|0+)$/, '')}
                  </strong>
                </p>
                <ButtonsWrapper>
                  <Button
                    bigSize
                    primary
                    onClick={() => {
                      convert();
                      setIsConfirmConverting(true);
                      setOpen(false);
                    }}
                  >
                    Сконвертировать
                  </Button>
                  <Button
                    fullWidth
                    bigSize
                    outlinePrimary
                    onClick={() => {
                      setConvertedData({
                        userAmount: 0,
                        calculatedAmount: 0,
                        targetAmount: 0,
                        discountPercent: 0,
                      });
                      setOpen(false);
                    }}
                  >
                    Отмена
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
