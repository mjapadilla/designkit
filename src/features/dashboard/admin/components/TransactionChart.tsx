import { BarGraph } from 'ui/graph';

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

function TransactionChart() {
  return (
    <BarGraph
      data={{
        labels: labels,
        datasets: [
          {
            label: '2022',
            data: (labels ?? [])?.map(
              () => Math.floor(Math.random() * 1000000) * 10
            ),
            backgroundColor: 'rgba(0, 54, 54, 1)',
            borderWidth: 0,
          },
          {
            label: '2021',
            data: (labels ?? [])?.map(
              () => Math.floor(Math.random() * 1000000) * 10
            ),
            backgroundColor: 'rgba(1, 85, 85, 1)',
            borderWidth: 0,
          },
          {
            label: '2023',
            data: (labels ?? [])?.map(
              () => Math.floor(Math.random() * 1000000) * 10
            ),
            backgroundColor: 'rgba(3, 110, 110, 1)',
            borderWidth: 0,
          },
        ],
      }}
      options={{
        aspectRatio: 1,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
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
              color: 'rgba(175, 175, 175, 1)',
              font: {
                weight: 600,
                size: 14,
              },
              padding: {
                top: 5,
                bottom: -5,
              },
              position: 'center',
              text: 'Legend',
            },
          },
          title: {
            display: false,
            position: 'bottom',
            text: 'Legend',
          },
        },
        layout: {
          autoPadding: false,
          padding: {
            bottom: -5,
            top: 0,
            left: -10,
            right: -10,
          },
        },
        scales: {
          x: {
            ticks: {
              padding: 10,
              display: true,
              backdropPadding: 0,
            },
            border: {
              display: true,
            },
            grid: {
              lineWidth: 1.5,
              drawTicks: false,
              offset: false,
              color: 'rgba(239, 239, 239, 1)',
            },
          },
          y: {
            beginAtZero: true,
            border: {
              display: false,
            },
            grid: {
              lineWidth: 1.5,
              drawTicks: false,
              offset: false,
              color: 'rgba(239, 239, 239, 1)',
            },
            ticks: {
              backdropPadding: 0,
              display: true,
              padding: 10,
            },
          },
        },
      }}
    />
  );
}

export default TransactionChart;
