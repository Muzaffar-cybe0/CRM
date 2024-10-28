import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
import { Doughnut } from "react-chartjs-2";

const data = {
  labels: ["Teacher", "Marketing", "Administrators", "Cleaners", "others"],
  datasets: [
    {
      label: "Total Students",
      data: [150, 8, 10, 80, 30],
      backgroundColor: ["#ff0100", "#00ff01", "#0000ff", "#800080", "#ffff01"],
    },
  ],
};

const options = {
  plugins: {
    tooltip: {
      enabled: true,
    },
    legend: {
      position: "top",
    },
  },
};

const MyPieChart = () => {
  return (
    <div style={{ width: "400px", height: "400px" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default MyPieChart;
