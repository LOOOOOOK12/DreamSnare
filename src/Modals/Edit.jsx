import React, { useRef, useState } from 'react';
import axios from 'axios';

function Edit({ onClose, user_ID, dream_ID, initialData }) {
    const modalRef = useRef();

    const [values, setValues] = useState({
        DreamName: initialData.DreamName,
        DreamDate: initialData.DreamDate,
        DreamDescription: initialData.DreamDescription,
    });

    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    };

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:8001/editDream/${dream_ID}`, values)
            .then((res) => {
                console.log('Dream Updated');
                onClose();
            })
            .catch((err) => console.log(err));
    };

    return (
        <div
            ref={modalRef}
            onClick={closeModal}
            className='fixed inset-0 flex justify-center items-center text-text bg-background bg-opacity-70 backdrop-blur-sm z-50'
        >
            <form
                onSubmit={handleSubmit}
                className='px-16 py-8 flex flex-col bg-container2 rounded-md text-left transition-all '
            >
                <div className='flex items-center gap-3'>
                    <label htmlFor=''>Edit your Dream name:</label>
                    <input
                        type='text'
                        name='DreamName'
                        value={values.DreamName}
                        onChange={handleChange}
                        className='py-1 px-1 rounded-md bg-container2 border-2 border-accent focus:outline-none focus:border-secondary'
                    />
                    <label htmlFor=''>Edit Date Dreamt:</label>
                    <input
                        type='date'
                        name='DreamDate'
                        value={values.DreamDate}
                        onChange={handleChange}
                        className='py-1 px-1 rounded-md bg-container2 border-2 border-accent focus:outline-none focus:border-secondary'
                    />
                </div>
                <label className='my-6'>Edit your dream!</label>
                <textarea
                    name='DreamDescription'
                    value={values.DreamDescription}
                    rows={10}
                    cols={30}
                    onChange={handleChange}
                    className='py-1 px-1 rounded-md bg-container2 border-2 border-accent focus:outline-none focus:border-secondary'
                />
                <div className='mt-6 justify-end flex gap-4'>
                    <button
                        onClick={onClose}
                        className='py-3 px-5 font-semibold rounded-md text-text bg-error text-white hover:bg-errordark ease-in-out duration-300'
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        className='py-3 px-5 font-semibold rounded-md text-background bg-primary text-white hover:bg-accent ease-in-out duration-300'
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Edit;
