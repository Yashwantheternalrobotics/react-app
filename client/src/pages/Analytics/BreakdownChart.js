import React,{useContext,useState} from "react";
import { ResponsivePie } from "@nivo/pie";
import { Box, Typography, useTheme } from "@mui/material";
import { ModeContext } from '../../components/MiniDrawer/MiniDrawer'
import axios from 'axios'



const BreakdownChart = ({ isDashboard = true }) => {


    
const [data,setData] = useState([
    {
        "id": "Completed",
        "label": "Completed",
        "value": 7,
        "color": "#007100"
    },
    {
        "id": "Incomplet",
        "label": "Incomplet",
        "value": 7,
        "color": "hsl(241, 70%, 50%)"
    },
    {
        "id": "Started",
        "label": "Started",
        "value": 8,
        "color": "hsl(316, 70%, 50%)"
    }
])

// console.log(localStorage.startdate,localStorage.enddate)

if(localStorage.startdate&& localStorage.enddate)
{
    axios.post('http://localhost:5000/api/analytics/piechat/'+localStorage.startdate+'/'+localStorage.enddate)
    .then((res)=>{
        setData(res.data)
    })
}
// console.log(data)

  const theme = useTheme();

  const { mode} = useContext(ModeContext);

  return (
    <Box
      height={isDashboard ? "400px" : "900%"}
      width={undefined}
      minHeight={isDashboard ? "325px" : undefined}
      minWidth={isDashboard ? "275px" : undefined}
      position="relative"

    >
      <ResponsivePie
        data={data}
        margin={{ top: 30, right: 80, bottom: 80, left: 50 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        tooltip={({ datum }) => (
            <div style={{color:mode?'white' : 'black',backgroundColor:mode ? '#27293d' : 'white',padding:'5px', borderRadius:'5px'}}>
              {datum.id} : <strong> {datum.value} </strong>
            </div>
          )}
        activeOuterRadiusOffset={8}
        colors={{ scheme: 'nivo' }}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        enableArcLinkLabels={false}
        
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'Started'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'Incomplet'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'Completed'
                },
                id: 'dots'
            }
        ]}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 50,
                translateY: 56,
                itemsSpacing: 5,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: mode ? 'black':'white',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 15,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000',
                        }
                    }
                ]
            }
        ]}
    />
      <Box
        position="absolute"
        top="50%"
        left="50%"
     
        textAlign="center"
        pointerEvents="none"

       
      >
       
      </Box>
    </Box>
  );
};

export default BreakdownChart;