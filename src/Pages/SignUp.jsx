import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function SignUp() {

    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [passwordError, setPasswordError] = useState('');

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (values.password !== values.confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }

        setPasswordError('');

        axios.post('http://localhost:8001/signup', values)
            .then(res => {
                console.log("Registered Successfully!");
                navigate('/')
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='h-screen flex items-center justify-center bg-background'>
            <div className='px-10 py-14 flex flex-col gap-6 bg-container2 text-text rounded-md'>
                <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                    <div className='flex flex-col'>
                        <label className='mb-2'>Enter Username:</label>
                        <input type="text" name="username" 
                            className='py-1 px-1 rounded-md bg-container2 border-2 border-accent focus:outline-none focus:border-secondary'
                            onChange={handleChange}    
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label className='mb-2'>Enter Email:</label>
                        <input type="text" name="email" 
                            className='py-1 px-1 rounded-md bg-container2 border-2 border-accent focus:outline-none focus:border-secondary'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label className='mb-2'>Enter Password:</label>
                        <input type="password" name="password" 
                            className='py-1 px-1 rounded-md bg-container2 border-2 border-accent focus:outline-none focus:border-secondary'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label className='mb-2'>Confirm Password:</label>
                        <input type="password" name="ConfirmPasswrod" 
                            className='py-1 px-1 rounded-md bg-container2 border-2 border-accent focus:outline-none focus:border-secondary'
                            onChange={handleChange}
                        />
                        {passwordError && <p className='text-error text-sm'>{passwordError}</p>}
                    </div>
                    <button type='submit' className='w-full py-3 rounded-md text-background bg-primary text-white hover:bg-accent ease-in-out duration-300'>Create Account</button>
                    <Link to='/' className='text-sm'>Already have an account?<span className='font-semibold'> Login</span></Link>
                </form>
            </div>
        </div>
    )
}

export default SignUp