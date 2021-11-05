export const wordDecline = (num: number, arr: string[]) => {
    let result;
    let count = num % 100;
    if (count >= 5 && count <= 20) {
      result = arr[2];
    } else {
      count = count % 10;
      if (count === 1) {
        result = arr[0];
      } else if (count >= 2 && count <= 4) {
        result = arr[1];
      } else {
        result = arr[2];
      }
    }
    return result;
  };
