import React, { useState } from 'react';
import { registerUser } from '../../../api';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'
import { Link } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';

const Register = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false)
  const id = uuidv4();

  const navigate = useNavigate()


  const handleRegister = async () => {
    setLoading(true)
    const response = await registerUser(id, username, password, email);
    if (response.message === 'User registered successfully') {
      setLoading(false)
      setMessage('Registration successful! Please log in.');

    } else {
      setLoading(false)
      setMessage(response.message);
    }
  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(username!='' && password!=='' && email !== ''){
    try {
      await handleRegister(id, username, password, email);

      navigate('/')


    }
    catch (err) {
      console.log(err)
    }
    }
    else{
      setMessage('All fields are required')
    }


  }





  return (
    <div className='form-body'>
      <div className='form-container container'>
        <div className='text-logo-reg'>

        </div>
        <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />

        <button id='reg-btn'
          onClick={handleSubmit}> {loading ? (<ThreeDots
            visible={true}
            height="20"
            width="40"
            color="#fff"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />):"Register"}</button>
        <h3>&nbsp;{message}</h3>
        <p>already have an Account?<Link className='toggle-link' to='/'>Login</Link></p>
        

      </div>


    </div>


  );
};

export default Register;