import React, { FC, useState } from 'react';
import { OrderType, ViewBuyOrderModel, ViewSellOrderModel } from '../types/orders';

type Context = {
  currentOrder: ViewBuyOrderModel | ViewSellOrderModel | null;
  setCurrentOrder: (order: ViewBuyOrderModel | ViewSellOrderModel | null) => void;
  currentOrderType: OrderType | undefined;
  setCurrentOrderType: (type: OrderType | undefined) => void;
};

export const PrivateAreaContext = React.createContext<Context>({
  currentOrder: null,
  setCurrentOrder: () => null,
  currentOrderType: undefined,
  setCurrentOrderType: () => undefined,
});

export const PrivateAreaProvider: FC = ({ children }: any) => {
  const [currentOrder, setCurrentOrder] = useState<ViewBuyOrderModel | ViewSellOrderModel | null>(
    null
  );
  const [currentOrderType, setCurrentOrderType] = useState<OrderType | undefined>(undefined);

  return (
    <PrivateAreaContext.Provider
      value={{
        currentOrder,
        setCurrentOrder,
        currentOrderType,
        setCurrentOrderType,
      }}
    >
      {children}
    </PrivateAreaContext.Provider>
  );
};
