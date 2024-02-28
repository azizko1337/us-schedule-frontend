import { useState, useEffect } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import EventCard from "@/components/EventCard";

import type Event from "@/types/Event";

type Props = {
  todaySchedule: Array<Event>;
};

function Menu(props: Props) {
  const { todaySchedule } = props;
  const [completedClasses, setCompletedClasses] = useState<Array<Event>>([]);
  const [uncompletedClasses, setUncompletedClasses] = useState<Array<Event>>(
    []
  );
  const [currentClasses, setCurrentClasses] = useState<Array<Event>>([]);

  useEffect(() => {
    const now = new Date();

    const completed = todaySchedule.filter((event) => {
      return new Date(event.end) < now;
    });
    const uncompleted = todaySchedule.filter((event) => {
      return new Date(event.start) > now;
    });
    const current = todaySchedule.filter((event) => {
      return new Date(event.start) <= now && new Date(event.end) >= now;
    });

    setCompletedClasses(completed);
    setUncompletedClasses(uncompleted);
    setCurrentClasses(current);
  }, [todaySchedule]);

  // no classes today
  if (todaySchedule.length === 0) {
    return (
      <Drawer>
        <DrawerTrigger>
          <Button>Menu</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>No classes today!</DrawerTitle>
            <DrawerDescription>stay safe</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="items-center">
            <Button variant="outline">Settings</Button>
            <DrawerClose>
              <Button>Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  // all today's classes are completed
  if (completedClasses.length === todaySchedule.length) {
    return (
      <Drawer>
        <DrawerTrigger>
          <Button>Menu</Button>
        </DrawerTrigger>
        <DrawerContent className="max-w-screen-sm mx-auto">
          <DrawerHeader>
            <DrawerTitle>
              {completedClasses.length}/{completedClasses.length} today{"'"}{" "}
              classes completed!!!
            </DrawerTitle>
            <DrawerDescription>stay safe</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="items-center">
            <Button variant="outline">Settings</Button>
            <DrawerClose>
              <Button>Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  //we are during the class
  if (currentClasses.length) {
    <Drawer>
      <DrawerTrigger>
        <Button>Menu</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>!!!!</DrawerTitle>
          <DrawerDescription>Some details.</DrawerDescription>
        </DrawerHeader>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>
            Completed classes today:{" "}
            <b>
              {completedClasses.length}/{todaySchedule.length}
            </b>
          </li>
        </ul>
        <h3 className="container flex justify-center scroll-m-20 text-2xl font-semibold tracking-tight">
          Current classes:
        </h3>
        {currentClasses.map((event) => (
          <EventCard event={event} key={event.id} />
        ))}
        <DrawerFooter className="items-center">
          <Button variant="outline">Settings</Button>
          <DrawerClose>
            <Button>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>;
  }

  //else, we are between classes
  return (
    <Drawer>
      <DrawerTrigger>
        <Button>Menu</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>!!!!</DrawerTitle>
          <DrawerDescription>Some details.</DrawerDescription>
        </DrawerHeader>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>
            Completed classes today:{" "}
            <b>
              {completedClasses.length}/{todaySchedule.length}
            </b>
          </li>
        </ul>
        {completedClasses.length ? (
          <h3 className="container flex justify-center scroll-m-20 text-2xl font-semibold tracking-tight">
            Next class:
          </h3>
        ) : null}
        {completedClasses ? <EventCard event={uncompletedClasses[0]} /> : null}
        <DrawerFooter className="items-center">
          <Button variant="outline">Settings</Button>
          <DrawerClose>
            <Button>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default Menu;
