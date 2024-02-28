"use client";

import { useState, useEffect } from "react";
import DatePicker from "@/components/DatePicker";
import EventCard from "@/components/EventCard";
import Nav from "@/components/Nav";
import Menu from "@/components/Menu";
import type Event from "@/types/Event";

import fetchWeekSchedule from "@/lib/fetchWeekSchedule";
import calculateWeek from "@/lib/calculateWeek";
import getDayTimestamp from "@/lib/getDayTimestamp";
import getFullWeekday from "@/lib/getFullWeekday";

function Home() {
  const [chosenDay, setChosenDay] = useState<Date>(new Date());
  const [week, setWeek] = useState<Number>(1);
  const [weekSchedule, setWeekSchedule] = useState<Array<Event>>([]);
  const [todaySchedule, setTodaySchedule] = useState<Array<Event>>([]);
  const [errorOccured, setErrorOccured] = useState<Boolean>(false);

  //set default values for localStorage firstDayOfSemester and id
  useEffect(() => {
    const firstDayOfSemester = localStorage.getItem("firstDayOfSemester");
    if (!firstDayOfSemester) {
      localStorage.setItem("firstDayOfSemester", "02.19.2024");
    }

    const id = localStorage.getItem("id");
    if (!id) {
      localStorage.setItem("id", "82111");
    }

    setWeek(calculateWeek(chosenDay));
  }, []);

  //calculate week every time user changes chosenDay
  useEffect(() => {
    setWeek(calculateWeek(chosenDay));
  }, [chosenDay]);

  //fetch week schedule every time week changes
  useEffect(() => {
    try {
      fetchWeekSchedule(week).then((data) => {
        setWeekSchedule(data.schedule);
        setErrorOccured(data.errorOccured);

        // update todaySchedule
        const todayEvents = data.schedule
          .sort((a, b) => +a.id - +b.id)
          .filter((event) => {
            return (
              getDayTimestamp(new Date(event.start)) ==
              getDayTimestamp(undefined)
            );
          });
        if (todayEvents.length > 0) setTodaySchedule(todayEvents);
      });
    } catch (error) {
      setWeekSchedule([]);
      setErrorOccured(true);
    }
  }, [week]);

  return (
    <>
      <div className="container p-2 pb-60">
        {weekSchedule
          .filter(
            (event) =>
              getDayTimestamp(new Date(event.start)) ===
              getDayTimestamp(chosenDay)
          )
          .sort((a, b) => +a.id - +b.id)
          .map((event) => (
            <EventCard event={event} key={event.id} />
          ))}
      </div>
      <Nav>
        <small className="text-sm font-medium leading-none">
          {getFullWeekday(chosenDay)}
        </small>
        <DatePicker date={chosenDay} setDate={setChosenDay} />
        <Menu todaySchedule={todaySchedule} />
      </Nav>
    </>
  );
}

export default Home;
