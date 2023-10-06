export const calculateDateRanges = (currentDate: Date) => {
  const yearToDateRange = {
    from: new Date(currentDate.getFullYear(), 0, 1),
    to: currentDate
  };

  const lastMonthRange = {
    from: new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    to: new Date(currentDate.getFullYear(), currentDate.getMonth(), 0)
  };

  const lastWeekRange = {
    from: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - currentDate.getDay() - 7
    ),
    to: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - currentDate.getDay()
    )
  };

  const yesterdayRange = {
    from: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 1
    ),
    to: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    )
  };

  const lastHourRange = {
    from: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      currentDate.getHours() - 1
    ),
    to: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      currentDate.getHours()
    )
  };

  return {
    yearToDateRange,
    lastMonthRange,
    lastWeekRange,
    yesterdayRange,
    lastHourRange
  };
};
