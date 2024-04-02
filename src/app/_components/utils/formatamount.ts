export const formatAmount = (amount: any): any => {
  return amount?.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
export const newFormatAmount = (amount: number | string): string => {
  if (typeof amount === "string") {
    amount = parseFloat(amount);
  }
  return amount?.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const formatNumberWithCommas = (number: any) => {
  return number?.toLocaleString();
};

export const removeLeadingZeros = (value: string | number): string => {
  if (!value || value === "0") {
    return "0";
  }

  const stringValue = value.toString();
  const [integerPart, decimalPart] = stringValue.split(".");
  const formattedIntegerPart = integerPart.replace(/^0+/, "");
  let formattedValue = formattedIntegerPart;
  if (decimalPart !== undefined) {
    formattedValue += "." + decimalPart;
  }
  return formattedValue;
};
