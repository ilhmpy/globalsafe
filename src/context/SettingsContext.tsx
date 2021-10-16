import React, { FC, useState } from 'react';
import { PaymentMethodKind, RootPayMethod, CollectionPayMethod } from '../types/paymentMethodKind';

type Context = {
  userPaymentsMethod: CollectionPayMethod[];
  setUserPaymentsMethod: (userPaymentsMethod: CollectionPayMethod[]) => void;
};

export const SettingsContext = React.createContext<Context>({
  userPaymentsMethod: [],
  setUserPaymentsMethod: (userPaymentsMethod: CollectionPayMethod[]) => undefined,
});

export const SettingsProvider: FC = ({ children }: any) => {
  const [userPaymentsMethod, setUserPaymentsMethod] = useState<CollectionPayMethod[]>([]);

  return (
    <SettingsContext.Provider value={{ userPaymentsMethod, setUserPaymentsMethod }}>
      {children}
    </SettingsContext.Provider>
  );
};
