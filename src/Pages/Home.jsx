import Navbar from "../Components/Navbar"
import DreamContainer from "../Components/DreamContainer"
import { TestData } from "../constants/test"
import { useEffect, useState } from "react"
import axios from "axios"

function Home() {

    const [dreams, setDreams] = useState([]);
    const [auth , setAuth] = useState(false)
    const [message, setMessage] = useState('')
    const [username, setName] = useState('')

    axios.defaults.withCredentials = true

    useEffect(() => {
        axios.get('http://localhost:8001')
            .then(res => {
                if (res.data.Status === "Success") {
                    setAuth(true);
                    setName(res.data.name);
                } else {
                    setAuth(false);
                    setMessage(res.data.Error);
                }
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8001')
            .then(res => setDreams(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className='bg-background flex flex-col'>
            <Navbar/>
            <div className="pt-48 flex items-center justify-center">
                {
                    auth ? 
                        <h1 className="text-text text-5xl">Welcome to DreamSnare {username}!!</h1>
                    :
                        <div>
                            <h1 className="text-text text-5xl">may problem--- {message}</h1>
                        </div>
                        
                }
            </div>
            <div className=" px-10 py-10 mt-28 grid grid-cols-3 gap-5 ">
                {TestData.map((t,idx)=>(
                    <div key={idx}>
                        <DreamContainer
                        userName={t.userName}
                        dreamName={t.dreamName}
                        dreamDate={t.dreamDate}
                        dreamDescription={t.dreamDescription}
                    />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home