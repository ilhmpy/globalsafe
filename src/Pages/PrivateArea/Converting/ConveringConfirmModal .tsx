import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/Button/V2/Button';
import { Modal } from '../../../components/Modal/Modal';
import { AppContext } from '../../../context/HubContext';
import { IBalanceExchange } from './ConvertingModal';
import {
  ButtonsWrapper,
  ContentBody,
  ContentTitle,
  Dots,
  KeySpan,
  ModalBlock,
  ModalContent,
  ModalTitle,CloseButton
} from './styled';

interface Iprops {
  open: boolean;
  setOpen: (open: boolean) => void;
  convertedData: IBalanceExchange;
  setIsConfirmConverting: (isConfirm: boolean) => void;
  setIsSuccessConverting: (isSuccess: boolean) => void;
  setIsFailConverting: (isFail: boolean) => void;
  setConvertedData: (open: IBalanceExchange) => void;
}
export const ConvertingModalConfirm: FC<Iprops> = ({
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
            <ModalTitle>Подтверждение конвертации</ModalTitle>
            <ModalContent>
              <ContentTitle mb10>Вы собираетесь сконвертировать средства:</ContentTitle>
              <CloseButton onClick={() => setOpen(false)} />
              <ContentBody>
                <p>
                  <KeySpan>К списанию (CWD)</KeySpan>
                  <Dots />
                  <strong>
                    {(convertedData.userAmount / 100000).toLocaleString('ru-RU', {
                      maximumFractionDigits: 2,
                    })}
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
                    {convertedData.targetAmount.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}
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
