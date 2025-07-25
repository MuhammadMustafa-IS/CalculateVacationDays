Update Calculate.js to use your correct data

PS: THIS USE NORMAL DATE FORMAT, NOT AMERICAN FORMAT YYYY-MM-DD

```javascript
const hireDate = "2024-06-10"; // Your hire date
const toDate = "2025-07-24"; // Optional: The date until which you want to calculate time off or leave null
// Define your vacation data from Bamboo
const vacations = [
  { type: "sick", date: "2024-12-11" },

  { type: "vacation", date: "2025-06-16" },

  { type: "remote", date: "2024-10-10" },
  { type: "remote", date: "2024-10-24" },
];
```

Use this script in the console on Bamboo to get the data

```javascript
Array.from(document.querySelectorAll(".fabric-19ek9xg-Table-cell"))
  .filter((el) =>
    RegExp(/^([0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4})/).test(el.textContent)
  )
  .map((el) => {
    const date = el.textContent.split("/");
    return {
      type: "remote", // or "sick" or "vacation" depending on what  you picked from the dropdown
      date: `${date[2]}-${date[0]}-${date[1]}}`,
    };
  });
```

To run the script

```powershell
 node .\Calculate.js
    {
      "vacation": {
        "accrued": 11,
        "used": 1,
        "remaining": 10
      },
      "sick": {
        "accrued": 5,
        "used": 0,
        "remaining": 5
      },
      "remote": {
        "accrued": 24,
        "used": 0,
        "remaining": 24
      }
    }
```
