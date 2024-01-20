import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Create from '../Modals/Create'
import LogOut from '../Modals/LogOut'
import { RxHamburgerMenu } from "react-icons/rx";

function Navbar({user_ID}) {

    const [showModal, setShowModal] = useState(false)
    const [logOut, setShowLogOut] = useState(false)

    return (
        <div className=' w-full'>
            <nav className='px-10 py-6 w-full top-0 z-10 fixed flex justify-between items-center text-center bg-container2 text-text'>
                <h1 className='text-2xl font-semibold cursor-default'>DreamSnare.net</h1>
                <div className='flex gap-4'>
                    <button className='py-3 px-7 max-[860px]:hidden rounded-md text-background bg-primary font-semibold text-white hover:bg-accent ease-in-out duration-300'
                        onClick={()=>setShowModal(true)}
                    >Create</button>
                    <button className='py-3 px-7 max-[860px]:hidden rounded-md bg-error font-semibold text-white hover:bg-errordark ease-in-out duration-300'
                        onClick={()=>setShowLogOut(true)}
                    >Log-Out</button>
                    <RxHamburgerMenu size={35} className='min-[860px]:hidden'/>
                </div>
                {showModal && <Create
                    onClose={() => setShowModal(false)}
                    user_ID={user_ID}/>}
                {logOut && <LogOut onClose={() => setShowLogOut(false)}/>}
            </nav>
        </div>
        )
    }

    export default Navbar