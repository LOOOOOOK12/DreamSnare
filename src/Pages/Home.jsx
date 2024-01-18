import Navbar from "../Components/Navbar"
import DreamContainer from "../Components/DreamContainer"
import { useEffect, useState } from "react"
import axios from "axios"

function Home() {

    const [dreams, setDreams] = useState([])
    const [auth , setAuth] = useState(false)
    const [message, setMessage] = useState('')
    const [username, setUserName] = useState('')
    const [userID, setUserID] = useState('')

    axios.defaults.withCredentials = true

    useEffect(() => {
        axios.get('http://localhost:8001')
            .then(res => {
                if (res.data.Status === "Success") {
                    setAuth(true);
                    setUserName(res.data.username);
                    setUserID(res.data.user_ID)
                } else {
                    setAuth(false);
                    setMessage(res.data.Error);
                }
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8001/getDreams')
            .then(res => setDreams(res.data))
            .catch(err => console.log(err));
    }, [auth, username]);

    return (
        <div className='bg-background flex flex-col justify-center'>
            <Navbar/>
            <div className="pt-48 w-1/2 text-center flex items-center justify-center">
                {
                    auth ? 
                        <h1 className="text-text text-5xl">Welcome to DreamSnare {username}!!</h1>
                    :
                        <div>
                            <h1 className="text-text text-5xl">may problem--- {message}</h1>
                        </div>
                        
                }
            </div>
            <div className=" px-10 py-10 mt-28 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
                {dreams.map((dream, idx)=>(
                    <div key={idx}>
                        <DreamContainer
                            userName={username}
                            dreamName={dream.DreamName}
                            dreamDate={dream.DreamDate}
                            dreamDescription={dream.DreamDescription}
                            dreamID={dream.dream_ID}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home