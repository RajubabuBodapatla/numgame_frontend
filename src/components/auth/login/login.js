import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './login.scss'
import { loginUser } from '../../../api';
import { loginSuccess } from '../../../redux/authslice';
import { ThreeDots } from 'react-loader-spinner'


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    const response = await loginUser(username, password);

    if (response.user) {
      setLoading(false)
      setMessage('Login successful!');
      dispatch(loginSuccess(response));

      navigate('/home')
    } else {
      setLoading(false)
      setMessage(response.message);
    }
  };

  return (


    <div className='form-body'>
      <form className='form-container container'>

        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />

        <button onClick={handleLogin}>  {loading ? (<ThreeDots
          visible={true}
          height="20"
          width="40"
          color="#fff"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />):"Login"}</button>




        <h3>&nbsp;{message}</h3>


        <div className='toggle-container'>
          <p>Don't have an Account?
            <Link className='toggle-link' to={'/register'}>Register</Link>
          </p>
        </div>
      </form>


    </div>



  );

};

export default Login;
