import React from 'react'

function DreamContainer({dreamName, dreamDate, dreamDescription}) {
    return (
        <div className='py-12 px-8 bg-container2 flex flex-col text-text rounded-lg'>
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
                <button className='py-3 px-7 rounded-md bg-error text-white hover:bg-errordark ease-in-out duration-300'>Delete</button>
                <button className='py-3 px-7 rounded-md text-background bg-primary hover:bg-accent ease-in-out duration-300'>Edit</button>
            </div>
        </div>
    )
}

export default DreamContainer