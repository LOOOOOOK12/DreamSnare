import React, { useState } from 'react'
import Create from '../Modals/Create'
import LogOut from '../Modals/LogOut'
import { RxHamburgerMenu } from "react-icons/rx";

function Navbar({user_ID}) {

    const [showModal, setShowModal] = useState(false)
    const [logOut, setShowLogOut] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuClick = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className=' w-full'>
            <nav className='px-10 py-6 w-full top-0 z-10 fixed flex justify-between items-center text-center text-text'>
                <a href="#Home"><h1 className='text-2xl font-semibold cursor-default'>DreamSnare.net</h1></a>
                <div className='flex gap-4'>
                    <button className='py-3 px-7 max-[600px]:hidden rounded-md text-background bg-primary font-semibold text-white hover:bg-accent ease-in-out duration-300'
                        onClick={()=>setShowModal(true)}
                    >Create
                    </button>
                    <button className='py-3 px-7 max-[600px]:hidden rounded-md bg-error font-semibold text-white hover:bg-errordark ease-in-out duration-300'
                        onClick={()=>setShowLogOut(true)}
                    >Log-Out
                    </button>
                        <RxHamburgerMenu onClick={handleMenuClick} size={35} className="min-[600px]:hidden" />
                </div>
                <div className={`absolute min-[600px] flex justify-end ${menuOpen ? 'flex top-28 left-32 gap-4' : 'hidden'}`}>
                    <button
                        className="py-3 px-7 rounded-md text-background bg-primary font-semibold text-white hover:bg-accent ease-in-out duration-300"
                        onClick={() => setShowModal(true)}
                    >
                        Create
                    </button>
                    <button
                        className="py-3 px-7 rounded-md bg-error font-semibold text-white hover:bg-errordark ease-in-out duration-300"
                        onClick={() => setShowLogOut(true)}
                    >
                        Log-Out
                    </button>
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