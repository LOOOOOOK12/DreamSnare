import axios from 'axios';
import React, { useRef } from 'react'
import { Link } from 'react-router-dom';

function LogOut({onClose}) {

    const modalRef = useRef();

    const closeModal = (e) => {
        if(modalRef.current === e.target){
            onClose();
        }
    }

    const handleDelete = () =>{
        axios.get('https://dream-snare-api.vercel.app/logout')
        .then(res => {
            location.reload(true)
        }).catch(err => console.log(err))
    }

    return (
        <div ref={modalRef} onClick={closeModal} className='fixed inset-0 flex justify-center items-center text-text bg-background bg-opacity-70 backdrop-blur-sm z-50'>
            <div className='px-16 py-8 flex flex-col justify-center items-center gap-4 bg-container2 rounded-md'>
                <h1 className='text-2xl'>Are you sure to Log out DreamSnare?</h1>
                <div className='flex gap-6'>
                    <button onClick={onClose} className = 'py-3 px-8 bg-error hover:bg-errordark ease-in-out duration-300 rounded-md'>No</button>
                    <Link to='/'><button onClick={handleDelete} className = 'py-3 px-8 bg-yes hover:bg-yesdark ease-in-out duration-300 rounded-md'>Yes</button></Link>
                </div>
            </div>  
        </div>
    )
}

export default LogOut