import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const [formValid, setFormValid] = useState(true);

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
        setErrors({ ...errors, [event.target.name]: '' });
        setFormValid(true);
    };

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const validateInputs = () => {
        let isValid = true;
        const newErrors = { email: '', password: '' };

        if (!values.email) {
            newErrors.email = 'Email is required';
            isValid = false;
        }

        if (!values.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        }

        setErrors(newErrors);
        setFormValid(isValid);
        return isValid;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        if (validateInputs()) {
            axios.post('https://dream-snare-api.vercel.app/', values)
                .then(res => {
                    if (res.data.Status === "Success") {
                        console.log("Registered Successfully!");
                        navigate('/Home');
                    } else {
                        if (res.data.Error.includes('email')) {
                            setErrors({ ...errors, email: res.data.Error });
                        } else if (res.data.Error.includes('password')) {
                            setErrors({ ...errors, password: res.data.Error });
                        } else {
                            setFormValid(false);
                        }
                    }
                })
                .catch(err => console.log(err));
        } else {
            setFormValid(false);
        }
    };

    return (
        <div className='h-screen flex flex-col justify-center items-center bg-background'>
            <form onSubmit={handleSubmit} className='px-10 py-14 flex flex-col justify-center gap-5 bg-slate-500 rounded-md bg-container2 text-text'>
            <div className='flex items-center justify-center mb-5'>
                <h1 className='text-text text-4xl font-semibold'>DreamSnare</h1>
            </div>
            <div className='flex flex-col'>
                    <label htmlFor='email' className='mb-2'>Enter E-mail:</label>
                    <input
                        type="email"
                        placeholder='you@example.com'
                        name="email"
                        className={`py-1 px-2 rounded-md bg-container2 border-2 ${formValid && !errors.email ? 'border-accent' : 'border-error'} focus:outline-none focus:border-secondary`}
                        onChange={handleChange}
                    />
                    {!formValid && errors.email && <span className="text-error text-sm">{errors.email}</span>}
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='password' className='mb-2'>Enter Password:</label>
                    <input
                        type="password"
                        name="password"
                        className={`py-1 px-2 rounded-md bg-container2 border-2 ${formValid && !errors.password ? 'border-accent' : 'border-error'} focus:outline-none focus:border-secondary`}
                        onChange={handleChange}
                    />
                    {!formValid && errors.password && <span className="text-error text-sm">{errors.password}</span>}
            </div>
                <div className='flex flex-col'>
                    <button type="submit" className='w-full py-3 rounded-md font-semibold text-background bg-primary text-white hover:bg-accent ease-in-out duration-300'>Log-In</button>
                    {/* <Link to='/ForgotPassword'><p className='text-sm text-right mt-2'>Forgot Password?</p></Link> */}
                </div>
                <Link to="/SignUp">Don't have an account? <span className='font-semibold'>Sign Up</span></Link>
            </form>
        </div>
    );
}

export default Login;
