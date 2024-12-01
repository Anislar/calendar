export const times: { id: number; time: string }[] = [];
let id = 0;
for (let hour = 0; hour < 24; hour++) {
  for (let minute = 0; minute < 60; minute += 30) {
    // Format the time as HH:mm
    const time = `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
    times.push({ id, time });
    id++;
  }
}
