import React from 'react'
import { useState } from 'react'
import Edit from '../Modals/Edit'
import Delete from '../Modals/Delete'

function DreamContainer({userName,dreamName, dreamDate, dreamDescription}) {

    const [showEdit, setShowEdit] = useState(false)
    const [showDelete, setShowDelete] = useState(false)

    return (
        <div className='py-12 px-8 bg-container2 flex flex-col text-text rounded-lg'>
            <h1 className='mb-4 text-3xl'>{userName}</h1>
            <div className='mb-4 flex gap-4'>
                <h1>Dream Name:</h1>
                <h1>{dreamName}</h1>
            </div>
            <div className='flex gap-4'>
                <h1>Dream Date</h1>
                <h1>{dreamDate}</h1>
            </div>
            <p className='p-3 mt-6 rounded-md bg-container2 border-2 border-accent focus:outline-none focus:border-secondary'>
                {dreamDescription}
            </p>
            <div className='mt-5 flex justify-end gap-4'>
                <button onClick={() => setShowDelete(true)} className='py-3 px-7 rounded-md bg-error font-semibold text-white hover:bg-errordark ease-in-out duration-300'>Delete</button>
                <button onClick={() => setShowEdit(true)} className='py-3 px-7 rounded-md text-background font-semibold  bg-primary hover:bg-accent ease-in-out duration-300'>Edit</button>
            </div>
            {showEdit && <Edit onClose = {() => setShowEdit(false)}/>}
            {showDelete && <Delete onClose = {() => setShowDelete(false)}/>}
        </div>
    )
}

export default DreamContainer