import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '../../../components/Modal/Modal';
import { IBalanceExchange } from './ConvertingModal';
import {
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
  setConvertedData: (convertedData: IBalanceExchange) => void;
  convertedData: IBalanceExchange;
}
export const ConvertingModalSuccess: FC<Iprops> = ({
  open,
  setOpen,
  convertedData,
  setConvertedData,
}: Iprops) => {
  const { t } = useTranslation();

  return (
    <>
      {open && (
        <Modal
          onClose={() => {
            setOpen(false);
            setConvertedData({
              userAmount: 0,
              calculatedAmount: 0,
              targetAmount: 0,
              discountPercent: 0,
            });
          }}
          width={420}
        >
          <ModalBlock>
            <ModalTitle>{t('privateArea.convertingSuccess')}</ModalTitle>
            <ModalContent gap20>
              <ContentTitle>Конвертация CWD в MULTICS успешно завершена:</ContentTitle>
              <ContentBody>
                <p>
                  <KeySpan>Списано (CWD):</KeySpan>
                  <Dots />
                  <strong>
                    {(convertedData.userAmount / 100000)
                      .toString()
                      .replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}
                  </strong>
                </p>
                <p>
                  <KeySpan>Курс (CWD-MULTICS):</KeySpan>
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
                  <KeySpan>Зачислено (MULTICS):</KeySpan>
                  <Dots />
                  <strong>
                    {(convertedData.targetAmount / 100)
                      .toString()
                      .replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}
                  </strong>
                </p>
              </ContentBody>
            </ModalContent>
          </ModalBlock>
        </Modal>
      )}
    </>
  );
};
