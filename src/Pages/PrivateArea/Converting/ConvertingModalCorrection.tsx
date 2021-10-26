import { FC, useState } from 'react';
import styled from 'styled-components';
import { Button } from '../../../components/Button/V2/Button';
import { Modal } from '../../../components/Modal/Modal';
import { Checkbox } from '../components/Checkbox';
import { IBalanceExchange } from './ConvertingModal';
import { setCookie } from './cookiesFns';
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
  const { calculatedAmount, targetAmount, discountPercent } = convertedData;

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
                  <KeySpan sm>Указано к списанию (CWD)</KeySpan>
                  <Dots />
                  <strong>
                    {fromSumCloud.split('.').length > 1
                      ? `${fromSumCloud.split('.')[0].replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}.${
                          (+fromSumCloud).toFixed(5).toString().split('.')[1]
                        }`
                      : `${(+fromSumCloud)
                          .toFixed(5)
                          .split('.')[0]
                          .replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}.${
                          (+fromSumCloud).toFixed(5).split('.')[1]
                        }`}
                  </strong>
                </p>
                <p>
                  <KeySpan sm={calculatedAmount.toString().length > 6}>
                    Рассчетная сумма к списанию (CWD)
                  </KeySpan>
                  <Dots />
                  <strong>
                    {(calculatedAmount / 100000).toString().split('.').length > 1
                      ? `${(calculatedAmount / 100000)
                          .toString()
                          .split('.')[0]
                          .replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}.${
                          (calculatedAmount / 100000).toFixed(5).toString().split('.')[1]
                        }`
                      : (calculatedAmount / 100000).toFixed(5)}
                  </strong>
                </p>
                <p>
                  <KeySpan>Курс:</KeySpan>
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
                        }`
                      : (calculatedAmount / targetAmount / 1000).toFixed(5)}
                  </strong>
                </p>
                <p>
                  <KeySpan>Скидка (%):</KeySpan>
                  <Dots />
                  <strong>{discountPercent}</strong>
                </p>
                <p>
                  <KeySpan>К получению (MULTICS):</KeySpan>
                  <Dots />
                  <strong>
                    {(targetAmount / 100).toString().split('.').length > 1
                      ? `${(targetAmount / 100)
                          .toString()
                          .split('.')[0]
                          .replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}.${
                          (targetAmount / 100).toFixed(5).toString().split('.')[1]
                        }`
                      : `${(+(targetAmount / 100).toString())
                          .toFixed(5)
                          .split('.')[0]
                          .replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}.${
                          (targetAmount / 100).toFixed(5).split('.')[1]
                        }`}
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

  & > p > strong {
    white-space: nowrap;
  }
`;
