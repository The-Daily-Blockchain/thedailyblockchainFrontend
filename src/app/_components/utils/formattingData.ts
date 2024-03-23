export const formatDate = (dateString: string | number | Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = new Date(dateString).toLocaleDateString(
    undefined,
    options
  );
  return formattedDate;
};

export const formatChartingDate = (
  dateString: string | number | Date
): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formatChartingDateWithTime = (
  dateString: string | number | Date
): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  let hours = date.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 should be displayed as 12
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
};

export const formatDateGecko = (timeStamp: any) => {
  const date = new Date(timeStamp * 1000);

  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${day}-${month}-${year}`;
};
