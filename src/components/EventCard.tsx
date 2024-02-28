import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import dateToTime from "@/lib/dateToTime";

import type Event from "@/types/Event";

function EventCard(props: { event: Event }) {
  const { summary, start, end } = props.event;

  return (
    <Card className="relative my-3">
      <CardHeader>
        <CardTitle>{summary.split(" ")[0]}</CardTitle>
        <CardDescription>
          {dateToTime(new Date(start))} - {dateToTime(new Date(end))}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{summary}</p>
      </CardContent>
      <ToggleGroup className="absolute right-1 top-1" type="single">
        <ToggleGroupItem value="a">Hide</ToggleGroupItem>
        <ToggleGroupItem value="b">!</ToggleGroupItem>
      </ToggleGroup>
    </Card>
  );
}

export default EventCard;
