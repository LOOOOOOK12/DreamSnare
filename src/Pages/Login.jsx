import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google';

function Login() {
    const clientSecret = "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"

    return (
        <div className='h-screen flex justify-center items-center bg-background'>
            <div className='px-10 py-14 flex flex-col justify-center gap-5 bg-slate-500 rounded-md bg-container2 text-text'>
                <div className='flex flex-col'>
                    <label className='mb-2'>Enter E-mail:</label>
                    <input type="email" placeholder='Enter Email' name="email" className='py-1 px-1 rounded-md bg-container2 border-2 border-accent focus:outline-none focus:border-secondary'/>
                </div>
                <div className='flex flex-col'>
                    <label className='mb-2'>Enter Password:</label>
                    <input type="password" placeholder='Enter Password' name="password" className='py-1 px-1 rounded-md bg-container2 border-2 border-accent focus:outline-none focus:border-secondary'/>
                    <div className='flex mt-2'>
                        <label htmlFor="" className='mr-2'>Remember Me:</label>
                        <input type="radio" name="save"/>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <Link to="/Home"><button type="button" className='w-full py-3 rounded-md text-background bg-primary text-white hover:bg-accent ease-in-out duration-300'>Log-In</button></Link>
                    <p className='text-sm text-right mt-2'>Forgot Pasword?</p>
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
            </div>
        </div>
    )
}

export default Login