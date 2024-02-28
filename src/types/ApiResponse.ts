import type Event from "@/types/Event";

type ApiResponse = {
  errorOccured: boolean;
  schedule: Array<Event>;
};

export default ApiResponse;
