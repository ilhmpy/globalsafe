import { FC, useState } from 'react';
import styled from 'styled-components';
import { Button } from '../../../components/Button/V2/Button';
import { Modal } from '../../../components/Modal/Modal';
import { Checkbox } from '../components/Checkbox';
import { IBalanceExchange } from './ConvertingModal';
import {
  ButtonsWrapper,
  CheckboxGroup,
  CloseButton,
  ContentTitle,
  Dots,
  KeySpan,
  ModalBlock,
  ModalContent,
  ModalTitle,
} from './styled';
import { setCookie } from './cookies';

interface Iprops {
  open: boolean;
  setOpen: (open: boolean) => void;
  convertedData: IBalanceExchange;
  setOpenConverting: (open: boolean) => void;
  setIsOkConverting: (isOk: boolean) => void;
  setConvertedData: (data: IBalanceExchange) => void;
  fromSumCloud: string;
  closeWithReset: () => void;
}

export const ConvertingModalCorrection: FC<Iprops> = ({
  open,
  setOpen,
  convertedData,
  setOpenConverting,
  fromSumCloud,
  setConvertedData,
  setIsOkConverting,
  closeWithReset,
}: Iprops) => {
  const [isNoShow, setIsNoShow] = useState<boolean>(false);

  const agree = async () => {
    setOpen(false);
    setOpenConverting(true);
    setIsOkConverting(true);
  };

  const checkboxClick = () => {
    setCookie('checkbox', 'yes', 90);
  };

  return (
    <>
      {open && (
        <Modal onClose={closeWithReset} width={420}>
          <ModalBlock>
            <ModalTitle>Коррекция суммы списания</ModalTitle>
            <ModalContent>
              <ContentTitle mb10>
                Сумма к списанию скорректирована исходя из формул расчета конвертации:
              </ContentTitle>
              <CloseButton onClick={closeWithReset} />
              <ContentBody>
                <p>
                  <KeySpan>Указано к списанию (CWD)</KeySpan>
                  <Dots />
                  <strong>
                    {Number(fromSumCloud).toLocaleString('ru-RU', {
                      maximumFractionDigits: 2,
                    })}
                  </strong>
                </p>
                <p>
                  <KeySpan>Рассчетная сумма к списанию (CWD)</KeySpan>
                  <Dots />
                  <strong>
                    {(convertedData.calculatedAmount / 100000).toLocaleString('ru-RU', {
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
                    {(convertedData.targetAmount / 100)
                      .toString()
                      .replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}
                  </strong>
                </p>
                <CheckboxGroup>
                  <Checkbox
                    checked={isNoShow}
                    onChange={() => {
                      setIsNoShow(!isNoShow);
                      checkboxClick();
                    }}
                  />
                  <KeySpan style={{ width: '100%' }}>Больше не показывать это окно</KeySpan>
                </CheckboxGroup>
                <ButtonsWrapper>
                  <Button bigSize primary fullWidth onClick={agree}>
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
