import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Create({onClose, user_ID}) {
    
    const modalRef = useRef();

    const closeModal = (e) => {
        if(modalRef.current === e.target){
            onClose();
        }
    }

    const navigate = useNavigate();

    const [values, setValues] = useState({
        DreamName: '',
        DreamDate: '',
        DreamDescription: ''
    });

    
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8001/createDream', { ...values, user_ID })
            .then(res => {
                console.log("Dream Created");
                onClose();
            })
            .catch(err => console.log(err));
    };

    return (
        <div ref={modalRef} onClick={closeModal} className='fixed inset-0 flex justify-center items-center text-text bg-background bg-opacity-70 backdrop-blur-sm '>
            <form 
            onSubmit={handleSubmit}
            className="px-16 py-8 flex flex-col bg-container2 rounded-md text-left transition-all ">
                <div className='flex items-center gap-3'>
                    <label htmlFor="">Name your Dream:</label>
                    <input 
                        type="text" 
                        name = "DreamName"
                        className='py-1 px-1 rounded-md bg-container2 border-2 border-accent focus:outline-none focus:border-secondary'
                        onChange={handleChange} />
                    <label htmlFor="">Date Dreamt:</label>
                    <input 
                        type='date' 
                        name="DreamDate"
                        className='py-1 px-1 rounded-md bg-container2 border-2 border-accent focus:outline-none focus:border-secondary'
                        onChange={handleChange} />
                </div>
                <label className='my-6'>Describe your dream!</label>
                <textarea 
                    type ='text'
                    name='DreamDescription' 
                    rows={10} cols={20} 
                    className='p-1 rounded-md bg-container2 border-2 border-accent focus:outline-none focus:border-secondary'
                    onChange={handleChange} 
                />
                    <div className='mt-6 justify-end flex gap-4'>
                        <button onClick={onClose} className='py-3 px-5 rounded-md text-text bg-error text-white hover:bg-errordark ease-in-out duration-300'>Cancel</button>
                        <button  type='submit' className='py-3 px-5 rounded-md text-background bg-primary text-white hover:bg-accent ease-in-out duration-300'>Submit</button>
                    </div>
            </form> 
        </div>
    )
}

export default Create