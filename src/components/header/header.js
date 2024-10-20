import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './header.scss';
import logo from '../../Assets/SumitUpLogo-removebg-preview.png'
import { logout } from '../../redux/authslice';

const Header = () => {

    const userName = useSelector((state)=>state.auth.user?.username);
    // const handleLogout =() ={
      
    // }

  return (
    <div className='header'>
       <div className='logo'>
         <Link className='link' to='/home'><img className='logo' src={logo} alt='logo' /></Link>
       </div>
       <ul className='navbar'>
        <li>
            <Link className='link' to='/game'><i title='Game' className="fa-solid fa-gamepad icons"></i></Link>
        </li>
          <li>
            <Link className='link' to='/instructions'><i title='Instructions' className="fa-solid fa-clipboard icons"></i></Link>
          </li>
          <li>
            <Link className='link' to='/highScore'><i title='Scoarboard' className="fa-solid fa-chart-simple icons"></i></Link>
          </li>
       </ul>
       <div >
          <p className='userName'>@{userName}</p>
       </div>
    </div>
  )
}

export default Header
