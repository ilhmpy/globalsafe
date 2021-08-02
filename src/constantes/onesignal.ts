let APP_ID: string;
let APP_SAFARI_ID: string;

if (process.env.REACT_APP_ENV) {
  switch (process.env.REACT_APP_ENV) {
    case 'prod':
      APP_ID = process.env.REACT_APP_PROD_ONESIGNAL_ID as string;
      APP_SAFARI_ID = process.env.REACT_APP_PROD_ONESIGNAL_SAFARI_ID as string;
      break;

    case 'dev':
      APP_ID = process.env.REACT_APP_DEV_ONESIGNAL_ID as string;
      APP_SAFARI_ID = process.env.REACT_APP_DEV_ONESIGNAL_SAFARI_ID as string;
      break;

    default:
      throw new Error('There no such app env');
  }
} else {
  APP_ID =
    process.env.NODE_ENV === 'production'
      ? (process.env.REACT_APP_PROD_ONESIGNAL_ID as string)
      : (process.env.REACT_APP_DEV_ONESIGNAL_ID as string);
  APP_SAFARI_ID =
    process.env.NODE_ENV === 'production'
      ? (process.env.REACT_APP_PROD_ONESIGNAL_SAFARI_ID as string)
      : (process.env.REACT_APP_DEV_ONESIGNAL_SAFARI_ID as string);
}

export { APP_ID, APP_SAFARI_ID };
