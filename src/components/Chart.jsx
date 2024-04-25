import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('Jan', 600),
  createData('Feb', 800),
  createData('Mar', 1500),
  createData('Apr', 2000),
  createData('May', 2400),
  createData('Jun', 2400),
  createData('Jul', 2400),
  createData('Aug', 2400),
  createData('Sep', 2400),
  createData('Oct', 2400),
  createData('Nov', 2400),
  createData('Dec', 2400),
];

export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title sx={{color:theme.palette.success.main}}>Monthly Revenue(₹)</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.success.main}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.success.main}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              color='success'
              style={{
                textAnchor: 'middle',
                fill: theme.palette.success.main,
                ...theme.typography.body1,
              }}
            >
              Revenue month wise (₹)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.success.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}