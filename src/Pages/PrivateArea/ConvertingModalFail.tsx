import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Modal } from '../../components/Modal/Modal';

interface Iprops {
  open: boolean;
  setOpen: (open: boolean) => void;
}
export const ConvertingModalFail: FC<Iprops> = ({ open, setOpen }: Iprops) => {
  const { t } = useTranslation();

  return (
    <>
      {open && (
        <Modal onClose={() => setOpen(false)} width={420}>
          <ModalBlock>
            <ModalTitle>{t('privateArea.convertingFail')}</ModalTitle>
            <ModalContent>
              <ContentTitle>Конвертация CWD в MULTICS завершена с ошибкой:</ContentTitle>
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

const ContentTitle = styled.div`
  text-align: start;
`;

const ContentBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: start;
  color: #ff4a31;
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
