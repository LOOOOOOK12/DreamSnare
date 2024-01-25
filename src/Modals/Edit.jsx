import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';

function Edit({ onClose, update, dream, dreamID }) {
    const modalRef = useRef();

    const [formData, setFormData] = useState({
        DreamName: '',
        DreamDate: '',
        DreamDescription: '',
    });

    const [validationErrors, setValidationErrors] = useState({
        DreamName: '',
        DreamDate: '',
        DreamDescription: '',
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
        setValidationErrors({ ...validationErrors, [name]: '' });
    };

    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const newErrors = {};
        for (const key in formData) {
            if (!formData[key]) {
                newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setValidationErrors(newErrors);
            return;
        }

        if (
            formData.DreamName === dream.DreamName &&
            formData.DreamDate === dream.DreamDate &&
            formData.DreamDescription === dream.DreamDescription
        ) {
            setValidationErrors({
                DreamName: 'No changes detected',
                DreamDate: 'No changes detected',
                DreamDescription: 'No changes detected',
            });
            return;
        }

        setValidationErrors({});

        axios
            .put(`http://localhost:8001/editDream/${dreamID}`, formData)
            .then((res) => {
                console.log('Dream Updated');
                update(formData);
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
            <form className='px-16 py-8 flex flex-col bg-container2 rounded-md text-left transition-all '>
                <div className='flex flex-col justify-center md:flex-row md:items-center gap-3'>
                    <div className='md:flex items-center gap-2'>
                        <label>Edit your Dream name:</label>
                        <div className='flex flex-col'>
                            <input
                                type='text'
                                name='DreamName'
                                value={formData.DreamName}
                                onChange={handleInputChange}
                                className={`py-1 px-1 rounded-md bg-container2 border-2 ${validationErrors.DreamName ? 'border-error' : 'border-accent'} focus:outline-none focus:border-secondary`}
                            />
                            {validationErrors.DreamName && <span className='text-error text-sm'>{validationErrors.DreamName}</span>}
                        </div>
                    </div>
                    <div className='md:flex items-center gap-2'>
                        <label>Edit Date Dreamt:</label>
                        <div className='flex flex-col'>
                            <input
                                type='date'
                                name='DreamDate'
                                value={formData.DreamDate}
                                onChange={handleInputChange}
                                className={`py-1 px-1 rounded-md bg-container2 border-2 ${validationErrors.DreamDate ? 'border-error' : 'border-accent'} focus:outline-none focus:border-secondary`}
                            />
                            {validationErrors.DreamDate && <span className='text-error text-sm'>{validationErrors.DreamDate}</span>}
                        </div>
                    </div>
                </div>
                <label className='my-6'>Edit your dream!</label>
                <textarea
                    name='DreamDescription'
                    value={formData.DreamDescription}
                    rows={10}
                    cols={30}
                    onChange={handleInputChange}
                    className={`py-1 px-1 rounded-md bg-container2 border-2 ${validationErrors.DreamDescription ? 'border-error' : 'border-accent'} focus:outline-none focus:border-secondary`}
                />
                {validationErrors.DreamDescription && <span className='text-error text-sm'>{validationErrors.DreamDescription}</span>}
                <div className='mt-6 justify-end flex gap-4'>
                    <button
                        onClick={onClose}
                        className='py-3 px-5 font-semibold rounded-md text-text bg-error text-white hover:bg-errordark ease-in-out duration-300'
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
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

