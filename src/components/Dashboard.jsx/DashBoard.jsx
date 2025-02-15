import React, { useState } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Grid, Button, Slider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import MainUi from '../interface/MainUi';

const data = [
  { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
];

const Dashboard = () => {
  const [value, setValue] = useState(50);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  // Color for pie chart slices
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <>
      {/* <MainUi/> */}
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>

        <Grid container spacing={2}>
          {/* Monthly Data Chart */}
          <Grid item xs={12} md={6}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Monthly Data (Bar Chart)</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <BarChart width={500} height={300} data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pv" fill="#8884d8" />
                  <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
              </AccordionDetails>
            </Accordion>
          </Grid>

          {/* Line Chart */}
          <Grid item xs={12} md={6}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Monthly Data (Line Chart)</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <LineChart width={500} height={300} data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                  <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
                </LineChart>
              </AccordionDetails>
            </Accordion>
          </Grid>

          {/* Area Chart */}
          <Grid item xs={12} md={6}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Monthly Data (Area Chart)</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <AreaChart width={500} height={300} data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="pv" stroke="#8884d8" fill="#8884d8" />
                  <Area type="monotone" dataKey="uv" stroke="#82ca9d" fill="#82ca9d" />
                </AreaChart>
              </AccordionDetails>
            </Accordion>
          </Grid>

          {/* Pie Chart */}
          <Grid item xs={12} md={6}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Category Distribution (Pie Chart)</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <PieChart width={400} height={300}>
                  <Pie
                    data={data}
                    dataKey="uv"
                    nameKey="name"
                    outerRadius={120}
                    fill="#8884d8"
                    label
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </AccordionDetails>
            </Accordion>
          </Grid>

          {/* Interactive Slider */}
          <Grid item xs={12} md={6}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Interactive Slider</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ width: 300 }}>
                  <Typography gutterBottom>Value: {value}</Typography>
                  <Slider
                    value={value}
                    onChange={handleSliderChange}
                    aria-labelledby="slider"
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${value}%`}
                    min={0}
                    max={100}
                  />
                </Box>
              </AccordionDetails>
            </Accordion>
          </Grid>

          {/* Action Button */}
          <Grid item xs={12} md={6}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Action Button</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Button variant="contained" color="primary" onClick={() => alert('Action performed')}>
                  Click Me
                </Button>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
