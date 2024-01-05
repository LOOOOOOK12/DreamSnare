import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
// import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function Login() {

    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const navigate = useNavigate()
    axios.defaults.withCredentials = true
    
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:8001/', values)
            .then(res => {
                if( res.data.Status === "Success"){
                    console.log("Registered Successfully!");
                    navigate('/Home')
                } else{
                    alert(res.data.Error)
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='h-screen flex justify-center items-center bg-background'>
            <form onSubmit={handleSubmit} className='px-10 py-14 flex flex-col justify-center gap-5 bg-slate-500 rounded-md bg-container2 text-text'>
                <div className='flex flex-col'>
                    <label htmlFor='email' className='mb-2'>Enter E-mail:</label>
                    <input type="email" placeholder='you@example.com' name="email" className='py-1 px-1 rounded-md bg-container2 border-2 border-accent focus:outline-none focus:border-secondary'
                        onChange={handleChange}
                    />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='password' className='mb-2'>Enter Password:</label>
                    <input type="password" name="password" className='py-1 px-1 rounded-md bg-container2 border-2 border-accent focus:outline-none focus:border-secondary'
                        onChange={handleChange}
                    />
                    <div className='flex mt-2'>
                        <label htmlFor="" className='mr-2'>Remember Me:</label>
                        <input type="radio" name="save"/>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <button type="submit" className='w-full py-3 rounded-md text-background bg-primary text-white hover:bg-accent ease-in-out duration-300'>Log-In</button>
                    <Link to='/ForgotPassword'><p className='text-sm text-right mt-2'>Forgot Pasword?</p></Link>
                </div>
                {/* <GoogleLogin 
                    onSuccess={credentialResponse => {
                        console.log(credentialResponse);
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                    /> */}
                <Link to="/SignUp">Don't have an account? <span className='font-semibold'>Sign Up</span></Link>   
            </form>
        </div>
    )
}

export default Login