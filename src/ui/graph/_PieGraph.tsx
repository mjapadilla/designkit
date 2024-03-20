import {
  ArcElement,
  ChartData,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  Tooltip,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const defaultData: ChartData<'doughnut'> = {
  labels: ['Cebuana', 'GCash', 'Maya'],
  datasets: [
    {
      label: 'Value',
      data: [24, 20, 10],
      backgroundColor: [
        'rgba(3, 110, 110, 1)',
        'rgba(1, 85, 85, 1)',
        'rgba(0, 54, 54, 1)',
      ],
      borderWidth: 0,
      rotation: 100,
      offset: 0,
    },
  ],
};

const defaultOptions: ChartOptions<'doughnut'> = {
  aspectRatio: 1,
  responsive: true,
  maintainAspectRatio: false,
  cutout: '50%',
  plugins: {
    title: {
      display: false,
      position: 'bottom',
      padding: {
        top: 25,
      },
      text: 'Chart.js Doughnut Chart',
    },
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        usePointStyle: true,
        boxHeight: 10,
        boxWidth: 10,
        padding: 20,
      },
      title: {
        display: true,
        color: 'rgba(50, 50, 50, 1)',
        font: {
          weight: 600,
          size: 14,
        },
        padding: {
          top: 15,
          bottom: -5,
        },
        position: 'center',
        text: 'Top 3 Partners',
      },
    },
  },
  layout: {
    autoPadding: false,
    padding: {
      left: 0,
      right: 0,
      top: 5,
      bottom: 0,
    },
  },
};

type TProps = {
  options?: ChartOptions<'doughnut'>;
  data?: ChartData<'doughnut'>;
};

function PieGraph({
  data = defaultData,
  options = defaultOptions,
  ...otherProps
}: TProps) {
  return (
    <div className="h-full w-full">
      <Doughnut data={data} options={options} {...otherProps} />
    </div>
  );
}

export default PieGraph;
