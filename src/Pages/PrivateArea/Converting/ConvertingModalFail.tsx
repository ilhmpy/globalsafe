import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '../../../components/Modal/Modal';
import { IBalanceExchange } from './ConvertingModal';
import {
  CloseButton,
  ContentTitle,
  ModalBlock,
  ModalContent,
  ModalTitle,
  BodyEmpty,
} from './styled';

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setConvertedData: (convertedData: IBalanceExchange) => void;
}
export const ConvertingModalFail: FC<IProps> = ({ open, setOpen, setConvertedData }: IProps) => {
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
            <ModalTitle>{t('privateArea.convertingFail')}</ModalTitle>
            <ModalContent>
              <ContentTitle>Конвертация CWD в MULTICS завершена с ошибкой:</ContentTitle>
              <CloseButton
                onClick={() => {
                  setOpen(false);
                  setConvertedData({
                    userAmount: 0,
                    calculatedAmount: 0,
                    targetAmount: 0,
                    discountPercent: 0,
                  });
                }}
              />
              <BodyEmpty>
                <span>На балансе аккаунта недостаточно средств</span>
              </BodyEmpty>
            </ModalContent>
          </ModalBlock>
        </Modal>
      )}
    </>
  );
};
