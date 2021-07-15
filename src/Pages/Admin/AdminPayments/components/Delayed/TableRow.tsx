import moment from 'moment';
import { FC, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import { Button } from '../../../../../components/Button/Button';
import { Modal } from '../../../../../components/Modal/Modal';
import { Input } from '../../../../../components/UI/Input';
import { RoundButton } from '../../../../../components/UI/RoundButton';
import { AppContext } from '../../../../../context/HubContext';
import useWindowSize from '../../../../../hooks/useWindowSize';
import { CollectionAnalitics } from '../../../../../types/analitics';
import { OpenDate } from '../../../../../types/dates';
import {
  ModalBlock,
  ModalBlockBody,
  ModalButton,
  ModalTitle,
} from '../../../../Main/components/Assets/styled';
import { ModalAnalitic } from '../../../AdminPay/Payments';
import * as Styled from './styled';

type Props = {
  item: any;
  adjustPay: (id: string, val: number) => void;
  confirmPay: (id: string) => void;
  idx: number;
};

export const TableRow: FC<Props> = ({
  item,
  adjustPay,
  confirmPay,
  idx,
}) => {
  const sizes = useWindowSize();
  const size = sizes < 992;
  const field = sizes > 576;
  const [closeDate, setCloseDate] = useState<OpenDate>({
    from: undefined,
    to: undefined,
  });
  const [open, setOpen] = useState<CollectionAnalitics | null>(null);
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const [done, setDone] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const disabled = done;

  const { t } = useTranslation();

  const onClose = () => {
    setOpen(null);
  };

  const paymentsConfirm = (id: string) => {
    // setModalOpen(true);
    setDone(true);
    confirmPay(id);
    onClose();
  };

  // const paymentsUnConfirm = (id: string) => {
  //   setDone(false);
  //   unConfirmPay(id);
  //   onClose();
  // };

  const paymentsConfirmCheckbox = (id: string) => {
    // if (disabled) {
    //   paymentsUnConfirm(id);
    // } else {
    paymentsConfirm(id);
    // }
  };

  return (
    <div>
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <ModalBlock>
            <ModalTitle>{t('adminPay.delayed.pay')}</ModalTitle>
            <ModalBlockBody>
              <Input
                onChange={() => console.log(1)}
                // placeholder={`${t('assets.inputPlaceholder')}, CWD`}
                type="number"
                // ref={inputRef}
                value={item.payAmountView}
              />
              <ModalButton
                as="button"
                onClick={() => {
                  paymentsConfirm(item.deposit.id);
                  setModalOpen(false);
                }}
                danger
                // disabled={value === undefined || +value < 1 ? true : false}
              >
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
          {item.payAmountView}
        </Styled.TableBodyItem>

        <Styled.TableBodyItem>
          {size ? (
            <RoundButton
              dis={disabled}
              onClick={(e) => {
                e.stopPropagation();
                paymentsConfirmCheckbox(item.deposit.id);
              }}
            />
          ) : disabled ? (
            <Button
              greenOutline
              // onClick={(e) => {
              //   e.stopPropagation();
              //   paymentsUnConfirm(item.safeId);
              // }}
            >
              {t('adminPay.delayed.payed')}
            </Button>
          ) : (
            <Button
              dangerOutline
              onClick={(e) => {
                e.stopPropagation();
                // paymentsConfirm(item.safeId);
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
