import React from 'react'
import { Link } from 'react-router-dom'

function ForgotPassword() {
    return (
        <div className='h-screen flex items-center justify-center text-text'>
            <div className='px-10 py-14 flex flex-col gap-6 bg-container2  rounded-md'>
                <h1 className='font-semibold text-4xl'>Find your Account</h1>
                <div className='flex flex-col gap-3'>
                    <label htmlFor="">Please enter your email or mobile number to search for your account.</label>
                    <input type="text" name="" className='py-1 px-1 rounded-md bg-container2 border-2 border-accent focus:outline-none focus:border-secondary' />
                </div>
                <div className='w-full justify-items-end flex gap-2'>
                    <Link to='/'><button className='py-2 px-5 rounded-md text-background bg-primary text-white hover:bg-accent ease-in-out duration-300' >Cancel</button></Link>
                    <button className='py-2 px-5 rounded-md text-background bg-primary text-white hover:bg-accent ease-in-out duration-300'>Search</button>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword