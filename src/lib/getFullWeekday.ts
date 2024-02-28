function getFullWeekday(date: Date): string {
  return date.toLocaleString("en-US", { weekday: "long" });
}

export default getFullWeekday;
