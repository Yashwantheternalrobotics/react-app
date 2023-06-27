import React, { useState } from 'react'
import { Grid, Typography, TextField,  } from '@mui/material'
import './Register.css'
import MailIcon from '@mui/icons-material/Mail';
import InputAdornment from '@mui/material/InputAdornment';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'

const Register = () => {

    const [firstname,setFirstname] = useState("")
    const [lastname,setLastname] = useState("")


    const [email,setEmail] = useState("")
    const [password,setPassword]= useState("")
    const [cpassword,setCpassword]= useState("")

    const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };



  return (
    <div>
      <Grid container spacing={2}  >
        <Grid item xs={12} sm={6} sx={{ display: { xs: 'none', sm: 'block', backgroundColor:'#999999' } }} >
            <Grid container className='leftgrid'>
                ALL PLANT
            </Grid>
        </Grid>
        <Grid item xs={12} sm={6} sx={{background: 'linear-gradient(180deg, #2C69D1 0%, #51C7EF 100%)',color:'white'}}>
           <Grid container className='rightgrid'>
            <div>
                <Typography variant='h4' component='div' gutterBottom  textAlign='center' sx={{marginTop:'10%'}}>CREATE ACCOUNT</Typography>
                <Typography variant='p' component='div' gutterBottom textAlign='center' >Please full the form to create an account</Typography>
                <Grid container className='box' mt='20%'  >
                    <div style={{marginTop:'5%'}}>
                    <div>
                    <Typography variant='p' sx={{marginLeft:'5%'}}>Firstname</Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        size="small"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        className='input'
                        sx={{marginLeft:'5%', width:'90%'}}
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <MailIcon />
                              </InputAdornment>
                            ),
                          }}

                    />
                    </div>
                    <div>
                    <Typography variant='p' sx={{marginLeft:'5%'}}>Lastname</Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        size="small"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        className='input'
                        sx={{marginLeft:'5%', width:'90%'}}
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <MailIcon />
                              </InputAdornment>
                            ),
                          }}

                    />
                    </div>
                    <div>
                    <Typography variant='p' sx={{marginLeft:'5%'}}>Email</Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        size="small"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='input'
                        sx={{marginLeft:'5%', width:'90%'}}
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <MailIcon />
                              </InputAdornment>
                            ),
                          }}

                    />
                    </div>
                    <div>
                    <Typography variant='p' sx={{marginLeft:'5%'}}>Password</Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        size="small"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='input'
                        sx={{marginLeft:'5%',  width:'90%'}}
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LockIcon />
                              </InputAdornment>
                            ),
                            endAdornment :(
                                <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                                </InputAdornment>
                              ),
                          }}
                        type={showPassword ? 'text' : 'password'}
                    />
                    </div>
                    <div>
                    <Typography variant='p' sx={{marginLeft:'5%'}}>Confirm Password</Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        size="small"
                        value={cpassword}
                        onChange={(e) => setCpassword(e.target.value)}
                        className='input'
                        sx={{marginLeft:'5%',  width:'90%'}}
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LockIcon />
                              </InputAdornment>
                            ),
                            endAdornment :(
                                <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                                </InputAdornment>
                              ),
                          }}
                        type={showPassword ? 'text' : 'password'}
                    />
                    </div>
                    <div style={{marginLeft:'5%',marginRight:'5%',marginTop:'8%',marginBottom:'5%'}}>
                    <Button variant='contained' size='small'  fullWidth  sx={{backgroundColor:'#034CA1'}}>Sign up</Button>
                    </div>
                    </div>
                    
                </Grid>
                <div style={{marginTop:'10%',marginLeft:'5%',marginRight:'5%',marginBottom:'10%'}}>
                <Typography variant='p' component='div' gutterBottom textAlign='center' >Already have an account?</Typography>
                <Link to='/some'><Button variant='contained' size='small' fullWidth sx={{backgroundColor:'white',color:'black',}}>Sign in</Button></Link>   
                </div>
            </div>
            </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default Register
