import React,{useContext,useState} from 'react';
import ReactCharts from 'react-apexcharts';
import { ModeContext } from '../../components/MiniDrawer/MiniDrawer'
import axios from 'axios';


const Charts = () => {

  const [dates,setDates]=useState([])
  const [data,setData]=useState([])
  const { mode} = useContext(ModeContext);

  const chartStyle = {
    maxWidth: '100%',
    paddingTop: '1rem',
  };
//   const series = [
//     {
//         "name": "Incidents Count",
//         "type": "column",
//         "data": [
//             7,
//             0,
//             0
//         ],
//         "color": "#16FF00"
//     },
//     {
//         "name": "Social Media",
//         "type": "line",
//         "data": [
//             0,
//             0,
//             2
//         ],
//         "color": "#FFED00"
//     },
//     {
//         "name": "Another Line",
//         "type": "column",
//         "data": [
//             2,
//             0,
//             0
//         ],
//         "color": "#ff2424"
//     }
// ];
const series = data

  const options = {
    legend: {
      labels: {
        colors: [ ] //legend color
      }
    },
    chart: {
      height: 350,
      type: 'line'
    },
    stroke: {
      width: [0, 4]
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
      
    },
  //   labels:[
  //     "2023-05-31",
  //     "2023-06-01",
  //     "2023-06-02"
  // ],
  labels:dates,
    xaxis: {
      type: 'datetime',
      style: {
        color: '#FF0000' // Set the color of x-axis legend to red
      }
    },
    yaxis: [
      {
        title: {
          text: 'Complete/Incomplete Range',
          style: {
            color: mode ? 'black' : 'white' // Set the color of x-axis legend to red
          }
        },
      },
      {
        opposite: true,
        title: {
          text: 'Started Range',
          style: {
            color: mode ? 'black' : 'white'  // Set the color of x-axis legend to red
          }
        }
      }
    ],
    
  };

  

  const chartCSS = `
  .apexcharts-tooltip {
    background-color: ${mode ? '#27293d' : 'white'};
    color: black;
    border: 1px solid ${mode ? 'white' : 'black'};
  }
  .apexcharts-xaxis-label, .apexcharts-yaxis-label  {
    fill: ${mode? 'black' : 'white' }; 
  }

  .apexcharts-menu-open .apexcharts-menu-item {
    color: black !important;
  }

  
`;
const [prestart,setPrestart]=useState(null)
const [preend,setPreend]=useState(null)

if(localStorage.startdate!=prestart && localStorage.enddate!=preend ){
  axios.post('http://localhost:5000/api/analytics/bargraph/'+localStorage.startdate+'/'+localStorage.enddate)
  .then((res)=>{
    setData(res.data.series)
    setDates(res.data.dates)
  })
}

  return (
    <div id="chart" style={chartStyle} >
      <style>{chartCSS}</style>
      <ReactCharts options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default Charts;