import {
  BarElement,
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type TProps = {
  options?: ChartOptions<'bar'>;
  data?: ChartData<'bar'>;
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

const defaultData: ChartData<'bar'> = {
  labels,
  datasets: [
    {
      label: 'Dataset 2',
      data: labels.map(() => Math.floor(Math.random() * (1000 - 100) + 100)),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, .5)',
      borderWidth: 0,
    },
  ],
};

const defaultOptions: ChartOptions<'bar'> = {
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

function BarGraph({
  data = defaultData,
  options = defaultOptions,
  ...otherProps
}: TProps) {
  return (
    <div className="h-full w-full">
      <Bar options={options} data={data} {...otherProps} />
    </div>
  );
}

export default BarGraph;
