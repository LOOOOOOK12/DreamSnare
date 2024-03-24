import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Create({ onClose, user_ID }) {

    const modalRef = useRef();

    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    }

    const [values, setValues] = useState({
        DreamName: '',
        DreamDate: '',
        DreamDescription: ''
    });

    const [validationErrors, setValidationErrors] = useState({
        DreamName: '',
        DreamDate: '',
        DreamDescription: ''
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

        if (Object.keys(newErrors).length > 0) {
            setValidationErrors(newErrors);
            return;
        }

        setValidationErrors({}); // Clear validation errors

        axios.post('https://dream-snare-api.vercel.app/createDream', { ...values, user_ID })
            .then(res => {
                console.log("Dream Created");
                onClose();
                window.location.reload();
            })
            .catch(err => console.log(err));
    };

    return (
        <div ref={modalRef} onClick={closeModal} className='fixed inset-0 flex justify-center items-center text-text bg-background bg-opacity-70 backdrop-blur-sm '>
            <form
                onSubmit={handleSubmit}
                className="px-16 py-8 flex flex-col bg-container2 rounded-md text-left transition-all ">
                <div className='flex flex-col justify-center md:flex-row md:items-center gap-3'>
                    <div className='md:flex items-center gap-2'>
                        <label>Name your Dream:</label>
                        <div className='flex flex-col'>
                            <input
                                type="text"
                                name="DreamName"
                                className={`py-1 px-1 rounded-md bg-container2 border-2 ${validationErrors.DreamName ? 'border-error' : 'border-accent'} focus:outline-none focus:border-secondary`}
                                onChange={handleChange} />
                            {validationErrors.DreamName && <span className='text-error text-sm'>{validationErrors.DreamName}</span>}
                        </div>
                    </div>
                    <div className='md:flex items-center gap-3'>
                        <label className=''>Date Dreamt:</label>
                        <div className='flex flex-col'>
                        <input
                            type='date'
                            name="DreamDate"
                            className={`py-1 px-1 rounded-md bg-container2 border-2 ${validationErrors.DreamDate ? 'border-error' : 'border-accent'} focus:outline-none focus:border-secondary`}
                            onChange={handleChange} />
                        {validationErrors.DreamDate && <span className='text-error text-sm'>{validationErrors.DreamDate}</span>}
                        </div> 
                    </div> 
                </div>
                <label className='my-6'>Describe your dream!</label>
                <textarea
                    style={{resize: "none"}}
                    type='text'
                    name='DreamDescription'
                    rows={10} cols={30}
                    className={`p-1 rounded-md bg-container2 border-2 ${validationErrors.DreamDescription ? 'border-error' : 'border-accent'} focus:outline-none focus:border-secondary`}
                    onChange={handleChange}
                />
                {validationErrors.DreamDescription && <span className='text-error text-sm'>{validationErrors.DreamDescription}</span>}
                <div className='mt-6 justify-end flex gap-4'>
                    <button onClick={onClose} className='py-3 px-5 rounded-md text-text bg-error text-white hover:bg-errordark ease-in-out duration-300'>Cancel</button>
                    <button type='submit' className='py-3 px-5 rounded-md font-semibold text-background bg-primary text-white hover:bg-accent ease-in-out duration-300'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Create;
