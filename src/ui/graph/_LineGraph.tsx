import {
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  ChartOptions,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

type TProps = {
  options?: ChartOptions<'line'>;
  data?: ChartData<'line'>;
};

const labels = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const defaultData: ChartData<'line'> = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Dataset 2',
      data: labels.map(() => Math.floor(Math.random() * (1000 - 100) + 100)),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, .5)',
      borderWidth: 0,
      tension: 0.1,
      pointHoverRadius: 6,
      pointBorderWidth: 2,
      pointBackgroundColor: 'rgb(53, 162, 235)',
    },
  ],
};

const defaultOptions: ChartOptions<'line'> = {
  aspectRatio: 1,
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top' as const,
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
  },
  layout: {
    autoPadding: true,
    padding: {
      right: 0,
      left: 0,
      top: 5,
      bottom: 0,
    },
  },
  scales: {
    x: {
      ticks: {
        padding: 5,
        backdropPadding: 0,
      },
      grid: {
        lineWidth: 1.5,
        drawTicks: false,
        offset: true,
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        padding: 5,
        backdropPadding: 0,
      },
      grid: {
        lineWidth: 1.5,
        drawTicks: false,
        offset: false,
      },
    },
  },
};

function LineGraph({
  data = defaultData,
  options = defaultOptions,
  ...otherProps
}: TProps) {
  return (
    <div className="h-full w-full">
      <Line options={options} data={data} {...otherProps} />
    </div>
  );
}

export default LineGraph;
