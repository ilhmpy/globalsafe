import alfa from '../../assets/v2/svg/banks/alfa.svg';
import sber from '../../assets/v2/svg/banks/sber.svg';
import tinkoff from '../../assets/v2/svg/banks/tinkoff.svg';
import bankTransfer from '../../assets/v2/svg/banks/bankTransfer.svg';
import erc20 from '../../assets/v2/svg/banks/erc20.svg';
import trc20 from '../../assets/v2/svg/banks/trc20.svg';
import bep20 from '../../assets/v2/svg/banks/bep20.svg';

import { PaymentMethodKind } from '../../types/paymentMethodKind';

export const paymentMethodIconSrc = (kind: number): string => {
  switch (kind) {
    case PaymentMethodKind.ERC20:
      return erc20;
    case PaymentMethodKind.TRC20:
      return trc20;
    case PaymentMethodKind.BEP20:
      return bep20;

    case PaymentMethodKind.BankTransfer:
      return bankTransfer;
    case PaymentMethodKind.Tinkoff:
      return tinkoff;
    case PaymentMethodKind.Sberbank:
      return sber;
    case PaymentMethodKind.Alfabank:
      return alfa;
    default:
      return '';
  }
};

export const countVolumeToShow = (countVolume: number, asset: number): number => {
  const value = asset === 1 ? countVolume / 100000 : asset === 42 ? countVolume / 10000 : countVolume;
  return value;
};