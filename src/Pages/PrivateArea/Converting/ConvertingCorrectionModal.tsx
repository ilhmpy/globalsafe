import { FC, useState } from 'react';
import styled from 'styled-components';
import { Button } from '../../../components/Button/V2/Button';
import { Modal } from '../../../components/Modal/Modal';
import { Checkbox } from '../components/Checkbox';
import { IBalanceExchange } from './ConvertingModal';
import {
  ButtonsWrapper,
  CheckboxGroup,
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
  setOpenConverting: (open: boolean) => void;
  setIsOkConverting: (isOk: boolean) => void;
  fromSumCloud: string;
}

export const ConvertingModalCorrection: FC<Iprops> = ({
  open,
  setOpen,
  convertedData,
  setOpenConverting,
  fromSumCloud,
  setIsOkConverting,
}: Iprops) => {
  const [isNoShow, setIsNoShow] = useState<boolean>(false);

  const agree = async () => {
    setOpen(false);
    setOpenConverting(true);
    setIsOkConverting(true);
  };

  return (
    <>
      {open && (
        <Modal onClose={() => setOpen(false)} width={420}>
          <ModalBlock>
            <ModalTitle>Коррекция суммы списания</ModalTitle>
            <ModalContent>
              <ContentTitle mb10>
                Токен MULTICS не имеет дробных значений, в связи с этим указанная вами сумма была
                скорректирована:
              </ContentTitle>
              <CloseButton onClick={() => setOpen(false)} />
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
                  <Checkbox checked={isNoShow} onChange={() => setIsNoShow(!isNoShow)} />
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
