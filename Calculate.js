const { calculateTimeOff } = require("./vacation");

const hireDate = "2024-06-10";
const currentDate = "2025-07-24";
const vacations = [
  { type: "sick", date: "2024-12-11" },
  { type: "sick", date: "2025-03-18" },
  { type: "sick", date: "2025-07-09" },

  { type: "vacation", date: "2025-06-16" },

  { type: "remote", date: "2024-06-10" },
  { type: "remote", date: "2024-10-10" },
  { type: "remote", date: "2024-10-24" },
  { type: "remote", date: "2024-12-16" },
  { type: "remote", date: "2024-12-19" },
  { type: "remote", date: "2025-01-15" },
  { type: "remote", date: "2025-01-17" },
  { type: "remote", date: "2025-01-21" },
  { type: "remote", date: "2025-01-28" },
  { type: "remote", date: "2025-02-11" },
  { type: "remote", date: "2025-02-14" },
  { type: "remote", date: "2025-02-28" },
  { type: "remote", date: "2025-05-14" },
  { type: "remote", date: "2025-05-28" },
  { type: "remote", date: "2025-05-30" },
  { type: "remote", date: "2025-06-04" },
  { type: "remote", date: "2025-06-24" },
  { type: "remote", date: "2025-07-08" },
  { type: "remote", date: "2025-07-14" },
  { type: "remote", date: "2025-07-23" },
];

const result = calculateTimeOff(hireDate, currentDate, vacations);
console.log(JSON.stringify(result, null, 2));
