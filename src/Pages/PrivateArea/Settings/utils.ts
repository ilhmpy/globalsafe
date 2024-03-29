import { PaymentMethodKind} from '../../../types/paymentMethodKind';


const keysPay = Object.keys(PaymentMethodKind).filter(
    (k) => typeof PaymentMethodKind[k as any] === 'number'
  );

export  const payList = keysPay.map((i) => {
    if (i === PaymentMethodKind[0]) {
      return PaymentMethodKind[0];
    }
    if (i === PaymentMethodKind[1]) {
      return PaymentMethodKind[1];
    }
    if (i === PaymentMethodKind[2]) {
      return PaymentMethodKind[2];
    }
    if (i === PaymentMethodKind[3]) {
      return 'АО «Тинькофф Банк»';
    }
    if (i === PaymentMethodKind[4]) {
      return 'ПАО Сбербанк';
    }
    if (i === PaymentMethodKind[5]) {
      return 'АО «Альфа-Банк»';
    } else {
      return '';
    }
  });

  export  const payListItem = (i: number) => {
    if (i === PaymentMethodKind.ERC20) {
      return PaymentMethodKind[0];
    }
    if (i === PaymentMethodKind.TRC20) {
      return PaymentMethodKind[1];
    }
    if (i === PaymentMethodKind.BEP20) {
      return PaymentMethodKind[2];
    }
    if (i === PaymentMethodKind.Tinkoff) {
      return 'АО «Тинькофф Банк»';
    }
    if (i === PaymentMethodKind.Sberbank) {
      return 'ПАО Сбербанк';
    }
    if (i === PaymentMethodKind.Alfabank) {
      return 'АО «Альфа-Банк»';
    } else {
      return '';
    }
  };