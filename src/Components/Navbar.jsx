import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Create from '../Modals/Create'

function Navbar() {

    const [showModal, setShowModal] = useState(false)

    return (
        <div className=' w-full'>
            <nav className='px-16 p-4 w-full top-0 z-10 fixed flex justify-between items-center text-center bg-container2 text-text'>
                <h1 className='text-2xl font-semibold'>DreamSnare.net</h1>
                <div className='flex gap-4'>
                    <button className='py-3 px-7 rounded-md text-background bg-primary text-white hover:bg-accent ease-in-out duration-300'
                    onClick={()=>setShowModal(true)}
                    >Create</button>
                    <Link to='/'><button className='py-3 px-7 rounded-md text-background bg-primary text-white hover:bg-accent ease-in-out duration-300'>Log-Out</button></Link>
                </div>
                {showModal && <Create onClose={() => setShowModal(false)}/>}
            </nav>
        </div>
        )
    }

    export default Navbar