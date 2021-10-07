export const routers = {
  deposits: '/info',
  operations: '/info/operations',
  depositsProgram: '/info/deposits/programs',
  depositsOpen: '/info/deposits/new-deposit/:depositId',
  depositsView: '/info/deposits/view',
  settings: '/info/settings',
  settingsNewPayMethod: '/info/settings/new-pay-method',
  settingsViewPayMethod: '/info/settings/view-pay-method',
  p2pchanges: '/info/p2p-changes',
  p2pchangesAdvert: '/info/p2p-changes/advert',
  p2pchangesOwn: '/info/p2p-changes/own',
  p2pchangesOrderToSell: '/info/p2p-changes/create-sell-order',
  p2pchangesSingleExchangeDetails: '/info/p2p-changes/:exchangeId',
  p2pchangesSingleExchangeChat: '/info/p2p-changes/:exchangeId/chat',
  p2pchangesSingleOrderDetails: '/info/p2p-changes/orders/:orderId',
  p2pchangesNewOrder: '/info/p2p-changes/new-order',
  certificates: '/info/p2p-changes/certificates',
  orderCreate: '/info/p2p-changes/order-create'
};
