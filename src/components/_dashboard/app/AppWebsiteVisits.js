import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------


var CHART_DATA;
if (localStorage.isAdmin == "true") {
  CHART_DATA = [
    {
      name: 'Justified absences',
      type: 'column',
      data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
    },
    {
      name: 'Unjustified absences',
      type: 'line',
      data: [23, 31, 1, 27, 13, 2, 37, 3, 10, 15, 30]
    },
    {
      name: 'Warnings',
      type: 'line',
      data: [12, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
    },
    {
      name: 'Exclusions',
      type: 'line',
      data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
    }
  ];
}
else {
  CHART_DATA = [
    {
      name: 'Justified absences',
      type: 'column',
      data: [3, 1, 2, 1, 0, 1, 4, 0, 0, 0, 1]
    },
    {
      name: 'Unjustified absences',
      type: 'line',
      data: [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1]
    },
    {
      name: 'Warnings',
      type: 'line',
      data: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: 'Exclusions',
      type: 'line',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  ];
}


export default function AppWebsiteVisits() {
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient', 'solid'] },
    labels: [
      '01/01/2021',
      '02/01/2021',
      '03/01/2021',
      '04/01/2021',
      '05/01/2021',
      '06/01/2021',
      '07/01/2021',
      '08/01/2021',
      '09/01/2021',
      '10/01/2021',
      '11/01/2021'
    ],
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} `;
          }
          return y;
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="Monthly attendance"
      //  subheader="(+43%) than last year"
      />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
