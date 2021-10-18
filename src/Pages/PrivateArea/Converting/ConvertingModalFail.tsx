import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Modal } from '../../../components/Modal/Modal';
import { IBalanceExchange } from './ConvertingModal';
import { CloseButton, ContentTitle, ModalBlock, ModalContent, ModalTitle } from './styled';

interface Iprops {
  open: boolean;
  setOpen: (open: boolean) => void;
  setConvertedData: (convertedData: IBalanceExchange) => void;
}
export const ConvertingModalFail: FC<Iprops> = ({ open, setOpen, setConvertedData }: Iprops) => {
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
              <ContentBody>
                <span>На балансе аккаунта недостаточно средств</span>
              </ContentBody>
            </ModalContent>
          </ModalBlock>
        </Modal>
      )}
    </>
  );
};

const ContentBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: start;
  color: #ff4a31;
`;
