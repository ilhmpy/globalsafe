import React, { FC } from 'react';
import * as Styled from './Styles.elements';
import { CSSTransition } from 'react-transition-group';
import { Modal } from '../../components/Modal/Modal';
import { DepositsCollection } from '../../types/info';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/Button/Button';

type Props = {
  depositListModal: boolean;
  setDepositListModal: (depositListModal: boolean) => void;
  handleBackModal: () => void;
  depositsList: DepositsCollection[] | null;
  selectDeposit: (item: DepositsCollection) => void;
};

export const DepositListModal: FC<Props> = ({
  depositListModal,
  setDepositListModal,
  handleBackModal,
  depositsList,
  selectDeposit,
}: Props) => {
  const { t } = useTranslation();
  return (
    <CSSTransition in={depositListModal} timeout={3} classNames="modal" unmountOnExit>
      <Modal onClose={() => setDepositListModal(false)}>
        <Styled.ModalBack onClick={handleBackModal} />
        <Styled.ModalTitle>{t('privateArea.addDeposit')}</Styled.ModalTitle>
        <Styled.ModalList>
          <Styled.ModalListItem>
            <Styled.ModalListText head>{t('privateArea.name')}</Styled.ModalListText>
            <Styled.ModalListText head>{t('privateArea.minPay')}</Styled.ModalListText>
            <Styled.ModalListText head>{t('privateArea.depositTerm')}</Styled.ModalListText>
          </Styled.ModalListItem>
          {depositsList
            ? depositsList.map((item) => (
                <Styled.ModalListItem key={item.id} onClick={() => selectDeposit(item)}>
                  <Styled.ModalListText>{item.name}</Styled.ModalListText>
                  <Styled.ModalListText>
                    {(item.minAmount / 100000).toLocaleString()}
                  </Styled.ModalListText>
                  <Styled.ModalListText>
                    {item.duration} {t('privateArea.day')}
                  </Styled.ModalListText>
                </Styled.ModalListItem>
              ))
            : ''}
        </Styled.ModalList>
        <Styled.ModalListButton onClick={() => setDepositListModal(false)} danger>
          Понятно
        </Styled.ModalListButton>
      </Modal>
    </CSSTransition>
  );
};

type DividendsProps = {
  onClose: () => void;
  data: any;
  open: boolean;
};

export const ModalDividends: FC<DividendsProps> = ({ onClose, data, open }: DividendsProps) => {
  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };
  const { t } = useTranslation();
  return (
    <Modal onClose={onClose} width={280}>
      <Styled.ModalDividends onClick={handleContainerClick}>
        {data.userDeposit ? (
          <>
            <Styled.PayCardBlock>
              <Styled.PayText wbold>{t('privateArea.dividents')}</Styled.PayText>
              <Styled.PayText>{moment(data.date).format('DD MMMM YYYY')}г.</Styled.PayText>
              <Styled.Hr />
            </Styled.PayCardBlock>
            <Styled.PayCardBlock>
              <Styled.PayText small>{t('privateArea.name')}</Styled.PayText>
              <Styled.PayText>{data.userDeposit.deposit.name}</Styled.PayText>
            </Styled.PayCardBlock>
            <Styled.PayCardBlock>
              <Styled.PayText small>{t('privateArea.dateOpen')}</Styled.PayText>
              <Styled.PayText>
                {moment(data.userDeposit.creationDate).format('DD/MM/YYYY')}
              </Styled.PayText>
            </Styled.PayCardBlock>
            <Styled.PayCardBlock>
              <Styled.PayText small>{t('privateArea.sumDeposit')}</Styled.PayText>
              <Styled.PayText>{data.userDeposit.baseAmountView}</Styled.PayText>
            </Styled.PayCardBlock>
            <Styled.PayCardBlock>
              <Styled.PayText small>{t('privateArea.nextDate')}</Styled.PayText>
              <Styled.PayText>
                {moment(data.userDeposit.paymentDate).format('DD/MM/YYYY')}
              </Styled.PayText>
            </Styled.PayCardBlock>
            <Styled.PayCardBlock>
              <Styled.PayText small>{t('privateArea.amountPay')}</Styled.PayText>
              <Styled.PayText>
                {(data.balance / 100000).toLocaleString('ru-RU', {
                  maximumFractionDigits: 5,
                })}
              </Styled.PayText>
            </Styled.PayCardBlock>
            <Styled.PayCardBlock>
              <Styled.PayText small>{t('privateArea.procent')}</Styled.PayText>
              <Styled.PayText>
                {((data.balance / data.userDeposit.baseAmount) * 100).toLocaleString('ru-RU', {
                  maximumFractionDigits: 2,
                })}
                %
              </Styled.PayText>
            </Styled.PayCardBlock>
          </>
        ) : (
          <>
            <Styled.PayCardBlock>
              <Styled.PayText>{t('privateArea.notData')}</Styled.PayText>
            </Styled.PayCardBlock>
          </>
        )}
      </Styled.ModalDividends>
    </Modal>
  );
};
