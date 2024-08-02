export const dateWithDayNameDayMonthNameAndYear = () => {
  const date = new Date();

  // Days of the week
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = days[date.getDay()];

  // Months of the year
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = months[date.getMonth()];

  // Date
  const day = date.getDate();

  // Year
  const year = date.getFullYear();

  return `${dayName}, ${day} ${monthName} ${year}`;
};
