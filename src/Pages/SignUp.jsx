import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [validationErrors, setValidationErrors] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
        setValidationErrors({ ...validationErrors, [event.target.name]: '' });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const newErrors = {};
        for (const key in values) {
            if (!values[key]) {
                newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
            }
        }

        if (values.password !== values.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (Object.keys(newErrors).length > 0) {
            setValidationErrors(newErrors);
            return;
        }

        setValidationErrors({}); 

        axios.post('http://localhost:8001/signup', values)
            .then(res => {
                console.log('Registered Successfully!');
                navigate('/');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='h-screen flex items-center justify-center bg-gradient-to-tl from-gradient1 to-gradient2'>
            <div className='px-10 py-14 flex flex-col gap-6 bg-container2 text-text rounded-md'>
                <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                    <div className='flex flex-col'>
                        <label htmlFor='Username' className='mb-2'>Enter Username:</label>
                        <input
                            type='text'
                            name='username'
                            placeholder='exampleUsername'
                            className={`py-1 px-1 rounded-md bg-container2 border-2 ${validationErrors.username ? 'border-error' : 'border-accent'} focus:outline-none focus:border-secondary`}
                            onChange={handleChange}
                        />
                        {validationErrors.username && <span className='text-error text-sm'>{validationErrors.username}</span>}
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='Email' className='mb-2'>Enter Email:</label>
                        <input
                            type='text'
                            name='email'
                            placeholder='example@email.com'
                            className={`py-1 px-1 rounded-md bg-container2 border-2 ${validationErrors.email ? 'border-error' : 'border-accent'} focus:outline-none focus:border-secondary`}
                            onChange={handleChange}
                        />
                        {validationErrors.email && <span className='text-error text-sm'>{validationErrors.email}</span>}
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='Password' className='mb-2'>Enter Password:</label>
                        <input
                            type='password'
                            name='password'
                            className={`py-1 px-1 rounded-md bg-container2 border-2 ${validationErrors.password ? 'border-error' : 'border-accent'} focus:outline-none focus:border-secondary`}
                            onChange={handleChange}
                        />
                        {validationErrors.password && <span className='text-error text-sm'>{validationErrors.password}</span>}
                    </div>
                    <div className='flex flex-col'>
                        <label className='mb-2'>Confirm Password:</label>
                        <div>
                            
                        </div>
                        <input
                            type='password'
                            name='confirmPassword'
                            className={`py-1 px-1 rounded-md bg-container2 border-2 ${validationErrors.confirmPassword ? 'border-error' : 'border-accent'} focus:outline-none focus:border-secondary`}
                            onChange={handleChange}
                        />
                        {validationErrors.confirmPassword && <span className='text-error text-sm'>{validationErrors.confirmPassword}</span>}
                    </div>
                    <button type='submit' className='w-full py-3 rounded-md text-background bg-primary text-white hover:bg-accent ease-in-out duration-300'>Create Account</button>
                    <Link to='/' className='text-sm'>Already have an account?<span className='font-semibold'> Login</span></Link>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
