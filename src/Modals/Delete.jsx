import React, { useRef } from 'react'

function Delete({onClose}) {

    const modalRef = useRef();

    const closeModal = (e) => {
        if(modalRef.current === e.target){
            onClose();
        }
    }

    return (
        <div ref={modalRef} onClick={closeModal} className='fixed inset-0 flex justify-center items-center text-text bg-background bg-opacity-70 backdrop-blur-sm z-50'>
            <div className='px-16 py-8 flex flex-col justify-center items-center gap-4 bg-container2 rounded-md'>
                <h1 className='text-2xl'>Are you sure to delete your Dream?</h1>
                <div className='flex gap-6'>
                    <button onClick={onClose} className = 'py-3 px-8 bg-error hover:bg-errordark rounded-md'>No</button>
                    <button onClick={onClose} className = 'py-3 px-8 bg-yes hover:bg-yesdark rounded-md'>Yes</button>
                </div>
            </div>  
        </div>
    )
}

export default Delete