export const APP_ID =
      process.env.NODE_ENV === "production" ? process.env.REACT_APP_PROD_ONESIGNAL_ID : process.env.REACT_APP_DEV_ONESIGNAL_ID;

export const APP_SAFARI_ID =
      process.env.NODE_ENV === "production" ? process.env.REACT_APP_PROD_ONESIGNAL_SAFARI_ID : process.env.REACT_APP_DEV_ONESIGNAL_SAFARI_ID;
