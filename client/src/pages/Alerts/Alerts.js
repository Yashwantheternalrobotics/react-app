import { Button, Grid, Typography,Card,CardContent ,Stack} from '@mui/material';
import React from 'react'
import { useState,useContext,useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import DatePicker from "react-date-picker";
import './Alerts.css';
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DataTable from 'react-data-table-component';
import PropTypes from 'prop-types';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import assemblyImage from '../Analytics/download (1).jpg'
import { ModeContext } from '../../components/MiniDrawer/MiniDrawer'
import SendIcon from '@mui/icons-material/Send';
import {jsPDF} from 'jspdf'
import 'jspdf-autotable'
import { CSVLink } from 'react-csv'
import axios from 'axios';
import AWS from 'aws-sdk';

const S3_BUCKET_NAME = 'tata-test-bucket';
const IMAGE_KEY = 'images/2023-05-31/10/2.png'; // Replace with the key of your image

const S3ImageFetcher = ({img_url}) => {

  const [imageURL, setImageURL] = useState('');

  const handleImageClick = () => {
    const newTab = window.open('', '_blank');
    newTab.document.write(`
      <html>
        <head>
          <title>Image Preview</title>
        </head>
        <body style="margin: 0; display: flex; align-items: center; justify-content: center;text-align:center ">
          <div>
          <img src="${imageURL}" alt="Image" style="width:50vw;height:70vh;">
          <a href="${imageURL}" download style="display:block;margin-top:15px;">
          <button style="padding: 10px 20px; font-size: 16px; border: none; border-radius: 5px; background-color: #4caf50; color: white; cursor: pointer;"
          onmouseover="this.style.backgroundColor='#45a049'"
          onmouseout="this.style.backgroundColor='#4caf50'"
          onfocus="this.style.outline='none'; this.style.boxShadow='0 0 5px #4caf50';"
          onblur="this.style.boxShadow='none';">Download</button>
          </a><br />
          </div>
        </body>
      </html>
    `);
    newTab.document.close();
  };

  useEffect(() => {
    const s3 = new AWS.S3({
      accessKeyId: 'AKIAX7IVH7X6CQONLD5Y',
      secretAccessKey: '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',
      region: 'ap-south-1'
    });

    const params = {
      Bucket: S3_BUCKET_NAME,
      Key: img_url
    };

    const getImageUrlFromS3 = async () => {
      try {
        const signedURL = await s3.getSignedUrl('getObject', params);
         setImageURL(signedURL);
      } catch (error) {
        console.log('Error fetching image from S3:', error);
      }
    };

    getImageUrlFromS3();
  }, []);

  return (
    <div>
      {imageURL ? (
        // <a href={imageURL} ><img src={imageURL} alt="S3 Image" /></a>
        <img src={imageURL} alt="Image" onClick={handleImageClick} style={{ cursor: 'pointer' }} />
      ) : (
        <p>No image...</p>
      )}
    </div>
  );
};

const Alerts = ( { onTitleChange }) => {
  
  // AWS IMAGE 

  

  const { mode} = useContext(ModeContext);
  
  const [date, setDate] = useState('');
  const [data,setData]=useState([])
  
  const handleDateChange = async(event) => {
    setDate(event.target.value);

    await axios.post('http://localhost:5000/api/alerts/' + event.target.value)
    .then((res) => {
      
      setData(res.data);
      // console.log(data)
    })
    .catch((error) => {
      console.error(error);
    });

  };
  

  const [finalValue,setFinalValue] = useState("Ratchet")

  const handlePedalClick = () => {
    setFinalValue("Pedal")
  };
  
  const handleRatchetClick = () => {
    setFinalValue("Ratchet")
  };

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 750);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handlepdf = () => {
    const doc = new jsPDF();
    // const tableData = data.map(item => [item.userId, item.id, item.title, item.completed ? 'Completed' : 'Incomplete']);
    doc.autoTable({
      html:'#pdf',
      // head: [['User ID', 'ID', 'Title', 'Status']],
      // body: tableData,
    });
    doc.save('data.pdf');
  };



const data1 = data.map(({ _id, start_timestamp, end_timestamp, status, steps_done }) => {
  return {
    _id,
    start_timestamp,
    end_timestamp,
    status,
    steps_done
  };
});


// const alertdata=async ()=>{

//     console.log(window.document.getElementById('inputdata').value) 

//     await axios.post('http://localhost:5000/api/alerts/' + window.document.getElementById('inputdata').value)
//     .then((res) => {
      
//       setData(res.data);
//       console.log(data)
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }
// console.log(data)

const [open, setOpen] = React.useState({});

useEffect(()=>{
  const initialState= {};
  data.map((row,index) =>{
    initialState[index]=false;
  })
  setOpen(initialState);
},[data])

const handleRedirect = () => {
  window.open('/new-page', '_blank');
};
 
  return (
    <>
      
    
      {/* {data.map((item) => (
        <div key={item._id}>
          <h3>{item._id}</h3>
          <p>Step 1 Status: {item.step_1_status}</p>
          <p>Step 2 Status: {item.step_2_status}</p>
          <p>{item.status}</p>
        </div>
      ))} */}
      
      {/* <input id='inputdata' type='date' style={{marginBottom:'20px'}}/>
      <button onClick={alertdata}>Submit</button> */}

      {onTitleChange('Alerts')}

      
      <Grid container spacing={2} justifyContent='center'  >
        <Grid item xs={12} sm={6} md={4} >
          <Card className='card' onClick={handlePedalClick} sx={{width : isSmallScreen ? '50%' : '80%', }}>
          <img
            src={assemblyImage}
            alt="pedal-assembly"
            style={{ width: '30%'  }}
          />
          <CardContent sx={{ flexGrow: 1,textAlign:'center' ,background: finalValue==='Pedal' ? '#0E1C5E' :'white',
                                                            color: finalValue==='Pedal' ? 'white' :'black',}}>
            <Typography variant="h6" component="div" color={mode && (finalValue==='Pedal') && 'white'}>
              PEDAL  <br /> ASSEMBLY
            </Typography>
          </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}  >
          <Card className='card' onClick={handleRatchetClick} sx={{width : isSmallScreen ? '50%' : '80%'}}>
          <img
            src={assemblyImage}
            alt="ratchet-assembly"
            style={{ width: '30%' }}
          />
          <CardContent sx={{ flexGrow: 1 ,textAlign:'center', background: finalValue==='Ratchet' ? '#0E1C5E' : 'white',
                                                            color: finalValue==='Ratchet' ? 'white' :'black'}}>
            <Typography variant="h6" component="div" color={mode && (finalValue==='Ratchet') && 'white'}>
              RATCHET <br /> ASSEMBLY
            </Typography>
          </CardContent>
          </Card>
        </Grid>
      </Grid>

    

    <div className='analytics_line'></div> 


    <Grid  spacing={2} container marginTop='1%'>
      <Grid item xs={12} md={4}>
      <Typography variant='p'>Select Date : </Typography><input style={{marginLeft:'0px'}} type="date" value={date} onChange={handleDateChange} id='date1' className='datepicker' />
      </Grid>
      <Grid item xs={12} md={4} >
      <Button variant="contained" endIcon={<SendIcon />} style={{backgroundColor:'#0E1C5E', color:'white'}} onClick={handlepdf}>
        Generate PDF
      </Button>
      </Grid>
      <Grid item xs={12} md={4}>
      <Button variant="contained" endIcon={<SendIcon />} style={{backgroundColor:'#0E1C5E', color:'white'}}>
      <CSVLink filename='Data' data={data1} style={{textDecoration:'none',backgroundColor:'#0E1C5E', color:'white'}} >Generate CSV</CSVLink>
      </Button>
      </Grid>
    </Grid>


    <TableContainer component={Paper} sx={{width: 'calc(100vw - 25%)', height: 'calc(100vh - 50%)',overflow:'auto',borderRadius:'7px',marginTop:'2%'}} className='table'>
      <Table aria-label="collapsible table" stickyHeader id="pdf">
        <TableHead>
          <TableRow>
            <TableCell className='tableheader'/>
            <TableCell className='tableheader'>ID</TableCell>
            <TableCell align="center" className='tableheader'>STEPS DONE</TableCell>
            <TableCell align="center" className='tableheader'>START TIME</TableCell>
            <TableCell align="center" className='tableheader'>END TIME</TableCell>
            <TableCell align="center" className='tableheader'>STATUS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>


        {data.map((item,index) => (
          item.status?(
          <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
              <TableCell>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={()=>{
                    setOpen(prevState =>({
                      ...prevState,
                      [index]:!prevState[index]
                    }))
                  }}
                
                >
                  {open[index] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
              <TableCell component="th" scope="row">
                {item._id}
              </TableCell>
              
              <TableCell align="center">{item.steps_done}</TableCell>
              <TableCell align="center">{item.start_timestamp}</TableCell>
              <TableCell align="center">{item.end_timestamp}</TableCell>
              <TableCell align="center">{item.status}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open[index]} timeout="auto" unmountOnExit>
                  <Box sx={{ margin: 1 }}>
                    <Typography variant="h6" gutterBottom component="div">
                      Task Data
                    </Typography>
                    <Table size="small" aria-label="purchases">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">STEP.No</TableCell>
                          <TableCell align="center">STEP STATUS</TableCell>
                          <TableCell align="center">START TIME</TableCell>
                          <TableCell align="center">IMAGE URL</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {
                          item.step_1_start_time?(
                            <TableRow  >
                              <TableCell component="th" scope="row" align="left">
                                Step_1
                              </TableCell >
                              <TableCell align="center">{item.step_1_status}</TableCell>
                              <TableCell align="center">{item.step_1_start_time}</TableCell>
                              <TableCell align="center">
                              <a href ={item.img_1_url} target='_blank' style={{color:mode? 'black':'white'}}><S3ImageFetcher img_url={item.img_1_url}/></a>
                              </TableCell>
                          </TableRow>
                          ):null
                        }
                        {
                          item.step_2_start_time?(
                            <TableRow  >
                              <TableCell component="th" scope="row" align="left">
                                Step_2
                              </TableCell >
                              <TableCell align="center">{item.step_2_status}</TableCell>
                              <TableCell align="center">{item.step_2_start_time}</TableCell>
                              <TableCell align="center">
                              <a href ={item.img_2_url} target='_blank' style={{color:mode? 'black':'white'}}><S3ImageFetcher img_url={item.img_2_url}/></a>
                              </TableCell>
                          </TableRow>
                          ):null
                        }
                        {
                          item.step_3_start_time?(
                            <TableRow  >
                              <TableCell component="th" scope="row" align="left">
                                Step_3
                              </TableCell >
                              <TableCell align="center">{item.step_3_status}</TableCell>
                              <TableCell align="center">{item.step_3_start_time}</TableCell>
                              <TableCell align="center">
                              <a href ={item.img_3_url} target='_blank' style={{color:mode? 'black':'white'}}><S3ImageFetcher img_url={item.img_3_url}/></a>
                              </TableCell>
                          </TableRow>
                          ):null
                        }
                        {
                          item.step_4_start_time?(
                            <TableRow  >
                              <TableCell component="th" scope="row" align="left">
                                Step_4
                              </TableCell >
                              <TableCell align="center">{item.step_4_status}</TableCell>
                              <TableCell align="center">{item.step_4_start_time}</TableCell>
                              <TableCell align="center">
                              <a href ={item.img_4_url} target='_blank' style={{color:mode? 'black':'white'}}><S3ImageFetcher img_url={item.img_4_url}/></a>
                              </TableCell>
                          </TableRow>
                          ):null
                        }
                        {
                          item.step_5_start_time?(
                            <TableRow  >
                              <TableCell component="th" scope="row" align="left">
                                Step_5
                              </TableCell >
                              <TableCell align="center">{item.step_5_status}</TableCell>
                              <TableCell align="center">{item.step_5_start_time}</TableCell>
                              <TableCell align="center">
                                <a href ={item.img_5_url} target='_blank' style={{color:mode? 'black':'white'}}><S3ImageFetcher img_url={item.img_5_url}/></a>
                              </TableCell>
                          </TableRow>
                          ):null
                        }
                        {
                          item.step_6_start_time?(
                            <TableRow  >
                              <TableCell component="th" scope="row" align="left">
                                Step_6
                              </TableCell >
                              <TableCell align="center">{item.step_6_status}</TableCell>
                              <TableCell align="center">{item.step_6_start_time}</TableCell>
                              <TableCell align="center">
                              <a href ={item.img_6_url} target='_blank' style={{color:mode? 'black':'white'}}><S3ImageFetcher img_url={item.img_6_url}/></a>
                              </TableCell>
                          </TableRow>
                          ):null
                        }
                        {
                          item.step_7_start_time?(
                            <TableRow  >
                              <TableCell component="th" scope="row" align="left">
                                Step_7
                              </TableCell >
                              <TableCell align="center">{item.step_7_status}</TableCell>
                              <TableCell align="center">{item.step_7_start_time}</TableCell>
                              <TableCell align="center">
                              <a href ={item.img_7_url} target='_blank' style={{color:mode? 'black':'white'}}><S3ImageFetcher img_url={item.img_7_url}/></a>
                              </TableCell>
                          </TableRow>
                          ):null
                        }
                        {
                          item.step_8_start_time?(
                            <TableRow  >
                              <TableCell component="th" scope="row" align="left">
                                Step_8
                              </TableCell >
                              <TableCell align="center">{item.step_8_status}</TableCell>
                              <TableCell align="center">{item.step_8_start_time}</TableCell>
                              <TableCell align="center">
                              <a href ={item.img_8_url} target='_blank' style={{color:mode? 'black':'white'}}><S3ImageFetcher img_url={item.img_8_url}/></a>
                              </TableCell>
                          </TableRow>
                          ):null
                        }

                      </TableBody>
                    </Table>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </React.Fragment>):null
        ))}
        

        
          
        </TableBody>
      </Table>
    </TableContainer>

    {/* <Stack direction="row" spacing={10} marginY='2%' justifyContent='center' alignItems='center'>
      <Button variant="contained" endIcon={<SendIcon />}>
        Generate PDF
      </Button>
      <Button variant="contained" endIcon={<SendIcon />}>
        Generate CSV
      </Button>
    </Stack>  */}


        {/* <Grid item xs={12}>
      <input style={{marginLeft:'0px'}} type="date" value={date} onChange={handleDateChange} className='datepicker' />

      </Grid> */}

    {/* <Grid container marginTop='1%' justifyContent='center' alignItems='center' >
    <Grid item xs={12} md={4}>
      <Button variant="contained" endIcon={<SendIcon />}>
        Generate PDF
      </Button>
      </Grid>
      <Grid item xs={12} md={4}>
      <Button variant="contained" endIcon={<SendIcon />}>
        Generate CSV
      </Button>
      </Grid>
      </Grid>  */}
 
    </>
  )
}

export default Alerts;
