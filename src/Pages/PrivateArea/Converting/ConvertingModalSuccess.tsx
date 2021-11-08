import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '../../../components/Modal/Modal';
import { IBalanceExchange } from './ConvertingModal';
import {
  CloseButton,
  ContentBody,
  ContentTitle,
  Dots,
  KeySpan,
  ModalBlock,
  ModalContent,
  ModalTitle,
} from './styled';

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setConvertedData: (convertedData: IBalanceExchange) => void;
  convertedData: IBalanceExchange;
}
export const ConvertingModalSuccess: FC<IProps> = ({
  open,
  setOpen,
  convertedData,
  setConvertedData,
}: IProps) => {
  const { t } = useTranslation();
  const { userAmount, calculatedAmount, targetAmount, discountPercent } = convertedData;

  const handleModalClose = () => {
    setOpen(false);
    setConvertedData({
      userAmount: 0,
      calculatedAmount: 0,
      targetAmount: 0,
      discountPercent: 0,
    });
  };

  return (
    <>
      {open && (
        <Modal onClose={handleModalClose} width={420}>
          <ModalBlock>
            <ModalTitle>{t('privateArea.convertingSuccess')}</ModalTitle>
            <ModalContent gap20>
              <ContentTitle>Конвертация CWD в MULTICS успешно завершена:</ContentTitle>
              <CloseButton onClick={handleModalClose} />
              <ContentBody>
                <p>
                  <KeySpan>Списано (CWD):</KeySpan>
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
                  <KeySpan>Курс (CWD-MULTICS):</KeySpan>
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
                  <KeySpan>Зачислено (MULTICS):</KeySpan>
                  <Dots />
                  <strong>
                    {(targetAmount / 100)
                      .toString()
                      .replace(/(\d)(?=(\d{3})+$)/g, '$1 ')
                      .replace(/(\.0+|0+)$/, '')}
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
