export const API_URL =
  process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL : process.env.REACT_APP_API_URL_LOCAL;

let APP_URL: string;

if (process.env.REACT_APP_ENV) {
    switch (process.env.REACT_APP_ENV) {
        case 'stage':
            APP_URL = process.env.REACT_APP_STAGE_URL as string;
            break;
        case 'prod':
            APP_URL = process.env.REACT_APP_PROD_URL as string;
            break;
        case 'dev':
            APP_URL = process.env.REACT_APP_DEV_URL as string;
            break;
        default:
            throw new Error('There no such app env');
    }
} else {
    APP_URL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_URL as string : process.env.REACT_APP_URL_LOCAL as string;
}

export { APP_URL };
