function calculateWeek(date: Date) {
  let firstDayOfSemester = localStorage.getItem("firstDayOfSemester");
  const week = Math.ceil(
    (date.getTime() - new Date(firstDayOfSemester as string).getTime()) /
      604800000 // 7 days in milliseconds
  );
  return week;
}

export default calculateWeek;
