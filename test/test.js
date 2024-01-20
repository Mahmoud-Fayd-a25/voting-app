function calculateDaysBetweenDates(begin, end) {
  const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
  const startDate = new Date(begin);
  const endDate = new Date(end);
  const diffDays = Math.round(Math.abs((startDate - endDate) / oneDay));
  return diffDays;
}
