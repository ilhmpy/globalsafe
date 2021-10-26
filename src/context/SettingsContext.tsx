import React, { FC, useState } from 'react';
import { PaymentMethodKind, RootPayMethod, CollectionPayMethod } from '../types/paymentMethodKind';

type Context = {
  userPaymentsMethod: CollectionPayMethod[];
  setUserPaymentsMethod: (userPaymentsMethod: CollectionPayMethod[]) => void;
  usePaymentMethods: CollectionPayMethod[] | null;
  setUsePaymentMethods: (userPaymentsMethod: CollectionPayMethod[]) => void;
};

export const SettingsContext = React.createContext<Context>({
  userPaymentsMethod: [],
  setUserPaymentsMethod: (userPaymentsMethod: CollectionPayMethod[]) => undefined,
  usePaymentMethods: null,
  setUsePaymentMethods: (userPaymentsMethod: CollectionPayMethod[]) => undefined,
});

export const SettingsProvider: FC = ({ children }: any) => {
  const [userPaymentsMethod, setUserPaymentsMethod] = useState<CollectionPayMethod[]>([]);
  const [usePaymentMethods, setUsePaymentMethods] = useState<CollectionPayMethod[] | null>(null);

  return (
    <SettingsContext.Provider
      value={{ userPaymentsMethod, setUserPaymentsMethod, usePaymentMethods, setUsePaymentMethods }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
