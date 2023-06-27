import './App.css';
import MiniDrawer from './components/MiniDrawer/MiniDrawer';
import {Route,Routes} from 'react-router-dom'
// import Login from './pages/OnBoardingPages/Login'
// import Register from './pages/OnBoardingPages/Register'
import Home from './pages/Home/Home'
import Alerts from './pages/Alerts/Alerts';
import Analytics from './pages/Analytics/Analytics';
import * as React from 'react';
import Login from './Authentication/Login';
import Register from './Authentication/Register';
// import User from './Authentication/User';

function App() {
  const [title,setTitle] =React.useState("")

  const handleTitleChange = (variable) =>{
    setTitle(variable)
  }

  return (
    <>
    <Routes>
      <Route path="/" element={<MiniDrawer title={title} />} >
        <Route index element={<Home onTitleChange={handleTitleChange} />} />
        <Route path="analytics" element={<Analytics onTitleChange={handleTitleChange} />} />
        <Route path="alerts" element={<Alerts onTitleChange={handleTitleChange} />} />
      </Route>
      {/* <Route path="/signin" element={<Login />} /> */}
      {/* <Route path="/signup" element={<Register />} /> */}
      <Route path='/login' element={<Login/>} exact></Route>
      <Route path='/register' element={<Register/>} exact></Route>
      {/* <Route path='/profile' element={<User/>} exact></Route> */}
    </Routes>
    </>
  );
}

export default App;
