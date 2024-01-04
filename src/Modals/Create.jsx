import React, { useRef } from 'react'
import { Link } from 'react-router-dom'

function Create({onClose}) {
    
    const modalRef = useRef();

    const closeModal = (e) => {
        if(modalRef.current === e.target){
            onClose();
        }
    }

    return (
        <div ref={modalRef} onClick={closeModal} className='fixed inset-0 flex justify-center items-center text-text bg-background bg-opacity-25 backdrop-blur-sm '>
            <form className="px-16 py-8 flex flex-col bg-container2 rounded-md text-left transition-all ">
                <div className='flex items-center gap-3'>
                    <label htmlFor="">Name your Dream:</label>
                    <input 
                        type="text" 
                        name="DreamName"
                        className='py-1 px-1 rounded-md bg-container2 border-2 border-accent focus:outline-none focus:border-secondary'/>
                    <label htmlFor="">Date Dreamt:</label>
                    <input 
                        type='date' 
                        name="DreamName"
                        className='py-1 px-1 rounded-md bg-container2 border-2 border-accent focus:outline-none focus:border-secondary'/>
                </div>
                <label className='my-6'>Describe your dream!</label>
                <textarea name='dreamDescription' rows={15} cols={30} className='py-1 px-1 rounded-md bg-container2 border-2 border-accent focus:outline-none focus:border-secondary'></textarea>
                    <div className='mt-6 justify-end flex gap-4'>
                        <button onClick={onClose} className='py-3 px-5 rounded-md text-background bg-primary text-white hover:bg-accent ease-in-out duration-300'>Cancel</button>
                        <button type='submit' className='py-3 px-5 rounded-md text-background bg-primary text-white hover:bg-accent ease-in-out duration-300'>Submit</button>
                    </div>
            </form> 
        </div>
    )
}

export default Create