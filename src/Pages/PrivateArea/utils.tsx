import { useState, useEffect, useRef } from 'react';

import alfa from '../../assets/v2/svg/banks/alfa.svg';
import sber from '../../assets/v2/svg/banks/sber.svg';
import tinkoff from '../../assets/v2/svg/banks/tinkoff.svg';
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

export const countVolumeToShow = (countVolume: number, asset: any): number => {
  let value = countVolume;
  if(asset === 1) {
    value = countVolume / 100000;
  }
  if(asset === 43) {
    value = countVolume / 10000;
  }
  if(asset === 59) {
    value = countVolume / 100;
  }
  return value;
};

export const countVolumeToSend = (summ: string, asset: number): string => {
  const summary = Number(summ);
  let value = summary;
  if(asset === 1) {
    value = summary * 100000;
  }
  if(asset === 43) {
    value = summary * 10000;
  }
  if(asset === 59) {
    value = summary * 100;
  }
  return String(value);
};

export function getBalanceKindByStringName(name: string | null) {
  return name === "CWD" ? 1 : 
         name === "GLOBALSAFE" ? 14 :
         name === "GLOBAL" ? 42 : 
         name === "GF" ? 43 :
         name === "FF" ? 44 : 
         name === "MULTICS" ? 59 : null;
};

export function getFiatKindByStringName(name: string | null) {
  return name === "RUB" ? 0 :
         name === "BYN" ? 1 :
         name === "UAH" ? 2 : 
         name === "KZT" ? 3 :
         name === "USD" ? 4 :
         name === "EUR" ? 5 :
         name === "THB" ? 6 :
         name === "USDT" ? 7 : null;
};

export function getMyRating(account: any) {
  if (account.claims) {
    let rating = 0;
    account.claims.forEach((claim: any) => {
    if (claim.claimType === "exchanges-rating") {
      rating = claim.claimValue;
    };
  });
    return (Number(rating)).toFixed(1);
  };
  return '0.0';
};

export const removeLeadingZeros = (str: string): string => {
  // Regex to remove leading
  // zeros from a string
  const regex = new RegExp("^0+(?!$)",'g');

  // Replaces the matched
  // value with given string
  str = str.replaceAll(regex, "");

 return str;
};


// Hook
export const useIsMobile = (): boolean => {
  const isClient = typeof window === 'object'; // Object represents browser window
  const lastWidth = useRef<any>();

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined
    }
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) { 
      return;
    } // Exit if not user/browser

    function handleResize() {
      if (window?.innerWidth !== lastWidth.current) {
        const width = getSize();
        if(lastWidth && lastWidth.current) {
          lastWidth.current  = width;
        }
        setWindowSize(width)
      }
    }

    window.addEventListener('resize', handleResize) // <-- I am only interested in window.innerWidth !
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return (windowSize && windowSize.width) ? windowSize.width < 769 : false;
}
