export const checkMinNumberValue = (value: number, minLength: number) => {
  return value < minLength;
};

export const checkMaxNumberValue = (value: number, maxLength: number) => {
  return value > maxLength;
};

export const checkStringMaxLength = (value: string, maxLength: number) => {
    return String(value).length > maxLength;
  };
