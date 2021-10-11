import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Modal } from '../../components/Modal/Modal';

interface Iprops {
  open: boolean;
  setOpen: (open: boolean) => void;
  convertedArray: number[];
}
export const ConvertingModalSuccess: FC<Iprops> = ({ open, setOpen, convertedArray }: Iprops) => {
  const { t } = useTranslation();

  return (
    <>
      {open && (
        <Modal onClose={() => setOpen(false)} width={420}>
          <ModalBlock>
            <ModalTitle>{t('privateArea.convertingSuccess')}</ModalTitle>
            <ModalContent>
              <ContentTitle>Конвертация CWD в MULTICS успешно завершена:</ContentTitle>
              <ContentBody>
                <span>
                  Списано CWD:{' '}
                  <strong>
                    {(convertedArray[0] / 100000).toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}
                  </strong>
                </span>
                <span>
                  Курс CWD-MULTICS:{' '}
                  <strong>
                    {(convertedArray[1] / convertedArray[2] / 1000).toLocaleString('ru-RU', {
                      maximumFractionDigits: 2,
                    })}
                  </strong>
                </span>
                <span>
                  Зачислено MULTICS:{' '}
                  <strong>
                    {+convertedArray[2].toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ') / 100}
                  </strong>
                </span>
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
  color: #000000;
`;

const ContentBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: start;
  color: #000000;
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
