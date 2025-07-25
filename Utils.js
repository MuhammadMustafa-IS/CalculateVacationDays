const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;
const HOURS_PER_DAY = 8;

const accrualRates = {
  vacation: 1.538, // hours per full week
  sick: 0.769,
  remote: 3.692,
};

const MAX_VACATION_HOURS = 160;
const REMOTE_DAYS_2025 = 24;

function fullWeeksBetween(startDate, endDate) {
  const diff = endDate - startDate;
  return Math.floor(diff / MS_PER_WEEK);
}

function groupUsedDays(vacations) {
  return vacations.reduce((acc, item) => {
    const year = new Date(item.date).getFullYear();
    acc[item.type] = acc[item.type] || {};
    acc[item.type][year] = (acc[item.type][year] || 0) + 1;
    return acc;
  }, {});
}

function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function calculateTimeOff(hireDateStr, vacationsTaken, currentDateStr = null) {
  if (!currentDateStr) {
    currentDateStr = getCurrentDate();
  }
  const hireDate = new Date(hireDateStr);
  const currentDate = new Date(currentDateStr);

  const weeksWorked = fullWeeksBetween(hireDate, currentDate);

  const used = groupUsedDays(vacationsTaken);

  const currentYear = currentDate.getFullYear();
  const wasEmployedOnJanFirst2025 = hireDate <= new Date("2025-01-01");

  // VACATION
  let accruedVacationHours = Math.min(
    weeksWorked * accrualRates.vacation,
    MAX_VACATION_HOURS
  );
  let usedVacationDays = used.vacation
    ? Object.values(used.vacation).reduce((a, b) => a + b, 0)
    : 0;
  let vacationDays = Math.floor(accruedVacationHours / HOURS_PER_DAY);
  let remainingVacationDays = Math.max(vacationDays - usedVacationDays, 0);

  // SICK
  let sickDays = 0;
  if (hireDate.getFullYear() === currentYear) {
    let accruedSickHours = weeksWorked * accrualRates.sick;
    sickDays = Math.floor(accruedSickHours / HOURS_PER_DAY);
  } else {
    sickDays = 5;
  }
  let usedSickDays = used.sick?.[currentYear] || 0;
  let remainingSickDays = Math.max(sickDays - usedSickDays, 0);

  // REMOTE
  let remoteDays = 0;
  if (currentYear === 2025) {
    if (wasEmployedOnJanFirst2025) {
      remoteDays = REMOTE_DAYS_2025;
    } else {
      const startOf2025 = new Date("2025-01-01");
      const effectiveStart = hireDate > startOf2025 ? hireDate : startOf2025;
      const weeksWorkedIn2025 = fullWeeksBetween(effectiveStart, currentDate);
      const accruedRemoteHours = weeksWorkedIn2025 * accrualRates.remote;
      remoteDays = Math.floor(accruedRemoteHours / HOURS_PER_DAY);
    }
  }

  let usedRemoteDays = used.remote?.[currentYear] || 0;
  let remainingRemoteDays = Math.max(remoteDays - usedRemoteDays, 0);

  return {
    vacation: {
      accrued: vacationDays,
      used: usedVacationDays,
      remaining: remainingVacationDays,
    },
    sick: {
      accrued: sickDays,
      used: usedSickDays,
      remaining: remainingSickDays,
    },
    remote: {
      accrued: remoteDays,
      used: usedRemoteDays,
      remaining: remainingRemoteDays,
    },
  };
}

module.exports = { calculateTimeOff };
