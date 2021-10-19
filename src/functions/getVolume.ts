export function getVolume(volume: number, kind: number) {
    let cv = 0;
    if (kind === 1) {
      cv = volume / 100000;
    } else if (kind === 43) {
      cv = volume / 10000;
    } else if (kind === 44 || kind === 45 || kind === 48 || kind === 47) {
      cv = volume / 1;
    } else if (kind === 59) {
      cv = volume / 100;
    };
    return Number(cv);
  };
