export const initialArray = (): number[] => {
  return Array.from({ length: 100 });
};

export const formatUsername = (name: string, length: number) => {
  if (name) {
    if (name.length > 15) {
      return name.slice(0, length) + "..." + name.slice(-length);
    } else {
      return name;
    }
  }
  return "";
};

export const formatNumber = (number: number) => {
  return number.toLocaleString("en-US", {
    maximumFractionDigits: 3,
  });
};

export const formatDecimal = (number: number) => {
  return number.toLocaleString("en-US", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });
};
