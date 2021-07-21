import React, { useState, FC } from 'react';
import { Modal } from '../../../../components/Modal/Modal';
import * as Styled from './Lottery.elements';
import { Prize, Winner, Users } from '../../../../types/drawResult';
import { Balance } from '../../../../types/balance';
import brand from '../../../../assets/svg/Gs.svg';
import { useTranslation } from 'react-i18next';

type Props = {
  onCloseModalCongrats: () => void;
  drawResult: [Prize[], Prize, Users[], Winner] | null;
  result: Prize | null;
  name: string | null;
};

export const ModalCongrats: FC<Props> = ({
  onCloseModalCongrats,
  drawResult,
  result,
  name,
}: Props) => {
  const { t } = useTranslation();
  return (
    <div>
      <Modal width={1060} onClose={onCloseModalCongrats} mobMarg>
        <Styled.ModalCongratsWrap>
          <Styled.BrandImg>
            <img src={brand} alt="" />{' '}
          </Styled.BrandImg>
          {result && name ? (
            <Styled.WinContainer>
              <Styled.WinTitle>
                {t('congrat')} {name}
              </Styled.WinTitle>
              <Styled.WinTitle sub>
                {t('youWon')}{' '}
                {result.kind === 0
                  ? (result.volume / 100000).toLocaleString('ru-RU', {
                      maximumFractionDigits: 5,
                    })
                  : result.kind === 1
                  ? t('win.two')
                  : result.volume}
                &nbsp;
                {result.volume ? Balance[result.balanceKind] : ''}!
              </Styled.WinTitle>
              <Styled.WinDesc>
                {t('moneyTransfer')} <Styled.WinBrand>GLOBALSAFE.</Styled.WinBrand>
              </Styled.WinDesc>
              <br />
              <Styled.WinDesc>{t('ifQuestion')}</Styled.WinDesc>
              <Styled.ModalButton onClick={onCloseModalCongrats} danger>
                {t('well')}
              </Styled.ModalButton>
            </Styled.WinContainer>
          ) : (
            ''
          )}
        </Styled.ModalCongratsWrap>
      </Modal>
    </div>
  );
};
