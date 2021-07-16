import moment from 'moment';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import { Button } from '../../../../../components/Button/Button';
import { Modal } from '../../../../../components/Modal/Modal';
import { Input } from '../../../../../components/UI/Input';
import { RoundButton } from '../../../../../components/UI/RoundButton';
import useWindowSize from '../../../../../hooks/useWindowSize';
import { CollectionAnalitics } from '../../../../../types/analitics';
import {
  ModalBlock,
  ModalBlockBody,
  ModalButton,
  ModalTitle,
} from '../../../../Main/components/Assets/styled';
import { ModalAnalitic } from '../../../AdminPay/Payments';
import * as Styled from './styled';

type Props = {
  idx: number;
  item: any;
  confirmPay: (safeId: string, amount: number) => void;
};

export const TableRow: FC<Props> = ({ item, confirmPay, idx }) => {
  const sizes = useWindowSize();
  const size = sizes < 992;
  const [open, setOpen] = useState<CollectionAnalitics | null>(null);
  const [done, setDone] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const disabled = done;
  const [forPay, setForPay] = useState<number>(item.pendingAmount);

  const { t } = useTranslation();

  const onClose = () => {
    setOpen(null);
  };

  const paymentsConfirm = (id: string, amount: number) => {
    setDone(true);
    confirmPay(id, amount);
    setModalOpen(false);
  };

  return (
    <div>
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <ModalBlock>
            <ModalTitle>{t('adminPay.delayed.pay')}</ModalTitle>
            <ModalBlockBody>
              <Input
                onChange={(e) => setForPay(+e.target.value * 100000)}
                type="number"
                value={forPay / 100000}
              />
              <ModalButton
                as="button"
                onClick={() => {
                  paymentsConfirm(item.safeId, +forPay);
                }}
                danger>
                {t('adminPay.delayed.pay')}
              </ModalButton>
            </ModalBlockBody>
          </ModalBlock>
        </Modal>
      )}

      <CSSTransition in={!!open} timeout={300} classNames="modal" unmountOnExit>
        <>{open && <ModalAnalitic onClose={onClose} data={open} />}</>
      </CSSTransition>

      <Styled.TableBody key={item.safeId} onClick={() => setOpen(item)}>
        <Styled.TableBodyItem dis={disabled}>{idx}</Styled.TableBodyItem>
        <Styled.TableBodyItem dis={disabled}>
          {item.userName}
        </Styled.TableBodyItem>
        <Styled.TableBodyItem dis={disabled}>
          {item.deposit.name}
        </Styled.TableBodyItem>
        <Styled.TableBodyItem dis={disabled}>
          {item.amountView}
        </Styled.TableBodyItem>
        <Styled.TableBodyItem dis={disabled}>
          {moment(item.creationDate).format('DD/MM/YYYY')}
        </Styled.TableBodyItem>
        <Styled.TableBodyItem dis={disabled}>
          {moment(item.endDate).format('DD/MM/YYYY')}
        </Styled.TableBodyItem>
        <Styled.TableBodyItem dis={disabled}>
          {forPay / 100000}
        </Styled.TableBodyItem>

        <Styled.TableBodyItem>
          {size ? (
            <RoundButton
              dis={disabled}
              onClick={(e) => {
                e.stopPropagation();
                setModalOpen(true);
              }}
            />
          ) : disabled ? (
            <Button greenOutline>{t('adminPay.delayed.payed')}</Button>
          ) : (
            <Button
              dangerOutline
              onClick={(e) => {
                e.stopPropagation();
                setModalOpen(true);
              }}>
              {t('adminPay.delayed.pay')}
            </Button>
          )}
        </Styled.TableBodyItem>
      </Styled.TableBody>
    </div>
  );
};
