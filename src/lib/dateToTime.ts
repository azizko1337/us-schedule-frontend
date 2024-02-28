function dateToTime(date: Date) {
  return date.toTimeString().slice(0, 5);
}

export default dateToTime;
