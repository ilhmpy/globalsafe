import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ReactComponent as Stroke } from '../../../assets/svg/leftStroke.svg';
import { Button } from '../../../components/Button/Button';
import { Modal } from '../../../components/Modal/Modal';
import { Select } from '../../../components/Select/Select';
import { Switcher } from '../../../components/Switcher';
import { DepositProgramFormPropsType } from './types';

// eslint-disable-next-line react/prop-types
export const DepositProgramForm: FC<DepositProgramFormPropsType> = ({ setOpenNewProgram }) => {
  const [checkList, setCheckList] = useState<any>([]);
  const { t } = useTranslation();
  const list = ['Ru', 'En'];
  const [checked, setChecked] = useState(false);
  const [delayedDepositChecked, setDelayedDepositChecked] = useState(false);
  const [programIsActiveChecked, setProgramIsActiveChecked] = useState(true);
  const [publishingProgramChecked, setPublishingProgramChecked] = useState(false);
  const [startColumn, setStartColumn] = useState(false);
  const [expertColumn, setExpertColumn] = useState(false);
  const [infinityColumn, setInfinityColumn] = useState(false);
  const [isOpenSaveConfirm, setIsOpenSaveConfirm] = useState(false);
  const [isOpenCancelConfirm, setIsOpenCancelConfirm] = useState(false);
  const [isSavingSuccess, setIsSavingSuccess] = useState(false);
  const [isSavingCanceled, setIsSavingCanceled] = useState(false);
  const [isModalError, setIsModalError] = useState(false);

  return (
    <Container>
      <Header>
        <Stroke onClick={() => setOpenNewProgram(false)} />
        <Title>{t('depositsPrograms.creationDepositProgram')}</Title>
      </Header>
      <ContentWrapper>
        <Row>
          <InputGroup>
            <Label>{t('depositsPrograms.programName')}</Label>
            <Input />
          </InputGroup>
          <InputGroup>
            <Label>{t('depositsPrograms.language')}</Label>
            <Select checkList={[checkList]} setCheckList={setCheckList} values={list} />
          </InputGroup>
        </Row>

        <Row>
          <InputGroup>
            <Label>{t('depositsPrograms.description')}</Label>
            <Text />
          </InputGroup>
        </Row>

        <Row hr>
          <InputGroup>
            <Label>{t('depositsPrograms.currencyDeposit')}</Label>
            <Select checkList={[checkList]} setCheckList={setCheckList} values={list} />
          </InputGroup>

          <Hr />

          <InputGroup disabled>
            <Label>{t('depositsPrograms.exchangeRate')}</Label>
            <Input placeholder="&mdash;" CWD disabled />
          </InputGroup>
        </Row>

        <Row>
          <InputGroup>
            <Label>{t('depositsPrograms.minAmount')}</Label>
            <Input />
          </InputGroup>
          <InputGroup>
            <Label>{t('depositsPrograms.maxAmount')}</Label>
            <Input />
          </InputGroup>
        </Row>

        <Row>
          <InputGroup>
            <Label>{t('depositsPrograms.depositTerm')}</Label>
            <Input />
          </InputGroup>
        </Row>

        <Row>
          <InputGroup>
            <Label>{t('depositsPrograms.startPayments')}</Label>
            <Input />
          </InputGroup>
        </Row>

        <Row>
          <InputGroup>
            <Label>{t('depositsPrograms.paymentInterval')}</Label>
            <Input />
          </InputGroup>
        </Row>

        <Row>
          <InputGroup>
            <Label>{t('depositsPrograms.paymentsDays')}</Label>
            <Input />
          </InputGroup>
        </Row>

        <Row hr>
          <InputGroup>
            <Label>{t('depositsPrograms.payment')}</Label>
            <Select checkList={[checkList]} setCheckList={setCheckList} values={list} />
          </InputGroup>
          <Hr />
          <InputGroup>
            <Label>{t('depositsPrograms.clientYield')}</Label>
            <Input />
          </InputGroup>
        </Row>

        <Row>
          <InputGroup>
            <Label>{t('depositsPrograms.delayedDeposit')}</Label>
            <StatusGroup>
              <Switcher
                onChange={() => setDelayedDepositChecked(!delayedDepositChecked)}
                checked={delayedDepositChecked}
              />
              <Status checked={delayedDepositChecked}>
                {t(delayedDepositChecked ? 'depositsPrograms.yes' : 'depositsPrograms.no')}
              </Status>
            </StatusGroup>
          </InputGroup>
        </Row>

        <Table>
          <Label>{t('depositsPrograms.affiliateRatio')}</Label>
          <TableBody>
            <ColumnGroup hide={startColumn}>
              <ColumnHead onClick={() => setStartColumn(!startColumn)}>
                <Label>Start</Label>
              </ColumnHead>
              <Row>
                <InputGroup>
                  <Label>1 {t('depositsPrograms.line')}</Label>
                  <Input />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <Label>2 {t('depositsPrograms.line')}</Label>
                  <Input />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <Label>3 {t('depositsPrograms.line')}</Label>
                  <Input />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <Label>4 {t('depositsPrograms.line')}</Label>
                  <Input />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <Label>5 {t('depositsPrograms.line')}</Label>
                  <Input />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <Label>6 {t('depositsPrograms.line')}</Label>
                  <Input />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <Label>7 {t('depositsPrograms.line')}</Label>
                  <Input />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <Label>8 {t('depositsPrograms.line')}</Label>
                  <Input />
                </InputGroup>
              </Row>
            </ColumnGroup>
            <ColumnGroup labelHide hide={expertColumn}>
              <ColumnHead onClick={() => setExpertColumn(!expertColumn)}>
                <Label>Expert</Label>
              </ColumnHead>

              <Row>
                <InputGroup>
                  <Label>1 {t('depositsPrograms.line')}</Label>
                  <Input />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <Label>2 {t('depositsPrograms.line')}</Label>
                  <Input />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <Label>3 {t('depositsPrograms.line')}</Label>
                  <Input />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <Label>4 {t('depositsPrograms.line')}</Label>
                  <Input />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <Label>5 {t('depositsPrograms.line')}</Label>
                  <Input />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <Label>6 {t('depositsPrograms.line')}</Label>
                  <Input />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <Label>7 {t('depositsPrograms.line')}</Label>
                  <Input />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <Label>8 {t('depositsPrograms.line')}</Label>
                  <Input />
                </InputGroup>
              </Row>
            </ColumnGroup>
            <ColumnGroup labelHide hide={infinityColumn}>
              <ColumnHead onClick={() => setInfinityColumn(!infinityColumn)}>
                <Label>Infinity</Label>
              </ColumnHead>

              <Row>
                <InputGroup>
                  <Label>1 {t('depositsPrograms.line')}</Label>
                  <Input />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <Label>2 {t('depositsPrograms.line')}</Label>
                  <Input />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <Label>3 {t('depositsPrograms.line')}</Label>
                  <Input />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <Label>4 {t('depositsPrograms.line')}</Label>
                  <Input />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <Label>5 {t('depositsPrograms.line')}</Label>
                  <Input />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <Label>6 {t('depositsPrograms.line')}</Label>
                  <Input />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <Label>7 {t('depositsPrograms.line')}</Label>
                  <Input />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <Label>8 {t('depositsPrograms.line')}</Label>
                  <Input />
                </InputGroup>
              </Row>
            </ColumnGroup>
          </TableBody>
        </Table>

        <Row>
          <InputGroup>
            <Label>{t('depositsPrograms.depositAccount')}</Label>
            <Input />
          </InputGroup>
        </Row>
        <Row>
          <InputGroup>
            <Label>{t('depositsPrograms.transferCode')}</Label>
            <Input />
          </InputGroup>
        </Row>
        <Row>
          <InputGroup lg>
            <Label>{t('depositsPrograms.activeKey')}</Label>
            <Input />
          </InputGroup>
        </Row>
        <Row>
          <InputGroup lg>
            <Label>{t('depositsPrograms.keyNotes')}</Label>
            <Input />
          </InputGroup>
        </Row>

        <Row hr>
          <InputGroup>
            <Label>{t('depositsPrograms.depositActivationCost')}</Label>
            <Select checkList={[checkList]} setCheckList={setCheckList} values={list} />
          </InputGroup>
          <Hr />
          <InputGroup>
            <Label>{t('depositsPrograms.value')}</Label>
            <Input />
          </InputGroup>
        </Row>

        <Row>
          <InputGroup>
            <Label>{t('depositsPrograms.programIsActive')}</Label>
            <StatusGroup>
              <Switcher
                onChange={() => setProgramIsActiveChecked(!programIsActiveChecked)}
                checked={programIsActiveChecked}
              />
              <Status checked={programIsActiveChecked}>
                {t(programIsActiveChecked ? 'depositsPrograms.yes' : 'depositsPrograms.no')}
              </Status>
            </StatusGroup>
          </InputGroup>
        </Row>

        <Row>
          <InputGroup lg>
            <Label>{t('depositsPrograms.publishingProgram')}</Label>
            <StatusGroup>
              <Switcher
                onChange={() => setPublishingProgramChecked(!publishingProgramChecked)}
                checked={publishingProgramChecked}
              />
              <Status checked={publishingProgramChecked}>
                {t(publishingProgramChecked ? 'depositsPrograms.yes' : 'depositsPrograms.no')}
              </Status>
            </StatusGroup>
          </InputGroup>
        </Row>
        <ButtonGroup>
          <Button danger maxWidth={130} onClick={() => setIsOpenSaveConfirm(true)}>
            {t('depositsPrograms.save')}
          </Button>
          <Button dangerOutline maxWidth={130} onClick={() => setIsOpenCancelConfirm(true)}>
            {t('depositsPrograms.cancel')}
          </Button>
        </ButtonGroup>
        {isOpenSaveConfirm && (
          <Modal onClose={() => setIsOpenSaveConfirm(false)}>
            <ModalBlock>
              <ModalTitle>{t('depositsPrograms.preservation')}</ModalTitle>
              <ModalContent>{t('depositsPrograms.areYouSure')}</ModalContent>
              <ModalButtons>
                <Button
                  danger
                  maxWidth={200}
                  onClick={() => {
                    setIsOpenSaveConfirm(false);
                    setIsSavingSuccess(true);
                  }}
                >
                  {t('depositsPrograms.save')}
                </Button>
                <Button dangerOutline maxWidth={200} onClick={() => setIsOpenSaveConfirm(false)}>
                  {t('depositsPrograms.return')}
                </Button>
              </ModalButtons>
            </ModalBlock>
          </Modal>
        )}

        {isOpenCancelConfirm && (
          <Modal onClose={() => setIsOpenCancelConfirm(false)}>
            <ModalBlock>
              <ModalTitle>{t('depositsPrograms.cancel')}</ModalTitle>
              <ModalContent>{t('depositsPrograms.areYouSureNot')}</ModalContent>
              <ModalButtons>
                <Button
                  danger
                  maxWidth={200}
                  onClick={() => {
                    setIsOpenCancelConfirm(false);
                    setIsSavingCanceled(true);
                  }}
                >
                  {t('depositsPrograms.dontSave')}
                </Button>
                <Button dangerOutline maxWidth={200} onClick={() => setIsOpenCancelConfirm(false)}>
                  {t('depositsPrograms.return')}
                </Button>
              </ModalButtons>
            </ModalBlock>
          </Modal>
        )}

        {isSavingSuccess && (
          <Modal onClose={() => setIsSavingSuccess(false)}>
            <ModalBlock sm>
              <ModalTitle>{t('alert.success')} !</ModalTitle>
              <ModalContent>{t('depositsPrograms.depositProgramSuccessfullySaved')}</ModalContent>
            </ModalBlock>
          </Modal>
        )}
        {isSavingCanceled && (
          <Modal onClose={() => setIsSavingCanceled(false)}>
            <ModalBlock sm>
              <ModalTitle>{t('depositsPrograms.changesCanceled')}</ModalTitle>
              <ModalContent>{t('depositsPrograms.changesCanceledSuccessfully')}</ModalContent>
            </ModalBlock>
          </Modal>
        )}
        {isModalError && (
          <Modal onClose={() => setIsModalError(false)}>
            <ModalBlock sm>
              <ModalTitle>{t('alert.error')} !</ModalTitle>
              <ModalContent>{t('alert.error')}.</ModalContent>
            </ModalBlock>
          </Modal>
        )}
      </ContentWrapper>
    </Container>
  );
};

const ModalBlock = styled.div<{ sm?: boolean }>`
  display: flex;
  flex-direction: column;
  padding: ${(props) => (props.sm ? '30px 0px 35px' : '50px 50px 30px')};
  align-items: center;
  justify-content: center;
  gap: 30px;
  @media (max-width: 576px) {
    padding: ${(props) => (props.sm ? '30px 5px 35px' : '50px 5px 30px')};
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

  color: ${(props) => props.theme.text2};
`;

const ModalButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  justify-content: center;
  align-items: center;
  & > a {
    @media (max-width: 576px) {
      min-width: 100%;
    }
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    text-align: center;
    &:first-child {
      line-height: 16px;
      display: flex;
      align-items: center;
    }
    &:last-child {
      line-height: 20px;
      letter-spacing: 0.1px;
      color: ${(props) => props.theme.text2};
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  & > a {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    text-align: center;
    &:first-child {
      line-height: 16px;
      display: flex;
      align-items: center;
    }
    &:last-child {
      line-height: 20px;
      letter-spacing: 0.1px;
      color: ${(props) => props.theme.text2};
    }
  }
  @media (max-width: 576px) {
    flex-direction: column;
    & > a {
      min-width: 100%;
    }
  }
`;

const ColumnHead = styled.p`
  padding-bottom: 5px;
  & > span {
    color: ${(props) => props.theme.text2};
    line-height: 20px;
  }
  @media (max-width: 576px) {
    background: rgba(86, 101, 127, 0.3);
    border-radius: 2px;
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 10px;

    & > span {
      background: transparent;
    }
  }
`;

const Table = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const TableBody = styled.div`
  display: flex;
  gap: 80px;
  justify-content: space-between;
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const ColumnGroup = styled.div<{ labelHide?: boolean; hide?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (max-width: 576px) {
    & > div {
      display: ${(props) => (props.hide ? 'none' : 'block')};
    }
  }
  & > div > div > span {
    opacity: ${(props) => (props.labelHide ? '0' : '1')};
    @media (max-width: 576px) {
      opacity: 1;
    }
  }
`;

const StatusGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 0;
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.depositHead};
  background: ${(props) => props.theme.card.background};
`;

const Status = styled.span<{ checked: boolean }>`
  color: ${(props) => (props.checked ? '#FF416E' : props.theme.text2)};
`;

const Hr = styled.hr`
  position: relative;
  top: 47px;
  left: 0;
  max-width: 63px;
  height: 2px;
  width: 63px;
  opacity: 0.3;
  color: #56657f;
  @media (max-width: 768px) {
    flex-direction: column;
    transform: rotate(90deg);
    max-width: 10px;
    top: 3px;
    left: 115px;
  }
`;
const ContentWrapper = styled.div`
  width: 100%;
  padding: 0px 30px 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Row = styled.div<{ hr?: boolean }>`
  position: relative;
  display: flex;
  gap: ${(props) => (props.hr ? '10px' : '85px')};
  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${(props) => (props.hr ? '15px' : '20px')};
  }
`;

const InputGroup = styled.div<{ lg?: boolean; disabled?: boolean }>`
  max-width: ${(props) => (props.lg ? '650px' : '280px')};
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: space-between;
  & > * {
    opacity: ${(props) => (props.disabled ? '0.6' : '')};
  }
`;
const Label = styled.span`
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.depositHead};
  background: ${(props) => props.theme.card.background};
  @media (max-width: 768px) {
  }
`;

const Input = styled.input<{ CWD?: boolean }>`
  width: 100%;
  border: 1px solid rgba(86, 101, 127, 0.3);
  box-sizing: border-box;
  border-radius: 2px;
  min-height: 40px;
  padding: ${(props) => (props.CWD ? '8px 45px 8px 8px' : '8px')};
  font-weight: normal;
  background: transparent;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.text2};
  &:focus {
    outline: none;
  }
  ::placeholder,
  ::-webkit-input-placeholder {
    font-size: 12px;
    color: ${(props) => props.theme.text2};
  }
  background-image: ${(props) =>
    props.CWD
      ? `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='50px' width='120px'><text x='0' y='15' fill='${props.theme.thHead}' font-family='Roboto, Helvetica, sans-serif' font-size='14'>CWD</text></svg>")`
      : ''};
  background-position: ${(props) => (props.CWD ? 'top 8px right -50%' : '')};
  background-repeat: ${(props) => (props.CWD ? 'no-repeat' : '')};
`;

const Text = styled.textarea`
  resize: none;
  width: 100%;
  border: 1px solid rgba(86, 101, 127, 0.3);
  box-sizing: border-box;
  border-radius: 2px;
  min-height: 80px;
  min-width: 645px;
  padding: 8px;
  font-family: 'Roboto', sans-serif;
  font-weight: normal;
  background: transparent;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.text2};
  &:focus {
    outline: none;
  }
  @media (max-width: 768px) {
    min-width: 480px;
  }
  @media (max-width: 576px) {
    min-width: auto;
    min-height: 180px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  display: flex;
  padding: 40px 30px;
  align-items: center;
  gap: 20px;
  & > svg {
    cursor: pointer;
    :hover {
      opacity: 0.7;
      transform: scale(1.1);
    }
  }
  @media (max-width: 576px) {
    gap: 10px;
    padding: 20px 30px;
    & > svg {
      transform: scale(0.7);
    }
  }
`;
const Title = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: ${(props) => props.theme.text};
  @media (max-width: 576px) {
    font-size: 14px;
  }
`;
