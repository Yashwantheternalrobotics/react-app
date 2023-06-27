import { Card, CardContent, Grid, Typography, Paper, Stack,Box } from '@mui/material';
import React,{ useState } from 'react';
import { ModeContext } from '../../components/MiniDrawer/MiniDrawer'
import { useContext, useEffect } from 'react';
import './Home.css'
import axios from 'axios'


const Home = ({ onTitleChange }) => {

  const { mode} = useContext(ModeContext);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1100);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [count,setCount]=useState(0)

  useEffect(()=>{
   
        axios.get('http://localhost:5000/api/home/').then(
          (res)=>{
            if(res.data=='No Data') setCount(0)
            else setCount(res.data)
          } 
        ) 
      
    },[])

    const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      let formattedDate = getFormattedDate();
      setCurrentDate(formattedDate);
    }, 1000); // Update every 1 second

    return () => {
      clearInterval(interval);
    };
  }, []);

  function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  }


  return (
    <>
    { onTitleChange('Home')}
    <Paper className='glass' >
    <Grid container sx={{height:'100%',textAlign:'center'  }}>
      <Grid item xs={12} sx={{marginTop:isSmallScreen ? '5%' : '2%'}}>
      
      <Typography variant='h5'>Reported Incidents  &nbsp;-&nbsp;  {currentDate} </Typography>
      </Grid>
      <Grid item xs={12}  sx={{marginTop:isSmallScreen ? '5%' : '2%'}}>
        <Box border={3} borderColor={mode ? 'black' : "primary.main" } borderRadius={2} p={5} sx={{marginX:'8%'}}>
           <Stack direction='row' spacing={ isSmallScreen? 4 : 40} justifyContent='center' alignItems='center' >
             <Typography variant='h5'>1</Typography>
             <Typography variant='h5'>Ratchet Assembly</Typography>
             <Typography variant='h5'>0</Typography>
           </Stack>
        </Box>
      </Grid>
      <Grid item xs={12} sx={{marginTop:isSmallScreen ? '5%' : '2%',marginBottom:'2%'}}>
        <Box border={3} borderColor={mode ? 'black' : "primary.main"} borderRadius={2} p={5} sx={{marginX:'8%'}}>
           <Stack direction='row' spacing={ isSmallScreen? 2 : 37.5} justifyContent='center' alignItems='center' >
             <Typography variant='h5'>2</Typography>
             <Typography variant='h5'>Brake Pedal Assembly</Typography>
             <Typography variant='h5'>{count}</Typography>
           </Stack>
        </Box>
      </Grid>
    </Grid>
    </Paper>
    </>
  )
}

export default Home
