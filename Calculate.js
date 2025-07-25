const { calculateTimeOff } = require("./Utils");

const hireDate = "2024-06-10";
const toDate = null;
const vacations = [
  { type: "sick", date: "2024-12-11" },

  { type: "vacation", date: "2025-06-16" },

  { type: "remote", date: "2024-10-10" },
  { type: "remote", date: "2024-10-24" },
];

const result = calculateTimeOff(hireDate, vacations, toDate);
console.log(JSON.stringify(result, null, 2));
