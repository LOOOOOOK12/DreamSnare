import React from 'react'
import { Link } from 'react-router-dom'

function SignUp() {
    return (
        <div className='h-screen flex items-center justify-center bg-background'>
            <div className='px-10 py-14 flex flex-col gap-6 bg-container2 text-text rounded-md'>
                <form className='flex flex-col gap-5'>
                    <div className='flex flex-col'>
                        <label className='mb-2'>Enter Username:</label>
                        <input type="text" name="username" className='py-1 px-1 rounded-md bg-container2 border-2 border-accent focus:outline-none focus:border-secondary'/>
                    </div>
                    <div className='flex flex-col'>
                        <label className='mb-2'>Enter Email:</label>
                        <input type="text" name="email" className='py-1 px-1 rounded-md bg-container2 border-2 border-accent focus:outline-none focus:border-secondary'/>
                    </div>
                    <div className='flex flex-col'>
                        <label className='mb-2'>Enter Password:</label>
                        <input type="password" name="password" className='py-1 px-1 rounded-md bg-container2 border-2 border-accent focus:outline-none focus:border-secondary'/>
                    </div>
                    <div className='flex flex-col'>
                        <label className='mb-2'>Confirm Password:</label>
                        <input type="password" name="username" className='py-1 px-1 rounded-md bg-container2 border-2 border-accent focus:outline-none focus:border-secondary'/>
                    </div>
                    <Link to='/'><button type='submit' className='w-full py-3 rounded-md text-background bg-primary text-white hover:bg-accent ease-in-out duration-300'>Create Account</button></Link>
                    <Link to='/' className='text-sm'>Already have an account?<span className='font-semibold'> Login</span></Link>
                </form>
                
            </div>
        </div>
    )
}

export default SignUp