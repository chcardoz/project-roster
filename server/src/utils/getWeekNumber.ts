//This gives me the correct week number + 1
export const getWeekNumber = (date: Date) => {
  let d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  let dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  let yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d as any) - (yearStart as any)) / 86400000 + 1) / 7);
};

//This gives me the correct week number + 2
export const getNumberOfWeek = (dateString: string): number => {
  const date = new Date(dateString);
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.valueOf() - firstDayOfYear.valueOf()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};
