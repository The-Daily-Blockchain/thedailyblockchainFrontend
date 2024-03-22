// Define constants for durations in milliseconds
const ONE_DAY = 24 * 60 * 60 * 1000;
const SEVEN_DAYS = 7 * ONE_DAY;
const THIRTY_DAYS = 30 * ONE_DAY;
const SIX_MONTHS = 6 * 30 * ONE_DAY;
const ONE_YEAR = 365 * ONE_DAY;
const FIVE_YEARS = 5 * ONE_YEAR;

// Calculate the timestamps
const currentDate = new Date().getTime();
const oneDayAgo = currentDate - ONE_DAY;
const sevenDaysAgo = currentDate - SEVEN_DAYS;
const thirtyDaysAgo = currentDate - THIRTY_DAYS;
const sixMonthsAgo = currentDate - SIX_MONTHS;
const oneYearAgo = currentDate - ONE_YEAR;
const fiveYearsAgo = currentDate - FIVE_YEARS;

const timeStamps = {
  currentDate,
  oneDayAgo,
  sevenDaysAgo,
  thirtyDaysAgo,
  sixMonthsAgo,
  oneYearAgo,
  fiveYearsAgo,
};

export default timeStamps;

const oneDay = "1";
const sevenDays = "7";
const oneMonth = "30";
const sixMonths = "180";
const oneYear = "365";
const fiveYears = " 1825";
const maximum = "max";

export const Days = {
  oneDay,
  sevenDays,
  oneMonth,
  sixMonths,
  oneYear,
  fiveYears,
  maximum,
};
