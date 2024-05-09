export const lineChartData = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      label: "number of Registered",
      data: [
        5000, 4800, 5500, 6000, 6500, 6200, 7000, 6800, 7500, 8000, 8500, 9000,
      ],
      borderColor: "rgb(75, 192, 192)",
      borderWidth: 2,
    },
    {
      label: "number of attended",
      data: [
        4875, 4608, 5250, 5760, 6200, 5904, 6660, 6480, 7125, 7600, 8075, 8550,
      ],
      borderColor: "red",
      borderWidth: 2,
    },
  ],
};

export const barChartData = {
  labels: ["Term1", "Term2", "Term3", "Term4"],
  datasets: [
    {
      label: "number of student Art",
      data: [1200, 300, 150, 180],
      backgroundColor: ["rgba(153, 102, 255, 0.2)"],
      borderColor: ["rgba(153, 102, 255, 1)"],
      borderWidth: 1,
    },
    {
      label: "Number of Students in Science",
      data: [1300, 350, 175, 200],
      backgroundColor: ["rgba(255, 99, 132, 0.2)"],
      borderColor: ["rgba(255, 99, 132, 1)"],
      borderWidth: 1,
    },
    {
      label: "Number of Students in Math",
      data: [1400, 280, 160, 220],
      backgroundColor: ["rgba(54, 162, 235, 0.2)"],
      borderColor: ["rgba(54, 162, 235, 1)"],
      borderWidth: 1,
    },
    {
      label: "Number of Students in History",
      data: [1150, 330, 140, 190],
      backgroundColor: ["rgba(255, 206, 86, 0.2)"],
      borderColor: ["rgba(255, 206, 86, 1)"],
      borderWidth: 1,
    },
  ],
};
