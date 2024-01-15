import React, { useRef, useEffect,useState } from 'react';
import axios from 'axios';

function Edit({ onClose, onSubmit, dream, dreamID}) {
    const modalRef = useRef();

    const [formData, setFormData] = useState({
        DreamName: "",
        DreamDate: "",
        DreamDescription: "",
    });

    useEffect(() => {
        setFormData({
            DreamName: dream.DreamName,
            DreamDate: dream.DreamDate,
            DreamDescription: dream.DreamDescription,
        });
    }, [dream]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const closeModal = (e) => {
        if (modalRef.current === e.target) {
        onClose();
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .put(`http://localhost:8001/editDream/${dream._id}`, formData) // Use dreamID here
            .then((res) => {
                console.log('Dream Updated');
                onSubmit(formData);
                onClose();
                window.location.reload();
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
                value={formData.DreamName}
                onChange={handleInputChange}
                className='py-1 px-1 rounded-md bg-container2 border-2 border-accent focus:outline-none focus:border-secondary'
            />
            <label htmlFor=''>Edit Date Dreamt:</label>
            <input
                type='date'
                name='DreamDate'
                value={formData.DreamDate}
                onChange={handleInputChange}
                className='py-1 px-1 rounded-md bg-container2 border-2 border-accent focus:outline-none focus:border-secondary'
            />
            </div>
            <label className='my-6'>Edit your dream!</label>
            <textarea
            name='DreamDescription'
            value={formData.DreamDescription}
            rows={10}
            cols={30}
            onChange={handleInputChange}
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
