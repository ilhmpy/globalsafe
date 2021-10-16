import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Modal } from '../../components/Modal/Modal';
import { IBalanceExchange } from './ConvertingModal';

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
            <ModalContent>
              <ContentTitle>Конвертация CWD в MULTICS успешно завершена:</ContentTitle>
              <ContentBody>
                <p>
                  <KeySpan>Списано (CWD):</KeySpan>
                  <strong>
                    {(convertedData.userAmount / 100000)
                      .toString()
                      .replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}
                  </strong>
                </p>
                <p>
                  <KeySpan>Курс (CWD-MULTICS):</KeySpan>
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
                  <KeySpan>Скидка (%):</KeySpan> <strong>{convertedData.discountPercent}</strong>
                </p>
                <p>
                  <KeySpan>Зачислено (MULTICS):</KeySpan>
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

const KeySpan = styled.div`
  &:after {
    content: '';
    position: absolute;
    bottom: 5px;
    /* max-width: 150px; */
    width: 150px;
    border-bottom: 1px dotted rgba(0, 0, 0, 0.2);
  }
  &:nth-child(1) {
    width: 200px;
  }
  &:nth-child(2) {
  }
  &:nth-child(3) {
  }
  &:nth-child(4) {
  }
`;

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
  & > p {
    display: flex;
    justify-content: space-between;
    /* border-bottom: 1px dotted rgba(0, 0, 0, 0.2); */
    background-color: #ffffff;
    position: relative;

    & > strong {
      /* &:after {
        content: '';
        border-bottom: 1px dotted rgba(0, 0, 0, 0.2);

        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        border-bottom: 0.1em dotted;
      } */
    }
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
