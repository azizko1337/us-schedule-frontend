import type Event from "@/types/Event";
import type ApiResponse from "@/types/ApiResponse";

async function fetchWeekSchedule(week: Number): Promise<ApiResponse> {
  const id = localStorage.getItem("id");
  const res = await fetch(
    `${process.env.API_URL}/byGroup?id=${id}&week=${week}`
  );
  const data = (await res.json()) as ApiResponse;
  return data;
}

export default fetchWeekSchedule;
